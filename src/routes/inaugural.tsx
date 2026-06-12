import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Phone, ArrowUpRight, Mic, Sparkles, FileText } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import momentumLogoWhite from "@/assets/momentum-logo-white.png";
import ogShareImage from "@/assets/og-share-intentional-leader.jpg";
import { usePageAnalytics, trackEvent } from "@/hooks/use-analytics";
import { submitFoundingClassClaim } from "@/utils/founding-class.functions";

export const Route = createFileRoute("/inaugural")({
  head: () => ({
      meta: [
        { title: "The Intentional Leader Inaugural Program" },
        {
          name: "description",
          content:
            "One offer for the leaders of agriculture: a Jericho baseline assessment of your leadership team plus the full 90-day Intentional Leader program. Closes June 30.",
        },
        { property: "og:title", content: "The Intentional Leader Inaugural Program" },
        {
          property: "og:description",
          content:
            "Assess your team. Develop your leaders. See the proof in 90 days. The inaugural program for agriculture leaders — closes June 30.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: ogShareImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: ogShareImage },
      ],
  }),
  component: InauguralPage,
});

// ============================================================
// CONFIG
// ============================================================

const STRIPE_COMPANY_URL = "https://buy.stripe.com/5kQ14nayP7jQbagaqnds410";

const MARK_PHONE_DISPLAY = "(402) 881-9986";
const MARK_PHONE_TEL = "tel:4028819986";

const foundingClass: string[] = [];

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[hsl(var(--ial-green-soft))] mb-4">
    {children}
  </div>
);

// ============================================================
// PAGE
// ============================================================

function InauguralPage() {
  usePageAnalytics("inaugural");

  const faqs = [
    {
      q: "How many leaders does \u201cyour leadership team\u201d cover?",
      a: "Up to 8 leaders per Founding Company spot. Bigger team? Call Mark — there's a straightforward path for larger organizations.",
    },
    {
      q: "What exactly is the baseline assessment?",
      a: "Each of your leaders has a structured conversation with Jericho, our AI coach — about 25 minutes. You receive an org snapshot: where each leader is across the core leadership dimensions, where the gaps are, and the top three development priorities for your team. That baseline is what the Day-90 report measures against.",
    },
    {
      q: "Is Jericho really AI, or is it just automated email?",
      a: "Jericho is a custom-built AI coach that learns each leader and adapts to their gaps. Not a drip sequence, not a chatbot wrapper.",
    },
    {
      q: "How much time does it take per leader?",
      a: "15\u201320 minutes per day inside Jericho, a 5-minute Friday voice check-in, and one 3-hour live session with Mark each month. Everything else moves at each leader's pace across the 90 days.",
    },
    {
      q: "When does the program begin?",
      a: "Baseline assessments run in July, as soon as you're in. The 90-day program begins August 1.",
    },
    {
      q: "Payment terms?",
      a: "Card via Stripe — you're in immediately. Prefer an invoice? Use the reserve form below; invoices are due on receipt.",
    },
    {
      q: "What happens after Day 90?",
      a: "You can continue with Momentum 360 (our flagship leadership system) or stay in the Jericho community at the standalone rate. No auto-renewal, no surprise charges.",
    },
  ];

  return (
    <div className="ial-page min-h-screen bg-[hsl(var(--ial-bg))] text-[hsl(var(--ial-text))] font-[family-name:var(--font-inter)]">
      {/* ===================== HEADER ===================== */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-[hsl(var(--ial-bg))]/85 border-b border-[hsl(var(--ial-border))]">
        <div className="container max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <Link to="/intentional-leader" className="flex items-center gap-3">
            <img src={momentumLogoWhite} alt="The Momentum Company" className="h-7 md:h-8 w-auto invert" />
            <span className="hidden sm:inline text-xs uppercase tracking-[0.18em] text-[hsl(var(--ial-text-muted))]">
              Intentional Leader
            </span>
          </Link>
          <a
            href={MARK_PHONE_TEL}
            className="text-sm font-medium text-[hsl(var(--ial-text))] hover:text-[hsl(var(--ial-green-soft))] transition-colors"
            onClick={() => trackEvent("interaction", "header_phone_click", { section: "header" })}
          >
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {MARK_PHONE_DISPLAY}
            </span>
          </a>
        </div>
      </header>

      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden" style={{ background: "var(--ial-gradient-hero)" }}>
        <div className="container max-w-5xl mx-auto px-6 py-24 md:py-32 relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-[hsl(var(--ial-green))]/40 bg-[hsl(var(--ial-green))]/10 text-[hsl(var(--ial-green-soft))] text-xs font-semibold tracking-wider uppercase mb-8">
            The Intentional Leader Inaugural Program · Closes June 30
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-black leading-[1.05] mb-8 max-w-5xl">
            The Intentional Leader
            <br />
            <span className="text-[hsl(var(--ial-green-soft))]">Inaugural Program</span>
          </h1>
          <p className="text-lg md:text-xl text-[hsl(var(--ial-text-muted))] leading-relaxed max-w-2xl mb-10">
            After 225 interviews and 750+ production hours — we have learned a lot about intentional leadership. We have learned a lot from you. And we've learned the big three things affecting leaders in ag...
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button
              asChild
              size="lg"
              className="bg-[hsl(var(--ial-green))] hover:bg-[hsl(var(--ial-green-deep))] text-white font-semibold h-14 px-8 text-base"
              onClick={() => trackEvent("interaction", "stripe_company_click", { section: "hero" })}
            >
              <a href={STRIPE_COMPANY_URL} target="_blank" rel="noopener noreferrer" data-track-cta="claim_founding_company">
                Claim a Founding Company spot
                <ArrowUpRight className="w-5 h-5 ml-1" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-[hsl(var(--ial-green-deep))] bg-transparent text-[hsl(var(--ial-green-deep))] hover:bg-[hsl(var(--ial-green-deep))] hover:text-white h-14 px-8 text-base font-semibold"
            >
              <a href="#how-it-works">See how it works</a>
            </Button>
          </div>
          <div className="flex items-start gap-2 text-sm text-[hsl(var(--ial-text-muted))] leading-relaxed">
            <Phone className="w-4 h-4 mt-0.5 shrink-0" />
            <p className="m-0">
              Or call Mark directly — no gatekeepers:{" "}
              <a
                href={MARK_PHONE_TEL}
                className="text-[hsl(var(--ial-text))] font-medium whitespace-nowrap underline-offset-2 hover:underline"
              >
                {MARK_PHONE_DISPLAY}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ===================== THE CONTRARIAN MOVE ===================== */}
      <section className="py-24 border-t border-[hsl(var(--ial-border))] bg-[hsl(var(--ial-surface))]">
        <div className="container max-w-4xl mx-auto px-6">
          <SectionLabel>The Contrarian Move</SectionLabel>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-8 leading-[1.1]">
            When everyone else retreats,{" "}
            <span className="text-[hsl(var(--ial-green-deep))]">intentional leaders invest.</span>
          </h2>
          <div className="space-y-5 text-lg md:text-xl text-[hsl(var(--ial-text-muted))] leading-relaxed">
            <p>
              Ag is in a hard season. Tariffs. Commodity swings. Input costs up, output
              prices down. Most are pulling back, cutting development, white-knuckling
              through. But the leaders who come out the other side of a down market with
              a strong bench aren't the ones who froze — they're the ones who doubled
              down on their people while it was hard. The Founding Class is the group
              that moved when others stood still.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== THE ARC: ASSESS / DEVELOP / PROVE ===================== */}
      <section className="py-24 border-t border-[hsl(var(--ial-border))]">
        <div className="container max-w-6xl mx-auto px-6">
          <SectionLabel>The Offer</SectionLabel>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-8 leading-[1.1]">
            Assess. Develop. Prove.
          </h2>
          <p className="text-lg md:text-xl text-[hsl(var(--ial-text-muted))] leading-relaxed max-w-3xl mb-12">
            Not a video library. A 90-day coaching engine wrapped in measurement —
            so you're never guessing whether it worked.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-[hsl(var(--ial-surface))] border-[hsl(var(--ial-border))] p-8">
              <div className="text-xs font-semibold tracking-[0.18em] uppercase text-[hsl(var(--ial-green-soft))] mb-3">
                July · Before Day 1
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[hsl(var(--ial-text))] mb-4 leading-tight">
                The baseline assessment
              </h3>
              <p className="text-[hsl(var(--ial-text-muted))] leading-relaxed">
                Each of your leaders (up to 8) sits with Jericho for a structured
                25-minute conversation. You get an org snapshot: where each leader
                actually is, where the gaps are, and the top three development
                priorities for your team. Most companies tell us this alone is worth
                the price.
              </p>
            </Card>

            <Card className="bg-[hsl(var(--ial-surface))] border-[hsl(var(--ial-border))] p-8">
              <div className="text-xs font-semibold tracking-[0.18em] uppercase text-[hsl(var(--ial-green-soft))] mb-3">
                August 1 · 90 Days
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[hsl(var(--ial-text))] mb-4 leading-tight">
                The development engine
              </h3>
              <p className="text-[hsl(var(--ial-text-muted))] leading-relaxed">
                Daily briefs and a personalized podcast feed built around each
                leader's profile. Unlimited 1:1 Jericho coaching — voice or text,
                whenever they're stuck. 5-minute Friday voice check-ins. Three live
                half-day working sessions with Mark and the full Founding Class.
              </p>
            </Card>

            <Card className="bg-[hsl(var(--ial-surface))] border-[hsl(var(--ial-border))] p-8">
              <div className="text-xs font-semibold tracking-[0.18em] uppercase text-[hsl(var(--ial-green-soft))] mb-3">
                Day 90 · The Proof
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[hsl(var(--ial-text))] mb-4 leading-tight">
                The Intentional Leader Report
              </h3>
              <p className="text-[hsl(var(--ial-text-muted))] leading-relaxed">
                A real artifact, measured against July's baseline: where each leader
                started, what shifted, the decisions they got more deliberate and
                decisive about, and the plan for the next 90. You get the org-level
                read across every leader — proof of what moved, in writing.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ===================== HOW THE 90 DAYS WORK ===================== */}
      <section id="how-it-works" className="py-24 border-t border-[hsl(var(--ial-border))] bg-[hsl(var(--ial-surface))]">
        <div className="container max-w-6xl mx-auto px-6">
          <SectionLabel>How it actually works</SectionLabel>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-6 leading-[1.1]">
            This is not a course you log into and watch.
          </h2>
          <p className="text-lg md:text-xl text-[hsl(var(--ial-text-muted))] leading-relaxed max-w-3xl mb-12">
            It's 90 days inside a coaching system built around your leaders,
            your team, and your season — drawn from 225+ podcast interviews with the
            best operators in agriculture, distilled into something your people can
            actually use on Monday morning.
          </p>

          <div className="space-y-8">
            {[
              {
                k: "Day 0",
                t: "Your Intentional Leader Profile",
                b: "Each leader sits with Jericho and builds a personal profile. Goals, friction points, the team they lead, the season they're in. Everything that follows is built around that profile.",
              },
              {
                k: "Every day",
                t: "A personalized brief, built for each leader",
                b: "Short daily prompts and a personalized podcast feed pulled from the Lead Intentional library. Not generic content — the exact interview, the exact framework that matches what they're working on this week.",
              },
              {
                k: "Every Friday",
                t: "5-Minute Friday voice check-in",
                b: "Once a week, each leader voice-records their experience against a few simple prompts. Five minutes. The most consistent leadership habit they'll ever keep.",
              },
              {
                k: "Anytime",
                t: "Unlimited coaching on demand",
                b: "Stuck in a hard conversation? Prepping a 1:1? Open Jericho. It already knows their context — their team, their goals, the conversation they had last Tuesday — and coaches from there.",
              },
              {
                k: "3 times in 90 days",
                t: "Live half-day sessions with Mark",
                b: "Three working sessions with the full Founding Class. Not lectures — live problem-solving on the things this cohort is actually running into. Leaders leave with the next move, not notes.",
              },
              {
                k: "Day 90",
                t: "The Intentional Leader Report",
                b: "Where each leader started, what shifted, and the plan for the next 90 days — plus the org-level read for you.",
              },
            ].map((step) => (
              <div key={step.k} className="flex gap-6">
                <div className="w-24 shrink-0 text-xs font-bold tracking-[0.15em] uppercase text-[hsl(var(--ial-green-soft))] pt-1">
                  {step.k}
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl text-[hsl(var(--ial-text))] mb-2 leading-tight">
                    {step.t}
                  </h3>
                  <p className="text-[hsl(var(--ial-text-muted))] leading-relaxed">{step.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PROOF ===================== */}
      <section className="py-24 border-t border-[hsl(var(--ial-border))]">
        <div className="container max-w-6xl mx-auto px-6">
          <SectionLabel>Proof — from leaders running the playbook</SectionLabel>
          {foundingClass.length > 0 && (
            <p className="text-sm text-[hsl(var(--ial-text-muted))] mb-8 italic">
              United Coop baseline results will anchor this section once Day 90 lands.
            </p>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "Before our busy season, I actually sat down with the anhydrous team ahead of time — set expectations, walked through the processes, made sure everyone knew the plan. We got through the whole push with no accidents, good morale, and strong output. That doesn't happen by accident. It happens when you lead before the chaos hits instead of reacting to it.",
                name: "Joe",
                company: "Ag Retailer",
              },
              {
                quote:
                  "Last spring was genuinely different. My phone wasn't blowing up the same way — fewer calls, fewer fires, fewer people needing me to make every call for them. I'd put in the work upfront to lead proactively, and it showed when it counted.",
                name: "Mitch",
                company: "Ag Retailer",
              },
              {
                quote:
                  "I hadn't had operations and sales in the same room at two of my locations in three months. When I finally ran those meetings, I found out about gaps I didn't even know existed — and saw places I could hand things off. Turns out I'd been carrying a lot that wasn't mine to carry.",
                name: "Matt",
                company: "Multi-location Ag Company",
              },
            ].map((t) => (
              <Card
                key={t.name}
                className="bg-[hsl(var(--ial-surface))] border-[hsl(var(--ial-border))] p-8"
              >
                <p className="text-[hsl(var(--ial-text-muted))] leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="text-sm font-semibold text-[hsl(var(--ial-text))]">
                  {t.name} · {t.company}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== THE FOUNDING CLASS WALL ===================== */}
      {foundingClass.length > 0 && (
        <section className="py-24 border-t border-[hsl(var(--ial-border))] bg-[hsl(var(--ial-surface))]">
          <div className="container max-w-4xl mx-auto px-6 text-center">
            <SectionLabel>The Founding Class is forming</SectionLabel>
            <div className="flex flex-wrap justify-center gap-3">
              {foundingClass.map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-[hsl(var(--ial-green))]/10 border border-[hsl(var(--ial-green))]/30 text-[hsl(var(--ial-green-soft))] text-sm font-medium"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================== PRICING ===================== */}
      <section className="py-24 border-t border-[hsl(var(--ial-border))]">
        <div className="container max-w-6xl mx-auto px-6">
          <SectionLabel>Claim your place</SectionLabel>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-6 leading-[1.1]">
            Founding Company · Closes June 30.
          </h2>

          <div className="grid md:grid-cols-1 max-w-2xl mx-auto gap-6">
            {/* Founding Company — the offer */}
            <Card className="bg-[hsl(var(--ial-surface))] border-[hsl(var(--ial-border))] p-8 flex flex-col">
              <div className="text-xs font-bold tracking-[0.2em] uppercase text-[hsl(var(--ial-green-soft))] mb-3">
                For companies · 15 spots
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[hsl(var(--ial-text))] mb-4 leading-tight">
                Founding Company
              </h3>
              <div className="text-3xl font-bold text-[hsl(var(--ial-text))] mb-6">
                $5,000
              </div>
              <ul className="space-y-3 text-[hsl(var(--ial-text-muted))] leading-relaxed mb-8 flex-1">
                {[
                  "Jericho baseline assessment — up to 8 leaders, with your org snapshot",
                  "All 8 through the full 90-day Intentional Leader program",
                  "Unlimited 1:1 Jericho coaching for every leader",
                  "Three live half-day working sessions with Mark",
                  "The Day-90 report: org-level proof of what moved",
                  "Founding Class recognition — first cohort, named for good",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <Check className="w-4 h-4 mt-1 flex-shrink-0 text-[hsl(var(--ial-green))]" strokeWidth={3} />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                className="w-full bg-[hsl(var(--ial-green))] hover:bg-[hsl(var(--ial-green-deep))] text-white font-semibold h-12"
                onClick={() => trackEvent("interaction", "stripe_company_click", { section: "pricing" })}
              >
                <a href={STRIPE_COMPANY_URL} target="_blank" rel="noopener noreferrer" data-track-cta="claim_founding_company">
                  Claim your spot — pay by card
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
              <p className="text-xs text-[hsl(var(--ial-text-muted))] mt-4 text-center">
                Prefer an invoice?{" "}
                <a href="#reserve" className="text-[hsl(var(--ial-green-soft))] hover:underline">
                  Reserve below
                </a>
                {" "}— due on receipt. Team bigger than 8? Call Mark:{" "}
                <a href={MARK_PHONE_TEL} className="text-[hsl(var(--ial-text))] hover:underline">
                  {MARK_PHONE_DISPLAY}
                </a>
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ===================== RESERVE BY INVOICE ===================== */}
      <section id="reserve" className="py-24 border-t border-[hsl(var(--ial-border))] bg-[hsl(var(--ial-surface))]">
        <div className="container max-w-xl mx-auto px-6">
          <ReserveForm />
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="py-24 border-t border-[hsl(var(--ial-border))]">
        <div className="container max-w-3xl mx-auto px-6">
          <SectionLabel>Questions</SectionLabel>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-[hsl(var(--ial-border))]">
                <AccordionTrigger className="text-left text-[hsl(var(--ial-text))] hover:text-[hsl(var(--ial-green-soft))] hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-[hsl(var(--ial-text-muted))] leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ===================== CLOSING ===================== */}
      <section className="py-24 border-t border-[hsl(var(--ial-border))]" style={{ background: "var(--ial-gradient-cta)" }}>
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-6 text-white leading-[1.1]">
            Decisive leaders move.
          </h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto mb-10">
            Fifteen companies will know exactly where their leaders stand — and watch
            them move — before harvest. The window closes June 30.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-[hsl(var(--ial-green-deep))] hover:bg-white/90 font-semibold h-14 px-8 text-base mb-6"
            onClick={() => trackEvent("interaction", "stripe_company_click", { section: "closing" })}
          >
            <a href={STRIPE_COMPANY_URL} target="_blank" rel="noopener noreferrer" data-track-cta="claim_founding_company">
              Claim a Founding Company spot
              <ArrowUpRight className="w-5 h-5 ml-1" />
            </a>
          </Button>
          <p className="text-sm text-white/70">
            Or call Mark — no gatekeepers:{" "}
            <a href={MARK_PHONE_TEL} className="text-white font-medium hover:underline">
              {MARK_PHONE_DISPLAY}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// RESERVE FORM (invoice path — reuses existing server fn)
// ============================================================

function ReserveForm() {
  const submit = useServerFn(submitFoundingClassClaim);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    leaders_count: "",
    note: "",
  });

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await submit({
        data: {
          company_name: form.company_name,
          contact_name: form.contact_name,
          email: form.email,
          phone: form.phone,
          position: "Founding Company — $5,000",
          claim_type: "claim",
          amount_usd: 5000,
          leaders_count: parseInt(form.leaders_count || "0", 10) || 0,
          note: form.note,
        },
      });
      setDone(true);
      trackEvent("interaction", "reserve_form_submitted", { section: "reserve" });
      toast.success("You're in.", {
        description: "Your invoice is on the way — due on receipt. Welcome to the Founding Class.",
      });
    } catch {
      toast.error("Something went wrong", {
        description: "Please email mark@themomentumcompany.com and we'll handle it directly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="bg-[hsl(var(--ial-bg))] border-[hsl(var(--ial-border))] p-8">
      <div className="text-xs font-bold tracking-[0.2em] uppercase text-[hsl(var(--ial-green-soft))] mb-3">
        Reserve by invoice
      </div>
      <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[hsl(var(--ial-text))] mb-2 leading-tight">
        Prefer an invoice?
      </h3>
      <p className="text-[hsl(var(--ial-text-muted))] leading-relaxed mb-6">
        Reserve your spot here.
      </p>
      <p className="text-sm text-[hsl(var(--ial-text-muted))] leading-relaxed mb-6">
        Founding Company — $5,000. We'll send the invoice same day; it's due on
        receipt, and your spot is held the moment you submit.
      </p>

      {done ? (
        <div className="text-center py-8">
          <div className="text-2xl font-bold text-[hsl(var(--ial-green-soft))] mb-4">
            You're in.
          </div>
          <p className="text-[hsl(var(--ial-text-muted))]">
            Invoice on the way — due on receipt. Welcome to the Founding Class.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <Label htmlFor="company_name" className="text-[hsl(var(--ial-text))]">
              Company name
            </Label>
            <Input
              id="company_name"
              value={form.company_name}
              onChange={(e) => setForm({ ...form, company_name: e.target.value })}
              className="bg-[hsl(var(--ial-surface))] border-[hsl(var(--ial-border))] text-[hsl(var(--ial-text))]"
            />
          </div>
          <div>
            <Label htmlFor="contact_name" className="text-[hsl(var(--ial-text))]">
              Your name
            </Label>
            <Input
              id="contact_name"
              value={form.contact_name}
              onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
              className="bg-[hsl(var(--ial-surface))] border-[hsl(var(--ial-border))] text-[hsl(var(--ial-text))]"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-[hsl(var(--ial-text))]">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-[hsl(var(--ial-surface))] border-[hsl(var(--ial-border))] text-[hsl(var(--ial-text))]"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-[hsl(var(--ial-text))]">
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="bg-[hsl(var(--ial-surface))] border-[hsl(var(--ial-border))] text-[hsl(var(--ial-text))]"
            />
          </div>
          <div>
            <Label htmlFor="leaders_count" className="text-[hsl(var(--ial-text))]">
              How many leaders? (up to 8)
            </Label>
            <Input
              id="leaders_count"
              type="number"
              min={0}
              value={form.leaders_count}
              onChange={(e) => setForm({ ...form, leaders_count: e.target.value })}
              className="bg-[hsl(var(--ial-surface))] border-[hsl(var(--ial-border))] text-[hsl(var(--ial-text))]"
            />
          </div>
          <div>
            <Label htmlFor="note" className="text-[hsl(var(--ial-text))]">
              Anything we should know? (optional)
            </Label>
            <Textarea
              id="note"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="bg-[hsl(var(--ial-surface))] border-[hsl(var(--ial-border))] text-[hsl(var(--ial-text))] min-h-[80px]"
            />
          </div>
          <Button
            type="button"
            size="lg"
            disabled={
              submitting ||
              !form.company_name ||
              !form.contact_name ||
              !form.email ||
              !form.phone
            }
            onClick={handleSubmit}
            className="w-full bg-[hsl(var(--ial-green))] hover:bg-[hsl(var(--ial-green-soft))] text-white font-semibold"
          >
            {submitting ? "Reserving…" : "Reserve my Founding Company spot"}
          </Button>
        </div>
      )}
    </Card>
  );
}
