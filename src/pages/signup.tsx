import { useState, type FormEvent } from 'react';
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { AuthLayout, AuthProviderButton } from '@/components/auth-layout';
import { RoleSelector } from '@/components/role-selector';
import { useAuth } from '@/auth/auth-context';
import type { RoleId } from '@/data/roles';

export default function Signup() {
  const [, setLocation] = useLocation();
  const { signIn } = useAuth();
  const [role, setRole] = useState<RoleId>('citizen');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const completeSignup = (nextName: string, nextEmail: string) => {
    signIn({ name: nextName, email: nextEmail, role });
    setLocation('/dashboard');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      setError('Complete the required fields to create your demo account.');
      return;
    }
    if (password.length < 6) {
      setError('Use at least six characters for the demo password.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    completeSignup(name.trim(), email.trim());
  };

  return (
    <AuthLayout
      eyebrow="Create access"
      title="Create a demo account."
      description="Preview ShelterX from the perspective of the person who needs shelter, manages a site, or coordinates the response."
      footer={<span>Already have access? <Link href="/login" className="font-semibold text-secondary-foreground hover:underline" data-testid="link-login">Sign in</Link></span>}
    >
      <div className="space-y-4">
        <AuthProviderButton onClick={() => completeSignup('Google Demo User', 'google-demo@shelterx.local')}>Continue with Google</AuthProviderButton>
        <Link href="/login?mode=phone" className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold shadow-sm transition-colors hover:bg-muted" data-testid="link-phone-signup">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-secondary text-secondary-foreground"><span className="text-xs">+</span></span>
          Continue with Phone
        </Link>
        <div className="flex items-center gap-3 py-1"><span className="h-px flex-1 bg-border" /><span className="text-[10px] font-bold uppercase tracking-[.16em] text-muted-foreground">or use email</span><span className="h-px flex-1 bg-border" /></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block"><span className="mb-2 block text-xs font-semibold">Full name</span><span className="relative block"><UserRound size={16} className="pointer-events-none absolute left-3 top-3.5 text-muted-foreground" /><input value={name} onChange={(event) => setName(event.target.value)} type="text" placeholder="Your full name" className="h-11 w-full rounded-xl border border-input bg-card pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/20" autoComplete="name" data-testid="input-signup-name" /></span></label>
        <label className="block"><span className="mb-2 block text-xs font-semibold">Email address</span><span className="relative block"><Mail size={16} className="pointer-events-none absolute left-3 top-3.5 text-muted-foreground" /><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="you@example.com" className="h-11 w-full rounded-xl border border-input bg-card pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/20" autoComplete="email" data-testid="input-signup-email" /></span></label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block"><span className="mb-2 block text-xs font-semibold">Password</span><span className="relative block"><LockKeyhole size={16} className="pointer-events-none absolute left-3 top-3.5 text-muted-foreground" /><input value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? 'text' : 'password'} placeholder="At least 6 characters" className="h-11 w-full rounded-xl border border-input bg-card pl-10 pr-10 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/20" autoComplete="new-password" data-testid="input-signup-password" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 top-3 text-muted-foreground" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label>
          <label className="block"><span className="mb-2 block text-xs font-semibold">Confirm password</span><span className="relative block"><LockKeyhole size={16} className="pointer-events-none absolute left-3 top-3.5 text-muted-foreground" /><input value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type={showPassword ? 'text' : 'password'} placeholder="Repeat password" className="h-11 w-full rounded-xl border border-input bg-card pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/20" autoComplete="new-password" data-testid="input-signup-confirm-password" /></span></label>
        </div>
        <RoleSelector value={role} onChange={setRole} />
        {error && <p className="rounded-lg bg-red-50 px-3 py-2.5 text-xs font-semibold text-red-700" role="alert">{error}</p>}
        <button type="submit" className="flex h-12 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground shadow-[0_10px_24px_rgba(32,57,81,.16)] transition-transform hover:-translate-y-0.5" data-testid="button-signup">Create demo account</button>
      </form>
    </AuthLayout>
  );
}