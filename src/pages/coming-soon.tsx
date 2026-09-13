import { ArrowLeft, BarChart3, BellRing, CircleUserRound, Settings, UsersRound } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { AppShell } from '@/components/app-shell';

const meta = {
  '/analytics': { eyebrow: 'Signal intelligence', title: 'Analytics is coming soon.', text: 'Historical patterns, district comparisons, and forecast views are being prepared for the next operations release.', icon: BarChart3 },
  '/alerts': { eyebrow: 'Response queue', title: 'Alerts is coming soon.', text: 'A focused triage workspace for escalating, assigning, and resolving network signals is on the way.', icon: BellRing },
  '/profile': { eyebrow: 'Workspace', title: 'Profile is coming soon.', text: 'Your operator profile and notification preferences will live here in the next release.', icon: CircleUserRound },
  '/settings': { eyebrow: 'Workspace', title: 'Settings is coming soon.', text: 'Configure network thresholds and display preferences when this area is ready.', icon: Settings },
  '/users': { eyebrow: 'System access', title: 'Users is coming soon.', text: 'Manage the people and demo roles connected to ShelterX when this area is ready.', icon: UsersRound },
};

export default function ComingSoon() {
  const [location] = useLocation();
  const page = meta[location as keyof typeof meta] ?? meta['/analytics'];
  const Icon = page.icon;
  return <AppShell><div className="flex min-h-[calc(100dvh-72px)] items-center justify-center px-5 py-16"><div className="max-w-lg text-center"><div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary text-accent shadow-[0_14px_35px_rgba(32,57,81,.15)]"><Icon size={27} /></div><p className="mt-8 text-[10px] font-bold uppercase tracking-[.22em] text-secondary-foreground">{page.eyebrow}</p><h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{page.title}</h1><p className="mx-auto mt-5 max-w-md text-sm leading-6 text-muted-foreground">{page.text}</p><div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-muted-foreground"><span className="h-2 w-2 rounded-full bg-accent" />Planned for a future release</div><div><Link href="/dashboard" className="mt-9 inline-flex items-center gap-2 text-xs font-semibold text-secondary-foreground hover:underline" data-testid="link-return-command-center"><ArrowLeft size={14} />Return to command center</Link></div></div></div></AppShell>;
}