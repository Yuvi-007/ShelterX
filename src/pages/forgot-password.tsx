import { useState, type FormEvent } from 'react';
import { Mail, Send } from 'lucide-react';
import { Link } from 'wouter';
import { AuthLayout } from '@/components/auth-layout';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.trim()) setSent(true);
  };

  return (
    <AuthLayout
      eyebrow="Account recovery"
      title="Reset access."
      description="This prototype does not send real email, but this flow is ready for a real recovery provider later."
      footer={<span>Remembered your password? <Link href="/login" className="font-semibold text-secondary-foreground hover:underline" data-testid="link-back-login">Return to sign in</Link></span>}
    >
      {sent ? (
        <div className="rounded-2xl border border-secondary bg-secondary/40 p-6 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-secondary text-secondary-foreground"><Send size={19} /></span>
          <h2 className="mt-4 font-display text-xl font-semibold">Recovery instructions queued.</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">In a connected version, we would send reset instructions to <span className="font-semibold text-foreground">{email}</span>.</p>
          <Link href="/login" className="mt-6 inline-flex rounded-xl bg-primary px-4 py-3 text-xs font-bold text-primary-foreground" data-testid="link-return-signin">Return to sign in</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block"><span className="mb-2 block text-xs font-semibold">Email address</span><span className="relative block"><Mail size={16} className="pointer-events-none absolute left-3 top-3.5 text-muted-foreground" /><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required placeholder="you@example.com" className="h-11 w-full rounded-xl border border-input bg-card pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/20" data-testid="input-forgot-email" /></span></label>
          <button type="submit" className="flex h-12 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground" data-testid="button-send-reset">Send recovery instructions</button>
        </form>
      )}
    </AuthLayout>
  );
}