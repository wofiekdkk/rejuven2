import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  ExternalLink,
  Instagram,
  Mail,
  Menu,
  MapPin,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import './index.css';

const queryClient = new QueryClient();

const navItems = [
  { label: 'The clinic', href: '#about' },
  { label: 'Care', href: '#care' },
  { label: 'Specialists', href: '#specialists' },
  { label: 'Patient notes', href: '#experiences' },
  { label: 'Contact', href: '#contact' },
];

const serviceGroups = [
  {
    id: 'skin',
    number: '01',
    title: 'Skin',
    copy: 'Evidence-led care for skin that looks like itself, only healthier.',
    services: ['Acne & acne scars', 'Pigmentation and melasma', 'Skin rejuvenation', 'Injectables and fillers'],
    tone: 'bg-[#e9d4c4]',
    icon: Sparkles,
  },
  {
    id: 'hair',
    number: '02',
    title: 'Hair',
    copy: 'A considered approach to hair loss, from diagnosis through restoration.',
    services: ['Hair fall assessment', 'PRP hair therapy', 'Dandruff and scalp care', 'Hair transplant guidance'],
    tone: 'bg-[#d1dcd4]',
    icon: Stethoscope,
  },
  {
    id: 'laser',
    number: '03',
    title: 'Laser',
    copy: 'Precise technology, calibrated carefully for Indian skin.',
    services: ['Laser hair reduction', 'Tattoo removal', 'Carbon peel', 'Vascular and scar lasers'],
    tone: 'bg-[#ddd2c7]',
    icon: Sparkles,
  },
];

const spineServices = [
  ['Back and neck pain', 'A diagnosis-first plan for pain that keeps returning.'],
  ['Slip disc and sciatica', 'Non-surgical care, image-guided when appropriate.'],
  ['Joint and sports injuries', 'Move with more confidence, not just less pain.'],
  ['Spine rehabilitation', 'Strength, mobility and habits that hold after treatment.'],
];

const particles = [
  ['left-[11%] top-[27%]', 'h-1 w-1', 'animation-delay-100'],
  ['left-[24%] top-[64%]', 'h-1.5 w-1.5', 'animation-delay-700'],
  ['left-[69%] top-[17%]', 'h-1 w-1', 'animation-delay-300'],
  ['left-[84%] top-[48%]', 'h-1.5 w-1.5', 'animation-delay-1000'],
  ['left-[76%] top-[76%]', 'h-1 w-1', 'animation-delay-500'],
  ['left-[42%] top-[15%]', 'h-1 w-1', 'animation-delay-900'],
];

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={`eyebrow flex items-center gap-3 ${light ? 'text-[#ebc5aa]' : 'text-[#b45e3f]'}`}>
      <span className="h-px w-8 bg-current" />
      {children}
    </div>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" aria-label="REJUVEN Skin, Hair, Laser and Spine Clinic home" className="group flex items-center gap-3">
      <span className={`font-display text-[26px] font-semibold leading-none tracking-[-.04em] ${light ? 'text-[#faf5ed]' : 'text-[#213b40]'}`}>
        REJUVEN
      </span>
      <span className={`hidden border-l pl-3 text-[8px] font-semibold uppercase leading-[1.25] tracking-[.18em] sm:block ${light ? 'border-[#c4b7aa]/40 text-[#c4b7aa]' : 'border-[#213b40]/20 text-[#66706c]'}`}>
        Skin · Hair<br />Laser · Spine
      </span>
    </a>
  );
}

function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', concern: '', preferred: '' });

  useEffect(() => {
    if (!open) setSubmitted(false);
  }, [open]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-[#182c30]/65 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            className="max-h-[92dvh] w-full max-w-[560px] overflow-y-auto rounded-t-[28px] bg-[#faf5ed] p-6 shadow-2xl sm:rounded-[28px] sm:p-9"
          >
            <div className="flex items-start justify-between">
              <div>
                <SectionLabel>Start a conversation</SectionLabel>
                <h2 id="booking-title" className="mt-3 font-display text-4xl leading-[.98] text-[#213b40]">Your care can begin with a question.</h2>
              </div>
              <button type="button" aria-label="Close booking form" onClick={onClose} className="rounded-full p-2 text-[#66706c] transition hover:bg-[#eee5db] hover:text-[#213b40]">
                <X size={21} />
              </button>
            </div>
            {submitted ? (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-9 rounded-2xl bg-[#dce8df] p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#213b40] text-[#f5ede3]"><Check size={22} /></div>
                <h3 className="mt-5 font-display text-3xl text-[#213b40]">Thank you, {form.name.split(' ')[0] || 'there'}.</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-[#526562]">Our care coordinator will reach you on {form.phone || 'your phone'} within one working day to find a suitable time.</p>
                <button type="button" onClick={onClose} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#213b40] px-5 py-3 text-sm font-semibold text-[#faf5ed]">Close <ArrowRight size={15} /></button>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="mt-8 space-y-4">
                <label className="block text-sm font-medium text-[#39504f]">Your name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full rounded-xl border border-[#d9cec0] bg-[#fffaf4] px-4 py-3.5 outline-none transition placeholder:text-[#9a9a8e] focus:border-[#b45e3f] focus:ring-2 focus:ring-[#b45e3f]/15" placeholder="How should we address you?" /></label>
                <label className="block text-sm font-medium text-[#39504f]">Phone number<input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2 w-full rounded-xl border border-[#d9cec0] bg-[#fffaf4] px-4 py-3.5 outline-none transition placeholder:text-[#9a9a8e] focus:border-[#b45e3f] focus:ring-2 focus:ring-[#b45e3f]/15" placeholder="+91 00000 00000" /></label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-[#39504f]">What brings you in?<select required value={form.concern} onChange={(e) => setForm({ ...form, concern: e.target.value })} className="mt-2 w-full appearance-none rounded-xl border border-[#d9cec0] bg-[#fffaf4] px-4 py-3.5 text-[#526562] outline-none focus:border-[#b45e3f]"><option value="">Select a care area</option><option>Skin</option><option>Hair</option><option>Laser</option><option>Spine & pain</option><option>Not sure yet</option></select></label>
                  <label className="block text-sm font-medium text-[#39504f]">Preferred time<select required value={form.preferred} onChange={(e) => setForm({ ...form, preferred: e.target.value })} className="mt-2 w-full appearance-none rounded-xl border border-[#d9cec0] bg-[#fffaf4] px-4 py-3.5 text-[#526562] outline-none focus:border-[#b45e3f]"><option value="">Choose a window</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label>
                </div>
                <p className="pt-1 text-xs leading-5 text-[#7c8379]">This is a placeholder enquiry form for the clinic. Your details are only used to arrange a consultation.</p>
                <button type="submit" className="group mt-1 flex w-full items-center justify-center gap-3 rounded-full bg-[#b45e3f] px-5 py-4 font-semibold text-[#fff8f0] transition hover:bg-[#994b31]">Request a consultation <ArrowRight size={17} className="transition group-hover:translate-x-1" /></button>
              </form>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Header({ onBook }: { onBook: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <header className="absolute left-0 right-0 top-0 z-40 text-[#faf5ed]">
        <div className="section-shell flex h-[82px] items-center justify-between">
          <Logo light />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => <a key={item.href} href={item.href} className="text-[11px] font-semibold uppercase tracking-[.13em] text-[#e7ddd2] transition hover:text-white">{item.label}</a>)}
          </nav>
          <div className="flex items-center gap-3">
            <button type="button" onClick={onBook} className="hidden rounded-full border border-[#f0d8c4]/55 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[.14em] transition hover:bg-[#f0d8c4] hover:text-[#213b40] sm:block">Book a consultation</button>
            <button type="button" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} className="rounded-full border border-[#f0d8c4]/45 p-2.5 lg:hidden"><Menu size={19} /></button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {menuOpen ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-[#213b40] px-6 py-7 text-[#faf5ed]">
            <div className="flex items-center justify-between"><Logo light /><button type="button" aria-label="Close navigation" onClick={() => setMenuOpen(false)} className="rounded-full border border-[#d6c7b9]/35 p-2.5"><X size={20} /></button></div>
            <nav className="mt-20 flex flex-col gap-7" aria-label="Mobile navigation">
              {navItems.map((item, index) => <motion.a initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .06 }} key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-b border-[#d6c7b9]/15 pb-5 font-display text-4xl">{item.label}<ArrowDownRight size={22} className="text-[#e0a989]" /></motion.a>)}
            </nav>
            <button type="button" onClick={() => { setMenuOpen(false); onBook(); }} className="mt-12 flex w-full items-center justify-center gap-3 rounded-full bg-[#b45e3f] px-5 py-4 font-semibold">Book a consultation <ArrowRight size={17} /></button>
            <p className="absolute bottom-8 left-6 text-xs tracking-[.12em] text-[#b6c0b9]">AURANGABAD · MAHARASHTRA</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="top" className="hero-veil relative min-h-[700px] overflow-hidden text-[#faf5ed] sm:min-h-[750px]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-orb absolute left-[43%] top-[19%] h-[580px] w-[580px] rounded-full sm:left-[53%] sm:top-[9%] sm:h-[720px] sm:w-[720px]" />
        <div className="hero-ring absolute left-[48%] top-[13%] h-[440px] w-[440px] sm:left-[57%] sm:top-[4%] sm:h-[610px] sm:w-[610px]" />
        <div className="hero-ring absolute left-[59%] top-[28%] h-[300px] w-[300px] sm:left-[68%] sm:top-[26%] sm:h-[390px] sm:w-[390px]" />
        {particles.map(([position, size, delay]) => <span key={position} className={`hero-particle absolute ${position} ${size} ${delay}`} />)}
      </div>
      <Header onBook={onBook} />
      <div className="section-shell relative flex min-h-[700px] items-end pb-16 pt-36 sm:min-h-[750px] sm:items-center sm:pb-0">
        <div className="max-w-[650px]">
          <Reveal>
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#f0d8c4]/30 bg-[#f0d8c4]/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[.2em] text-[#eac4a9]"><span className="h-1.5 w-1.5 rounded-full bg-[#dd9b75]" />Private clinic · Aurangabad</div>
          </Reveal>
          <Reveal delay={.08}>
            <h1 className="text-balance font-display text-[clamp(4.3rem,13vw,8.2rem)] font-medium leading-[.82] tracking-[-.055em]">Care, with<br /><em className="font-cormorant font-normal text-[#efc2a5]">character.</em></h1>
          </Reveal>
          <Reveal delay={.16}>
            <p className="mt-8 max-w-[420px] text-[15px] leading-7 text-[#d3d9d3] sm:text-base">A considered approach to skin, hair, laser and spine care — grounded in medicine, shaped around you.</p>
          </Reveal>
          <Reveal delay={.22}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button type="button" onClick={onBook} className="group inline-flex items-center gap-3 rounded-full bg-[#e7b18f] px-5 py-3.5 text-sm font-semibold text-[#213b40] transition hover:bg-[#f3c6a7]">Book a consultation <ArrowRight size={16} className="transition group-hover:translate-x-1" /></button>
              <a href="#care" className="inline-flex items-center gap-2 px-2 py-3.5 text-sm font-medium text-[#e4ddd5] transition hover:text-white">Explore our care <ArrowDownRight size={16} /></a>
            </div>
          </Reveal>
        </div>
        <div className="absolute bottom-10 right-0 hidden max-w-[210px] text-right text-xs leading-5 text-[#bdc8c1] md:block"><span className="mb-3 block font-display text-3xl text-[#e6b495]">01</span>Medicine that respects<br />your individuality.</div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 border-t border-[#e8d7c8]/15">
        <div className="section-shell flex h-[57px] items-center justify-between text-[10px] font-semibold uppercase tracking-[.17em] text-[#bdc8c1]"><span>Skin · Hair · Laser · Spine</span><span className="hidden sm:block">Scroll to discover <ArrowDownRight size={13} className="ml-2 inline" /></span></div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-[#faf5ed] py-24 sm:py-32">
      <div className="section-shell grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
        <Reveal><SectionLabel>The REJUVEN way</SectionLabel><p className="mt-6 max-w-[260px] font-display text-[2rem] leading-[1.08] text-[#213b40]">The best care feels personal before it feels clinical.</p></Reveal>
        <Reveal delay={.1}>
          <div className="max-w-[690px]">
            <h2 className="text-balance font-display text-[clamp(2.5rem,6vw,5.2rem)] leading-[.98] tracking-[-.04em] text-[#213b40]">A little more <em className="font-cormorant font-normal text-[#b45e3f]">attention.</em><br />A lot more trust.</h2>
            <p className="mt-8 max-w-[590px] text-[15px] leading-7 text-[#66706c]">REJUVEN was built on a simple belief: good medicine makes room for the whole person. We take time to understand what you are hoping for, what has already been tried, and what a genuinely good outcome means to you.</p>
            <p className="mt-5 max-w-[590px] text-[15px] leading-7 text-[#66706c]">Every recommendation is thoughtful, transparent and proportionate — with specialists who know when to treat, when to wait, and when to say no.</p>
            <a href="#specialists" className="mt-8 inline-flex items-center gap-3 border-b border-[#b45e3f]/40 pb-2 text-sm font-semibold text-[#b45e3f]">Meet the specialists <ArrowRight size={15} /></a>
          </div>
        </Reveal>
      </div>
      <div className="section-shell mt-20 grid border-y border-[#ded4c7] sm:grid-cols-3">
        {[['12+', 'years of combined practice'], ['4', 'areas of specialist care'], ['1:1', 'consultation, always']].map(([value, label], i) => <Reveal delay={i * .08} key={value} className="border-b border-[#ded4c7] py-7 last:border-0 sm:border-b-0 sm:border-r sm:px-8 sm:first:pl-0 sm:last:border-0"><div className="font-display text-4xl text-[#b45e3f]">{value}</div><p className="mt-2 text-xs uppercase tracking-[.13em] text-[#7b8178]">{label}</p></Reveal>)}
      </div>
    </section>
  );
}

function Care() {
  const [activeService, setActiveService] = useState<string | null>(null);
  return (
    <section id="care" className="bg-[#f0e9df] py-24 sm:py-32">
      <div className="section-shell">
        <Reveal><SectionLabel>Areas of care</SectionLabel><div className="mt-5 flex flex-col justify-between gap-7 sm:flex-row sm:items-end"><h2 className="max-w-[640px] font-display text-[clamp(2.7rem,6vw,5.4rem)] leading-[.94] tracking-[-.045em] text-[#213b40]">Precision where it matters.<br /><em className="font-cormorant font-normal text-[#b45e3f]">Humanity everywhere.</em></h2><p className="max-w-[260px] text-sm leading-6 text-[#66706c]">The right plan is rarely the loudest one. Explore the disciplines we bring together under one roof.</p></div></Reveal>
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {serviceGroups.map((service, index) => { const Icon = service.icon; const isActive = activeService === service.id; return <Reveal delay={index * .08} key={service.id}><article className={`card-lift min-h-[390px] rounded-[22px] border border-[#d8cdbf] ${service.tone} p-6 sm:p-7`}><div className="flex items-start justify-between"><span className="font-mono text-xs font-semibold tracking-[.15em] text-[#65736e]">{service.number}</span><span className="rounded-full bg-[#faf5ed]/55 p-2.5 text-[#b45e3f]"><Icon size={19} strokeWidth={1.5} /></span></div><h3 className="mt-20 font-display text-5xl text-[#213b40]">{service.title}</h3><p className="mt-4 max-w-[250px] text-sm leading-6 text-[#53635f]">{service.copy}</p><button type="button" onClick={() => setActiveService(isActive ? null : service.id)} className="mt-7 flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-[#213b40]">{isActive ? 'Close list' : 'View focus areas'}<Plus size={16} className={`transition-transform ${isActive ? 'rotate-45' : ''}`} /></button>{isActive ? <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 space-y-2 border-t border-[#213b40]/15 pt-4 text-sm text-[#53635f]">{service.services.map((item) => <li key={item} className="flex items-center gap-2"><Check size={14} className="text-[#b45e3f]" />{item}</li>)}</motion.ul> : null}</article></Reveal>; })}
        </div>
        <Reveal delay={.1}>
          <div className="mt-5 grid overflow-hidden rounded-[22px] bg-[#213b40] text-[#faf5ed] lg:grid-cols-[.8fr_1.2fr]">
            <div className="relative min-h-[300px] overflow-hidden bg-[#2b4c4d] p-7 sm:p-10"><div className="absolute -right-20 -top-28 h-[380px] w-[380px] rounded-full border border-[#d7b49d]/30" /><div className="absolute -right-6 -top-14 h-[260px] w-[260px] rounded-full border border-[#d7b49d]/20" /><div className="relative"><span className="font-mono text-xs tracking-[.15em] text-[#d9a685]">04 · SPINE & PAIN</span><h3 className="mt-16 max-w-[330px] font-display text-5xl leading-[.95]">Move through life with less pain.</h3></div></div>
            <div className="p-7 sm:p-10"><p className="max-w-[480px] text-sm leading-6 text-[#c6d0c8]">From a first stubborn ache to a long-held diagnosis, our spine and pain consultations connect clarity with a practical way forward.</p><div className="mt-8 grid gap-x-7 gap-y-5 sm:grid-cols-2">{spineServices.map(([title, copy]) => <div key={title} className="border-t border-[#f0dfd0]/18 pt-4"><h4 className="font-semibold text-[#f1d5be]">{title}</h4><p className="mt-2 text-xs leading-5 text-[#abbab3]">{copy}</p></div>)}</div><a href="#contact" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#e5b391]">Talk to the clinic <ArrowRight size={16} /></a></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Specialists() {
  return (
    <section id="specialists" className="bg-[#faf5ed] py-24 sm:py-32">
      <div className="section-shell">
        <Reveal><SectionLabel>People you can trust</SectionLabel><div className="mt-5 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><h2 className="max-w-[600px] font-display text-[clamp(2.8rem,6vw,5.2rem)] leading-[.94] tracking-[-.04em] text-[#213b40]">Experience, without<br /><em className="font-cormorant font-normal text-[#b45e3f]">ego.</em></h2><p className="max-w-[280px] text-sm leading-6 text-[#66706c]">Warm in conversation. Exacting in practice. Here for the long view of your health.</p></div></Reveal>
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {[{ name: 'Dr. Pooja Shah', role: 'Dermatologist & Aesthetic Physician', initials: 'PS', tone: 'bg-[#e4c9b9]', accent: 'Dermatology · Aesthetics', bio: 'Dr. Pooja combines clinical dermatology with an artist’s eye for balance. Her work is guided by skin health first — and results that continue to feel like you.' }, { name: 'Dr. Rohan Deshpande', role: 'Spine & Pain Specialist', initials: 'RD', tone: 'bg-[#cad8d1]', accent: 'Spine · Pain management', bio: 'Dr. Rohan takes a diagnostic, movement-led approach to pain. He helps patients understand what is happening, then builds a plan they can genuinely live with.' }].map((doctor, index) => <Reveal delay={index * .1} key={doctor.name}><article className="group grid overflow-hidden rounded-[22px] border border-[#ded4c7] bg-[#f5eee5] sm:grid-cols-[.82fr_1.18fr]"><div className={`relative flex min-h-[280px] items-end overflow-hidden ${doctor.tone} p-7`}><div className="absolute -bottom-20 left-1/2 h-[270px] w-[270px] -translate-x-1/2 rounded-full border border-[#213b40]/15" /><div className="absolute bottom-[-15px] left-1/2 flex h-[205px] w-[158px] -translate-x-1/2 items-start justify-center rounded-[48%_48%_0_0] bg-[#b57157]/45 pt-8 text-6xl font-display text-[#f5dfcf] shadow-inner"><span>{doctor.initials}</span></div><span className="relative z-10 font-mono text-[10px] uppercase tracking-[.15em] text-[#53635f]">Clinician {String(index + 1).padStart(2, '0')}</span></div><div className="flex flex-col justify-between p-7 sm:p-8"><div><span className="text-[10px] font-bold uppercase tracking-[.15em] text-[#b45e3f]">{doctor.accent}</span><h3 className="mt-4 font-display text-3xl text-[#213b40]">{doctor.name}</h3><p className="mt-1 text-xs font-semibold uppercase tracking-[.1em] text-[#7d837a]">{doctor.role}</p><p className="mt-6 text-sm leading-6 text-[#66706c]">{doctor.bio}</p></div><a href="#contact" className="mt-8 inline-flex w-fit items-center gap-2 border-b border-[#b45e3f]/40 pb-2 text-sm font-semibold text-[#b45e3f]">Book with {doctor.name.split(' ')[1]} <ArrowRight size={15} /></a></div></article></Reveal>)}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const reasons = [['01', 'Unhurried consultations', 'We listen properly, explain clearly and leave room for questions.'], ['02', 'Honest recommendations', 'No hard sell. Just the care that makes sense for your skin, body and goals.'], ['03', 'One connected team', 'Your notes, context and progress travel with you across every area of care.'], ['04', 'Quietly precise', 'Modern technology and protocols, used with restraint and clinical judgement.']];
  return <section className="bg-[#e4d8ca] py-24 sm:py-32"><div className="section-shell grid gap-14 lg:grid-cols-[.95fr_1.05fr] lg:gap-24"><Reveal><SectionLabel>Why REJUVEN</SectionLabel><h2 className="mt-5 max-w-[500px] font-display text-[clamp(2.8rem,6vw,5.2rem)] leading-[.93] tracking-[-.04em] text-[#213b40]">The details are<br /><em className="font-cormorant font-normal text-[#b45e3f]">the difference.</em></h2><p className="mt-7 max-w-[330px] text-sm leading-6 text-[#66706c]">A better clinic experience is not about more. It is about what is considered, and what is left out.</p></Reveal><div className="border-t border-[#c8bcae]">{reasons.map(([num, title, copy], index) => <Reveal delay={index * .06} key={num}><div className="grid grid-cols-[44px_1fr] gap-4 border-b border-[#c8bcae] py-6 sm:grid-cols-[60px_180px_1fr] sm:items-start"><span className="font-mono text-xs text-[#b45e3f]">{num}</span><h3 className="font-display text-2xl text-[#213b40]">{title}</h3><p className="col-start-2 text-sm leading-6 text-[#66706c] sm:col-start-3">{copy}</p></div></Reveal>)}</div></div></section>;
}

function Experiences() {
  return <section id="experiences" className="bg-[#faf5ed] py-24 sm:py-32"><div className="section-shell"><Reveal><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><SectionLabel>Patient notes</SectionLabel><h2 className="mt-5 max-w-[650px] font-display text-[clamp(2.8rem,6vw,5.1rem)] leading-[.94] tracking-[-.04em] text-[#213b40]">What care feels like<br /><em className="font-cormorant font-normal text-[#b45e3f]">on the other side.</em></h2></div><span className="hidden font-display text-7xl text-[#dcc6b2] sm:block">“</span></div></Reveal><div className="mt-14 grid gap-4 md:grid-cols-[1.2fr_.8fr_.9fr]"><Reveal className="md:row-span-2"><figure className="flex h-full min-h-[360px] flex-col justify-between rounded-[22px] bg-[#213b40] p-7 text-[#faf5ed] sm:p-9"><div><span className="text-5xl text-[#dfaa88]">“</span><blockquote className="mt-3 max-w-[440px] font-display text-[clamp(1.9rem,3vw,2.7rem)] leading-[1.05]">I came in expecting a treatment. I left with a plan I actually understood.</blockquote></div><figcaption className="mt-10 border-t border-[#dce5dc]/20 pt-5 text-xs text-[#b5c2bb]"><span className="font-semibold text-[#edc4a8]">Ananya M.</span><br />Skin consultation · Aurangabad</figcaption></figure></Reveal><Reveal delay={.08}><figure className="rounded-[22px] border border-[#ded4c7] bg-[#e8d9cc] p-7"><blockquote className="font-display text-2xl leading-[1.1] text-[#213b40]">“The calmest medical appointment I have had in years.”</blockquote><figcaption className="mt-9 text-xs text-[#6c776f]"><span className="font-semibold text-[#b45e3f]">Rahul K.</span> · Spine care</figcaption></figure></Reveal><Reveal delay={.16}><figure className="rounded-[22px] border border-[#ded4c7] bg-[#d9e2dc] p-7"><blockquote className="font-display text-2xl leading-[1.1] text-[#213b40]">“No pressure, no promises that felt too good to be true. Just honest expertise.”</blockquote><figcaption className="mt-9 text-xs text-[#6c776f]"><span className="font-semibold text-[#b45e3f]">Mitali P.</span> · Laser care</figcaption></figure></Reveal><Reveal delay={.2} className="md:col-span-2"><div className="flex h-full min-h-[145px] items-center justify-between rounded-[22px] border border-[#ded4c7] p-7"><p className="max-w-[340px] text-sm leading-6 text-[#66706c]">Every patient story begins differently. The common thread is feeling heard, informed and in safe hands.</p><a href="#contact" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#b45e3f] text-[#fff8f0] transition hover:bg-[#994b31]" aria-label="Share your story"><ArrowUpRightIcon /></a></div></Reveal></div></div></section>;
}

function ArrowUpRightIcon() { return <ArrowRight size={18} className="-rotate-45" />; }

function Contact({ onBook }: { onBook: () => void }) {
  return <section id="contact" className="bg-[#213b40] py-24 text-[#faf5ed] sm:py-32"><div className="section-shell"><div className="grid gap-14 lg:grid-cols-[1fr_.8fr] lg:gap-24"><Reveal><SectionLabel light>Find your way here</SectionLabel><h2 className="mt-6 max-w-[650px] font-display text-[clamp(3.3rem,7vw,6.8rem)] leading-[.87] tracking-[-.05em]">Let’s make a<br /><em className="font-cormorant font-normal text-[#e5af8e]">good start.</em></h2><p className="mt-8 max-w-[420px] text-[15px] leading-7 text-[#c1ccc4]">Bring your questions, your history and your hopes. We will bring the time to listen.</p><button type="button" onClick={onBook} className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[#e5af8e] px-5 py-3.5 text-sm font-semibold text-[#213b40] transition hover:bg-[#f1c5a5]">Request a consultation <ArrowRight size={16} className="transition group-hover:translate-x-1" /></button></Reveal><Reveal delay={.12}><div className="space-y-8 border-t border-[#cbd8cf]/20 pt-7 lg:mt-16"><div><p className="eyebrow text-[#e5af8e]">Visit</p><p className="mt-3 max-w-[260px] text-sm leading-6 text-[#d2dad3]">REJUVEN Skin, Hair, Laser and Spine Clinic<br />Aurangabad, Maharashtra<br /><span className="text-[#94aaa0]">(Address placeholder — replace before launch)</span></p><a href="https://maps.google.com/?q=Aurangabad+Maharashtra" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#e5af8e]">Open in Maps <ExternalLink size={14} /></a></div><div><p className="eyebrow text-[#e5af8e]">Call or write</p><a href="tel:+910000000000" className="mt-3 flex items-center gap-3 text-lg text-[#f3e6da]"><Phone size={17} className="text-[#e5af8e]" /> +91 00000 00000 <span className="text-xs text-[#91a69d]">(placeholder)</span></a><a href="mailto:care@rejuvenclinic.example" className="mt-2 flex items-center gap-3 text-sm text-[#d2dad3]"><Mail size={16} className="text-[#e5af8e]" /> care@rejuvenclinic.example</a></div><div><p className="eyebrow text-[#e5af8e]">Hours</p><p className="mt-3 flex items-center gap-3 text-sm text-[#d2dad3]"><Clock3 size={16} className="text-[#e5af8e]" /> Mon–Sat · 10:00 am–7:00 pm</p><p className="mt-1 pl-7 text-xs text-[#91a69d]">Consultations by appointment</p></div></div></Reveal></div></div></section>;
}

function Footer({ onBook }: { onBook: () => void }) {
  return <footer className="bg-[#182e32] pb-28 pt-10 text-[#c0ccc4] md:pb-10"><div className="section-shell"><div className="flex flex-col justify-between gap-8 border-b border-[#d1dfd5]/15 pb-9 sm:flex-row sm:items-start"><div><Logo light /><p className="mt-5 max-w-[240px] text-xs leading-5 text-[#81968e]">Specialist care, made more human.<br />Aurangabad · Maharashtra</p></div><div className="flex flex-wrap gap-x-7 gap-y-3 text-xs font-semibold uppercase tracking-[.12em]"><a href="#about" className="transition hover:text-white">The clinic</a><a href="#care" className="transition hover:text-white">Care</a><a href="#specialists" className="transition hover:text-white">Specialists</a><a href="#contact" className="transition hover:text-white">Contact</a></div><div className="flex gap-3"><a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full border border-[#d1dfd5]/20 p-2.5 transition hover:border-[#e5af8e] hover:text-[#e5af8e]"><Instagram size={16} /></a><button type="button" onClick={onBook} className="rounded-full bg-[#b45e3f] px-4 py-2.5 text-xs font-semibold text-[#fff8f0]">Book consultation</button></div></div><div className="flex flex-col justify-between gap-3 pt-6 text-[10px] uppercase tracking-[.13em] text-[#718780] sm:flex-row"><span>© 2025 REJUVEN Clinic</span><span>Information on this website is for general guidance.</span></div></div></footer>;
}

function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', bookingOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [bookingOpen]);
  return <div className="grain mobile-booking overflow-x-hidden"><Hero onBook={() => setBookingOpen(true)} /><About /><Care /><Specialists /><WhyUs /><Experiences /><Contact onBook={() => setBookingOpen(true)} /><Footer onBook={() => setBookingOpen(true)} /><div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#d7c5b5] bg-[#faf5ed]/95 p-3 backdrop-blur-md md:hidden"><button type="button" onClick={() => setBookingOpen(true)} className="flex w-full items-center justify-center gap-3 rounded-full bg-[#b45e3f] py-3.5 text-sm font-semibold text-[#fff8f0]">Book a consultation <CalendarDays size={16} /></button></div><BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} /></div>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;