import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="panel p-10 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">404</p>
      <h1 className="mt-3 text-3xl font-bold text-white">Simulation route not found</h1>
      <p className="mt-3 text-sm text-slate-400">The requested path does not match an available page.</p>
      <Link to="/" className="mt-6 inline-flex rounded-xl bg-cyan-500 px-4 py-2 font-medium text-slate-950">
        Return to scenario gallery
      </Link>
    </div>
  );
}
