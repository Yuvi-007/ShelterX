import { useState, type FormEvent } from 'react';
import { Eye, EyeOff, LockKeyhole, MessageSquareText, Phone, UserRound } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { AuthLayout, AuthProviderButton } from '@/components/auth-layout';
import { RoleSelector } from '@/components/role-selector';
import { useAuth } from '@/auth/auth-context';
import type { RoleId } from '@/data/roles';

function getRedirectPath() {
  if (typeof window === 'undefined') return '/dashboard';
  const redirect = new URLSearchParams(window.location.search).get('redirect');
  return redirect?.startsWith('/') && !redirect.startsWith('//') ? redirect : '/dashboard';
}

export default function Login() {
  const [, setLocation] = useLocation();
  const { signIn } = useAuth();
  const queryMode = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('mode')
    : null;
  const [mode, setMode] = useState<'email' | 'phone'>(queryMode === 'phone' ? 'phone' : 'email');
  const [phoneStep, setPhoneStep] = useState<'input' | 'otp'>('input');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [role, setRole] = useState<RoleId>('response');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const finishSignIn = (nextEmail: string, nextPhone?: string) => {
    signIn({
      name: nextEmail ? nextEmail.split('@')[0].replace(/[._-]/g, ' ') : 'ShelterX Demo User',
      email: nextEmail || 'demo@shelterx.local',
      phone: nextPhone,
      role,
    }, rememberMe);
    setLocation(getRedirectPath());
  };

  const handleEmailSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) {
      setError('Enter an email address to continue.');
      return;
    }
    setError('');
    finishSignIn(email.trim());
  };

  const handlePhoneSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phoneStep === 'input') {
      if (phone.replace(/\D/g, '').length < 7) {
        setError('Enter a valid phone number to continue.');
        return;
      }
      setError('');
      setOtpSent(true);
      setPhoneStep('otp');
      return;
    }
    if (!otpSent) return;
    setError('');
    finishSignIn('phone@shelterx.local', phone.trim());
  };

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Sign in to the desk."
      description="Choose a demo role and enter the ShelterX operations workspace. No real account or backend is required for this prototype."
      footer={<span>New to ShelterX? <Link href="/signup" className="font-semibold text-secondary-foreground hover:underline" data-testid="link-signup">Create a demo account</Link></span>}
    >
      <div className="mb-6 flex rounded-xl bg-muted p-1">
        <button type="button" onClick={() => { setMode('email'); setError(''); }} className={`flex-1 rounded-lg px-3 py-2.5 text-xs font-bold transition-all ${mode === 'email' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`} data-testid="button-email-login-mode">
          Email login
        </button>
        <button type="button" onClick={() => { setMode('phone'); setError(''); }} className={`flex-1 rounded-lg px-3 py-2.5 text-xs font-bold transition-all ${mode === 'phone' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`} data-testid="button-phone-login-mode">
          Phone login
        </button>
      </div>

      <div className="space-y-4">
        <AuthProviderButton onClick={() => finishSignIn('google-demo@shelterx.local')}>Continue with Google</AuthProviderButton>
        <div className="flex items-center gap-3 py-1"><span className="h-px flex-1 bg-border" /><span className="text-[10px] font-bold uppercase tracking-[.16em] text-muted-foreground">or continue with {mode}</span><span className="h-px flex-1 bg-border" /></div>
      </div>

      {mode === 'email' ? (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs font-semibold">Email address</span>
            <span className="relative block">
              <UserRound size={16} className="pointer-events-none absolute left-3 top-3.5 text-muted-foreground" />
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="you@example.com" className="h-11 w-full rounded-xl border border-input bg-card pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-ring/20" autoComplete="email" data-testid="input-login-email" />
            </span>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold">Password</span>
            <span className="relative block">
              <LockKeyhole size={16} className="pointer-events-none absolute left-3 top-3.5 text-muted-foreground" />
              <input type={showPassword ? 'text' : 'password'} placeholder="Enter any demo password" className="h-11 w-full rounded-xl border border-input bg-card pl-10 pr-11 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-ring/20" autoComplete="current-password" data-testid="input-login-password" />
              <button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground" aria-label={showPassword ? 'Hide password' : 'Show password'} data-testid="button-toggle-password">
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </span>
          </label>
          <div className="flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="h-4 w-4 rounded border-input accent-primary" data-testid="checkbox-remember-me" />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-xs font-semibold text-secondary-foreground hover:underline" data-testid="link-forgot-password">Forgot password?</Link>
          </div>
          <RoleSelector value={role} onChange={setRole} />
          {error && <p className="rounded-lg bg-red-50 px-3 py-2.5 text-xs font-semibold text-red-700" role="alert">{error}</p>}
          <button type="submit" className="flex h-12 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground shadow-[0_10px_24px_rgba(32,57,81,.16)] transition-transform hover:-translate-y-0.5" data-testid="button-login">Enter ShelterX</button>
        </form>
      ) : (
        <form onSubmit={handlePhoneSubmit} className="space-y-4">
          {phoneStep === 'input' ? (
            <>
              <label className="block">
                <span className="mb-2 block text-xs font-semibold">Phone number</span>
                <span className="flex gap-2">
                  <select className="h-11 w-[104px] rounded-xl border border-input bg-card px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/20" aria-label="Country code" data-testid="select-country-code">
                    <option>+91</option><option>+1</option><option>+44</option><option>+61</option>
                  </select>
                  <span className="relative block flex-1">
                    <Phone size={16} className="pointer-events-none absolute left-3 top-3.5 text-muted-foreground" />
                    <input value={phone} onChange={(event) => setPhone(event.target.value)} type="tel" placeholder="98765 43210" className="h-11 w-full rounded-xl border border-input bg-card pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-ring/20" autoComplete="tel" data-testid="input-login-phone" />
                  </span>
                </span>
              </label>
              <div className="rounded-xl border border-secondary/80 bg-secondary/40 p-3 text-xs leading-5 text-muted-foreground"><MessageSquareText size={15} className="mb-1 text-secondary-foreground" />We’ll send a six-digit demo code to this number.</div>
            </>
          ) : (
            <label className="block">
              <span className="mb-2 block text-xs font-semibold">Verification code</span>
              <input inputMode="numeric" maxLength={6} placeholder="000000" className="h-12 w-full rounded-xl border border-input bg-card px-4 text-center font-display text-2xl tracking-[.45em] outline-none focus:border-primary focus:ring-2 focus:ring-ring/20" data-testid="input-login-otp" />
              <span className="mt-2 flex items-center justify-between text-xs text-muted-foreground"><span>Demo code can be any six digits.</span><button type="button" onClick={() => setOtpSent(true)} className="font-semibold text-secondary-foreground hover:underline" data-testid="button-resend-otp">Resend OTP</button></span>
            </label>
          )}
          <RoleSelector value={role} onChange={setRole} />
          {error && <p className="rounded-lg bg-red-50 px-3 py-2.5 text-xs font-semibold text-red-700" role="alert">{error}</p>}
          <button type="submit" className="flex h-12 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground shadow-[0_10px_24px_rgba(32,57,81,.16)] transition-transform hover:-translate-y-0.5" data-testid={phoneStep === 'input' ? 'button-send-otp' : 'button-verify-otp'}>{phoneStep === 'input' ? 'Continue with phone' : 'Verify and enter ShelterX'}</button>
          {phoneStep === 'otp' && <button type="button" onClick={() => { setPhoneStep('input'); setOtpSent(false); }} className="w-full text-xs font-semibold text-muted-foreground hover:text-foreground" data-testid="button-change-phone">Use a different number</button>}
        </form>
      )}
    </AuthLayout>
  );
}