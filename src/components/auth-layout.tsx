import { ArrowLeft, ArrowRight, ShieldCheck, Siren, Waves } from 'lucide-react';
import { Link } from 'wouter';

export function AuthLayout({
  eyebrow,
  title,
  description,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <div className="grid min-h-[100dvh] lg:grid-cols-[.9fr_1.1fr]">
        <section className="relative hidden overflow-hidden bg-primary px-10 py-10 text-primary-foreground lg:flex lg:flex-col">
          <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'linear-gradient(rgba(244,181,62,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(244,181,62,.2) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
          <div className="relative z-10 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground shadow-lg">
              <ShieldCheck size={21} strokeWidth={2.4} />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">
              Shelter<span className="text-accent">X</span>
            </span>
          </div>
          <div className="relative z-10 mt-auto max-w-xl pb-6">
            <p className="text-[10px] font-bold uppercase tracking-[.22em] text-accent">Emergency response intelligence</p>
            <h2 className="mt-5 max-w-lg font-display text-5xl font-semibold leading-[.98] tracking-[-.05em]">
              The right signal, at the right moment.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-6 text-primary-foreground/65">
              A shared operating picture for people making shelter decisions under pressure.
            </p>
            <div className="mt-10 grid max-w-md grid-cols-2 gap-3">
              <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-4">
                <Waves size={18} className="text-accent" />
                <p className="mt-7 font-display text-2xl font-semibold">08</p>
                <p className="mt-1 text-[10px] uppercase tracking-[.15em] text-primary-foreground/55">Sites online</p>
              </div>
              <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-4">
                <Siren size={18} className="text-accent" />
                <p className="mt-7 font-display text-2xl font-semibold">02m</p>
                <p className="mt-1 text-[10px] uppercase tracking-[.15em] text-primary-foreground/55">Signal freshness</p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col px-5 py-6 sm:px-10 sm:py-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground" data-testid="link-auth-back">
              <ArrowLeft size={14} /> Back to ShelterX
            </Link>
            <span className="text-[10px] font-bold uppercase tracking-[.18em] text-muted-foreground">Prototype access</span>
          </div>
          <div className="mx-auto flex w-full max-w-[520px] flex-1 items-center py-12">
            <div className="w-full">
              <div className="mb-8">
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-secondary-foreground">{eyebrow}</p>
                <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-.04em] sm:text-5xl">{title}</h1>
                <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
              {children}
              <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">{footer}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export function AuthProviderButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold shadow-sm transition-colors hover:bg-muted" data-testid="button-google-login">
      <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[11px] font-bold text-[#4285f4] shadow-sm">G</span>
      {children}
      <ArrowRight size={15} className="ml-auto text-muted-foreground" />
    </button>
  );
}