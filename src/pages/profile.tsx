import { useState } from 'react';
import { Check, LogOut, Mail, Pencil, Phone, ShieldCheck, UserRound } from 'lucide-react';
import { useLocation } from 'wouter';
import { AppShell } from '@/components/app-shell';
import { useAuth } from '@/auth/auth-context';
import { roleById } from '@/data/roles';

function initials(name: string) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || 'SX';
}

export default function Profile() {
  const { user, updateProfile, signOut } = useAuth();
  const [, setLocation] = useLocation();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  if (!user) return null;

  const role = roleById[user.role];
  const saveProfile = () => {
    updateProfile({ name: name.trim() || user.name, email: email.trim() || user.email, phone: phone.trim() || undefined });
    setEditing(false);
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-[1100px] px-5 py-7 sm:px-8 lg:px-10">
        <div className="mb-8"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-secondary-foreground">Workspace</p><h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Your profile</h1><p className="mt-2 text-sm text-muted-foreground">Manage the demo identity and role used in this ShelterX session.</p></div>
        <div className="grid gap-5 lg:grid-cols-[.75fr_1.25fr]">
          <section className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-sm sm:p-8">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-accent font-display text-2xl font-semibold text-accent-foreground">{initials(user.name)}</div>
            <p className="mt-7 text-[10px] font-bold uppercase tracking-[.2em] text-primary-foreground/55">Signed in as</p>
            <h2 className="mt-2 font-display text-2xl font-semibold">{user.name}</h2>
            <p className="mt-1 text-sm text-primary-foreground/65">{user.email}</p>
            <div className="mt-8 flex items-center gap-2 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 px-3.5 py-3 text-xs"><span className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-accent-foreground"><role.icon size={15} /></span><span><span className="block font-semibold">{role.label}</span><span className="text-primary-foreground/55">{role.access}</span></span></div>
            <div className="mt-8 flex items-center gap-2 text-xs text-primary-foreground/65"><span className="h-2 w-2 rounded-full bg-emerald-400" />{user.accountStatus} · local session</div>
          </section>
          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-secondary-foreground">Account details</p><h2 className="mt-2 font-display text-2xl font-semibold">Identity & access</h2></div>{!editing && <button type="button" onClick={() => setEditing(true)} className="inline-flex items-center gap-2 rounded-lg border border-border px-3.5 py-2.5 text-xs font-semibold hover:bg-muted" data-testid="button-edit-profile"><Pencil size={14} />Edit profile</button>}</div>
            {editing ? (
              <div className="mt-7 space-y-4">
                <label className="block"><span className="mb-2 block text-xs font-semibold">Full name</span><span className="relative block"><UserRound size={16} className="pointer-events-none absolute left-3 top-3.5 text-muted-foreground" /><input value={name} onChange={(event) => setName(event.target.value)} className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/20" data-testid="input-profile-name" /></span></label>
                <label className="block"><span className="mb-2 block text-xs font-semibold">Email</span><span className="relative block"><Mail size={16} className="pointer-events-none absolute left-3 top-3.5 text-muted-foreground" /><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/20" data-testid="input-profile-email" /></span></label>
                <label className="block"><span className="mb-2 block text-xs font-semibold">Phone number <span className="font-normal text-muted-foreground">(optional)</span></span><span className="relative block"><Phone size={16} className="pointer-events-none absolute left-3 top-3.5 text-muted-foreground" /><input value={phone} onChange={(event) => setPhone(event.target.value)} type="tel" className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/20" data-testid="input-profile-phone" /></span></label>
                <div className="flex flex-wrap gap-2 pt-2"><button type="button" onClick={saveProfile} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground" data-testid="button-save-profile"><Check size={14} />Save changes</button><button type="button" onClick={() => setEditing(false)} className="rounded-lg border border-border px-4 py-2.5 text-xs font-semibold hover:bg-muted" data-testid="button-cancel-profile">Cancel</button></div>
              </div>
            ) : (
              <div className="mt-7 divide-y divide-border rounded-xl border border-border">
                <div className="flex items-center gap-3 p-4"><UserRound size={17} className="text-secondary-foreground" /><div><p className="text-[10px] uppercase tracking-[.15em] text-muted-foreground">Full name</p><p className="mt-1 text-sm font-semibold">{user.name}</p></div></div>
                <div className="flex items-center gap-3 p-4"><Mail size={17} className="text-secondary-foreground" /><div><p className="text-[10px] uppercase tracking-[.15em] text-muted-foreground">Email address</p><p className="mt-1 text-sm font-semibold">{user.email}</p></div></div>
                <div className="flex items-center gap-3 p-4"><Phone size={17} className="text-secondary-foreground" /><div><p className="text-[10px] uppercase tracking-[.15em] text-muted-foreground">Phone number</p><p className="mt-1 text-sm font-semibold">{user.phone ?? 'Not added'}</p></div></div>
                <div className="flex items-center gap-3 p-4"><ShieldCheck size={17} className="text-secondary-foreground" /><div><p className="text-[10px] uppercase tracking-[.15em] text-muted-foreground">Account status</p><p className="mt-1 text-sm font-semibold">{user.accountStatus}</p></div></div>
              </div>
            )}
            <button type="button" onClick={() => { signOut(); setLocation('/'); }} className="mt-7 inline-flex items-center gap-2 text-xs font-semibold text-red-700 transition-colors hover:text-red-800" data-testid="button-logout"><LogOut size={14} />Log out of this demo session</button>
          </section>
        </div>
      </div>
    </AppShell>
  );
}