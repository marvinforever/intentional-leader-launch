import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import pageHtml from "@/content/intentional-leader.html?raw";
import ogShareImage from "@/assets/og-intentional-leader-2027.jpg";
import momentumLogoWhite from "@/assets/momentum-logo-white-trim.png";
import { usePageAnalytics, trackEvent } from "@/hooks/use-analytics";

const TITLE = "Intentional Leader | The Momentum Company";
const DESCRIPTION =
  "The place to learn what it takes to lead with greater intention. Built on 250+ episodes of The Intentional Leader Podcast. Up to 8 leaders per company. Next class starts January 7, 2027.";
const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/UbCJCIeu4SNTUChma1tF";

export const Route = createFileRoute("/intentional-leader")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "author", content: "Mark Jewell, The Momentum Company" },
      { property: "og:title", content: "Intentional Leader" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://leadintentional.tools/intentional-leader" },
      { property: "og:image", content: `https://leadintentional.tools${ogShareImage}` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Intentional Leader, from The Momentum Company. The place to learn what it takes to lead with greater intention." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Intentional Leader" },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: `https://leadintentional.tools${ogShareImage}` },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;1,400&display=swap",
      },
      { rel: "canonical", href: "https://leadintentional.tools/intentional-leader" },
    ],
  }),
  component: IntentionalLeaderPage,
});

function IntentionalLeaderPage() {
  usePageAnalytics("intentional_leader");

  useEffect(() => {
    // Build the 40-hour work week grid (33 hours highlighted).
    const grid = document.getElementById("ilp-week");
    let observer: IntersectionObserver | undefined;
    if (grid && !grid.dataset.built) {
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
      let n = 0;
      let html = "";
      for (const day of days) {
        html += `<span class="d">${day}</span>`;
        for (let h = 0; h < 8; h++) {
          n++;
          html += `<span class="h${n <= 33 ? " on" : ""}" style="--i:${n}"></span>`;
        }
      }
      grid.innerHTML = html;
      grid.dataset.built = "1";
      grid.classList.add("js");
      if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver(
          (entries) => {
            if (entries[0]?.isIntersecting) {
              grid.classList.add("go");
              observer?.disconnect();
            }
          },
          { threshold: 0.4 },
        );
        observer.observe(grid);
      } else {
        grid.classList.add("go");
      }
    }

    // Track CTA clicks.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith(BOOKING_URL)) trackEvent("cta_click", "book_a_call", { metadata: { label: a.textContent?.trim() } });
      else if (href.startsWith("tel:")) trackEvent("cta_click", "phone_call");
      else if (href.startsWith("mailto:")) trackEvent("cta_click", "email_invoice");
    };
    document.addEventListener("click", onClick);
    return () => {
      observer?.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      <header
        style={{
          background: "#0D0D0D",
          borderBottom: "1px solid #3A372B",
          padding: "14px 0",
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: "0 24px",
          }}
        >
          <a href="https://www.themomentumcompany.com" aria-label="The Momentum Company">
            <img src={momentumLogoWhite} alt="The Momentum Company" style={{ height: 30, width: "auto", display: "block" }} />
          </a>
          <a
            href={BOOKING_URL}
            style={{
              fontFamily: "Montserrat, Arial, sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: "#0D0D0D",
              background: "#C4B371",
              padding: "10px 18px",
              borderRadius: 4,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Book a call
          </a>
        </div>
      </header>
      <div style={{ background: "#FFFDF8" }} dangerouslySetInnerHTML={{ __html: pageHtml }} />
    </>
  );
}
