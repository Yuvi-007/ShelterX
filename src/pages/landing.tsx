import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, BarChart3, ChevronDown, Crosshair, Database, Menu, Network, ShieldCheck, Siren, Sparkles, Target, TrendingUp, X } from 'lucide-react';
import { roleDefinitions, type RoleId } from '@/data/roles';
import { shelters } from '@/data/shelters';

const steps = [
  { icon: Database, number: '01', title: 'Monitor', text: 'See every shelter, every intake, and every available resource in one operational view.' },
  { icon: BarChart3, number: '02', title: 'Analyze', text: 'Surface capacity pressure before it becomes a crowding event.' },
  { icon: TrendingUp, number: '03', title: 'Predict', text: 'Read the movement of people across your network as conditions change.' },
  { icon: Target, number: '04', title: 'Recommend', text: 'Turn available information into a clear next best action for the desk.' },
  { icon: Network, number: '05', title: 'Redistribute', text: 'Route arrivals and resources toward the places that can receive them.' },
];

const capabilities = [
  { icon: Database, title: 'Monitor', text: 'Designed to bring occupancy, capacity, and reported operational conditions into one view.' },
  { icon: Crosshair, title: 'Identify', text: 'Help teams recognize capacity pressure and developing operational risks.' },
  { icon: Network, title: 'Coordinate', text: 'Support shared situational awareness across emergency response teams.' },
  { icon: Target, title: 'Decide', text: 'Organize information to support faster, safer operational decisions.' },
];

const operationalChallenges = [
  { number: '01', title: 'Changing capacity', text: 'Shelter occupancy and available space can change as an emergency develops.' },
  { number: '02', title: 'Resource awareness', text: 'Teams benefit from clear visibility into food, water, medical support, and accessibility.' },
  { number: '03', title: 'Coordinated information', text: 'Emergency stakeholders need organized information to build a shared operational picture.' },
  { number: '04', title: 'Time-sensitive decisions', text: 'Response decisions often need to be made quickly using clear, relevant information.' },
];

const roleSupport: Record<RoleId, { summary: string; support: string }> = {
  citizen: {
    summary: 'People seeking safe shelter information during an emergency.',
    support: 'Designed to help people discover suitable shelter options, capacity details, and available facilities.',
  },
  manager: {
    summary: 'Teams responsible for the day-to-day conditions at one shelter.',
    support: 'Provides a foundation for maintaining occupancy, resources, and reported shelter conditions.',
  },
  response: {
    summary: 'Emergency teams assessing shelter pressure and priorities.',
    support: 'Designed to surface capacity pressure and critical conditions to support response coordination.',
  },
  authority: {
    summary: 'Leaders responsible for the wider shelter network.',
    support: 'Provides a foundation for reviewing network status, capacity trends, and operational insights.',
  },
  admin: {
    summary: 'Platform stewards supporting secure, organized access.',
    support: 'Provides a foundation for managing users, access, and platform configuration as ShelterX evolves.',
  },
};

type NavigationGroup = 'platform' | 'solutions' | 'resources';

type NavigationItem = {
  title: string;
  description: string;
  href?: string;
  comingSoon?: boolean;
};

const navigationGroups: Record<NavigationGroup, { label: string; items: NavigationItem[] }> = {
  platform: {
    label: 'Platform',
    items: [
      { title: 'Command Center', description: 'Monitor shelter capacity and operational conditions.', href: '/dashboard' },
      { title: 'Shelter Network', description: 'Explore shelters and available capacity.', comingSoon: true },
      { title: 'Emergency Alerts', description: 'Track critical shelter conditions.', comingSoon: true },
      { title: 'Analytics', description: 'Understand capacity and operational trends.', comingSoon: true },
    ],
  },
  solutions: {
    label: 'Solutions',
    items: [
      { title: 'For Citizens', description: 'Find shelter information and essential services.', href: '#who-shelterx-serves' },
      { title: 'For Shelter Managers', description: 'Update occupancy and shelter resources.', href: '#who-shelterx-serves' },
      { title: 'For Response Teams', description: 'Monitor conditions and coordinate response.', href: '#who-shelterx-serves' },
      { title: 'For Authorities', description: 'Understand regional shelter capacity.', href: '#who-shelterx-serves' },
      { title: 'For Administrators', description: 'Manage platform access and operations.', href: '#who-shelterx-serves' },
    ],
  },
  resources: {
    label: 'Resources',
    items: [
      { title: 'How ShelterX Works', description: 'Learn the ShelterX operating loop.', href: '#how-it-works' },
      { title: 'Platform Overview', description: 'Return to the ShelterX platform overview.', href: '#top' },
      { title: 'Emergency Operations', description: 'Additional emergency operations guidance.', comingSoon: true },
      { title: 'About ShelterX', description: 'Learn about ShelterX and its purpose.', href: '#top' },
    ],
  },
};

export default function Landing() {
  const desktopNavigation = useRef<HTMLElement>(null);
  const mobileMenuWasOpen = useRef(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<NavigationGroup | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<NavigationGroup | null>(null);
  const totalCapacity = shelters.reduce((sum, shelter) => sum + shelter.maxCapacity, 0);
  const totalOccupancy = shelters.reduce((sum, shelter) => sum + shelter.currentOccupancy, 0);
  const occupancyPercentage = Math.round((totalOccupancy / totalCapacity) * 100);

  useEffect(() => {
    if (!mobileMenuOpen && !openDesktopMenu) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        setOpenDesktopMenu(null);
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [mobileMenuOpen, openDesktopMenu]);

  useEffect(() => {
    if (!openDesktopMenu) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!desktopNavigation.current?.contains(event.target as Node)) setOpenDesktopMenu(null);
    };

    window.addEventListener('pointerdown', closeOnOutsideClick);
    return () => window.removeEventListener('pointerdown', closeOnOutsideClick);
  }, [openDesktopMenu]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      if (mobileMenuWasOpen.current) {
        document.querySelector<HTMLButtonElement>('[data-testid="button-open-mobile-navigation"]')?.focus();
        mobileMenuWasOpen.current = false;
      }
      return;
    }

    mobileMenuWasOpen.current = true;
    const focusMenu = requestAnimationFrame(() => {
      document.querySelector<HTMLButtonElement>('[data-testid="button-close-mobile-navigation"]')?.focus();
    });
    const keepFocusInMenu = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusableElements = Array.from(document.querySelector<HTMLElement>('#mobile-navigation')?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) ?? []).filter((element) => !element.hasAttribute('disabled') && element.getClientRects().length > 0);
      if (!focusableElements.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', keepFocusInMenu);
    return () => {
      cancelAnimationFrame(focusMenu);
      window.removeEventListener('keydown', keepFocusInMenu);
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenMobileGroup(null);
  };

  return <div id="top" className="min-h-[100dvh] overflow-hidden bg-[#f4f0e7] text-[#17283b]">
    <header className="absolute inset-x-0 top-0 z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
      <Link href="/" className="flex items-center gap-3" data-testid="link-landing-brand"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#203951] text-[#f4b53e]"><ShieldCheck size={19} /></span><span className="font-display text-lg font-semibold tracking-tight">Shelter<span className="text-[#c98716]">X</span></span></Link>
       <nav ref={desktopNavigation} aria-label="Primary navigation" className="hidden items-center gap-6 text-sm font-medium text-[#536273] md:flex">{(['platform', 'solutions'] as NavigationGroup[]).map((group) => { const { label, items } = navigationGroups[group]; const isOpen = openDesktopMenu === group; return <div key={group} className="relative"><button type="button" onClick={() => setOpenDesktopMenu(isOpen ? null : group)} className="inline-flex items-center gap-1.5 transition-colors hover:text-[#17283b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bf7b1c] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f4f0e7]" aria-expanded={isOpen} aria-controls={`desktop-${group}-menu`}>{label}<ChevronDown size={14} aria-hidden="true" /></button>{isOpen && <div id={`desktop-${group}-menu`} className="absolute left-0 top-[calc(100%+1rem)] z-30 w-80 rounded-xl border border-[#d7cebf] bg-[#f9f7f1] p-2 shadow-[0_16px_35px_rgba(23,40,59,.14)]">{items.map(({ title, description, href, comingSoon }) => comingSoon ? <div key={title} className="rounded-lg px-3 py-3"><div className="flex items-center justify-between gap-3"><span className="text-sm font-semibold text-[#536273]">{title}</span><span className="shrink-0 rounded-full border border-[#d7cebf] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[.12em] text-[#7c8791]">Coming soon</span></div><p className="mt-1 text-xs leading-5 text-[#7c8791]">{description}</p></div> : <a key={title} href={href} className="block rounded-lg px-3 py-3 transition-colors hover:bg-[#ebe5da] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bf7b1c]" onClick={() => setOpenDesktopMenu(null)}><span className="text-sm font-semibold text-[#203951]">{title}</span><p className="mt-1 text-xs leading-5 text-[#667381]">{description}</p></a>)}</div>}</div>; })}<a href="#how-it-works" className="transition-colors hover:text-[#17283b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bf7b1c] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f4f0e7]" data-testid="link-how-it-works-nav">How it works</a>{(['resources'] as NavigationGroup[]).map((group) => { const { label, items } = navigationGroups[group]; const isOpen = openDesktopMenu === group; return <div key={group} className="relative"><button type="button" onClick={() => setOpenDesktopMenu(isOpen ? null : group)} className="inline-flex items-center gap-1.5 transition-colors hover:text-[#17283b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bf7b1c] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f4f0e7]" aria-expanded={isOpen} aria-controls={`desktop-${group}-menu`}>{label}<ChevronDown size={14} aria-hidden="true" /></button>{isOpen && <div id={`desktop-${group}-menu`} className="absolute right-0 top-[calc(100%+1rem)] z-30 w-80 rounded-xl border border-[#d7cebf] bg-[#f9f7f1] p-2 shadow-[0_16px_35px_rgba(23,40,59,.14)]">{items.map(({ title, description, href, comingSoon }) => comingSoon ? <div key={title} className="rounded-lg px-3 py-3"><div className="flex items-center justify-between gap-3"><span className="text-sm font-semibold text-[#536273]">{title}</span><span className="shrink-0 rounded-full border border-[#d7cebf] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[.12em] text-[#7c8791]">Coming soon</span></div><p className="mt-1 text-xs leading-5 text-[#7c8791]">{description}</p></div> : <a key={title} href={href} className="block rounded-lg px-3 py-3 transition-colors hover:bg-[#ebe5da] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bf7b1c]" onClick={() => setOpenDesktopMenu(null)}><span className="text-sm font-semibold text-[#203951]">{title}</span><p className="mt-1 text-xs leading-5 text-[#667381]">{description}</p></a>)}</div>}</div>; })}</nav>
       <div className="flex items-center gap-2"><Link href="/dashboard" className="hidden items-center gap-2 rounded-lg bg-[#203951] px-4 py-2.5 text-xs font-semibold text-[#f8f3e9] shadow-sm transition-transform hover:-translate-y-0.5 sm:inline-flex" data-testid="link-explore-header">Dashboard <ArrowRight size={14} aria-hidden="true" /></Link><Link href="/login" className="hidden rounded-lg px-3 py-2.5 text-xs font-semibold text-[#536273] transition-colors hover:text-[#17283b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bf7b1c] sm:inline-flex" data-testid="link-sign-in-header">Sign in</Link><button type="button" onClick={() => setMobileMenuOpen(true)} className="grid h-10 w-10 place-items-center rounded-lg border border-[#c9bfae] bg-[#f9f6f0] text-[#203951] transition-colors hover:bg-[#ebe5da] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bf7b1c] md:hidden" aria-label="Open navigation menu" aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" data-testid="button-open-mobile-navigation"><Menu size={20} /></button></div>
    </header>
    {mobileMenuOpen && <div className="fixed inset-0 z-30 md:hidden"><button type="button" className="absolute inset-0 bg-[#17283b]/35" onClick={closeMobileMenu} aria-label="Close navigation menu overlay" data-testid="button-close-mobile-navigation-overlay" /><nav id="mobile-navigation" aria-label="Mobile navigation" className="absolute right-0 top-0 flex min-h-full w-full max-w-[22rem] flex-col bg-[#f9f7f1] px-6 py-6 shadow-[-18px_0_45px_rgba(23,40,59,.18)]"><div className="flex items-center justify-between border-b border-[#d7cebf] pb-5"><span className="font-display text-lg font-semibold tracking-tight">Shelter<span className="text-[#c98716]">X</span></span><button type="button" onClick={closeMobileMenu} className="grid h-10 w-10 place-items-center rounded-lg border border-[#d7cebf] text-[#203951] transition-colors hover:bg-[#ebe5da] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bf7b1c]" aria-label="Close navigation menu" data-testid="button-close-mobile-navigation"><X size={20} /></button></div><div className="mt-8 flex flex-col gap-2">{(['platform', 'solutions'] as NavigationGroup[]).map((group) => { const { label, items } = navigationGroups[group]; const isOpen = openMobileGroup === group; return <div key={group} className="border-b border-[#e1d9cb] pb-2"><button type="button" onClick={() => setOpenMobileGroup(isOpen ? null : group)} className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-base font-semibold text-[#536273] transition-colors hover:bg-[#ebe5da] hover:text-[#17283b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bf7b1c]" aria-expanded={isOpen} aria-controls={`mobile-${group}-menu`}>{label}<ChevronDown size={17} aria-hidden="true" className={isOpen ? 'rotate-180 transition-transform' : 'transition-transform'} /></button>{isOpen && <div id={`mobile-${group}-menu`} className="space-y-1 px-4 pb-2">{items.map(({ title, description, href, comingSoon }) => comingSoon ? <div key={title} className="py-2"><div className="flex items-center justify-between gap-3"><span className="text-sm font-semibold text-[#667381]">{title}</span><span className="shrink-0 text-[9px] font-bold uppercase tracking-[.12em] text-[#8b5b1b]">Coming soon</span></div><p className="mt-1 text-xs leading-5 text-[#7c8791]">{description}</p></div> : <a key={title} href={href} onClick={closeMobileMenu} className="block rounded-lg py-2 text-sm font-semibold text-[#203951] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bf7b1c]">{title}<span className="mt-1 block text-xs font-normal leading-5 text-[#667381]">{description}</span></a>)}</div>}</div>; })}<a href="#how-it-works" onClick={closeMobileMenu} className="rounded-lg px-4 py-3 text-base font-semibold text-[#536273] transition-colors hover:bg-[#ebe5da] hover:text-[#17283b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bf7b1c]">How it works</a>{(['resources'] as NavigationGroup[]).map((group) => { const { label, items } = navigationGroups[group]; const isOpen = openMobileGroup === group; return <div key={group} className="border-y border-[#e1d9cb] py-2"><button type="button" onClick={() => setOpenMobileGroup(isOpen ? null : group)} className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-base font-semibold text-[#536273] transition-colors hover:bg-[#ebe5da] hover:text-[#17283b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bf7b1c]" aria-expanded={isOpen} aria-controls={`mobile-${group}-menu`}>{label}<ChevronDown size={17} aria-hidden="true" className={isOpen ? 'rotate-180 transition-transform' : 'transition-transform'} /></button>{isOpen && <div id={`mobile-${group}-menu`} className="space-y-1 px-4 pb-2">{items.map(({ title, description, href, comingSoon }) => comingSoon ? <div key={title} className="py-2"><div className="flex items-center justify-between gap-3"><span className="text-sm font-semibold text-[#667381]">{title}</span><span className="shrink-0 text-[9px] font-bold uppercase tracking-[.12em] text-[#8b5b1b]">Coming soon</span></div><p className="mt-1 text-xs leading-5 text-[#7c8791]">{description}</p></div> : <a key={title} href={href} onClick={closeMobileMenu} className="block rounded-lg py-2 text-sm font-semibold text-[#203951] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bf7b1c]">{title}<span className="mt-1 block text-xs font-normal leading-5 text-[#667381]">{description}</span></a>)}</div>}</div>; })}<Link href="/login" onClick={closeMobileMenu} className="rounded-lg px-4 py-3 text-base font-semibold text-[#536273] transition-colors hover:bg-[#ebe5da] hover:text-[#17283b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bf7b1c]">Sign in</Link></div><Link href="/dashboard" onClick={closeMobileMenu} className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#203951] px-4 py-3.5 text-sm font-semibold text-[#f8f3e9] shadow-sm transition-colors hover:bg-[#294963] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bf7b1c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f9f7f1]" data-testid="link-explore-mobile">Dashboard <ArrowRight size={16} aria-hidden="true" /></Link></nav></div>}
    <main>
      <section className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-10 px-6 pb-20 pt-36 sm:pt-40 lg:grid-cols-[1.05fr_.95fr] lg:px-10 lg:pt-32">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#c9bfae] bg-[#f9f6f0] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.19em] text-[#7b633c]"><span className="h-1.5 w-1.5 rounded-full bg-[#e1a326]" />Emergency shelter intelligence · platform prototype</div>
          <h1 className="font-display text-[clamp(3.25rem,7vw,6.65rem)] font-semibold leading-[.95] tracking-[-.06em]">Smarter Shelter<br /><span className="text-[#bf7b1c]">Decisions</span> When<br />Every Minute Matters.</h1>
          <p className="mt-8 max-w-xl text-base leading-7 text-[#536273] sm:text-lg">ShelterX is designed to help emergency teams understand shelter capacity, critical conditions, and resource availability so they can support faster, safer decisions during disasters.</p>
          <div className="mt-9 flex flex-wrap items-center gap-3"><Link href="/dashboard" className="inline-flex items-center gap-3 rounded-lg bg-[#203951] px-5 py-3.5 text-sm font-semibold text-[#f8f3e9] shadow-[0_8px_20px_rgba(32,57,81,.16)] transition-all hover:-translate-y-0.5 hover:bg-[#294963] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bf7b1c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f0e7]" data-testid="link-explore-dashboard">Open Dashboard <ArrowRight size={17} aria-hidden="true" /></Link><a href="#how-it-works" className="inline-flex items-center gap-2 rounded-lg px-4 py-3.5 text-sm font-semibold text-[#536273] transition-colors hover:text-[#17283b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bf7b1c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f0e7]" data-testid="link-how-it-works">How It Works <ChevronDown size={16} aria-hidden="true" /></a></div>
          <p className="mt-7 flex max-w-xl flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-5 text-[#667381]"><span className="font-semibold text-[#536273]">Designed for emergency operations</span><span aria-hidden="true">•</span><span>Citizens</span><span aria-hidden="true">•</span><span>Shelter Managers</span><span aria-hidden="true">•</span><span>Response Teams</span><span aria-hidden="true">•</span><span>Authorities</span><span aria-hidden="true">•</span><span>Administrators</span></p>
          <div className="mt-12 flex items-center gap-8 border-t border-[#d7cebf] pt-5"><div><p className="font-display text-xl font-semibold">{shelters.length.toString().padStart(2, '0')}</p><p className="mt-0.5 text-[10px] uppercase tracking-[.14em] text-[#7c8791]">Demo shelters</p></div><div><p className="font-display text-xl font-semibold">{totalCapacity.toLocaleString()}</p><p className="mt-0.5 text-[10px] uppercase tracking-[.14em] text-[#7c8791]">Demo capacity</p></div><div><p className="font-display text-xl font-semibold">Demo</p><p className="mt-0.5 text-[10px] uppercase tracking-[.14em] text-[#7c8791]">Illustrative data</p></div></div>
        </div>
        <div className="relative mx-auto h-[420px] w-full max-w-[530px] lg:h-[540px]">
          <p className="sr-only">Illustrative ShelterX dashboard preview showing {occupancyPercentage}% average occupancy across {shelters.length} demo shelters, an occupancy trend, and a capacity-pressure example. This static information is not live operational data.</p>
          <div className="absolute right-0 top-0 h-[86%] w-[88%] rounded-[2rem] bg-[#203951] shadow-[0_25px_70px_rgba(32,57,81,.22)]">
            <div className="absolute inset-0 rounded-[2rem] opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(220,180,97,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(220,180,97,.22) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <div className="relative p-7 text-[#e9e4d8]"><div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#f4b53e]">Demo network pulse</span><span className="flex items-center gap-1.5 text-[10px] text-[#9fb2bc]"><span className="h-1.5 w-1.5 rounded-full bg-[#70c6a0]" />Illustrative</span></div><div className="mt-10 font-display text-6xl font-semibold tracking-[-.06em]">{occupancyPercentage}<span className="text-2xl text-[#a8b5ba]">%</span></div><p className="mt-1 text-xs text-[#a8b5ba]">average occupancy · demo shelters</p><div className="mt-9 h-28 overflow-hidden"><svg aria-hidden="true" focusable="false" viewBox="0 0 430 125" className="h-full w-full" preserveAspectRatio="none"><path d="M0 109 C42 100 47 92 76 98 S119 79 151 86 S188 58 219 71 S254 64 286 53 S324 60 351 39 S392 42 430 12" fill="none" stroke="#f4b53e" strokeWidth="4" /><path d="M0 109 C42 100 47 92 76 98 S119 79 151 86 S188 58 219 71 S254 64 286 53 S324 60 351 39 S392 42 430 12 V125 H0Z" fill="url(#mapFill)" opacity=".25" /><defs><linearGradient id="mapFill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#f4b53e" /><stop offset="1" stopColor="#f4b53e" stopOpacity="0" /></linearGradient></defs></svg></div><div className="mt-3 flex justify-between border-t border-[#557080] pt-3 text-[10px] text-[#91a3ab]"><span>06:00</span><span>12:00</span><span>18:00</span><span>Preview</span></div><p className="mt-3 text-[10px] leading-4 text-[#91a3ab]">Illustrative data only · not live operational information</p></div>
          </div>
          <div className="absolute bottom-3 left-0 w-[235px] rounded-2xl border border-[#d8d0c2] bg-[#fbf9f4] p-4 shadow-[0_18px_40px_rgba(32,57,81,.13)]"><div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-[.15em] text-[#8b5b1b]">Attention required</span><Siren size={16} className="text-[#bf7b1c]" /></div><p className="mt-3 font-display text-lg font-semibold">Ridgeway High</p><p className="mt-1 text-xs leading-5 text-[#667381]">22 spaces remaining · capacity risk rising</p><div className="mt-3 h-1.5 rounded-full bg-[#ede3d0]"><div className="h-full w-[96%] rounded-full bg-[#c85d44]" /></div></div>
          <div className="absolute -right-4 bottom-[23%] grid h-14 w-14 place-items-center rounded-2xl border-4 border-[#f4f0e7] bg-[#f4b53e] text-[#203951] shadow-lg"><Crosshair size={22} /></div>
        </div>
      </section>
      <section aria-labelledby="platform-capabilities" className="border-t border-[#d7cebf] bg-[#f9f7f1] px-6 py-20 lg:px-10 lg:py-24"><div className="mx-auto max-w-7xl"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#b57a25]">Platform capabilities</p><h2 id="platform-capabilities" className="mt-4 max-w-md font-display text-4xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">One platform. One coordinated response.</h2></div><p className="max-w-xl text-sm leading-6 text-[#667381] sm:text-base">ShelterX is designed to bring shelter information and operational awareness together to support better-informed emergency response decisions.</p></div><div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{capabilities.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-[#d7cebf] bg-[#f4f0e7] p-5"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#203951] text-[#f4b53e]"><Icon size={20} strokeWidth={1.7} aria-hidden="true" /></div><h3 className="mt-7 font-display text-xl font-semibold tracking-[-.02em]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#667381]">{text}</p></article>)}</div></div></section>
      <section aria-labelledby="why-shelterx" className="bg-[#203951] px-6 py-20 text-[#f6f1e7] lg:px-10 lg:py-24"><div className="mx-auto max-w-7xl"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#f4b53e]">The operational challenge</p><h2 id="why-shelterx" className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">Why ShelterX?</h2></div><p className="max-w-xl text-sm leading-6 text-[#c3ced0] sm:text-base">Emergency shelter operations can involve changing capacity, resource availability, multiple teams, and decisions that cannot wait for fragmented information.</p></div><div className="mt-12 grid gap-3 sm:grid-cols-2">{operationalChallenges.map(({ number, title, text }) => <article key={title} className="rounded-2xl border border-[#3d5868] bg-[#294963] p-5"><span className="font-mono text-[10px] font-semibold tracking-[.16em] text-[#f4b53e]">{number}</span><h3 className="mt-6 font-display text-xl font-semibold tracking-[-.02em] text-[#f6f1e7]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#c3ced0]">{text}</p></article>)}</div><p className="mt-10 max-w-2xl border-t border-[#3d5868] pt-6 text-sm leading-6 text-[#c3ced0]">ShelterX is designed to bring key shelter information together to support clearer coordination and informed operational decisions.</p></div></section>
      <section className="border-y border-[#d7cebf] bg-[#ebe5da] px-6 py-4"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[.19em] text-[#7b817f]"><span>From disaster signal</span><span className="hidden h-px flex-1 bg-[#cfc5b5] sm:block" /><span className="text-[#203951]">Monitor</span><ArrowRight size={13} /><span className="text-[#203951]">Analyze</span><ArrowRight size={13} /><span className="text-[#203951]">Predict</span><ArrowRight size={13} /><span className="text-[#203951]">Recommend</span><ArrowRight size={13} /><span className="text-[#203951]">Redistribute</span></div></section>
      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#b57a25]">The operating loop</p><h2 className="mt-4 max-w-md font-display text-4xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">From a changing disaster to a confident decision.</h2><p className="mt-5 max-w-sm text-sm leading-6 text-[#667381]">ShelterX gives your operations desk a shared operational picture for what is happening and what needs to happen next.</p></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{steps.map(({ icon: Icon, number, title, text }) => <div key={title} className="group rounded-2xl border border-[#d7cebf] bg-[#f9f7f1] p-4 transition-colors hover:border-[#b9a37d] sm:last:col-span-2 lg:last:col-span-1"><div className="flex items-center justify-between text-[#b57a25]"><Icon size={20} strokeWidth={1.7} /><span className="font-mono text-[10px]">{number}</span></div><h3 className="mt-8 font-display text-lg font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-[#667381]">{text}</p></div>)}</div></div></section>
      <section aria-labelledby="who-shelterx-serves" className="border-t border-[#d7cebf] bg-[#ebe5da] px-6 py-24 lg:px-10 lg:py-32"><div className="mx-auto max-w-7xl"><div className="max-w-2xl"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#b57a25]">Built around people</p><h2 id="who-shelterx-serves" className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">Who ShelterX serves.</h2><p className="mt-5 max-w-xl text-sm leading-6 text-[#667381] sm:text-base">A shared foundation for the people who seek shelter, care for sites, coordinate response, and guide emergency operations.</p></div><div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{roleDefinitions.map(({ id, shortLabel, icon: Icon }) => { const { summary, support } = roleSupport[id]; return <article key={id} className="rounded-2xl border border-[#d7cebf] bg-[#f9f7f1] p-5 shadow-[0_8px_20px_rgba(32,57,81,.05)] transition-colors hover:border-[#b9a37d]"><div className="grid h-10 w-10 place-items-center rounded-xl bg-[#203951] text-[#f4b53e]"><Icon size={20} strokeWidth={1.7} aria-hidden="true" /></div><h3 className="mt-7 font-display text-xl font-semibold tracking-[-.02em]">{shortLabel}</h3><p className="mt-2 text-sm leading-6 text-[#536273]">{summary}</p><p className="mt-5 border-t border-[#e1d9cb] pt-4 text-xs leading-5 text-[#667381]">{support}</p></article>; })}</div></div></section>
      <section className="bg-[#203951] px-6 py-20 text-[#f6f1e7] lg:px-10"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#f4b53e]">Built for the desk</p><h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">The right signal, at the right moment.</h2></div><Link href="/dashboard" className="inline-flex h-fit items-center gap-3 rounded-lg bg-[#f4b53e] px-5 py-3.5 text-sm font-bold text-[#203951] transition-transform hover:-translate-y-0.5" data-testid="link-cta-final">Open Dashboard <ArrowRight size={17} /></Link></div></section>
    </main>
    <footer className="bg-[#203951] px-6 pb-8 pt-3 text-[#aeb9b9] lg:px-10"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-[#3d5868] pt-6 text-xs"><span>© 2024 ShelterX · Emergency operations intelligence</span><span className="flex items-center gap-2"><Sparkles size={13} className="text-[#f4b53e]" /> Designed for moments that matter</span></div></footer>
  </div>;
}
