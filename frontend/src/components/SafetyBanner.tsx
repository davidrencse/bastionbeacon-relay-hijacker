export default function SafetyBanner() {
  return (
    <div className="border-b border-cyan-500/20 bg-cyan-500/10">
      <div className="mx-auto max-w-7xl px-4 py-2 text-xs font-medium tracking-wide text-cyan-200 sm:px-6 lg:px-8">
        Simulation-only environment: all endpoints, relay paths, beacon traffic, and takeover actions are synthetic and local-safe.
      </div>
    </div>
  );
}
