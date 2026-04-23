import { useCallback, useEffect, useRef } from "react";

type EventType =
  | "page_view"
  | "scroll_depth"
  | "section_view"
  | "cta_click"
  | "interaction";

type AnalyticsEvent = {
  visitor_id: string;
  session_id: string;
  event_type: EventType;
  event_name: string;
  page_path: string;
  section?: string | null;
  value?: number | null;
  metadata?: Record<string, unknown>;
};

const VISITOR_KEY = "ial_visitor_id";
const SESSION_KEY = "ial_session_id";
const SESSION_TTL_MS = 30 * 60 * 1000; // 30 min
const ENDPOINT = "/api/public/track";

function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function getVisitorId(): string {
  if (typeof window === "undefined") return "ssr";
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = uid();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return uid();
  }
}

function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { id: string; t: number };
      if (Date.now() - parsed.t < SESSION_TTL_MS) {
        sessionStorage.setItem(
          SESSION_KEY,
          JSON.stringify({ id: parsed.id, t: Date.now() }),
        );
        return parsed.id;
      }
    }
    const id = uid();
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id, t: Date.now() }));
    return id;
  } catch {
    return uid();
  }
}

let queue: AnalyticsEvent[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;

function flush() {
  if (queue.length === 0) return;
  const events = queue.splice(0, queue.length);
  const body = JSON.stringify({ events });
  try {
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.sendBeacon === "function"
    ) {
      const blob = new Blob([body], { type: "application/json" });
      const ok = navigator.sendBeacon(ENDPOINT, blob);
      if (ok) return;
    }
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      /* swallow */
    });
  } catch {
    /* swallow */
  }
}

function enqueue(event: AnalyticsEvent) {
  queue.push(event);
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(flush, 800);
  if (queue.length >= 10) flush();
}

export function trackEvent(
  type: EventType,
  name: string,
  opts: {
    section?: string;
    value?: number;
    metadata?: Record<string, unknown>;
  } = {},
) {
  if (typeof window === "undefined") return;
  enqueue({
    visitor_id: getVisitorId(),
    session_id: getSessionId(),
    event_type: type,
    event_name: name,
    page_path: window.location.pathname + window.location.search,
    section: opts.section ?? null,
    value: typeof opts.value === "number" ? opts.value : null,
    metadata: opts.metadata,
  });
}

/**
 * Page-level analytics: page view, scroll depth thresholds (25/50/75/100),
 * and IntersectionObserver-based section visibility for elements with
 * `data-track-section="<name>"`.
 */
export function usePageAnalytics(pageName: string) {
  const seenScroll = useRef<Set<number>>(new Set());
  const seenSections = useRef<Set<string>>(new Set());

  useEffect(() => {
    trackEvent("page_view", pageName, {
      metadata: {
        referrer: typeof document !== "undefined" ? document.referrer : "",
        screen_w: typeof window !== "undefined" ? window.innerWidth : null,
      },
    });

    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const pct = Math.round((window.scrollY / total) * 100);
      for (const threshold of [25, 50, 75, 100]) {
        if (pct >= threshold && !seenScroll.current.has(threshold)) {
          seenScroll.current.add(threshold);
          trackEvent("scroll_depth", `scroll_${threshold}`, {
            value: threshold,
          });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const name =
            (entry.target as HTMLElement).dataset.trackSection ?? "unknown";
          if (seenSections.current.has(name)) continue;
          seenSections.current.add(name);
          trackEvent("section_view", name, { section: name });
        }
      },
      { threshold: 0.4 },
    );
    document
      .querySelectorAll<HTMLElement>("[data-track-section]")
      .forEach((el) => observer.observe(el));

    const onUnload = () => flush();
    window.addEventListener("pagehide", onUnload);
    window.addEventListener("beforeunload", onUnload);

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest<HTMLElement>("[data-track-cta]");
      if (!el) return;
      const name = el.dataset.trackCta || "unknown_cta";
      const section = el.dataset.trackCtaSection || undefined;
      trackEvent("cta_click", name, {
        section,
        metadata: {
          href: (el as HTMLAnchorElement).href || undefined,
          text: el.innerText?.slice(0, 80),
        },
      });
    };
    document.addEventListener("click", onClick, { capture: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", onUnload);
      window.removeEventListener("beforeunload", onUnload);
      document.removeEventListener("click", onClick, { capture: true } as EventListenerOptions);
      observer.disconnect();
      flush();
    };
  }, [pageName]);

  const trackCta = useCallback(
    (
      name: string,
      meta: { section?: string; metadata?: Record<string, unknown> } = {},
    ) => {
      trackEvent("cta_click", name, meta);
    },
    [],
  );

  return { trackCta, trackEvent };
}