import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowUpRight,
  ArrowRight,
  Baby,
  BarChart3,
  CalendarDays,
  ChevronDown,
  CircleCheck,
  FileHeart,
  HeartHandshake,
  Menu,
  ShieldCheck,
  Sparkles,
  Syringe,
  Users,
  X,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  const navItems = [
    ['Who we serve', '#who-we-serve'],
    ['What we do', '#what-we-do'],
    ['Who we are', '#who-we-are'],
    ['Your next role', '#your-next-role'],
    ['Contact', '#contact'],
  ];

  const services = [
    {
      eyebrow: 'For families',
      title: 'A clearer path through every stage of childhood',
      description: 'Keep immunisations, growth, appointments, and trusted care teams connected from a child’s first breath to their eighteenth birthday.',
      icon: Baby,
      tone: 'bg-[#f1d3c5]',
      image: 'https://hunter-healthcare.com/wp-content/uploads/2026/06/Health-Featured-Image-1024x683.jpg',
    },
    {
      eyebrow: 'For care teams',
      title: 'Better decisions, made with the full picture',
      description: 'Give frontline workers and clinicians a shared longitudinal record that turns fragmented information into timely action.',
      icon: HeartHandshake,
      tone: 'bg-[#d8eadf]',
      image: 'https://hunter-healthcare.com/wp-content/uploads/2026/06/Homepage-1-1-scaled-e1774610476245.jpg',
    },
    {
      eyebrow: 'For public health',
      title: 'The insight to improve outcomes at scale',
      description: 'Surface coverage gaps, referral trends, and emerging risks with privacy-conscious dashboards built for real-world delivery.',
      icon: BarChart3,
      tone: 'bg-[#ddd8f2]',
      image: 'https://hunter-healthcare.com/wp-content/uploads/2026/06/Impact-and-Solutions-Featured-Image-scaled-1-1024x683.jpg',
    },
  ];

  const faqs = [
    ['What is the National Child Health Tracking App?', 'A connected digital health platform concept that helps families, health workers, clinicians, and public health teams coordinate care from birth to age 18.'],
    ['Is this a live patient-record system?', 'No. This interactive experience is a demonstration prototype. All child profiles, records, and statistics are fictional.'],
    ['How does it support health workers?', 'A field-ready console supports home visits, growth measurements, immunisation logging, referrals, and a simulated offline sync queue.'],
  ];

  return (
    <div className="min-h-screen bg-[#f7f3ea] text-[#2f2a63] font-sans">
      <div className="bg-[#2f2a63] px-5 py-2.5 text-center text-[11px] font-semibold tracking-wide text-[#f7f3ea]">
        A connected approach to healthier childhoods <span className="mx-2 text-[#f2c14e]">•</span> <button onClick={() => navigateTo('/demo-login')} className="underline underline-offset-4 hover:text-[#f2c14e]">Explore the interactive demo</button>
      </div>

      <header className="border-b border-[#2f2a63]/15 bg-[#f7f3ea]/95 px-5 py-5 backdrop-blur-md sm:px-10">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between">
          <a href="#top" className="flex items-center gap-3" aria-label="National Child Health Tracking home">
            <span className="flex size-10 items-center justify-center rounded-full bg-[#2f2a63] text-[#f7f3ea]"><HeartHandshake className="size-5" /></span>
            <span className="max-w-[155px] text-[13px] font-extrabold uppercase leading-[1.05] tracking-[.08em]">National Child Health Tracking</span>
          </a>
          <nav className="hidden items-center gap-7 text-[12px] font-semibold lg:flex" aria-label="Main navigation">
            {navItems.map(([label, href]) => <a key={label} href={href} className="transition-colors hover:text-[#f2c14e]">{label}</a>)}
          </nav>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-full border border-[#2f2a63]/20 p-2 lg:hidden" aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <button onClick={() => navigateTo('/demo-login')} className="hidden items-center gap-2 rounded-full bg-[#f2c14e] px-5 py-3 text-xs font-bold text-[#2f2a63] transition hover:bg-[#ff8f79] lg:flex">Launch demo <ArrowUpRight className="size-4" /></button>
        </div>
        {mobileOpen && <nav className="flex flex-col gap-4 pt-5 text-sm font-semibold lg:hidden">{navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMobileOpen(false)}>{label}</a>)}<button onClick={() => navigateTo('/demo-login')} className="w-fit rounded-full bg-[#f2c14e] px-4 py-2">Launch demo</button></nav>}
      </header>

      <main id="top">
        <section className="relative overflow-hidden bg-[#f2c14e] px-5 pb-16 pt-12 sm:px-10 sm:pb-24 sm:pt-20">
          <div className="mx-auto grid max-w-[1380px] items-end gap-12 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <p className="mb-7 text-xs font-bold uppercase tracking-[.16em] text-[#2f2a63]/70">Digital healthcare, reimagined</p>
              <h1 className="max-w-4xl text-[clamp(3.5rem,9vw,8.5rem)] font-light leading-[.84] tracking-[-.075em] text-[#2f2a63]">Every child.<br /><em className="font-serif not-italic">A healthier future.</em></h1>
            </div>
            <div className="max-w-md pb-1 lg:pb-3">
              <div className="mb-8 overflow-hidden rounded-[2rem] border border-[#2f2a63]/20 bg-[#2f2a63]/10">
                <img src="https://images.ctfassets.net/6m9bd13t776q/3yMjCQsBOY8A6bx7gkIeVL/67a02672070d9b39634421d7e6bf5957/18_month_old_check_up-hero-shutterstock_1898938672.webp?w=1122" alt="Healthcare professionals collaborating" className="h-48 w-full object-cover mix-blend-multiply sm:h-56" />
              </div>
              <p className="text-lg leading-relaxed text-[#2f2a63]/80 sm:text-xl">The right record, at the right moment, with the right people. A connected platform for childhood health from birth to 18.</p>
              <button onClick={() => navigateTo('/demo-login')} className="mt-8 inline-flex items-center gap-3 border-b-2 border-[#2f2a63] pb-2 text-sm font-bold text-[#2f2a63] transition hover:gap-5">See what’s possible <ArrowRight className="size-4" /></button>
            </div>
          </div>
          <div className="mx-auto mt-16 max-w-[1380px] border-t border-[#2f2a63]/25 pt-5"><div className="flex flex-wrap gap-x-10 gap-y-3 text-xs font-bold uppercase tracking-[.12em] text-[#2f2a63]/65"><span>Birth — 18 years</span><span>6 care perspectives</span><span>One continuous record</span></div></div>
        </section>

        <section id="who-we-serve" className="px-5 py-20 sm:px-10 sm:py-28">
          <div className="mx-auto max-w-[1380px]"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#f2c14e]">Who we serve</p><h2 className="mt-5 max-w-sm text-4xl font-light leading-tight tracking-[-.04em] sm:text-5xl">Health is a human story.</h2></div><p className="max-w-2xl text-2xl font-light leading-snug text-[#2f2a63]/70 sm:text-3xl">Behind every check-up, vaccine, and referral is a child who deserves care that feels joined-up, considered, and ready for what comes next.</p></div><div className="mt-14 grid gap-4 md:grid-cols-3">{services.map((service) => { const Icon = service.icon; return <article key={service.eyebrow} className={`${service.tone} flex min-h-[390px] flex-col justify-between overflow-hidden rounded-[2rem] transition-transform hover:-translate-y-1`}><img src={service.image} alt="" className="h-36 w-full object-cover mix-blend-multiply" /><div className="flex flex-1 flex-col justify-between p-7"><div className="flex items-start justify-between"><span className="text-xs font-bold uppercase tracking-[.12em] text-[#2f2a63]/65">{service.eyebrow}</span><Icon className="size-6" /></div><div><h3 className="max-w-xs text-2xl font-semibold leading-tight tracking-[-.03em]">{service.title}</h3><p className="mt-4 text-sm leading-relaxed text-[#2f2a63]/70">{service.description}</p></div></div></article> })}</div></div>
        </section>

        <section id="what-we-do" className="bg-[#2f2a63] px-5 py-20 text-[#f7f3ea] sm:px-10 sm:py-28"><div className="mx-auto max-w-[1380px]"><div className="grid gap-10 lg:grid-cols-[1fr_1fr]"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#f2c14e]">What we do</p><h2 className="mt-5 max-w-xl text-4xl font-light leading-tight tracking-[-.04em] sm:text-6xl">Make every decision count.</h2></div><p className="max-w-xl text-lg leading-relaxed text-[#f7f3ea]/65">We bring together the people, information, and signals that make better child health outcomes possible—without asking care teams to work harder to find them.</p></div><div className="mt-16 grid gap-0 border-t border-[#f7f3ea]/20 md:grid-cols-3">{[[FileHeart,'Connected records','A longitudinal view that travels with every child.'],[Syringe,'Timely care','Smart reminders and vaccination intelligence for the moments that matter.'],[ShieldCheck,'Responsible insight','Assistive flags that support clinical judgment, never replace it.']].map(([Icon,title,desc]) => { const Component = Icon as React.ElementType; return <div key={title as string} className="border-b border-[#f7f3ea]/20 py-8 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"><Component className="mb-8 size-6 text-[#f2c14e]" /><h3 className="text-2xl font-light">{title as string}</h3><p className="mt-3 max-w-xs text-sm leading-relaxed text-[#f7f3ea]/60">{desc as string}</p></div> })}</div></div></section>

        <section id="who-we-are" className="px-5 py-20 sm:px-10 sm:py-28"><div className="mx-auto max-w-[1380px]"><div className="flex flex-col justify-between gap-8 border-b border-[#2f2a63]/20 pb-10 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#f2c14e]">Who we are</p><h2 className="mt-4 max-w-2xl text-4xl font-light leading-tight tracking-[-.04em] sm:text-6xl">Bigger thinking.<br /><em className="font-serif not-italic">Healthier futures.</em></h2></div><p className="max-w-sm text-sm leading-relaxed text-[#2f2a63]/65">A proposal for a national child health network built around continuity, collaboration, and practical innovation.</p></div><div className="grid gap-10 pt-12 md:grid-cols-2"><div className="rounded-[2rem] bg-[#d8eadf] p-8 sm:p-12"><Sparkles className="size-7" /><h3 className="mt-20 max-w-md text-3xl font-light leading-tight">A platform designed around the realities of care delivery.</h3></div><div className="flex flex-col justify-center gap-7">{['One shared view across the care journey','Clearer pathways for every referral','Privacy-conscious insight for public health'].map((item, index) => <div key={item} className="flex items-center gap-4 border-b border-[#2f2a63]/15 pb-5 text-xl font-light"><span className="text-sm font-bold text-[#f2c14e]">0{index + 1}</span>{item}<CircleCheck className="ml-auto size-5 text-[#f2c14e]" /></div>)}</div></div></div></section>

        <section id="your-next-role" className="bg-[#eeeaf8] px-5 py-20 sm:px-10 sm:py-24"><div className="mx-auto max-w-[1380px] text-center"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#f2c14e]">Your next role</p><h2 className="mx-auto mt-4 max-w-3xl text-4xl font-light leading-tight tracking-[-.04em] sm:text-6xl">See the experience through the eyes of your care role.</h2><p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#2f2a63]/65">Explore a working prototype for families, frontline health workers, doctors, specialists, and public health leaders.</p><button onClick={() => navigateTo('/demo-login')} className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#2f2a63] px-7 py-4 text-sm font-bold text-[#f7f3ea] transition hover:bg-[#f2c14e] hover:text-[#2f2a63]">Choose your demo role <ArrowUpRight className="size-4" /></button></div></section>

        <section id="contact" className="px-5 py-20 sm:px-10 sm:py-24"><div className="mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[1fr_.7fr]"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#f2c14e]">Questions, ideas, next steps</p><h2 className="mt-4 max-w-2xl text-4xl font-light leading-tight tracking-[-.04em] sm:text-6xl">Let’s make care feel connected.</h2></div><div className="flex flex-col justify-end"><a href="mailto:hello@childhealth.network" className="flex items-center justify-between border-b border-[#2f2a63]/25 py-5 text-lg font-semibold hover:text-[#f2c14e]">Start a conversation <ArrowUpRight className="size-5" /></a><button onClick={() => navigateTo('/demo-login')} className="flex items-center justify-between border-b border-[#2f2a63]/25 py-5 text-left text-lg font-semibold hover:text-[#f2c14e]">Explore the prototype <ArrowUpRight className="size-5" /></button></div></div></section>

        <section id="faq" className="bg-[#f5dfad] px-5 py-20 sm:px-10 sm:py-24"><div className="mx-auto max-w-[900px]"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#2f2a63]/65">Frequently asked</p><h2 className="mt-4 text-4xl font-light tracking-[-.04em] sm:text-5xl">A few useful answers.</h2><div className="mt-10">{faqs.map(([question, answer], index) => <div key={question} className="border-t border-[#2f2a63]/25 py-5"><button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between text-left text-lg font-semibold"><span>{question}</span><ChevronDown className={`size-5 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} /></button>{openFaq === index && <p className="max-w-2xl pt-4 text-sm leading-relaxed text-[#2f2a63]/70">{answer}</p>}</div>)}</div></div></section>
      </main>

      <footer className="bg-[#2f2a63] px-5 py-8 text-[#f7f3ea] sm:px-10"><div className="mx-auto flex max-w-[1380px] flex-col justify-between gap-5 text-xs text-[#f7f3ea]/60 sm:flex-row"><span>© 2026 National Child Health Tracking</span><span>Connected records. Timely care. Healthier futures.</span></div></footer>
    </div>
  );
};
