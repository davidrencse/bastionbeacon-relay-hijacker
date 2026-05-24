import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { ScenarioSummary } from '../types';

interface ScenarioCardProps {
  scenario: ScenarioSummary;
}

export default function ScenarioCard({ scenario }: ScenarioCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="panel flex h-full flex-col p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">{scenario.difficulty}</p>
          <h3 className="mt-2 text-lg font-semibold text-white">{scenario.title}</h3>
        </div>
        <div className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300">
          Risk {scenario.previewRiskScore}
        </div>
      </div>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{scenario.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {scenario.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between text-sm text-slate-400">
        <span>{scenario.phaseCount} phases</span>
        <span>{scenario.endpointCount} endpoints</span>
      </div>
      <Link
        to={`/scenarios/${scenario.id}`}
        className="mt-5 inline-flex items-center justify-center rounded-xl bg-cyan-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-400"
      >
        Launch simulation
      </Link>
    </motion.article>
  );
}
