import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Check, Sprout, Mail, Sunrise, Headphones, LineChart, Bot, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/sponsors")({
  head: () => ({
    meta: [
      { title: "Become a Lead Intentional Sponsor" },
      {
        name: "description",
        content:
          "Invest in the leaders who feed the world. Sponsor the Lead Intentional course and put intentional leadership development inside agricultural companies across the country.",
      },
      { property: "og:title", content: "Become a Lead Intentional Sponsor" },
      {
        property: "og:description",
        content:
          "Sponsor the Lead Intentional course. Four investment levels. $100,000 goal. Built for agricultural companies who lead intentionally.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: SponsorsPage,
});

type Tier = {
  id: string;
  name: string;
  price: string;
  amount: number;
  availability: string;
  exclusive?: boolean;
  highlight?: boolean;
  blurb: string;
  includes: string[];
};

const TIERS: Tier[] = [
  {
    id: "title",
    name: "Title Sponsor",
    price: "$50,000",
    amount: 50000,
    availability: "1 available",
    exclusive: true,
    highlight: true,
    blurb: "The only one. Your name on the course.",
    includes: [
      'Exclusive course naming ("Presented by [Your Company]")',
      "Unlimited employee seats for 12 months",
      "2 dedicated IAL podcast episodes",
      "Speaking slot at live events",
      "12 monthly newsletter features",
      "4 strategy calls with Mark Jewell",
      "First right of refusal in Year 2",
    ],
  },
  {
    id: "cornerstone",
    name: "Cornerstone Sponsor",
    price: "$25,000",
    amount: 25000,
    availability: "3 available",
    blurb: "A foundational partner in the launch.",
    includes: [
      "25 employee seats",
      "Logo on platform + all marketing",
      "1 dedicated podcast episode",
      "6 newsletter mentions",
      "2 strategy calls with Mark Jewell",
      "Co-branded content asset",
    ],
  },
  {
    id: "field",
    name: "Field Partner",
    price: "$10,000",
    amount: 10000,
    availability: "5 available",
    blurb: "Visible support across the season.",
    includes: [
      "10 employee seats",
      "Logo on sponsor recognition page",
      "4 newsletter mentions",
      "Social recognition at launch and completion",
      "Sponsor spotlight email to course community",
    ],
  },
  {
    id: "grower",
    name: "Grower Sponsor",
    price: "$5,000",
    amount: 5000,
    availability: "Open availability",
    blurb: "Get your team in the room.",
    includes: [
      "5 employee seats",
      "Logo on sponsor page",
      "2 newsletter mentions",
      "Social welcome post",
    ],
  },
];

const GOAL = 100000;
const RAISED = 0;

function SponsorsPage() {
  const [open, setOpen] = useState(false);
  const [selectedTierId, setSelectedTierId] = useState<string>("title");
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
  });

  const pct = useMemo(() => Math.min(100, (RAISED / GOAL) * 100), []);

  function openForTier(id: string) {
    setSelectedTierId(id);
    setOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.company) {
      toast.error("Please fill in name, company, and email.");
      return;
    }
    const tier = TIERS.find((t) => t.id === selectedTierId);
    const subject = encodeURIComponent(
      `Sponsor inquiry — ${tier?.name ?? "Lead Intentional"}`,
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\nInterested tier: ${tier?.name} (${tier?.price})\n`,
    );
    window.location.href = `mailto:mark@themomentumcompany.com?subject=${subject}&body=${body}`;
    toast.success("Opening your email to send the request to Mark.");
    setOpen(false);
    setForm({ name: "", company: "", email: "", phone: "" });
  }

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.02_85)] text-[oklch(0.22_0.04_140)] font-inter">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[oklch(0.30_0.06_145)] to-[oklch(0.22_0.05_145)] text-[oklch(0.97_0.02_85)]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,oklch(0.85_0.15_85)_0%,transparent_45%)]" />
        <div className="relative mx-auto max-w-5xl px-6 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.85_0.15_85)]/30 bg-[oklch(0.85_0.15_85)]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[oklch(0.85_0.15_85)]">
            <Sprout className="size-3.5" /> Sponsorship Opportunity
          </div>
          <h1 className="mt-6 font-playfair text-4xl sm:text-6xl font-bold leading-tight">
            The People Who Feed the World Deserve Better Leaders
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[oklch(0.92_0.02_85)]/85 max-w-2xl mx-auto leading-relaxed">
            The retail channel runs on relationships, trust, and execution. When
            leadership breaks down — at the co-op, the input dealer, the retail
            branch — everybody in the supply chain feels it. Lead Intentional is
            built to fix that. Your sponsorship puts real leadership development
            inside the companies your business depends on.
          </p>

          {/* Progress */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="flex items-baseline justify-between text-sm mb-3">
              <span className="font-medium text-[oklch(0.85_0.15_85)]">
                ${RAISED.toLocaleString()} raised
              </span>
              <span className="text-[oklch(0.92_0.02_85)]/70">
                Goal: ${GOAL.toLocaleString()}
              </span>
            </div>
            <Progress
              value={pct}
              className="h-3 bg-[oklch(0.97_0.02_85)]/15 [&>div]:bg-[oklch(0.85_0.15_85)]"
            />
            <p className="mt-3 text-xs text-[oklch(0.92_0.02_85)]/60">
              {pct.toFixed(0)}% funded
            </p>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
        <div className="text-center mb-12">
          <div className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[oklch(0.55_0.10_75)]">
            Why Sponsor
          </div>
          <h2 className="mt-4 font-playfair text-3xl sm:text-5xl font-bold text-[oklch(0.25_0.05_145)] leading-tight">
            Why This. Why Now.
          </h2>
        </div>

        <div className="space-y-6 text-[oklch(0.28_0.03_145)] text-lg leading-relaxed">
          <p>
            Every company in the agricultural supply chain has the same open
            secret: the retail channel is undertrained, overworked, and running
            on instinct instead of intentional leadership. Not because the
            people are bad — because no one has built a program that actually
            fits their life.
          </p>
          <p className="font-playfair text-2xl sm:text-3xl font-bold text-[oklch(0.30_0.06_145)]">
            Lead Intentional does.
          </p>
          <p>
            This isn't a two-day workshop that fades by Friday. It's a
            continuous, Jericho-powered leadership experience built for people
            who are moving fast and don't have time to slow down. Minimally
            invasive. Highly effective.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[oklch(0.25_0.05_145)] mb-6">
            Here's what your sponsored employees get:
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Sunrise,
                title: "Daily leadership briefs",
                body: "Delivered every morning — personalized, practical, 3 minutes.",
              },
              {
                icon: Headphones,
                title: "Personalized podcast feed",
                body: "Curated to their role, their gaps, and their goals.",
              },
              {
                icon: LineChart,
                title: "Performance management tools",
                body: "Track progress without adding bureaucracy.",
              },
              {
                icon: Bot,
                title: "Jericho AI coaching",
                body: "A $38K/year enterprise platform, in their pocket.",
              },
              {
                icon: Users,
                title: "A cohort of industry peers",
                body: "Doing the same work at the same time, across the channel.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex gap-4 p-5 rounded-xl border border-[oklch(0.88_0.02_140)] bg-white"
              >
                <div className="shrink-0 size-10 rounded-lg bg-[oklch(0.95_0.04_85)] flex items-center justify-center">
                  <Icon className="size-5 text-[oklch(0.50_0.15_75)]" />
                </div>
                <div>
                  <div className="font-semibold text-[oklch(0.25_0.05_145)]">
                    {title}
                  </div>
                  <div className="mt-1 text-sm text-[oklch(0.40_0.03_145)] leading-relaxed">
                    {body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 space-y-6 text-[oklch(0.28_0.03_145)] text-lg leading-relaxed">
          <p>
            You're not buying them a course. You're putting Jericho in their
            pocket and a community around their shoulders. The results show up
            in how they lead their team on Monday morning.
          </p>
          <p className="border-l-4 border-[oklch(0.65_0.15_75)] pl-5 italic text-[oklch(0.30_0.05_145)]">
            As a sponsor, you're not just developing your own people — you're
            building the leadership culture of the channel you sell into.
            That's a competitive moat most companies have never thought about.
          </p>
        </div>
      </section>

      {/* TIERS */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[oklch(0.25_0.05_145)]">
            Choose your level of impact
          </h2>
          <p className="mt-4 text-[oklch(0.40_0.03_145)] max-w-xl mx-auto">
            Four ways to put your company behind the next generation of
            intentional agricultural leaders.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {TIERS.map((tier) => (
            <Card
              key={tier.id}
              className={`relative flex flex-col p-8 border-2 transition-all hover:shadow-xl ${
                tier.highlight
                  ? "border-[oklch(0.65_0.15_75)] bg-gradient-to-br from-[oklch(0.99_0.01_85)] to-[oklch(0.95_0.04_85)] shadow-lg"
                  : "border-[oklch(0.88_0.02_140)] bg-white"
              }`}
            >
              {tier.exclusive && (
                <span className="absolute -top-3 left-8 rounded-full bg-[oklch(0.55_0.15_75)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                  Exclusive
                </span>
              )}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-playfair text-2xl font-bold text-[oklch(0.25_0.05_145)]">
                    {tier.name}
                  </h3>
                  <p className="mt-1 text-sm text-[oklch(0.45_0.03_145)]">
                    {tier.blurb}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-playfair text-3xl font-bold text-[oklch(0.30_0.06_145)]">
                    {tier.price}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-[oklch(0.55_0.10_75)] font-semibold">
                    {tier.availability}
                  </div>
                </div>
              </div>

              <ul className="mt-6 space-y-3 flex-1">
                {tier.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <Check className="size-4 mt-0.5 shrink-0 text-[oklch(0.55_0.12_145)]" />
                    <span className="text-[oklch(0.30_0.03_145)] leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => openForTier(tier.id)}
                className={`mt-8 h-12 text-base font-semibold ${
                  tier.highlight
                    ? "bg-[oklch(0.55_0.15_75)] hover:bg-[oklch(0.50_0.15_75)] text-white"
                    : "bg-[oklch(0.30_0.06_145)] hover:bg-[oklch(0.25_0.06_145)] text-white"
                }`}
              >
                Claim This Tier
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* JERICHO CALLOUT */}
      <section className="bg-gradient-to-br from-[oklch(0.25_0.05_145)] via-[oklch(0.22_0.05_145)] to-[oklch(0.20_0.06_145)] text-[oklch(0.97_0.02_85)]">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.85_0.15_85)]/30 bg-[oklch(0.85_0.15_85)]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[oklch(0.85_0.15_85)]">
            <Bot className="size-3.5" /> The Engine
          </div>
          <h2 className="mt-6 font-playfair text-3xl sm:text-5xl font-bold leading-tight">
            Powered by Jericho
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-[oklch(0.92_0.02_85)]/85 leading-relaxed">
            Every Lead Intentional participant gets access to Jericho — The
            Momentum Company's AI coaching platform. Daily briefs. Personalized
            podcasts. Performance tracking. Coaching on demand. This is what
            makes Lead Intentional different from every other program in the
            channel: the learning doesn't stop when the module ends.
          </p>
          <a
            href="https://www.themomentumcompany.com"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 font-semibold text-[oklch(0.85_0.15_85)] hover:text-[oklch(0.90_0.15_85)] underline underline-offset-4"
          >
            Learn more about Jericho <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[oklch(0.88_0.02_140)] bg-white">
        <div className="mx-auto max-w-4xl px-6 py-12 text-center">
          <p className="text-[oklch(0.35_0.04_145)]">
            Questions? Reach out to Mark Jewell directly at{" "}
            <a
              href="mailto:mark@themomentumcompany.com"
              className="inline-flex items-center gap-1.5 font-semibold text-[oklch(0.40_0.10_145)] hover:text-[oklch(0.30_0.10_145)] underline underline-offset-4"
            >
              <Mail className="size-4" />
              mark@themomentumcompany.com
            </a>
          </p>
        </div>
      </footer>

      {/* DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-playfair text-2xl">
              Sponsor inquiry
            </DialogTitle>
            <DialogDescription>
              Mark will personally follow up within 1 business day.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="s-name">Name</Label>
              <Input
                id="s-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-company">Company</Label>
              <Input
                id="s-company"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                required
                maxLength={150}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="s-email">Email</Label>
                <Input
                  id="s-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  maxLength={255}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="s-phone">Phone</Label>
                <Input
                  id="s-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  maxLength={30}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-tier">Tier of interest</Label>
              <Select
                value={selectedTierId}
                onValueChange={setSelectedTierId}
              >
                <SelectTrigger id="s-tier">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TIERS.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name} — {t.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              className="w-full h-11 bg-[oklch(0.30_0.06_145)] hover:bg-[oklch(0.25_0.06_145)] text-white font-semibold"
            >
              Send inquiry
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}