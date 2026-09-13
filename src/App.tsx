import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import Landing from '@/pages/landing';
import Dashboard from '@/pages/dashboard';
import Shelters from '@/pages/shelters';
import ShelterDetail from '@/pages/shelter-detail';
import ComingSoon from '@/pages/coming-soon';
import Login from '@/pages/login';
import Signup from '@/pages/signup';
import ForgotPassword from '@/pages/forgot-password';
import Profile from '@/pages/profile';
import { AuthProvider } from '@/auth/auth-context';
import { ProtectedRoute } from '@/components/protected-route';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

function Router() {
  return <RoutedErrorBoundary><Switch>
    <Route path="/" component={Landing} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/dashboard">{() => <ProtectedRoute><Dashboard /></ProtectedRoute>}</Route>
    <Route path="/shelters">{() => <ProtectedRoute><Shelters /></ProtectedRoute>}</Route>
    <Route path="/shelters/:id">{() => <ProtectedRoute><ShelterDetail /></ProtectedRoute>}</Route>
    <Route path="/analytics">{() => <ProtectedRoute><ComingSoon /></ProtectedRoute>}</Route>
    <Route path="/alerts">{() => <ProtectedRoute><ComingSoon /></ProtectedRoute>}</Route>
    <Route path="/profile">{() => <ProtectedRoute><Profile /></ProtectedRoute>}</Route>
    <Route path="/settings">{() => <ProtectedRoute><ComingSoon /></ProtectedRoute>}</Route>
    <Route path="/users">{() => <ProtectedRoute><ComingSoon /></ProtectedRoute>}</Route>
    <Route component={NotFound} />
  </Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><AuthProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter></AuthProvider><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;