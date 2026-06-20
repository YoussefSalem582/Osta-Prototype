import { useEffect, useState } from 'react';
import { B2cTabBar } from '../../../components/proto/TabBars';
import { ProtoHomeIndicator, ProtoStatusBar } from '../../../components/proto/Chrome';
import { ProtoIcon } from '../../../components/proto/Icon';
import { useProto } from '../../../context/ProtoContext';
import { ScreenWrap } from '../../shared/ScreenWrap';

type CardHistItem = {
  date: string;
  service: string;
  shop: string;
  price: string;
  auto: boolean;
  /** Demo booking reference when auto-logged */
  bookingRef?: string;
};

export function B2cGarage() {
  const { show, t } = useProto();
  return (
    <ScreenWrap id="b2c-garage">
      <ProtoStatusBar />
      <div className="px-5 pt-3 pb-2 flex items-center justify-between bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700/80">
        <div className="font-bold text-xl tracking-tight text-slate-900 dark:text-slate-100">{t('acct.garage.title', 'My garage')}</div>
        <button
          type="button"
          aria-label={t('acct.garage.add_a11y', 'Add car')}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center text-white shadow-md tap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
        >
          <ProtoIcon name="plus" className="w-4 h-4" aria-hidden />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pt-4 space-y-3 app-surface min-h-0">
        <button
          type="button"
          className="tap w-full text-left p-4 rounded-2xl text-white shadow-lg shadow-teal-900/25 gradient-garage-primary ring-1 ring-white/20 active:scale-[0.992] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          onClick={() => show('b2c-cardetail')}
          aria-label={t('acct.garage.primary_open', 'Open vehicle details: Toyota Corolla')}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs uppercase tracking-wider opacity-80">{t('acct.garage.primary', 'Primary')}</div>
              <div className="text-xl font-bold mt-0.5">{t('demo.garage.corolla_title', 'Toyota Corolla')}</div>
              <div className="text-sm opacity-80">{t('demo.garage.meta_line', '2019 · 82,450 km · س ب ج 7421')}</div>
            </div>
            <ProtoIcon name="car" className="w-10 h-10 opacity-70" aria-hidden />
          </div>
          <div className="divider my-3 opacity-30" />
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <div className="opacity-70">{t('acct.garage.last', 'Last service')}</div>
              <div className="font-semibold mt-0.5">{t('demo.garage.last_detail', '29 Mar · AC')}</div>
            </div>
            <div>
              <div className="opacity-70">{t('acct.garage.next', 'Next due')}</div>
              <div className="font-semibold mt-0.5">{t('demo.garage.next_detail', 'Oil · 1.2k km')}</div>
            </div>
            <div>
              <div className="opacity-70">{t('acct.garage.spent', 'Spent YTD')}</div>
              <div className="font-semibold mt-0.5">{t('demo.garage.spent_ytd', 'EGP 2,430')}</div>
            </div>
          </div>
        </button>
        <button
          type="button"
          className="tap w-full text-left p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600/90 shadow-sm ring-1 ring-indigo-500/5 active:bg-slate-50/90 dark:active:bg-slate-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          onClick={() => show('b2c-cardetail')}
          aria-label={t('acct.garage.secondary_open', 'Open vehicle details: Hyundai Tucson')}
        >
          <div className="flex justify-between items-center gap-2">
            <div className="min-w-0">
              <div className="font-semibold text-slate-900 dark:text-slate-100">{t('demo.garage.tucson_title', 'Hyundai Tucson')}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{t('demo.garage.tucson_meta', '2022 · 24,100 km')}</div>
            </div>
            <ProtoIcon name="chevron-right" className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" aria-hidden />
          </div>
        </button>
        <button
          type="button"
          className="tap w-full p-4 rounded-2xl border-2 border-dashed border-teal-300/80 dark:border-teal-600/50 text-teal-800 dark:text-teal-200 bg-teal-50/40 dark:bg-teal-950/35 text-sm font-semibold flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
        >
          <ProtoIcon name="plus" className="w-4 h-4" aria-hidden />
          {t('acct.garage.add', 'Add another car')}
        </button>
      </div>
      <B2cTabBar active="garage" />
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}

export function B2cCardetail() {
  const { show, t, locale } = useProto();
  const [manualOpen, setManualOpen] = useState(false);
  const [histDetail, setHistDetail] = useState<number | null>(null);
  const [toast, setToast] = useState(false);
  const [svcDraft, setSvcDraft] = useState('');
  const [priceDraft, setPriceDraft] = useState('');
  const [surfaceHint, setSurfaceHint] = useState<string | null>(null);

  useEffect(() => {
    if (!surfaceHint) return;
    const tm = window.setTimeout(() => setSurfaceHint(null), 4200);
    return () => window.clearTimeout(tm);
  }, [surfaceHint]);

  useEffect(() => {
    if (!manualOpen && histDetail === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setManualOpen(false);
        setHistDetail(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [manualOpen, histDetail]);

  useEffect(() => {
    if (!toast) return;
    const tm = window.setTimeout(() => setToast(false), 4400);
    return () => window.clearTimeout(tm);
  }, [toast]);

  const saveManualDemo = () => {
    setManualOpen(false);
    setHistDetail(null);
    setSvcDraft('');
    setPriceDraft('');
    setToast(true);
  };

  const histItems: CardHistItem[] = [
    {
      date: t('demo.card.hist1_date', '29 Mar'),
      service: t('demo.card.hist1_svc', 'AC recharge'),
      shop: t('demo.card.hist1_shop', 'QuickFix Nasr City'),
      price: t('demo.card.hist1_price', 'EGP 450'),
      auto: true,
      bookingRef: t('demo.track.booking_id', '#CC-4A1F9'),
    },
    {
      date: t('demo.card.hist2_date', '8 Feb'),
      service: t('demo.card.hist2_svc', 'Oil + filter'),
      shop: t('demo.card.hist2_shop', 'AutoPro Heliopolis'),
      price: t('demo.card.hist2_price', 'EGP 520'),
      auto: true,
      bookingRef: t('acct.card.demo_ref_b', '#CC-3891C'),
    },
    {
      date: t('demo.card.hist3_date', '12 Dec'),
      service: t('demo.card.hist3_svc', 'Front brake pads'),
      shop: t('demo.card.hist3_shop', 'Toyota Authorized'),
      price: t('demo.card.hist3_price', 'EGP 950'),
      auto: true,
      bookingRef: t('acct.card.demo_ref_c', '#CC-2019D'),
    },
    {
      date: t('demo.card.hist4_date', '3 Nov'),
      service: t('demo.card.hist4_svc', 'Tire rotation'),
      shop: t('demo.card.hist4_shop', 'Cairo Motors (manual entry)'),
      price: t('demo.card.hist4_price', 'EGP 120'),
      auto: false,
    },
  ];

  function statToneClass(tone: 'cyan' | 'violet' | 'amber') {
    if (tone === 'cyan') return 'bg-cyan-50 dark:bg-cyan-950/45 text-cyan-900 dark:text-cyan-100';
    if (tone === 'violet') return 'bg-violet-50 dark:bg-violet-950/45 text-violet-900 dark:text-violet-100';
    return 'bg-amber-50 dark:bg-amber-950/45 text-amber-900 dark:text-amber-100';
  }

  const statsTiles = [
    {
      label: t('acct.card.stat.mileage', 'Mileage'),
      value: t('demo.card.stat_km', '82,450 km'),
      tone: 'cyan' as const,
      action: 'mileage' as const,
    },
    {
      label: t('acct.card.stat.bookings', 'Bookings'),
      value: '14',
      tone: 'violet' as const,
      action: 'bookings' as const,
    },
    {
      label: t('acct.card.stat.spent', 'Spent'),
      value: t('demo.card.stat_spent', 'EGP 7,820'),
      tone: 'amber' as const,
      action: 'spent' as const,
    },
  ];

  const onStatTap = (action: 'mileage' | 'bookings' | 'spent') => {
    if (action === 'mileage') setSurfaceHint(t('acct.card.stat_mileage_hint', 'Shown from last odometer update — drill into history for receipts.'));
    if (action === 'bookings') show('b2c-bookings');
    if (action === 'spent') show('b2c-expenses');
  };

  const detailRow = histDetail !== null ? histItems[histDetail] : null;
  const rtl = locale === 'ar-EG';
  // Directional chevrons mirror globally in RTL via the .lucide-chevron-* rule
  // in prototype.css — no per-icon workaround needed here.

  return (
    <ScreenWrap id="b2c-cardetail">
      <div className="flex flex-col flex-1 min-h-0 h-full relative">
        <ProtoStatusBar />
        <div className="screen-topbar">
          <button
            type="button"
            className="funnel-back tap -ml-1 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            onClick={() => show('b2c-garage')}
            aria-label={t('a11y.back', 'Back')}
          >
            <ProtoIcon name="arrow-left" className="w-5 h-5" />
          </button>
          <div className="font-semibold text-slate-900 dark:text-slate-100 truncate">{t('acct.card.title_bar', 'Toyota Corolla 2019')}</div>
          <button
            type="button"
            aria-label={t('acct.card.edit_a11y', 'Edit vehicle')}
            className="tap w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/45 text-violet-700 dark:text-violet-300 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 active:scale-[0.97]"
            onClick={() => setSurfaceHint(t('acct.card.edit_hint', 'Vehicle profile editing is coming in a future release.'))}
          >
            <ProtoIcon name="pencil" className="w-5 h-5" />
          </button>
        </div>

        <div
          className="mx-5 mt-3 mb-2 flex gap-3 rounded-2xl border border-slate-200/90 dark:border-slate-600/85 bg-white/90 dark:bg-slate-900/90 p-3.5 shadow-sm ring-1 ring-black/[0.03]"
          aria-label={t('acct.card.identity_a11y', 'Vehicle identifiers')}
        >
          <div
            className="w-[3.65rem] h-[3.65rem] rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center shrink-0 shadow-inner ring-1 ring-black/5"
            aria-hidden
          >
            <ProtoIcon name="car" className="w-8 h-8 text-slate-600 dark:text-slate-200" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{t('acct.card.identity_label', 'This vehicle')}</div>
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-1 leading-snug truncate">{t('demo.garage.meta_line', '2019 · 82,450 km · س ب ج 7421')}</div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5 text-xs text-slate-600 dark:text-slate-400">
              <span className="inline-flex items-center gap-1">
                <ProtoIcon name="fingerprint" className="w-3.5 h-3.5 opacity-75 shrink-0" aria-hidden />
                {t('acct.card.vin_hint', 'VIN ending ···9F8421')}
              </span>
            </div>
          </div>
        </div>

        {surfaceHint ? (
          <div role="status" className="mx-5 mb-2 rounded-xl px-3 py-2.5 text-[12px] leading-snug font-medium text-indigo-950 dark:text-indigo-50 bg-indigo-50 dark:bg-indigo-950/50 ring-1 ring-indigo-200/85 dark:ring-indigo-800/55 shadow-sm">
            {surfaceHint}
          </div>
        ) : null}

        <div className="flex-1 overflow-y-auto overflow-x-hidden px-5 pt-2 app-surface proto-scroll min-h-0 pb-6">
          <div className="grid grid-cols-3 gap-2.5 mb-6">
            {statsTiles.map((tile) => (
              <button
                key={tile.label}
                type="button"
                onClick={() => onStatTap(tile.action)}
                className={`${statToneClass(tile.tone)} relative p-3.5 rounded-2xl text-center shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.06] min-h-[4.85rem] flex flex-col justify-center tap transition-transform active:scale-[0.98] hover:brightness-[1.03] dark:hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 dark:focus-visible:ring-offset-slate-950`}
                aria-label={t('acct.card.stat_tile_a11y', '{label}: {value}')
                  .replace('{label}', tile.label)
                  .replace('{value}', tile.value)}
              >
                <div className="text-[10px] font-bold uppercase tracking-wide opacity-80 leading-none">{tile.label}</div>
                <div className="font-bold text-[15px] mt-2 leading-none tabular-nums">{tile.value}</div>
              </button>
            ))}
          </div>

          <h2 className="label mb-2.5">{t('acct.card.reminders', 'Reminders')}</h2>
          <button
            type="button"
            className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/50 dark:to-amber-950/45 border border-orange-200/80 dark:border-orange-800/55 flex gap-3 items-start shadow-sm text-start tap hover:border-orange-300/90 dark:hover:border-orange-700/65 active:scale-[0.995] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
            onClick={() => show('b2c-reminder')}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-md" aria-hidden>
              <ProtoIcon name="bell" className="w-[18px] h-[18px] text-white" />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="font-semibold text-sm text-slate-900 dark:text-slate-100 leading-snug">{t('acct.card.oil_due', 'Oil change due in 1,200 km')}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{t('acct.card.oil_sub', 'Based on your last change on 8 Feb')}</div>
            </div>
            <div className="flex flex-col items-end shrink-0 gap-1 pt-0.5">
              <ProtoIcon name="chevron-right" className="w-5 h-5 text-orange-600/85 dark:text-orange-400" aria-hidden />
              <span className="text-[11px] font-bold text-orange-800 dark:text-orange-300 whitespace-nowrap">{t('acct.card.reminder_cta', 'Schedule')}</span>
            </div>
          </button>

          <div className="flex items-center justify-between gap-2 mt-8 mb-3">
            <h2 id="svc-history-heading" className="label m-0">
              {t('acct.card.history', 'Service history')}
            </h2>
            <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">{t('acct.card.history_hint', 'Tap a row')}</span>
          </div>
          <ul className="space-y-3 list-none p-0 m-0" aria-labelledby="svc-history-heading">
            {histItems.map((row, i) => (
              <li key={`${row.service}-${row.date}`}>
                <button
                  type="button"
                  onClick={() => setHistDetail(i)}
                  className={`w-full text-start rounded-2xl border border-slate-200/95 dark:border-slate-600/90 bg-white dark:bg-slate-900 px-4 py-3.5 shadow-sm ring-1 ring-black/[0.02] dark:ring-white/[0.04] tap transition-all hover:border-teal-200/90 dark:hover:border-teal-800/65 hover:shadow-md active:scale-[0.994] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 dark:focus-visible:ring-offset-slate-950`}
                  aria-label={t('acct.card.history_row_a11y', 'View details · {service}').replace('{service}', row.service)}
                >
                  <div className={`flex gap-3 items-start ${rtl ? 'flex-row-reverse' : ''}`}>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-[15px] text-slate-900 dark:text-slate-100 leading-snug pr-1">{row.service}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">{row.shop}</div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mt-2.5">
                        <span
                          className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                            row.auto
                              ? 'bg-teal-50 text-teal-800 dark:bg-teal-950/55 dark:text-teal-200 ring-1 ring-teal-200/70 dark:ring-teal-800/50'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 ring-1 ring-slate-200/80 dark:ring-slate-600/80'
                          }`}
                        >
                          {row.auto ? (
                            <>
                              <ProtoIcon name="zap" className="w-3 h-3 shrink-0 opacity-90" aria-hidden />
                              {t('acct.card.auto_short', 'From booking')}
                            </>
                          ) : (
                            t('acct.card.manual_short', 'Manual')
                          )}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500 tabular-nums">{row.date}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between shrink-0 gap-2 pt-0.5">
                      <span className="text-lg font-bold tabular-nums text-slate-900 dark:text-slate-100 leading-none">{row.price}</span>
                      <ProtoIcon name="chevron-right" className="w-5 h-5 text-slate-300 dark:text-slate-600" aria-hidden />
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>

          <div className="sticky bottom-3 z-[4] mt-8 pt-2 pb-1 bg-gradient-to-t from-[#e8edf3] via-[#e8eef4]/92 to-transparent dark:from-slate-950 dark:via-slate-950/90 dark:to-transparent rounded-b-2xl">
            <button
              type="button"
              className="w-full py-3.5 rounded-2xl border-2 border-dashed border-teal-300/85 dark:border-teal-700/65 text-sm font-semibold tap text-teal-900 dark:text-teal-100 bg-white/95 dark:bg-slate-900/95 shadow-md hover:border-teal-400 dark:hover:border-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              onClick={() => {
                setHistDetail(null);
                setManualOpen(true);
              }}
            >
              {t('acct.card.add_manual', '+ Add manual entry')}
            </button>
          </div>
        </div>

        {toast ? (
          <div
            role="status"
            className="absolute bottom-[5.25rem] left-5 right-5 z-[60] px-4 py-3 rounded-2xl bg-teal-900 text-white shadow-xl text-sm flex items-start gap-2 ring-2 ring-teal-500/35"
          >
            <ProtoIcon name="check-circle" className="w-5 h-5 shrink-0 text-teal-200" aria-hidden />
            <span className="leading-snug">{t('acct.card.manual_saved', 'Saved locally — Phase 2 will sync with your bookings.')}</span>
            <button type="button" className="ml-auto text-xs font-semibold text-teal-200 tap shrink-0" onClick={() => setToast(false)}>
              {t('common.dismiss', 'Dismiss')}
            </button>
          </div>
        ) : null}

        {histDetail !== null && detailRow ? (
          <div className="absolute inset-0 z-[56] flex items-end justify-center sm:items-center p-4 sm:p-6">
            <button
              type="button"
              aria-label={t('acct.card.sheet_close_bg', 'Close')}
              className="absolute inset-0 bg-black/45 dark:bg-black/60 backdrop-blur-[2px]"
              onClick={() => setHistDetail(null)}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="hist-sheet-title"
              className="relative w-full max-w-[22rem] rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-2xl p-5 max-h-[min(88vh,28rem)] overflow-y-auto proto-scroll text-start"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">{detailRow.date}</div>
                  <h2 id="hist-sheet-title" className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1 leading-snug">
                    {detailRow.service}
                  </h2>
                </div>
                <button
                  type="button"
                  aria-label={t('acct.card.sheet_done', 'Done')}
                  className="tap p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0"
                  onClick={() => setHistDetail(null)}
                >
                  <ProtoIcon name="x" className="w-5 h-5" />
                </button>
              </div>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-slate-100 dark:border-slate-700/85 pb-3">
                  <dt className="text-slate-500 dark:text-slate-400">{t('acct.card.sheet_shop', 'Provider')}</dt>
                  <dd className="font-medium text-slate-900 dark:text-slate-100 text-end">{detailRow.shop}</dd>
                </div>
                <div className="flex justify-between gap-4 items-baseline">
                  <dt className="text-slate-500 dark:text-slate-400">{t('acct.card.sheet_amount', 'Amount')}</dt>
                  <dd className="font-bold tabular-nums text-lg text-slate-900 dark:text-slate-100">{detailRow.price}</dd>
                </div>
              </dl>
              <div className="mt-4 rounded-xl bg-slate-50 dark:bg-slate-800/90 px-3 py-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {detailRow.auto ? (
                  <>
                    <div className="font-semibold text-teal-800 dark:text-teal-200 flex items-center gap-1.5">
                      <ProtoIcon name="link" className="w-3.5 h-3.5" aria-hidden />
                      {t('acct.card.hist_linked', 'Linked to CarCare booking')}
                    </div>
                    {detailRow.bookingRef ? <div className="font-mono mt-1 text-slate-700 dark:text-slate-300">{detailRow.bookingRef}</div> : null}
                  </>
                ) : (
                  <span>{t('acct.card.hist_manual_blurb', 'Recorded outside the app — edit from your receipts anytime in Phase 2.')}</span>
                )}
              </div>
              {detailRow.auto ? (
                <>
                  <button
                    type="button"
                    className="mt-3 w-full py-3 rounded-xl font-semibold border border-slate-200 dark:border-slate-600 tap text-slate-800 dark:text-slate-100 text-sm shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800"
                    onClick={() => {
                      setHistDetail(null);
                      show('b2c-map');
                    }}
                  >
                    {t('acct.card.hist_open_map', 'Centre on map')}
                  </button>
                  <button
                    type="button"
                    className="mt-2 w-full py-3.5 rounded-xl font-semibold btn-primary tap shadow-md shadow-teal-900/15"
                    onClick={() => {
                      setHistDetail(null);
                      show('b2c-progress');
                    }}
                  >
                    {t('acct.card.hist_view_booking', 'View booking status')}
                  </button>
                </>
              ) : (
                <button type="button" className="mt-5 w-full py-3.5 rounded-xl font-semibold border border-slate-200 dark:border-slate-600 tap text-slate-700 dark:text-slate-200" onClick={() => setHistDetail(null)}>
                  {t('acct.card.hist_close', 'Got it')}
                </button>
              )}
            </div>
          </div>
        ) : null}

        {manualOpen ? (
          <div className="absolute inset-0 z-[55] flex items-end justify-center sm:items-center p-4 sm:p-6">
            <button
              type="button"
              aria-label={t('acct.card.manual_close_a11y', 'Close')}
              className="absolute inset-0 bg-black/45 dark:bg-black/60 backdrop-blur-[2px]"
              onClick={() => setManualOpen(false)}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="manual-sheet-title"
              className="relative w-full max-w-[22rem] rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-2xl p-5 max-h-[min(92vh,32rem)] overflow-y-auto proto-scroll"
            >
              <div className="flex items-start justify-between gap-2 mb-4">
                <h2 id="manual-sheet-title" className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  {t('acct.card.manual_sheet_title', 'Add service (manual)')}
                </h2>
                <button
                  type="button"
                  aria-label={t('acct.card.manual_close_a11y', 'Close')}
                  className="tap p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-teal-500"
                  onClick={() => setManualOpen(false)}
                >
                  <ProtoIcon name="x" className="w-5 h-5" />
                </button>
              </div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1.5" htmlFor="manual-svc">
                {t('acct.card.manual_svc_label', 'Service name')}
              </label>
              <input
                id="manual-svc"
                autoComplete="off"
                placeholder={t('acct.card.manual_svc_ph', 'e.g. Coolant flush')}
                value={svcDraft}
                onChange={(e) => setSvcDraft(e.target.value)}
                className="w-full mb-4 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 text-[15px] focus:outline-none focus:ring-2 focus:ring-teal-500/80"
              />
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1.5" htmlFor="manual-price">
                {t('acct.card.manual_price_label', 'Amount (EGP)')}
              </label>
              <input
                id="manual-price"
                inputMode="decimal"
                autoComplete="off"
                placeholder="0"
                value={priceDraft}
                onChange={(e) => setPriceDraft(e.target.value)}
                className="w-full mb-6 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 text-[15px] focus:outline-none focus:ring-2 focus:ring-teal-500/80 tabular-nums"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex-1 py-3 rounded-xl font-semibold border border-slate-200 dark:border-slate-600 tap text-slate-800 dark:text-slate-100"
                  onClick={() => setManualOpen(false)}
                >
                  {t('acct.card.manual_cancel', 'Cancel')}
                </button>
                <button type="button" className="flex-1 py-3 rounded-xl font-semibold btn-accent tap shadow-md" onClick={saveManualDemo}>
                  {t('acct.card.manual_save', 'Save')}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">{t('acct.card.manual_footnote', 'Demo — not stored.')}</p>
            </div>
          </div>
        ) : null}
        <ProtoHomeIndicator />
      </div>
    </ScreenWrap>
  );
}

