import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SafetyBanner from './SafetyBanner';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen grid-lines">
      <SafetyBanner />
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <Link to="/" className="text-lg font-semibold tracking-wide text-white">
              BastionBeacon Relay Hijacker
            </Link>
            <p className="text-sm text-slate-400">Synthetic relay takeover simulation workspace</p>
          </div>
          <nav className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className={`rounded-full px-4 py-2 ${location.pathname === '/' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              Scenario Gallery
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      <footer className="border-t border-slate-800 bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-slate-500 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
          <span>Portfolio-ready browser simulation with real backend-driven state.</span>
          <span>Frontend expects API at VITE_API_BASE_URL or http://localhost:3000.</span>
        </div>
      </footer>
    </div>
  );
}
