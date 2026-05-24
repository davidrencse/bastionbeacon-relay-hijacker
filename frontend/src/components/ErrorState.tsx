interface ErrorStateProps {
  title: string;
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({ title, message, onRetry }: ErrorStateProps) {
  return (
    <div className="panel p-6 text-center">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm text-slate-400">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 hover:bg-cyan-500/20"
        >
          Retry
        </button>
      ) : null}
    </div>
  );
}
