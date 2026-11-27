export const inputClass =
  "h-12 w-full rounded-xl border border-navy/15 bg-white px-4 text-sm text-navy placeholder:text-slate/60 transition focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/20 disabled:cursor-not-allowed disabled:bg-ivory aria-[invalid=true]:border-red-600";

export function Field({ label, htmlFor, error, className, children }: { label: string; htmlFor: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-700">{error}</p>}
    </div>
  );
}
