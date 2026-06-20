/**
 * Presentational on/off switch visual (track + knob) shared across the Filters
 * options and the Catalog Live/Promo toggles, so all switches share one
 * geometry. The knob uses logical `end`/`start` so it mirrors in RTL. The
 * caller supplies the interactive <button role="switch"> wrapper.
 */
export function ProtoSwitchVisual({ on, tone = 'teal' }: { on: boolean; tone?: 'teal' | 'amber' }) {
  const onBg =
    tone === 'amber'
      ? 'bg-gradient-to-r from-amber-500 to-orange-500'
      : 'bg-gradient-to-r from-teal-600 to-emerald-500';
  return (
    <span
      className={`relative inline-block h-6 w-10 shrink-0 rounded-full transition-colors ${on ? onBg : 'bg-slate-200 dark:bg-slate-600'}`}
      aria-hidden
    >
      <span
        className={`absolute top-0.5 ${on ? 'end-0.5' : 'start-0.5'} h-5 w-5 rounded-full bg-white shadow-md transition-all dark:bg-slate-900`}
      />
    </span>
  );
}
