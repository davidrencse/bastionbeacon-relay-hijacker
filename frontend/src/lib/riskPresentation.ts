export function getRiskBand(score: number) {
  if (score >= 85) return { label: 'Critical', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' };
  if (score >= 65) return { label: 'High', color: 'text-amber-300', bg: 'bg-amber-500/10 border-amber-500/30' };
  if (score >= 40) return { label: 'Elevated', color: 'text-yellow-300', bg: 'bg-yellow-500/10 border-yellow-500/30' };
  return { label: 'Low', color: 'text-lime-300', bg: 'bg-lime-500/10 border-lime-500/30' };
}
