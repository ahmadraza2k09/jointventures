import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  CircleAlert,
  Menu,
  Scale,
  Swords,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import cargoShip from "@/assets/cargo-ship.jpg";
import chessRival from "@/assets/chess-rival.jpg";
import hourglass from "@/assets/hourglass.jpg";
import legacyPhone from "@/assets/legacy-phone.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Hidden Costs of Joint Ventures" },
      {
        name: "description",
        content:
          "Why shared ownership can create shared problems — a visual guide to the hidden costs of joint ventures.",
      },
      { property: "og:title", content: "The Hidden Costs of Joint Ventures" },
      {
        property: "og:description",
        content: "A visual guide to the risks, trade-offs, and hidden costs of shared control.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const chapters = [
  ["01", "Objectives"],
  ["02", "Strategy"],
  ["03", "Speed"],
  ["04", "Knowledge"],
  ["05", "Culture"],
  ["06", "Exit"],
] as const;

function BrandMark() {
  return (
    <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
      <span className="grid h-8 w-8 grid-cols-2 overflow-hidden rounded-sm border border-navy/10">
        <span className="bg-navy" />
        <span className="bg-blue" />
        <span className="col-span-2 bg-paper" />
      </span>
      <span className="hidden text-xs font-black uppercase text-navy sm:block">Shared Control</span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-md">
      <div className="mx-auto grid h-16 max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center px-5 lg:px-10">
        <BrandMark />
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {chapters.map(([number, title]) => (
            <a key={number} href={`#chapter-${number}`} className="text-[11px] font-extrabold uppercase text-muted-foreground transition-colors hover:text-blue">
              <span className="mr-1 text-blue">{number}</span>{title}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center text-navy lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <nav className="grid grid-cols-2 gap-px border-t border-line bg-line p-px lg:hidden" aria-label="Mobile navigation">
          {chapters.map(([number, title]) => (
            <a key={number} href={`#chapter-${number}`} onClick={() => setOpen(false)} className="bg-paper px-5 py-4 text-xs font-black uppercase text-navy">
              <span className="mr-2 text-blue">{number}</span>{title}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function SectionTitle({ number, children, accent }: { number?: string; children: React.ReactNode; accent?: React.ReactNode }) {
  return (
    <h2 className="max-w-6xl text-4xl font-black uppercase leading-[0.95] text-navy sm:text-6xl lg:text-7xl">
      {number && <span className="text-blue">{number} — </span>}
      {children} {accent && <span className="text-blue">{accent}</span>}
    </h2>
  );
}

function Arrow() {
  return <ArrowRight className="mx-auto shrink-0 text-blue max-md:rotate-90" size={34} strokeWidth={2.2} aria-hidden="true" />;
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-[92svh] scroll-mt-16 flex-col justify-center overflow-hidden px-5 pb-12 pt-24 lg:px-10">
      <div className="mx-auto w-full max-w-[1360px]">
        <p className="mb-5 flex items-center gap-3 text-xs font-extrabold uppercase text-blue before:h-px before:w-10 before:bg-blue">Business strategy field guide</p>
        <h1 className="max-w-7xl text-5xl font-black uppercase leading-[0.9] text-navy sm:text-7xl lg:text-[7.8rem]">
          The hidden costs
          <span className="block text-blue">of joint ventures</span>
        </h1>
        <p className="mt-6 text-xl font-bold text-navy sm:text-2xl">Why shared ownership can create shared problems</p>

        <div className="mt-12 grid items-center gap-4 md:grid-cols-[1fr_auto_1.05fr_auto_1fr] lg:mt-16">
          <div className="min-h-48 bg-navy p-7 text-primary-foreground shadow-panel lg:p-9">
            <p className="text-sm font-black uppercase text-primary-foreground/60">Company A</p>
            <div className="my-5 h-px bg-primary-foreground/35" />
            <p className="text-lg font-bold">Independent goals.<br />Independent decisions.</p>
          </div>
          <Arrow />
          <div className="grid aspect-square max-h-64 place-items-center justify-self-center rounded-full bg-navy p-7 text-center text-primary-foreground shadow-panel">
            <div>
              <p className="text-2xl font-black uppercase lg:text-3xl">Shared<br />business</p>
              <div className="mx-auto my-4 h-px w-24 bg-primary-foreground/35" />
              <p className="font-medium">One venture.<br />Many trade-offs.</p>
            </div>
          </div>
          <Arrow />
          <div className="min-h-48 bg-blue p-7 text-primary-foreground shadow-panel lg:p-9">
            <p className="text-sm font-black uppercase text-primary-foreground/70">Company B</p>
            <div className="my-5 h-px bg-primary-foreground/40" />
            <p className="text-lg font-bold">Independent goals.<br />Independent decisions.</p>
          </div>
        </div>
      </div>
      <a href="#premise" aria-label="Read the argument" className="absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce text-blue"><ChevronDown size={30} /></a>
    </section>
  );
}

function Premise() {
  return (
    <section id="premise" className="scroll-mt-16 border-y border-line bg-mist px-5 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1360px]">
        <SectionTitle>Resources can combine.<br /><span className="text-blue">Interests may not.</span></SectionTitle>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <div className="grid items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]">
              <div className="space-y-3">
                <div className="bg-navy p-6 text-primary-foreground"><b className="uppercase">Company A</b><div className="mt-3 border-t border-primary-foreground/30 pt-3">Resources</div></div>
                <div className="bg-blue p-6 text-primary-foreground"><b className="uppercase">Company B</b><div className="mt-3 border-t border-primary-foreground/30 pt-3">Resources</div></div>
              </div>
              <Arrow />
              <div className="grid min-h-52 place-items-center bg-ink text-center text-4xl font-black uppercase text-primary-foreground">Shared<br />JV</div>
            </div>
            <p className="mt-7 max-w-2xl text-xl font-medium leading-relaxed text-navy">A joint venture brings resources together, but each partner stays independent with its own goals and strategies.</p>
          </div>
          <div className="bg-panel p-7 lg:p-10">
            {[["Resources", true], ["Risk", true], ["Profit", true], ["Control", false]].map(([item, good]) => (
              <div key={String(item)} className="grid grid-cols-[1fr_auto] items-center border-b border-line py-4 last:border-0">
                <span className={`text-2xl font-black ${good ? "text-navy" : "text-blue"}`}>{item}</span>
                {good ? <Check className="text-blue" size={34} /> : <CircleAlert className="text-blue" size={34} />}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 border-l-4 border-blue bg-paper px-6 py-5 text-2xl font-black text-navy shadow-soft sm:text-3xl"><span className="text-blue">Remember:</span> Shared business ≠ shared goals</div>
      </div>
    </section>
  );
}

function Objectives() {
  return (
    <section id="chapter-01" className="scroll-mt-16 px-5 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1360px]">
        <SectionTitle number="01">Conflicting objectives</SectionTitle>
        <p className="mt-4 text-2xl font-black text-navy">Two captains. One ship.</p>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.45fr_.55fr]">
          <div>
            <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
              <div className="bg-navy px-5 py-8 text-center text-xl font-black text-primary-foreground">Partner A<br /><span className="font-medium">Expand aggressively</span></div>
              <Arrow />
              <div className="bg-ink px-5 py-10 text-center text-xl font-black uppercase text-primary-foreground">Control</div>
              <Arrow />
              <div className="bg-blue px-5 py-8 text-center text-xl font-black text-primary-foreground">Partner B<br /><span className="font-medium">Protect short-term profit</span></div>
            </div>
            <div className="mx-auto mt-5 max-w-lg border-t-2 border-navy bg-panel px-8 py-7 text-center text-4xl font-black uppercase text-blue">Deadlock</div>
            <div className="mt-10 grid gap-6 border-t border-line pt-7 sm:grid-cols-2">
              <p className="font-bold leading-relaxed text-navy"><span className="text-blue">TNK-BP | 2003–2013</span><br />50:50 ownership. AAR challenged BP’s alliance; Rosneft acquired AAR’s stake and BP sold out the same day.</p>
              <p className="border-l-2 border-blue pl-6 text-xl font-black text-navy">50:50 ownership can mean neither side gets the final say.</p>
            </div>
          </div>
          <img src={cargoShip} alt="Container ship heading forward at sea" width={1024} height={1280} loading="lazy" className="h-full max-h-[620px] w-full object-cover shadow-panel" />
        </div>
      </div>
    </section>
  );
}

function Strategy() {
  const events = [["2001", "Sony Ericsson formed"], ["Purpose", "Market expansion + combined capabilities"], ["2011", "Sony buys Ericsson’s 50%", "€1.05 billion"]];
  return (
    <section id="chapter-02" className="scroll-mt-16 bg-mist px-5 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-[1360px] gap-10 lg:grid-cols-[1.3fr_.7fr]">
        <div>
          <SectionTitle number="02">Strategic <span className="text-blue">misalignment</span></SectionTitle>
          <p className="mt-6 text-xl font-bold text-navy">A partnership can outlive its logic.</p>
          <div className="mt-10 grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {events.map((event, index) => (
              <div className="contents" key={event[0]}>
                <div className="border border-line bg-paper shadow-soft">
                  <div className={`${index === 1 ? "bg-blue" : "bg-navy"} px-5 py-3 text-center font-black text-primary-foreground`}>{event[0]}</div>
                  <div className="grid min-h-36 place-items-center p-5 text-center font-bold text-navy"><span>{event[1]}{event[2] && <strong className="mt-3 block uppercase text-blue">{event[2]}</strong>}</span></div>
                </div>
                {index < events.length - 1 && <Arrow />}
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-lg leading-relaxed text-navy">Original reasons for cooperation can change as strategies and markets evolve.</p>
          <p className="mt-3 text-xl font-black text-navy">What makes sense <span className="text-blue">today</span> may not make sense <span className="text-blue">tomorrow.</span></p>
        </div>
        <img src={legacyPhone} alt="Early generation mobile phone" width={1024} height={1280} loading="lazy" className="h-full max-h-[660px] w-full object-cover shadow-panel" />
      </div>
    </section>
  );
}

function ProcessRow({ title, steps, blue = false }: { title: string; steps: string[]; blue?: boolean }) {
  return (
    <div className="grid items-center gap-2 lg:grid-cols-[150px_1fr]">
      <div className={`${blue ? "bg-blue" : "bg-navy"} px-4 py-5 text-center text-sm font-black uppercase text-primary-foreground`}>{title}</div>
      <div className="flex min-w-0 flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        {steps.map((step, index) => <div className="contents" key={step}><span className="grid min-h-16 flex-1 place-items-center border border-line bg-paper px-3 text-center text-sm font-bold text-navy">{step}</span>{index < steps.length - 1 && <ArrowRight className="hidden shrink-0 text-blue sm:block" size={20} />}</div>)}
      </div>
    </div>
  );
}

function Speed() {
  return (
    <section id="chapter-03" className="scroll-mt-16 px-5 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-[1360px] gap-10 lg:grid-cols-[1.45fr_.55fr]">
        <div>
          <SectionTitle number="03">More owners. <span className="text-blue">Less speed.</span></SectionTitle>
          <div className="mt-10 space-y-4">
            <ProcessRow title="Independent company" steps={["Problem", "Decision", "Action"]} />
            <ProcessRow title="Joint venture" steps={["Problem", "Partner discussion", "Negotiation", "Approval", "Action"]} blue />
          </div>
          <div className="mt-12 border-t border-blue pt-7">
            <h3 className="text-4xl font-black uppercase text-blue">Delay is not neutral.</h3>
            <p className="mt-3 max-w-2xl text-xl font-bold leading-relaxed text-navy">A 3-month market opportunity can vanish with prolonged JV decision-making.</p>
            <p className="mt-6 text-xl font-black text-navy">More decision gates → <span className="text-blue">slower action</span></p>
          </div>
        </div>
        <img src={hourglass} alt="Hourglass with blue sand in a city office" width={1024} height={1280} loading="lazy" className="h-full max-h-[680px] w-full object-cover shadow-panel" />
      </div>
    </section>
  );
}

function Knowledge() {
  const knowledge = ["Technology", "Processes", "Customers", "Suppliers", "Market intelligence", "IP"];
  return (
    <section id="chapter-04" className="scroll-mt-16 bg-mist px-5 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1360px]">
        <SectionTitle number="04">Today’s partner can<br />become <span className="text-blue">tomorrow’s rival</span></SectionTitle>
        <div className="mt-12 grid items-center gap-5 lg:grid-cols-[.75fr_auto_1.1fr_auto_.75fr]">
          <div className="grid min-h-48 place-items-center bg-navy p-7 text-center text-2xl font-black uppercase text-primary-foreground">Partner</div>
          <Arrow />
          <div className="bg-panel p-7">
            <p className="mb-3 font-black uppercase text-blue">Knowledge transfer</p>
            {knowledge.map((item) => <div key={item} className="border-b border-line py-2.5 font-bold text-navy last:border-0">{item}</div>)}
          </div>
          <Arrow />
          <div className="grid min-h-48 place-items-center bg-blue p-7 text-center text-2xl font-black uppercase text-primary-foreground">Potential<br />competitor</div>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <div>
            <p className="max-w-3xl text-xl font-bold leading-relaxed text-navy">Knowledge shared in a joint venture strengthens cooperation today, but can empower competition if the partnership ends.</p>
            <p className="mt-7 border-t border-blue pt-6 text-2xl font-black uppercase text-navy">Cooperation can create <span className="text-blue">competitive knowledge.</span></p>
          </div>
          <img src={chessRival} alt="Black chess king standing beside a fallen white king" width={1536} height={1024} loading="lazy" className="h-64 w-full object-cover shadow-panel" />
        </div>
      </div>
    </section>
  );
}

function Culture() {
  return (
    <section id="chapter-05" className="scroll-mt-16 px-5 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1360px]">
        <SectionTitle number="05">Culture & contribution conflict</SectionTitle>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="grid overflow-hidden border border-line bg-panel md:grid-cols-[1fr_.8fr]">
            <div className="p-8">
              <h3 className="border-b border-line pb-4 text-2xl font-black uppercase text-navy">Culture</h3>
              <ul className="mt-6 space-y-2 font-bold text-navy"><li>Leadership</li><li>Communication</li><li>Risk tolerance</li><li>Hierarchy</li><li>Decision norms</li></ul>
              <p className="mt-8 border-t border-blue pt-4 text-3xl font-black uppercase text-blue">Friction</p>
            </div>
            <div className="grid min-h-64 place-items-center bg-navy text-primary-foreground"><Swords size={92} strokeWidth={1.2} /></div>
          </div>
          <div className="grid overflow-hidden border border-line bg-panel md:grid-cols-[1fr_.8fr]">
            <div className="p-8">
              <h3 className="border-b border-line pb-4 text-2xl font-black uppercase text-navy">Contribution</h3>
              <div className="mt-6 space-y-4 font-bold text-navy"><p>Partner A → Technology</p><p>Partner B → Market access</p><p className="border-y border-line py-4">Both → 50% ownership</p></div>
              <p className="mt-5 text-2xl font-black text-blue">“We are contributing more.”</p>
            </div>
            <div className="grid min-h-64 place-items-center bg-blue text-primary-foreground"><Scale size={92} strokeWidth={1.2} /></div>
          </div>
        </div>
        <div className="mt-8 bg-panel px-7 py-6 text-center text-2xl font-black text-navy sm:text-4xl"><span className="text-blue">Memory line:</span> 50% ownership ≠ 50% contribution</div>
      </div>
    </section>
  );
}

function Exit() {
  const knots = ["Valuation", "IP", "Debt", "Assets", "Employees", "Customers", "Contracts", "Restructuring"];
  return (
    <section id="chapter-06" className="scroll-mt-16 bg-mist px-5 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1360px]">
        <SectionTitle number="06">Exit is harder<br /><span className="text-blue">than entry</span></SectionTitle>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative grid min-h-[500px] place-items-center">
            <div className="absolute inset-[12%] rounded-full border-2 border-dashed border-blue" />
            <div className="z-10 grid h-44 w-44 place-items-center rounded-full bg-blue text-4xl font-black uppercase text-primary-foreground shadow-panel">Exit</div>
            {knots.map((item, index) => <span key={item} className={`orbit-item orbit-${index + 1}`}>{item}</span>)}
          </div>
          <div className="space-y-4">
            <div className="bg-panel p-8">
              <h3 className="text-2xl font-black uppercase text-navy">Walmart–Bharti</h3>
              <p className="mt-1 text-6xl font-black text-blue">2013</p>
              <div className="mt-5 space-y-4 border-t border-line pt-5 font-bold text-navy"><p>$100M stake acquisition</p><p>$234M payments/forgiveness tied to Bharti retail</p></div>
            </div>
            <div className="bg-navy p-8 text-2xl font-black text-primary-foreground">The contract can end.<br /><span className="text-sky">The entanglement does not.</span></div>
          </div>
        </div>
        <p className="mt-10 border-l-4 border-blue pl-6 text-xl font-black text-navy sm:text-2xl">Interests align entering a joint venture. They <span className="text-blue">diverge</span> when it’s time to leave.</p>
      </div>
    </section>
  );
}

function Argument() {
  const chain = ["Different goals", "Strategic conflict", "Shared control", "Deadlock", "Slower decisions", "Knowledge leakage", "Cultural friction", "Contribution disputes", "Difficult exit"];
  return (
    <section className="bg-navy px-5 py-20 text-primary-foreground lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-[1360px] gap-14 lg:grid-cols-[.85fr_1.15fr]">
        <div>
          <p className="text-xs font-black uppercase text-sky">The complete</p>
          <h2 className="mt-3 text-5xl font-black uppercase leading-[.95] sm:text-7xl">Argument</h2>
          <div className="mt-12 border-l-4 border-sky bg-primary-foreground/5 p-7">
            <p className="text-xl font-black uppercase text-sky">The core problem</p>
            <p className="mt-6 text-3xl font-bold leading-tight">Not simply shared risk.<br /><span className="text-sky">Shared control</span> between independent interests.</p>
          </div>
        </div>
        <div className="space-y-2">
          {chain.map((item, index) => <div className="contents" key={item}><div className="bg-primary-foreground/8 px-6 py-3 text-center text-lg font-black uppercase"><span className={index % 2 ? "text-sky" : ""}>{item}</span></div>{index < chain.length - 1 && <ArrowDown className="mx-auto text-sky" size={18} />}</div>)}
        </div>
      </div>
    </section>
  );
}

function Conclusion() {
  const benefits = ["Shared capital", "Market access", "Shared expertise", "Risk sharing", "Faster entry"];
  const conditions = ["Strategic alignment", "Clear governance", "Shared expectations"];
  return (
    <section className="px-5 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1360px]">
        <SectionTitle>Joint ventures can<br /><span className="text-blue">create value.</span></SectionTitle>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="border-l-4 border-blue bg-panel p-7 sm:p-9">
            {benefits.map((item) => <div key={item} className="grid grid-cols-[auto_1fr] items-center gap-4 border-b border-line py-4 last:border-0"><Check className="text-blue" size={22} /><span className="text-xl font-black text-navy">{item}</span></div>)}
          </div>
          <div className="bg-panel p-7 sm:p-9">
            <p className="text-2xl font-black uppercase text-navy">But… <span className="block text-base normal-case">benefits depend on:</span></p>
            <div className="mt-5">
              {conditions.map((item, index) => <div className="contents" key={item}><p className="border-b border-line py-4 text-xl font-black uppercase text-blue">{item}</p>{index < conditions.length - 1 && <span className="block text-center text-2xl font-black text-navy">+</span>}</div>)}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-5xl text-center">
          <p className="text-3xl font-bold uppercase leading-tight text-navy sm:text-5xl">When two companies <span className="text-blue">own one business</span>,<br />who gets the final say?</p>
          <div className="mx-auto my-9 h-px w-24 bg-blue" />
          <p className="text-xs font-black uppercase text-muted-foreground">The hidden cost of shared control</p>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="overflow-hidden bg-paper font-sans">
      <Header />
      <Hero />
      <Premise />
      <Objectives />
      <Strategy />
      <Speed />
      <Knowledge />
      <Culture />
      <Exit />
      <Argument />
      <Conclusion />
      <footer className="border-t border-line bg-paper px-5 py-6 text-center text-xs font-bold uppercase text-muted-foreground">The hidden costs of joint ventures</footer>
    </main>
  );
}