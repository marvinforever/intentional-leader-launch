import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Check,
  Phone,
  X,
  Headphones,
  Play,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useServerFn } from "@tanstack/react-start";
import { submitInvoiceRequest } from "@/utils/invoice.functions";
import momentumLogoWhite from "@/assets/momentum-logo-white.png";
import ialPodcastLogo from "@/assets/intentional-ag-leader-podcast.png";

export const Route = createFileRoute("/intentional-leader")({
  head: () => ({
    meta: [
      { title: "The Intentional Agribusiness Leader · 90-Day Program" },
      {
        name: "description",
        content:
          "A 90-day leadership program for agribusiness leaders. Powered by Jericho AI coach. Built from 216+ podcast episodes. Early bird ends June 1.",
      },
      {
        property: "og:title",
        content: "The Intentional Agribusiness Leader · 90-Day Program",
      },
      {
        property: "og:description",
        content:
          "Built from 216+ podcast episodes with the leaders of ag. 90 days. Powered by Jericho AI coach. Early bird ends June 1.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: IntentionalLeader,
});

// Placeholder URLs — swap once Stripe Payment Links + Calendly are ready
const STRIPE_INDIVIDUAL_URL = "https://buy.stripe.com/REPLACE_INDIVIDUAL";
const STRIPE_COMPANY_URL = "https://buy.stripe.com/REPLACE_COMPANY";
const CALENDLY_URL = "https://calendly.com/markjewell/20min";
const MARK_PHONE = "402-881-986";

// Early bird ends June 1, 2026 11:59 PM Central Time
const DEADLINE = new Date("2026-06-02T05:59:00Z").getTime();

const useCountdown = () => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, DEADLINE - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[hsl(var(--ial-green-soft))] mb-4">
    {children}
  </div>
);

const Problems = () => {
  const items = [
    {
      n: "01",
      headline: "I'm Managing Everything and Leading Nothing",
      body: "Stuck in the referee phase — micromanaging, decision-hoarding, fire-fighting. The harder you work, the less your people grow.",
    },
    {
      n: "02",
      headline: "My Best People Are Walking Out and I Don't Have a Bench",
      body: "A generational exodus is hitting agriculture. The people who built your org are retiring. Nobody's ready. You're succession praying, not succession planning.",
    },
    {
      n: "03",
      headline: "We're Busy, But We're Not Building Anything That Lasts",
      body: "Drowning in operational noise. No clear culture, no defined language, no strategic clarity. Revenue sits untapped because nobody is being intentional about growth.",
    },
  ];
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {items.map((it) => (
        <Card
          key={it.n}
          className="bg-[hsl(var(--ial-surface))] border-[hsl(var(--ial-border))] p-8"
        >
          <div className="text-7xl font-black text-[hsl(var(--ial-border))] leading-none mb-6">
            {it.n}
          </div>
          <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-[hsl(var(--ial-text))] mb-4 leading-tight">
            "{it.headline}"
          </h3>
          <p className="text-[hsl(var(--ial-text-muted))] leading-relaxed mb-6">
            {it.body}
          </p>
          <div className="inline-flex items-center text-xs font-medium text-[hsl(var(--ial-green-soft))] uppercase tracking-wider">
            30+ episodes touch this
          </div>
        </Card>
      ))}
    </div>
  );
};

const Transformation = () => {
  const blocks = [
    {
      problem: "I'm managing everything and leading nothing.",
      before: [
        "Phone buzzing at 9pm with decisions only you can make",
        "Every meeting waits for your answer",
        "Calendar packed wall-to-wall — no white space, no thinking time",
        "You're the referee, the firefighter, and the bottleneck",
      ],
      after: [
        "Your team makes decisions without texting you at 9pm",
        "You stop being the bottleneck in every meeting",
        "Your calendar has white space for the first time in years — and your team runs better without you in the room",
        "You coach instead of referee. You ask instead of tell. You've stopped doing the work your team should be doing.",
      ],
    },
    {
      problem: "My best people are walking out and I don't have a bench.",
      before: [
        "Top performers giving notice with no warning",
        "Succession is a prayer, not a plan",
        "You don't actually know who's ready, who's stuck, who's leaving",
        "Stepping back for a week feels reckless",
      ],
      after: [
        "You know exactly who's ready for more, who's plateaued, and who's a flight risk — and you have a plan for each",
        "Succession isn't prayer anymore. It's a process you're actively running.",
        "Your top people feel SEEN. They stay because they're growing, not because of perks.",
        "There's a bench. For the first time, you can imagine stepping back without the whole thing collapsing.",
      ],
    },
    {
      problem: "We're busy, but we're not building anything that lasts.",
      before: [
        "Culture is a vibe nobody can describe out loud",
        "Strategy is whatever's loudest this week",
        "Revenue inside existing customers sits untapped",
        "Activity is high. Direction is fuzzy.",
      ],
      after: [
        "Your culture is named, not vibed. Your team can repeat it back to you.",
        "Strategic clarity has replaced operational noise. Every person knows what winning looks like this quarter.",
        "Untapped revenue inside your existing customers has surfaced — because you're finally being intentional about growth instead of reactive.",
        "You're building something that will outlast you.",
      ],
    },
  ];
  return (
    <div className="space-y-8">
      {blocks.map((b, i) => (
        <Card
          key={i}
          className="bg-[hsl(var(--ial-surface))] border-[hsl(var(--ial-border))] overflow-hidden"
        >
          <div className="px-8 pt-8">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[hsl(var(--ial-text-muted))] mb-2">
              You said
            </div>
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-[hsl(var(--ial-text))] leading-tight">
              "{b.problem}"
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-[hsl(var(--ial-border))] mt-8">
            <div className="bg-[hsl(var(--ial-surface-2))] p-8 md:p-10">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[hsl(var(--ial-text-muted))] mb-6">
                <span className="w-8 h-px bg-[hsl(var(--ial-text-muted))]" />
                Today
              </div>
              <ul className="space-y-4">
                {b.before.map((line, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-[hsl(var(--ial-text-muted))]"
                  >
                    <X className="w-4 h-4 mt-1 flex-shrink-0 opacity-50" />
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="p-8 md:p-10 relative"
              style={{
                background: "var(--ial-gradient-after, hsl(var(--ial-bg)))",
              }}
            >
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[hsl(var(--ial-green-soft))] mb-6">
                <span className="w-8 h-px bg-[hsl(var(--ial-green))]" />
                After 90 Days
              </div>
              <ul className="space-y-4">
                {b.after.map((line, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-[hsl(var(--ial-text))]"
                  >
                    <Check
                      className="w-4 h-4 mt-1 flex-shrink-0 text-[hsl(var(--ial-green))]"
                      strokeWidth={3}
                    />
                    <span className="leading-relaxed font-medium">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

const Countdown = () => {
  const { days, hours, minutes, seconds } = useCountdown();
  const Box = ({ v, label }: { v: number; label: string }) => (
    <div className="flex flex-col items-center px-4 py-3 bg-[hsl(var(--ial-surface-2))] border border-[hsl(var(--ial-border))] rounded min-w-[72px]">
      <div className="text-3xl font-black text-[hsl(var(--ial-text))] tabular-nums">
        {String(v).padStart(2, "0")}
      </div>
      <div className="text-[10px] uppercase tracking-wider text-[hsl(var(--ial-text-muted))] mt-1">
        {label}
      </div>
    </div>
  );
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      <Box v={days} label="Days" />
      <Box v={hours} label="Hours" />
      <Box v={minutes} label="Min" />
      <Box v={seconds} label="Sec" />
    </div>
  );
};

const InvoiceForm = () => {
  const submit = useServerFn(submitInvoiceRequest);
  const [submitting, setSubmitting] = useState(false);
  const [licenseType, setLicenseType] = useState<"individual" | "company">(
    "company",
  );
  const [form, setForm] = useState({
    company_name: "",
    contact_name: "",
    billing_email: "",
    billing_address: "",
    seat_count: "1",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submit({ data: { ...form, license_type: licenseType } });
      toast.success("Invoice request received", {
        description:
          "We'll send your QuickBooks invoice within one business day.",
      });
      setForm({
        company_name: "",
        contact_name: "",
        billing_email: "",
        billing_address: "",
        seat_count: "1",
        notes: "",
      });
    } catch {
      toast.error("Something went wrong", {
        description:
          "Please email mark@themomentumcompany.com and we'll handle it directly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <RadioGroup
        value={licenseType}
        onValueChange={(v) => setLicenseType(v as "individual" | "company")}
        className="grid grid-cols-2 gap-3"
      >
        <label className="flex items-center gap-3 p-3 rounded border border-[hsl(var(--ial-border))] bg-[hsl(var(--ial-surface-2))] cursor-pointer">
          <RadioGroupItem value="individual" id="lt-ind" />
          <span className="text-sm">Individual · $1,000</span>
        </label>
        <label className="flex items-center gap-3 p-3 rounded border border-[hsl(var(--ial-border))] bg-[hsl(var(--ial-surface-2))] cursor-pointer">
          <RadioGroupItem value="company" id="lt-co" />
          <span className="text-sm">Company · $10,000</span>
        </label>
      </RadioGroup>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="company_name">Company name</Label>
          <Input
            id="company_name"
            required
            value={form.company_name}
            onChange={(e) => setForm({ ...form, company_name: e.target.value })}
            className="bg-[hsl(var(--ial-surface-2))] border-[hsl(var(--ial-border))]"
          />
        </div>
        <div>
          <Label htmlFor="contact_name">Billing contact</Label>
          <Input
            id="contact_name"
            required
            value={form.contact_name}
            onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
            className="bg-[hsl(var(--ial-surface-2))] border-[hsl(var(--ial-border))]"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="billing_email">Billing email</Label>
        <Input
          id="billing_email"
          type="email"
          required
          value={form.billing_email}
          onChange={(e) => setForm({ ...form, billing_email: e.target.value })}
          className="bg-[hsl(var(--ial-surface-2))] border-[hsl(var(--ial-border))]"
        />
      </div>

      <div>
        <Label htmlFor="billing_address">Billing address</Label>
        <Textarea
          id="billing_address"
          required
          rows={2}
          value={form.billing_address}
          onChange={(e) =>
            setForm({ ...form, billing_address: e.target.value })
          }
          className="bg-[hsl(var(--ial-surface-2))] border-[hsl(var(--ial-border))]"
        />
      </div>

      {licenseType === "individual" && (
        <div>
          <Label htmlFor="seat_count">Seat count</Label>
          <Input
            id="seat_count"
            type="number"
            min={1}
            value={form.seat_count}
            onChange={(e) => setForm({ ...form, seat_count: e.target.value })}
            className="bg-[hsl(var(--ial-surface-2))] border-[hsl(var(--ial-border))]"
          />
        </div>
      )}

      <div>
        <Label htmlFor="notes">PO number or notes (optional)</Label>
        <Textarea
          id="notes"
          rows={2}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="bg-[hsl(var(--ial-surface-2))] border-[hsl(var(--ial-border))]"
        />
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-[hsl(var(--ial-green))] hover:bg-[hsl(var(--ial-green-deep))] text-white font-semibold h-12"
      >
        {submitting ? "Sending..." : "Request Invoice"}
      </Button>
    </form>
  );
};

function IntentionalLeader() {
  const faqs = [
    {
      q: "What size company is this for?",
      a: "Any ag-adjacent organization, typically 5–500 employees. From farm operators to co-ops to ag-tech.",
    },
    {
      q: "Is Jericho really AI, or is it just automated email?",
      a: "Jericho is a custom-built AI coach that learns your team and adapts to your gaps. Not a drip sequence, not a chatbot wrapper.",
    },
    {
      q: "What if I'm just one leader, not a whole company?",
      a: "Individual enrollment is $1,000 (early bird). You get the full 90-day Jericho experience and all live group calls.",
    },
    {
      q: "What happens after Day 90?",
      a: "You can continue with Momentum 360 (our flagship leadership system) or stay in the Jericho community at the standalone rate.",
    },
    {
      q: "Payment terms for the company license?",
      a: "Stripe: full payment at enrollment. Invoice path: Net 15 via QuickBooks.",
    },
    {
      q: "Money-back guarantee?",
      a: "30-day satisfaction guarantee. If it's not a fit in the first 30 days, we refund in full.",
    },
    {
      q: "When does the cohort start?",
      a: "Flexible. Start any time — Jericho adapts to your pace. Live group calls run on a published quarterly cadence.",
    },
    {
      q: "How much time does it take?",
      a: "15–20 minutes per day. The Friday voice check-in takes 5 minutes.",
    },
  ];

  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="ial-page min-h-screen bg-[hsl(var(--ial-bg))] text-[hsl(var(--ial-text))] font-[family-name:var(--font-inter)]">
      {/* TOP HEADER */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-[hsl(var(--ial-bg))]/85 border-b border-[hsl(var(--ial-border))]">
        <div className="container max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 md:gap-6">
            <img
              src={momentumLogoWhite}
              alt="The Momentum Company"
              className="h-7 md:h-8 w-auto"
            />
            <div className="hidden sm:block w-px h-6 bg-[hsl(var(--ial-border))]" />
            <div className="hidden sm:flex items-center gap-2">
              <img
                src={ialPodcastLogo}
                alt="Intentional Agribusiness Leader Podcast"
                className="h-9 w-9"
              />
              <div className="leading-tight">
                <div className="text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--ial-text-muted))]">
                  From the
                </div>
                <div className="text-xs font-semibold text-[hsl(var(--ial-text))]">
                  Intentional Agribusiness Leader Podcast
                </div>
              </div>
            </div>
          </div>
          <Button
            asChild
            size="sm"
            className="bg-[hsl(var(--ial-green))] hover:bg-[hsl(var(--ial-green-deep))] text-white font-semibold"
          >
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              Book a Call
            </a>
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--ial-gradient-hero)" }}
      >
        <div className="container max-w-6xl mx-auto px-6 py-24 md:py-32 relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-[hsl(var(--ial-green))]/40 bg-[hsl(var(--ial-green))]/10 text-[hsl(var(--ial-green-soft))] text-xs font-semibold tracking-wider uppercase mb-8">
            Only 10 Company Spots for Early Bird · Closes June 1
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-black leading-[1.05] mb-6 max-w-5xl">
            In 90 days, your team stops needing YOU for every decision —{" "}
            <span className="text-[hsl(var(--ial-green-soft))]">
              and starts building the organization you actually wanted.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[hsl(var(--ial-text-muted))] max-w-2xl leading-relaxed mb-4">
            This is the leadership course{" "}
            <span className="text-[hsl(var(--ial-text))]">
              you, the leaders of ag, curated
            </span>{" "}
            — drawn from 216+ episodes of the Intentional Agribusiness Leader
            podcast and powered by Jericho, the AI coach built specifically
            from those conversations.
          </p>
          <p className="text-base text-[hsl(var(--ial-text-muted))] max-w-2xl leading-relaxed mb-10 italic">
            Co-op GMs. Ag Retail CEO's. Family operators. Ag-tech founders.
            You told us what's keeping you up at night. We intentionally built
            the resource that gets you to the other side of it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button
              asChild
              size="lg"
              className="bg-[hsl(var(--ial-green))] hover:bg-[hsl(var(--ial-green-deep))] text-white font-semibold h-14 px-8 text-base"
            >
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Book a Call
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToPricing}
              className="border-[hsl(var(--ial-green))] text-[hsl(var(--ial-green-soft))] hover:bg-[hsl(var(--ial-green))]/10 hover:text-[hsl(var(--ial-text))] h-14 px-8 text-base"
            >
              See Pricing & Buy Now
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--ial-text-muted))]">
            <Phone className="w-4 h-4" />
            or call Mark directly at{" "}
            <span className="text-[hsl(var(--ial-text))]">{MARK_PHONE}</span> —
            no gatekeepers
          </div>
        </div>
      </section>

      {/* PRESENTED BY */}
      <section className="py-8 bg-[hsl(var(--ial-bg))] border-t border-[hsl(var(--ial-border))]">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[hsl(var(--ial-text-muted))]">
              Presented by
            </div>
            <div className="flex items-center gap-4">
              <img
                src={momentumLogoWhite}
                alt="The Momentum Company"
                className="h-9 w-auto opacity-90"
              />
              <div className="leading-tight">
                <div className="text-sm font-semibold text-[hsl(var(--ial-text))]">
                  The Momentum Company
                </div>
                <div className="text-xs text-[hsl(var(--ial-text-muted))]">
                  Building Intentional Agribusiness Leaders
                </div>
              </div>
            </div>
            <div className="hidden md:block w-px h-10 bg-[hsl(var(--ial-border))]" />
            <div className="flex items-center gap-3">
              <img
                src={ialPodcastLogo}
                alt="Intentional Agribusiness Leader Podcast"
                className="h-12 w-12"
              />
              <div className="leading-tight">
                <div className="text-sm font-semibold text-[hsl(var(--ial-text))]">
                  Intentional Agribusiness Leader Podcast
                </div>
                <div className="text-xs text-[hsl(var(--ial-text-muted))]">
                  216+ episodes · Hosted by Mark Jewell
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CURATED BY YOU */}
      <section className="py-12 border-t border-[hsl(var(--ial-border))] bg-[hsl(var(--ial-surface-2))]">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { stat: "216+", label: "Podcast episodes with ag leaders" },
              { stat: "8 yrs", label: "Of recorded leader conversations" },
              { stat: "3", label: "Patterns every leader keeps naming" },
              { stat: "90", label: "Days to the other side of them" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-black text-[hsl(var(--ial-green-soft))] mb-2">
                  {s.stat}
                </div>
                <div className="text-xs uppercase tracking-wider text-[hsl(var(--ial-text-muted))] leading-relaxed">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="py-24 border-t border-[hsl(var(--ial-border))]">
        <div className="container max-w-6xl mx-auto px-6">
          <SectionLabel>
            The three things every ag leader is wrestling with
          </SectionLabel>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-6 max-w-3xl">
            You already know the pain. Here's what 90 days does about it.
          </h2>
          <p className="text-lg text-[hsl(var(--ial-text-muted))] max-w-3xl leading-relaxed mb-12">
            We didn't invent these. They surfaced — over and over — in 216+
            recorded conversations with co-op GMs, ag retailers, family
            operators, and ag-tech founders. If they sound familiar, that's
            because the people running organizations like yours have been
            saying the same thing for years.
          </p>
          <Problems />
        </div>
      </section>

      {/* TRANSFORMATION */}
      <section className="py-28 border-t border-[hsl(var(--ial-border))] bg-[hsl(var(--ial-surface))]">
        <div className="container max-w-6xl mx-auto px-6">
          <SectionLabel>What 90 Days Changes</SectionLabel>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl font-bold mb-6 max-w-4xl leading-[1.05]">
            The version of your organization waiting on the other side of 90
            days.
          </h2>
          <p className="text-lg text-[hsl(var(--ial-text-muted))] max-w-3xl leading-relaxed mb-16 italic">
            Every "after" line below is built from a real pattern we heard
            repeatedly across the podcast.
          </p>
          <Transformation />
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        className="py-24 border-t border-[hsl(var(--ial-border))] bg-[hsl(var(--ial-surface))]"
      >
        <div className="container max-w-6xl mx-auto px-6">
          <SectionLabel>Pricing · Hard deadline</SectionLabel>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-4">
            Early bird ends June 1 — then prices go up 50%.
          </h2>
          <div className="mb-12">
            <Countdown />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-[hsl(var(--ial-bg))] border-[hsl(var(--ial-border))] p-8 flex flex-col">
              <div className="text-sm uppercase tracking-wider text-[hsl(var(--ial-text-muted))] mb-3">
                Individual Leader
              </div>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-5xl font-black">$1,000</span>
              </div>
              <div className="text-sm text-[hsl(var(--ial-text-muted))] mb-1">
                <span className="line-through">$1,500 after June 1</span>
              </div>
              <div className="text-sm text-[hsl(var(--ial-text-muted))] mb-8">
                one 90-day enrollment
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Full 90-day Jericho experience",
                  "Friday voice check-ins",
                  "All 3 live group calls with Mark",
                  "Your Day 90 Intentional Leader Report",
                ].map((x) => (
                  <li
                    key={x}
                    className="flex items-start gap-3 text-sm text-[hsl(var(--ial-text))]"
                  >
                    <Check className="w-4 h-4 text-[hsl(var(--ial-green))] mt-0.5 flex-shrink-0" />
                    {x}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="w-full bg-[hsl(var(--ial-surface-2))] hover:bg-[hsl(var(--ial-green))] text-[hsl(var(--ial-text))] hover:text-white border border-[hsl(var(--ial-border))] hover:border-[hsl(var(--ial-green))] h-12 font-semibold"
              >
                <a
                  href={STRIPE_INDIVIDUAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Enroll Now · $1,000
                </a>
              </Button>
            </Card>

            <Card
              className="border-2 border-[hsl(var(--ial-green))] p-8 flex flex-col relative"
              style={{ background: "var(--ial-gradient-cta)" }}
            >
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-[hsl(var(--ial-green))] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">
                Best Value
              </div>
              <div className="text-sm uppercase tracking-wider text-white/80 mb-3">
                Company License
              </div>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-5xl font-black text-white">$10,000</span>
              </div>
              <div className="text-sm text-white/70 mb-1">
                <span className="line-through">$15,000 after June 1</span>
              </div>
              <div className="text-sm text-white/70 mb-8">
                unlimited seats for your team
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Everything in Individual × unlimited team members",
                  "Aggregate organizational insights across your team",
                  "Custom onboarding for your company",
                  "BONUS (first 10 only): One Thriving Leader event ticket",
                ].map((x) => (
                  <li
                    key={x}
                    className="flex items-start gap-3 text-sm text-white"
                  >
                    <Check className="w-4 h-4 text-[hsl(var(--ial-green-soft))] mt-0.5 flex-shrink-0" />
                    {x}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="w-full bg-white hover:bg-[hsl(var(--ial-text))] text-[hsl(var(--ial-green-deep))] h-12 font-semibold"
              >
                <a
                  href={STRIPE_COMPANY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Claim Your Spot · $10,000
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CHOOSE YOUR PATH (with InvoiceForm) */}
      <section className="py-24 border-t border-[hsl(var(--ial-border))] bg-[hsl(var(--ial-surface))]">
        <div className="container max-w-6xl mx-auto px-6">
          <SectionLabel>Choose Your Path</SectionLabel>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-12">
            Two ways to move forward — pick what works.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-[hsl(var(--ial-bg))] border-[hsl(var(--ial-border))] p-8">
              <div className="text-sm uppercase tracking-wider text-[hsl(var(--ial-green-soft))] mb-3">
                Path A · Talk First
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold mb-4">
                Book a Call
              </h3>
              <p className="text-[hsl(var(--ial-text-muted))] leading-relaxed mb-6">
                Want to talk it through first? Book a 20-minute call with Mark.
                We'll confirm fit and answer any questions before you commit.
                No pressure, no pitch.
              </p>
              <Button
                asChild
                className="w-full bg-[hsl(var(--ial-green))] hover:bg-[hsl(var(--ial-green-deep))] text-white h-12 font-semibold"
              >
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book 20 Minutes →
                </a>
              </Button>
            </Card>

            <Card className="bg-[hsl(var(--ial-bg))] border-[hsl(var(--ial-border))] p-8">
              <div className="text-sm uppercase tracking-wider text-[hsl(var(--ial-green-soft))] mb-3">
                Path B · Buy Direct
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold mb-4">
                Request an Invoice
              </h3>
              <p className="text-[hsl(var(--ial-text-muted))] leading-relaxed mb-2">
                Already sold? Pay by card via Stripe above, or request a
                QuickBooks invoice below (Net 15 for company licenses).
              </p>
              <InvoiceForm />
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 border-t border-[hsl(var(--ial-border))]">
        <div className="container max-w-3xl mx-auto px-6">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-10">
            Questions, answered.
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-[hsl(var(--ial-border))] rounded-lg bg-[hsl(var(--ial-surface))] px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-[hsl(var(--ial-text))] hover:no-underline">
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

      {/* FINAL CTA */}
      <section
        className="py-24 border-t border-[hsl(var(--ial-border))]"
        style={{ background: "var(--ial-gradient-cta)" }}
      >
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl font-black mb-6 text-white leading-[1.05]">
            90 days from now, you can be a different leader running a different
            organization — or exactly where you are today, one quarter older.
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Early bird pricing closes June 1. After that, company licenses go
            to $15,000 and individuals to $1,500.
          </p>
          <div className="mb-10">
            <Countdown />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white hover:bg-[hsl(var(--ial-text))] text-[hsl(var(--ial-green-deep))] h-14 px-8 font-semibold text-base"
            >
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Book a Call
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToPricing}
              className="border-white text-white hover:bg-white/10 hover:text-white h-14 px-8 font-semibold text-base"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-14 border-t border-[hsl(var(--ial-border))] bg-[hsl(var(--ial-bg))]">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10 mb-10 pb-10 border-b border-[hsl(var(--ial-border))]">
            <div>
              <img
                src={momentumLogoWhite}
                alt="The Momentum Company"
                className="h-10 w-auto mb-4"
              />
              <p className="text-sm text-[hsl(var(--ial-text-muted))] leading-relaxed">
                The Momentum Company helps agribusiness leaders build
                organizations that thrive without burning them out. Founded by
                Mark & Christine Jewell.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={ialPodcastLogo}
                  alt="Intentional Agribusiness Leader Podcast"
                  className="h-11 w-11"
                />
                <div className="font-semibold text-[hsl(var(--ial-text))] text-sm leading-tight">
                  Intentional Agribusiness
                  <br />
                  Leader Podcast
                </div>
              </div>
              <p className="text-sm text-[hsl(var(--ial-text-muted))] leading-relaxed">
                216+ episodes of real conversations with the leaders building
                the future of agriculture. New episodes weekly.
              </p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--ial-text-muted))] mb-4">
                Get in touch
              </div>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="mailto:mark@themomentumcompany.com"
                    className="text-[hsl(var(--ial-text))] hover:text-[hsl(var(--ial-green-soft))]"
                  >
                    mark@themomentumcompany.com
                  </a>
                </li>
                <li>
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[hsl(var(--ial-text))] hover:text-[hsl(var(--ial-green-soft))]"
                  >
                    Book a 20-minute call
                  </a>
                </li>
                <li className="text-[hsl(var(--ial-text-muted))]">
                  {MARK_PHONE}
                </li>
              </ul>
            </div>
          </div>
          <div className="text-sm text-[hsl(var(--ial-text-muted))]">
            © 2026 Gravitas Enterprises LLC · The Momentum Company ·{" "}
            <Headphones className="inline w-3 h-3 mx-1" />
            <Play className="inline w-3 h-3 mx-1" />
            <ArrowUpRight className="inline w-3 h-3 mx-1" />
          </div>
        </div>
      </footer>
    </div>
  );
}