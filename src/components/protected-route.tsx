import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/auth/auth-context';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated && location !== '/login') {
      setLocation(`/login?redirect=${encodeURIComponent(location)}`);
    }
  }, [isAuthenticated, location, setLocation]);

  if (!isAuthenticated) {
    return (
      <div className="grid min-h-[100dvh] place-items-center bg-background px-6 text-center">
        <div>
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary text-accent">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          </span>
          <p className="mt-4 text-sm font-semibold">Checking access</p>
          <p className="mt-1 text-xs text-muted-foreground">Preparing your operations workspace.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}