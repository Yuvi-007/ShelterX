import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Activity, ChevronRight, Menu, ShieldCheck, X } from 'lucide-react';
import { useAuth } from '@/auth/auth-context';
import { getNavigationForRole, roleById } from '@/data/roles';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const navigation = getNavigationForRole(user?.role ?? 'response');
  const initials = user?.name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || 'OD';
  const roleLabel = user ? roleById[user.role].shortLabel : 'Operations Desk';
  return <div className="min-h-[100dvh] bg-background text-foreground">
    <aside className={`fixed inset-y-0 left-0 z-40 w-[258px] border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex h-full flex-col px-4 py-5">
        <div className="flex items-center justify-between px-3">
          <Link href="/" className="flex items-center gap-3" data-testid="link-brand">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground"><ShieldCheck size={20} strokeWidth={2.5} /></span>
            <span><span className="block font-display text-[19px] font-semibold tracking-tight">Shelter<span className="text-sidebar-primary">X</span></span><span className="block text-[9px] uppercase tracking-[0.2em] text-sidebar-foreground/45">Response intelligence</span></span>
          </Link>
          <button className="text-sidebar-foreground/60 lg:hidden" onClick={() => setOpen(false)} aria-label="Close navigation" data-testid="button-close-navigation"><X size={20} /></button>
        </div>
        <div className="mt-11 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-sidebar-foreground/40">Operations</div>
        <nav className="mt-3 space-y-1">
          {navigation.operations.map(({ href, label, icon: Icon, count }) => <Link key={href} href={href} onClick={() => setOpen(false)} data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`} className={`group flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors ${location === href || (href === '/shelters' && location.startsWith('/shelters/')) ? 'bg-sidebar-primary font-semibold text-sidebar-primary-foreground' : 'text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`}>
            <Icon size={18} /><span className="flex-1">{label}</span>{count && <span className={`grid h-5 min-w-5 place-items-center rounded-md px-1 text-[10px] font-bold ${location === href ? 'bg-sidebar-primary-foreground/15' : 'bg-sidebar-foreground/10'}`}>{count}</span>}
          </Link>)}
        </nav>
        <div className="mt-9 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-sidebar-foreground/40">Workspace · {roleLabel}</div>
        <nav className="mt-3 space-y-1">
          {navigation.workspace.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={() => setOpen(false)} data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-sidebar-foreground/65 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${location === href ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}><Icon size={18} />{label}</Link>)}
        </nav>
        <div className="mt-auto rounded-xl border border-sidebar-border bg-sidebar-accent/45 p-3.5">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-sidebar-primary"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sidebar-primary" />Live system</div>
          <p className="mt-2 text-xs leading-relaxed text-sidebar-foreground/55">Last network sync <span className="text-sidebar-foreground/80">2 min ago</span></p>
        </div>
      </div>
    </aside>
    {open && <button className="fixed inset-0 z-30 bg-slate-950/35 lg:hidden" onClick={() => setOpen(false)} aria-label="Close navigation overlay" data-testid="button-navigation-overlay" />}
    <div className="lg:pl-[258px]">
      <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-border/70 bg-background/90 px-5 backdrop-blur-md sm:px-8">
        <div className="flex items-center gap-3"><button className="rounded-lg p-2 hover:bg-muted lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation" data-testid="button-open-navigation"><Menu size={21} /></button><div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex"><Activity size={14} className="text-secondary-foreground" /> Network operating normally <span className="ml-1 h-1.5 w-1.5 rounded-full bg-emerald-500" /></div></div>
        <Link href="/profile" className="flex items-center gap-4" data-testid="link-header-profile"><div className="hidden text-right sm:block"><p className="text-sm font-semibold">{user?.name ?? 'Operations Desk'}</p><p className="text-[11px] text-muted-foreground">{roleLabel} · Tuesday, 18 June 2024 · 20:42</p></div><div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{initials}</div></Link>
      </header>
      <main>{children}</main>
    </div>
  </div>;
}

export function StatusPill({ status }: { status: string }) {
  const key = status.toLowerCase();
  const styles = key === 'safe' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/15' : key === 'moderate' ? 'bg-amber-50 text-amber-700 ring-amber-600/15' : key === 'high' ? 'bg-orange-50 text-orange-700 ring-orange-600/15' : 'bg-red-50 text-red-700 ring-red-600/15';
  return <span data-testid={`status-${key}`} className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] ring-1 ${styles}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{status}</span>;
}

export function SectionHeading({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: React.ReactNode }) {
  return <div className="mb-5 flex items-end justify-between gap-4"><div>{eyebrow && <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.19em] text-secondary-foreground">{eyebrow}</p>}<h2 className="font-display text-xl font-semibold tracking-tight text-foreground">{title}</h2></div>{action}</div>;
}

export function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary-foreground transition-all hover:gap-2.5" data-testid={`link-${href.replaceAll('/', '') || 'home'}`}>{children}<ChevronRight size={15} /></Link>;
}