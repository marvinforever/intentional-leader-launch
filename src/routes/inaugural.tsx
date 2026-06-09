import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useServerFn } from "@tanstack/react-start";
import { submitFoundingClassClaim } from "@/utils/founding-class.functions";
import momentumLogoWhite from "@/assets/momentum-logo-white.png";
import ogShareImage from "@/assets/og-share-intentional-leader.jpg";
import { usePageAnalytics } from "@/hooks/use-analytics";

export const Route = createFileRoute("/inaugural")({
  head: () => ({
    meta: [
      { title: "The Inaugural Offering · Intentional Leader" },
      {
        name: "description",
        content:
          "An invitation to the leaders of agriculture. The Inaugural Offering of the Intentional Leader program closes June 30. Program begins August 1.",
      },
      { property: "og:title", content: "The Inaugural Offering · Intentional Leader" },
      {
        property: "og:description",
        content:
          "When everyone else retreats, intentional leaders invest. Join the Founding Class. Closes June 30.",
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
// EDIT THIS LIST as Founding Class members commit:
// Add company names as strings. Leave empty to hide the section.
const foundingClass: string[] = [];
// ============================================================

// PLACEHOLDERS — paste final Stripe Payment Link URLs here.
const STRIPE_1K_URL = "https://buy.stripe.com/28EdR936ncEabaggOLds40Z"; // Founding Seat — $1,000
const STRIPE_5K_URL = "https://buy.stripe.com/5kQ14nayP7jQbagaqnds410"; // Pay It Forward — $5,000

const MARK_PHONE_DISPLAY = "(402) 881-9986";
const MARK_PHONE_TEL = "tel:4028819986";

const POSITIONS = [
  "Lead Sponsor — $50,000",
  "Founding Partner — $25,000",
  "Founding Member — $10,000",
  "Name my number",
];

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[hsl(var(--ial-green-soft))] mb-4">
    {children}
  </div>
);

function InauguralPage() {
  usePageAnalytics("inaugural");

  return (
    <div className="ial-page min-h-screen bg-[hsl(var(--ial-bg))] text-[hsl(var(--ial-text))] font-[family-name:var(--font-inter)]">
      {/* HEADER */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-[hsl(var(--ial-bg))]/85 border-b border-[hsl(var(--ial-border))]">
        <div className="container max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <Link to="/intentional-leader" className="flex items-center gap-3">
            <img src={momentumLogoWhite} alt="The Momentum Company" className="h-7 md:h-8 w-auto invert" />
            <span className="hidden sm:inline text-xs uppercase tracking-[0.18em] text-[hsl(var(--ial-text-muted))]">
              Intentional Leader
            </span>
          </Link>
          <Button
            size="sm"
            onClick={() => scrollTo("tiers")}
            className="bg-[hsl(var(--ial-green))] hover:bg-[hsl(var(--ial-green-deep))] text-white font-semibold"
          >
            Claim Your Place
          </Button>
        </div>
      </header>

      {/* SECTION 1 — HERO */}
      <section className="relative overflow-hidden" style={{ background: "var(--ial-gradient-hero)" }}>
        <div className="container max-w-5xl mx-auto px-6 py-24 md:py-32 relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-[hsl(var(--ial-green))]/40 bg-[hsl(var(--ial-green))]/10 text-[hsl(var(--ial-green-soft))] text-xs font-semibold tracking-wider uppercase mb-8">
            The Inaugural Offering
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl font-black leading-[1.05] mb-8 max-w-4xl">
            An invitation to the leaders of agriculture —{" "}
            <span className="text-[hsl(var(--ial-green-soft))]">at the moment it matters most.</span>
          </h1>
          <div className="space-y-4 text-lg md:text-xl text-[hsl(var(--ial-text-muted))] leading-relaxed max-w-2xl mb-10">
            <p>
              Ag is in a hard season. Tariffs. Commodity swings. Input costs up, output prices
              down. Everyone feels it — and most are pulling back, cutting development,
              white-knuckling through.
            </p>
            <p className="text-[hsl(var(--ial-text))] font-semibold">We're doing the opposite.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button
              size="lg"
              onClick={() => scrollTo("tiers")}
              className="bg-[hsl(var(--ial-green))] hover:bg-[hsl(var(--ial-green-deep))] text-white font-semibold h-14 px-8 text-base"
            >
              Claim Your Place
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

      {/* SECTION 2 — CONTRARIAN MOVE */}
      <section className="py-24 border-t border-[hsl(var(--ial-border))] bg-[hsl(var(--ial-surface))]">
        <div className="container max-w-4xl mx-auto px-6">
          <SectionLabel>The Contrarian Move</SectionLabel>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-8 leading-[1.1]">
            When everyone else retreats,{" "}
            <span className="text-[hsl(var(--ial-green-deep))]">intentional leaders invest.</span>
          </h2>
          <div className="space-y-5 text-lg md:text-xl text-[hsl(var(--ial-text-muted))] leading-relaxed">
            <p>
              The leaders who come out the other side of a down market with a strong bench
              aren't the ones who froze. They're the ones who doubled down on their people while
              it was hard. We're opening the entire inaugural cohort of the Intentional Leader
              program wide — and inviting the leaders of this industry to step in together.
            </p>
            <p>
              We're calling them the{" "}
              <span className="text-[hsl(var(--ial-text))] font-semibold">Founding Class</span>:
              the leaders who moved when others stood still.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — THREE LEGS */}
      <section className="py-24 border-t border-[hsl(var(--ial-border))]">
        <div className="container max-w-6xl mx-auto px-6">
          <SectionLabel>The Three Legs</SectionLabel>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-12 max-w-3xl leading-[1.1]">
            Intentional leadership stands on three legs.
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                t: "Deliberate.",
                b: "You meant to do it. So much of what we resent traces back to drift — to what we let happen instead of chose. Intentional leaders choose. The most deliberate choice in this market is to develop your people on purpose.",
              },
              {
                t: "Decisive.",
                b: "Seeing what's needed isn't enough. Intentional leaders move. They don't wait on the sidelines for the market to turn — they act. This is the move.",
              },
              {
                t: "Divine.",
                b: "The way you lead is uniquely yours — carried by no one else. This program doesn't hand you someone else's playbook. It builds around the leader you already are, and helps your people find theirs.",
              },
            ].map((leg) => (
              <Card key={leg.t} className="bg-[hsl(var(--ial-surface))] border-[hsl(var(--ial-border))] p-8">
                <h3 className="font-[family-name:var(--font-playfair)] text-3xl text-[hsl(var(--ial-green-soft))] mb-4">
                  {leg.t}
                </h3>
                <p className="text-[hsl(var(--ial-text-muted))] leading-relaxed">{leg.b}</p>
              </Card>
            ))}
          </div>
          <p className="text-center font-[family-name:var(--font-playfair)] italic text-2xl md:text-3xl text-[hsl(var(--ial-text))]">
            Deliberate. Decisive. Divine.
          </p>
        </div>
      </section>

      {/* SECTION 4 — WHAT IT IS */}
      <section className="py-24 border-t border-[hsl(var(--ial-border))] bg-[hsl(var(--ial-surface))]">
        <div className="container max-w-4xl mx-auto px-6">
          <SectionLabel>What it is</SectionLabel>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-8 leading-[1.1]">
            What the Inaugural Offering actually is.
          </h2>
          <p className="text-lg md:text-xl text-[hsl(var(--ial-text-muted))] leading-relaxed mb-8">
            For this founding cohort, we're setting aside fixed pricing. Bring one leader or
            bring your whole organization. Claim a sponsor position and plant your flag for the
            industry — or name what this is worth to you and your team. Everyone who steps in is
            part of the Founding Class.
          </p>
          <ul className="space-y-3 text-lg">
            {[
              "The invitation closes June 30.",
              "The program begins August 1.",
              "90 days. Unlimited Jericho coaching. 3 live half-day sessions. Friday voice check-ins. Your Day 90 Intentional Leader Report.",
            ].map((x) => (
              <li key={x} className="flex items-start gap-3 text-[hsl(var(--ial-text))]">
                <Check className="w-5 h-5 mt-1 flex-shrink-0 text-[hsl(var(--ial-green))]" strokeWidth={3} />
                <span className="leading-relaxed">{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 5 — HOW IT WORKS */}
      <section className="py-24 border-t border-[hsl(var(--ial-border))]">
        <div className="container max-w-6xl mx-auto px-6">
          <SectionLabel>How it actually works</SectionLabel>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-6 leading-[1.1] max-w-3xl">
            This is not a course you log into and watch.
          </h2>
          <p className="text-lg md:text-xl text-[hsl(var(--ial-text-muted))] leading-relaxed max-w-3xl mb-12">
            It's 90 days inside a coaching system built around <em>your</em> leader, your team,
            and your season — drawn from 225+ podcast interviews with the best operators in
            agriculture, distilled into something your people can actually use on Monday morning.
          </p>

          {/* The 90 days — what actually happens */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {[
              {
                k: "Day 1",
                t: "Your Intentional Leader Profile",
                b: "Each leader sits with Jericho — our AI coach — and builds a personal profile. Goals, friction points, the team they lead, the season they're in. Everything that follows is built around that profile.",
              },
              {
                k: "Every day",
                t: "A personalized brief, built for you",
                b: "Short daily prompts and a personalized podcast feed pulled from the Lead Intentional library. Not generic content — the exact interview, the exact 5-minute Friday, the exact framework that matches what you're working on this week.",
              },
              {
                k: "Every Friday",
                t: "5-Minute Friday voice check-in",
                b: "A guided voice reflection. You talk, Jericho listens, patterns surface. Your manager (and you) get a private weekly read on momentum, blockers, and what you're actually building.",
              },
              {
                k: "Anytime",
                t: "Unlimited coaching on demand",
                b: "Stuck in a hard conversation? Prepping a 1:1? Rewriting a job description? Open Jericho. It already knows your context — your team, your goals, the conversation you had last Tuesday — and coaches from there.",
              },
              {
                k: "3 times in 90 days",
                t: "Live half-day sessions with Mark",
                b: "Three working sessions with the full Founding Class. Not lectures — live problem-solving on the things this cohort is actually running into. You leave with the next move, not notes.",
              },
              {
                k: "Day 90",
                t: "Your Intentional Leader Report",
                b: "A real artifact: where each leader started, what shifted, the specific decisions they got more deliberate and more decisive about, and the plan for the next 90 days. For sponsors, you get the org-level read across every leader you sponsored.",
              },
            ].map((step) => (
              <Card key={step.t} className="bg-[hsl(var(--ial-surface))] border-[hsl(var(--ial-border))] p-8">
                <div className="text-xs font-semibold tracking-[0.18em] uppercase text-[hsl(var(--ial-green-soft))] mb-3">
                  {step.k}
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[hsl(var(--ial-text))] mb-3 leading-tight">
                  {step.t}
                </h3>
                <p className="text-[hsl(var(--ial-text-muted))] leading-relaxed">{step.b}</p>
              </Card>
            ))}
          </div>

          <div className="max-w-3xl mb-16">
            <p className="text-lg md:text-xl text-[hsl(var(--ial-text-muted))] leading-relaxed">
              That's the difference. You're not buying access to a video library. You're buying a
              90-day coaching engine that adapts to every leader you put inside it — and a report
              at the end that proves what moved.
            </p>
          </div>

          <SectionLabel>Two ways to join</SectionLabel>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-12 leading-[1.1]">
            Two ways in.
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <Card className="bg-[hsl(var(--ial-surface))] border-[hsl(var(--ial-border))] p-8">
              <div className="text-sm uppercase tracking-wider text-[hsl(var(--ial-green-soft))] mb-3">
                Just want a seat?
              </div>
              <p className="text-[hsl(var(--ial-text-muted))] leading-relaxed">
                Pick it up instantly below — one leader, or sponsor ten leaders from your client
                organizations.
              </p>
            </Card>
            <Card className="bg-[hsl(var(--ial-surface))] border-[hsl(var(--ial-border))] p-8">
              <div className="text-sm uppercase tracking-wider text-[hsl(var(--ial-green-soft))] mb-3">
                Want to sponsor the cohort?
              </div>
              <p className="text-[hsl(var(--ial-text-muted))] leading-relaxed">
                There are 10 sponsor positions. You can claim one outright at its listed level,
                or name your number — pledge what the position is worth to you. Pledges stay
                sealed until June 30, when the top pledges are awarded the 10 positions.
              </p>
            </Card>
          </div>
          <Card
            className="p-8 border-2 border-[hsl(var(--ial-green))]"
            style={{ background: "var(--ial-gradient-cta)" }}
          >
            <p className="text-white text-lg md:text-xl leading-relaxed">
              <span className="font-bold">Nobody loses.</span> If you pledge and don't land in
              the top 10, you still get full Founding Class access for your team at the amount
              you committed. You're still in. You just don't get the sponsor flag.
            </p>
          </Card>
        </div>
      </section>

      {/* SECTION 6 — TIERS */}
      <section
        id="tiers"
        className="py-24 border-t border-[hsl(var(--ial-border))] bg-[hsl(var(--ial-surface))] scroll-mt-20"
      >
        <div className="container max-w-6xl mx-auto px-6">
          <SectionLabel>Choose your place</SectionLabel>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-12 leading-[1.1]">
            Choose your place in the Founding Class.
          </h2>

          {/* Instant checkout */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <Card className="bg-[hsl(var(--ial-bg))] border-[hsl(var(--ial-border))] p-8 flex flex-col">
              <div className="text-sm uppercase tracking-wider text-[hsl(var(--ial-text-muted))] mb-3">
                Founding Seat
              </div>
              <div className="text-5xl font-black mb-1">$1,000</div>
              <div className="text-xs uppercase tracking-wider text-[hsl(var(--ial-green-soft))] mb-4">
                Unlimited spots available
              </div>
              <p className="text-[hsl(var(--ial-text-muted))] mb-8 flex-1">
                One leader · full 90-day program · Founding Class recognition.
              </p>
              <Button
                asChild
                className="w-full bg-[hsl(var(--ial-green))] hover:bg-[hsl(var(--ial-green-deep))] text-white h-12 font-semibold"
              >
                <a href={STRIPE_1K_URL} target="_blank" rel="noopener noreferrer">
                  Enroll Now
                </a>
              </Button>
            </Card>

            <Card
              className="border-2 border-[hsl(var(--ial-green))] p-8 flex flex-col"
              style={{ background: "var(--ial-gradient-cta)" }}
            >
              <div className="text-sm uppercase tracking-wider text-white/80 mb-3">
                Pay It Forward
              </div>
              <div className="text-5xl font-black text-white mb-4">$5,000</div>
              <p className="text-white/85 mb-8 flex-1">
                Sponsor 10 leaders from your client organizations · featured as a Pay It Forward
                sponsor on the podcast and newsletter.
              </p>
              <Button
                asChild
                className="w-full bg-white hover:bg-[hsl(var(--ial-text))] text-[hsl(var(--ial-green-deep))] h-12 font-semibold"
              >
                <a href={STRIPE_5K_URL} target="_blank" rel="noopener noreferrer">
                  Pay It Forward
                </a>
              </Button>
            </Card>
          </div>

          {/* Sponsor positions header */}
          <div className="text-sm font-semibold uppercase tracking-[0.15em] text-[hsl(var(--ial-text-muted))] mb-6">
            10 Sponsor Positions · claim outright or name your number · invoiced, due on receipt
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                t: "Founding Lead Sponsor",
                price: "$50,000",
                spots: "1 spot",
                feature: true,
                position: "Lead Sponsor — $50,000",
                bullets: [
                  "Presented in partnership with [your company] — elevated logo across the page, emails, podcast, and all Founding Class communications",
                  "4 dedicated podcast spots",
                  "Unlimited seats from your organization",
                  "Organizational insight layer across all your people",
                  "First right of refusal on the next cohort",
                  "You own the industry narrative",
                ],
              },
              {
                t: "Founding Partner",
                price: "$25,000",
                spots: "3 spots",
                feature: false,
                position: "Founding Partner — $25,000",
                bullets: [
                  "Logo on page and email footer",
                  "1 dedicated podcast segment",
                  "Unlimited seats from your organization",
                  "Organizational insight layer · priority onboarding",
                ],
              },
              {
                t: "Founding Member",
                price: "$10,000",
                spots: "6 spots",
                feature: false,
                position: "Founding Member — $10,000",
                bullets: [
                  "Named on the Founding Class wall",
                  "Unlimited seats from your organization",
                  "Organizational / team insight layer",
                ],
              },
            ].map((tier) => (
              <Card
                key={tier.t}
                className={`p-8 flex flex-col bg-[hsl(var(--ial-bg))] ${
                  tier.feature
                    ? "border-2 border-[hsl(var(--ial-green))] shadow-lg"
                    : "border-[hsl(var(--ial-border))]"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm uppercase tracking-wider text-[hsl(var(--ial-green-soft))]">
                    {tier.t}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-[hsl(var(--ial-surface-2))] text-[hsl(var(--ial-text-muted))]">
                    {tier.spots}
                  </span>
                </div>
                <div className="text-4xl font-black mb-6">{tier.price}</div>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-[hsl(var(--ial-text-muted))]">
                      <Check className="w-4 h-4 text-[hsl(var(--ial-green))] mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => {
                    const event = new CustomEvent("inaugural:preselect", { detail: tier.position });
                    window.dispatchEvent(event);
                    scrollTo("claim");
                  }}
                  className="w-full bg-[hsl(var(--ial-green))] hover:bg-[hsl(var(--ial-green-deep))] text-white h-12 font-semibold"
                >
                  Claim or Pledge
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — FOUNDING CLASS LIST */}
      {foundingClass.length > 0 && (
        <section className="py-24 border-t border-[hsl(var(--ial-border))]">
          <div className="container max-w-5xl mx-auto px-6">
            <SectionLabel>The Founding Class</SectionLabel>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-10 leading-[1.1]">
              The Founding Class is forming.
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {foundingClass.map((name) => (
                <div
                  key={name}
                  className="flex items-center gap-3 p-4 rounded border border-[hsl(var(--ial-border))] bg-[hsl(var(--ial-surface))]"
                >
                  <Check className="w-4 h-4 text-[hsl(var(--ial-green))] flex-shrink-0" />
                  <span className="text-[hsl(var(--ial-text))] font-medium">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 8 — FORM */}
      <ClaimForm />

      {/* SECTION 9 — CLOSING */}
      <section className="py-28 border-t border-[hsl(var(--ial-border))]" style={{ background: "var(--ial-gradient-cta)" }}>
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl font-black mb-8 text-white leading-[1.05]">
            Decisive leaders move.
          </h2>
          <p className="text-lg md:text-xl text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed">
            Don't name a number to beat someone else. Name what this is worth to you and your
            people — and trust it. The window closes June 30.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => scrollTo("tiers")}
              className="bg-white hover:bg-[hsl(var(--ial-text))] text-[hsl(var(--ial-green-deep))] h-14 px-8 font-semibold text-base"
            >
              Claim Your Place
            </Button>
            <a href={MARK_PHONE_TEL} className="text-white font-semibold text-lg underline-offset-4 hover:underline">
              {MARK_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function ClaimForm() {
  const submit = useServerFn(submitFoundingClassClaim);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    position: POSITIONS[0],
    claim_type: "claim" as "claim" | "pledge",
    amount_usd: "",
    leaders_count: "",
    note: "",
  });

  // Listen for tier-card pre-select events from Section 6.
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail && POSITIONS.includes(detail)) {
        setForm((f) => ({ ...f, position: detail }));
      }
    };
    window.addEventListener("inaugural:preselect", handler);
    return () => window.removeEventListener("inaugural:preselect", handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submit({
        data: {
          company_name: form.company_name,
          contact_name: form.contact_name,
          email: form.email,
          phone: form.phone,
          position: form.position,
          claim_type: form.claim_type,
          amount_usd: parseInt(form.amount_usd || "0", 10) || 0,
          leaders_count: parseInt(form.leaders_count || "0", 10) || 0,
          note: form.note,
        },
      });
      setDone(true);
      toast.success("You're in.", {
        description: "We'll confirm your Founding Class position before June 30.",
      });
    } catch (err) {
      toast.error("Something went wrong", {
        description: "Please email mark@themomentumcompany.com and we'll handle it directly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="claim" className="py-24 border-t border-[hsl(var(--ial-border))] scroll-mt-20">
      <div className="container max-w-3xl mx-auto px-6">
        <SectionLabel>Claim or pledge</SectionLabel>
        <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-10 leading-[1.1]">
          Name your place in the Founding Class.
        </h2>

        {done ? (
          <Card className="p-10 bg-[hsl(var(--ial-surface))] border-2 border-[hsl(var(--ial-green))] text-center">
            <p className="text-xl md:text-2xl text-[hsl(var(--ial-text))] leading-relaxed mb-6">
              You're in. We'll confirm your Founding Class position before June 30.
            </p>
            <p className="font-[family-name:var(--font-playfair)] italic text-2xl text-[hsl(var(--ial-green-soft))]">
              Deliberate. Decisive. Divine.
            </p>
          </Card>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company_name">Company name</Label>
                <Input id="company_name" required value={form.company_name}
                  onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                  className="bg-[hsl(var(--ial-surface-2))] border-[hsl(var(--ial-border))]" />
              </div>
              <div>
                <Label htmlFor="contact_name">Contact name</Label>
                <Input id="contact_name" required value={form.contact_name}
                  onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
                  className="bg-[hsl(var(--ial-surface-2))] border-[hsl(var(--ial-border))]" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-[hsl(var(--ial-surface-2))] border-[hsl(var(--ial-border))]" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" required maxLength={30} value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="bg-[hsl(var(--ial-surface-2))] border-[hsl(var(--ial-border))]" />
              </div>
            </div>

            <div>
              <Label>Position interested in</Label>
              <Select value={form.position} onValueChange={(v) => setForm({ ...form, position: v })}>
                <SelectTrigger className="bg-[hsl(var(--ial-surface-2))] border-[hsl(var(--ial-border))]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POSITIONS.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 block">Are you claiming outright or pledging?</Label>
              <RadioGroup
                value={form.claim_type}
                onValueChange={(v) => setForm({ ...form, claim_type: v as "claim" | "pledge" })}
                className="grid grid-cols-2 gap-3"
              >
                <label className="flex items-center gap-3 p-3 rounded border border-[hsl(var(--ial-border))] bg-[hsl(var(--ial-surface-2))] cursor-pointer">
                  <RadioGroupItem value="claim" id="ct-claim" />
                  <span className="text-sm">Claim outright</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded border border-[hsl(var(--ial-border))] bg-[hsl(var(--ial-surface-2))] cursor-pointer">
                  <RadioGroupItem value="pledge" id="ct-pledge" />
                  <span className="text-sm">Pledge / name my number</span>
                </label>
              </RadioGroup>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount_usd">Amount (USD)</Label>
                <Input id="amount_usd" type="number" min={0} required value={form.amount_usd}
                  onChange={(e) => setForm({ ...form, amount_usd: e.target.value })}
                  className="bg-[hsl(var(--ial-surface-2))] border-[hsl(var(--ial-border))]" />
              </div>
              <div>
                <Label htmlFor="leaders_count">Leaders you'll bring</Label>
                <Input id="leaders_count" type="number" min={0} value={form.leaders_count}
                  onChange={(e) => setForm({ ...form, leaders_count: e.target.value })}
                  className="bg-[hsl(var(--ial-surface-2))] border-[hsl(var(--ial-border))]" />
              </div>
            </div>

            <div>
              <Label htmlFor="note">Note (optional)</Label>
              <Textarea id="note" rows={3} value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className="bg-[hsl(var(--ial-surface-2))] border-[hsl(var(--ial-border))]" />
            </div>

            <Button type="submit" disabled={submitting}
              className="w-full bg-[hsl(var(--ial-green))] hover:bg-[hsl(var(--ial-green-deep))] text-white font-semibold h-12">
              {submitting ? "Sending..." : "Submit"}
            </Button>
          </form>
        )}

        {/* Repeat instant buttons */}
        <div className="grid sm:grid-cols-2 gap-4 mt-10 pt-10 border-t border-[hsl(var(--ial-border))]">
          <Button
            asChild
            className="bg-[hsl(var(--ial-green))] hover:bg-[hsl(var(--ial-green-deep))] text-white h-12 font-semibold"
          >
            <a href={STRIPE_1K_URL} target="_blank" rel="noopener noreferrer">
              Founding Seat · $1,000
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-2 border-[hsl(var(--ial-green-deep))] bg-transparent text-[hsl(var(--ial-green-deep))] hover:bg-[hsl(var(--ial-green-deep))] hover:text-white h-12 font-semibold"
          >
            <a href={STRIPE_5K_URL} target="_blank" rel="noopener noreferrer">
              Pay It Forward · $5,000
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}