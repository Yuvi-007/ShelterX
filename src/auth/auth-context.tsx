import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { RoleId } from '@/data/roles';

export type DemoUser = {
  name: string;
  email: string;
  phone?: string;
  role: RoleId;
  accountStatus: 'Demo account';
};

type AuthContextValue = {
  user: DemoUser | null;
  isAuthenticated: boolean;
  signIn: (user: Omit<DemoUser, 'accountStatus'>, rememberMe?: boolean) => void;
  signOut: () => void;
  updateProfile: (updates: Partial<Pick<DemoUser, 'name' | 'email' | 'phone'>>) => void;
};

const AUTH_STORAGE_KEY = 'shelterx-demo-session';
const AUTH_SESSION_KEY = 'shelterx-demo-session-temporary';
const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUser() {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(AUTH_STORAGE_KEY)
    ?? window.sessionStorage.getItem(AUTH_SESSION_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as DemoUser;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    window.sessionStorage.removeItem(AUTH_SESSION_KEY);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(readStoredUser);
  const [remembered, setRemembered] = useState(() => {
    if (typeof window === 'undefined') return true;
    return Boolean(window.localStorage.getItem(AUTH_STORAGE_KEY));
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    window.sessionStorage.removeItem(AUTH_SESSION_KEY);
    if (user) {
      const storage = remembered ? window.localStorage : window.sessionStorage;
      storage.setItem(
        remembered ? AUTH_STORAGE_KEY : AUTH_SESSION_KEY,
        JSON.stringify(user),
      );
    }
  }, [remembered, user]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAuthenticated: Boolean(user),
    signIn: (nextUser, rememberMe = true) => {
      const signedInUser = { ...nextUser, accountStatus: 'Demo account' as const };
      setRemembered(rememberMe);
      setUser(signedInUser);
    },
    signOut: () => {
      setUser(null);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
        window.sessionStorage.removeItem(AUTH_SESSION_KEY);
      }
    },
    updateProfile: (updates) => {
      setUser((current) => current ? { ...current, ...updates } : current);
    },
  }), [remembered, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}