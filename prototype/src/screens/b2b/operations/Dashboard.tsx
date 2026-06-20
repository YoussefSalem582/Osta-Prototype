import { useMemo, useState } from 'react';
import { ProtoHomeIndicator, ProtoStatusBar } from '../../../components/proto/Chrome';
import { ProtoIcon } from '../../../components/proto/Icon';
import { B2bTabBar, B2bTopbarMobile } from '../../../components/proto/TabBars';
import { useProto } from '../../../context/ProtoContext';
import { ScreenWrap } from '../../shared/ScreenWrap';

export function B2bDashboard() {
  const { show, t } = useProto();
  const lineUp = [
    [t('demo.slot.t1100', '11:00'), t('demo.customer.youssef_s', 'Youssef S.'), t('demo.b2b.svc.oil_std', 'Oil (std)'), 'new', 'b-blue', true],
    [t('demo.slot.t1000', '10:00'), t('demo.customer.karim_h', 'Karim H.'), t('demo.b2b.svc.brake_pads', 'Brake pads'), 'in_progress', 'b-amber', true],
    [t('demo.slot.t0900', '09:00'), t('demo.customer.layla_m', 'Layla M.'), t('demo.b2b.svc.oil_filter', 'Oil+filter'), 'done', 'b-green', true],
  ] as const;
  const lineupStatus = (k: string) =>
    k === 'new'
      ? t('b2b.ops.new', 'New')
      : k === 'in_progress'
        ? t('b2b.ops.in_progress', 'In progress')
        : t('b2b.ops.done', 'Done');

  const kpiHints = useMemo(
    () => [
      t('b2b.dash.kpi_detail.book', '7 jobs on the board today (+2 vs yesterday).'),
      t('b2b.dash.kpi_detail.rev', 'Revenue accrued from completed payouts this period.'),
      t('b2b.dash.kpi_detail.rating', 'Rolling avg from verified customer reviews.'),
      t('b2b.dash.kpi_detail.accept', 'Share of requests you confirmed without reject.'),
    ],
    [t],
  );
  const [kpiIx, setKpiIx] = useState<number | null>(null);
  const [openLine, setOpenLine] = useState<string | null>(null);
  const [mechFocus, setMechFocus] = useState(0);

  return (
    <ScreenWrap id="b2b-dashboard">
      <ProtoStatusBar />
      <div className="flex-1 flex flex-col min-h-0 app-surface">
        <B2bTopbarMobile title={t('b2b.top.today', 'AutoPro · Today')} />
        <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
          <div className="grid grid-cols-2 gap-2">
            {[0, 1, 2, 3].map((index) => {
              const teal = index === 0;
              const violet = index === 1;
              const amber = index === 2;
              const emerald = index === 3;
              const palette = teal ? 'teal' : violet ? 'violet' : amber ? 'amber' : 'emerald';
              const pressed = kpiIx === index;
              return (
                <button
                  key={palette}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => setKpiIx((x) => (x === index ? null : index))}
                  className={`kpi-tile kpi-tile--${palette} tap p-3 pl-4 text-left transition ring-offset-2 ring-offset-slate-100 dark:ring-offset-slate-900 ${
                    pressed
                      ? index === 0
                        ? 'ring-2 ring-teal-500 shadow-md scale-[1.02]'
                        : index === 1
                          ? 'ring-2 ring-violet-500 shadow-md scale-[1.02]'
                          : index === 2
                            ? 'ring-2 ring-amber-500 shadow-md scale-[1.02]'
                            : 'ring-2 ring-emerald-500 shadow-md scale-[1.02]'
                      : 'hover:brightness-[1.02]'
                  }`}
                >
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wide">
                    {index === 0 ? t('b2b.dash.kpi.book', 'Bookings') : index === 1 ? t('b2b.dash.kpi.rev', 'Revenue') : index === 2 ? t('b2b.dash.kpi.rating', 'Rating') : t('b2b.dash.kpi.accept', 'Accept')}
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {index === 0
                      ? t('demo.b2b.kpi.bookings_n', '7')
                      : index === 1
                        ? t('demo.b2b.kpi.revenue_k', '3.4k')
                        : index === 2
                          ? t('demo.search.r1_stars', '4.8')
                          : t('demo.b2b.kpi.accept_pct', '96%')}
                  </div>
                  <div
                    className={`text-[10px] font-semibold ${
                      emerald || teal ? 'text-emerald-600 dark:text-emerald-400' : violet ? 'text-violet-600 dark:text-violet-400' : 'text-amber-700 dark:text-amber-300'
                    }`}
                  >
                    {index === 0
                      ? t('b2b.dash.kpi.vs_y', '+2 vs yesterday')
                      : index === 1
                        ? t('b2b.dash.kpi.egp', 'EGP')
                        : index === 2 ? (
                          <>
                            {t('demo.b2b.kpi.rev_n', '62')} {t('b2b.dash.kpi.rev_suffix', 'rev.')}
                          </>
                        ) : (
                          t('b2b.dash.kpi.ok', 'OK')
                        )}
                  </div>
                </button>
              );
            })}
          </div>
          {kpiIx !== null ? (
            <div className="rounded-xl border border-teal-100 bg-teal-50/85 px-3 py-2.5 text-xs leading-relaxed text-teal-950 shadow-sm dark:border-teal-800/60 dark:bg-teal-950/40 dark:text-teal-100" role="status">
              <ProtoIcon name="info" className="mr-1 inline h-3.5 w-3.5 align-text-bottom" aria-hidden />
              {kpiHints[kpiIx]}
            </div>
          ) : null}
          <div className="app-panel p-3">
            <div className="flex justify-between items-center mb-2">
              <div className="font-bold text-sm text-slate-900 dark:text-slate-100">{t('b2b.dash.lineup', 'Today’s line-up')}</div>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <span className="dot bg-red-500" />
                {t('demo.b2b.dash_new_n', '1')} {t('b2b.dash.new', 'new')}
              </span>
            </div>
            {lineUp.map(([time, cust, svc, label, badge, act]) => {
              const rowKey = `${time}|${cust}`;
              const isOpen = openLine === rowKey;
              return (
              <div key={time + cust} className="mb-2 last:mb-0">
                <button
                  type="button"
                  className="tap w-full text-start rounded-xl border border-slate-100 bg-gradient-to-r from-white to-slate-50/80 p-2.5 dark:border-slate-600/90 dark:from-slate-900 dark:to-slate-800/95 hover:border-teal-200/60 dark:hover:border-teal-500/35"
                  onClick={act ? () => show('b2b-booking') : undefined}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100">{time}</div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{cust}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{svc}</div>
                    </div>
                    <span className={`badge ${badge} text-[10px]`}>{lineupStatus(label)}</span>
                  </div>
                </button>
                <div className="mt-1 flex gap-1.5 px-1">
                  <button
                    type="button"
                    className={`tap rounded-lg border px-2 py-1 text-[11px] font-semibold shadow-sm transition ${
                      isOpen ? 'border-teal-400 bg-teal-50 text-teal-950 dark:bg-teal-950/55 dark:text-teal-50' : 'border-transparent bg-transparent text-teal-700 dark:text-teal-400'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenLine((k) => (k === rowKey ? null : rowKey));
                    }}
                  >
                    {t('b2b.dash.line_actions', 'Actions')}
                  </button>
                  {isOpen ? (
                    <button
                      type="button"
                      className="tap rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-800 shadow-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t('b2b.dash.start_bay', 'Start')}
                    </button>
                  ) : null}
                  {isOpen ? (
                    <button
                      type="button"
                      className="tap rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 shadow-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        show('b2b-booking');
                      }}
                    >
                      {t('b2b.dash.manage', 'Manage')}
                    </button>
                  ) : null}
                </div>
              </div>
            );})}
            <button
              type="button"
              className="tap w-full rounded-lg pt-1 text-center text-xs font-semibold text-teal-700 hover:underline dark:text-teal-400"
              onClick={() => show('b2b-bookings')}
            >
              {t('b2b.dash.full_cal', 'Full calendar')}
            </button>
          </div>
          <div className="app-panel p-3">
            <div className="font-bold text-sm mb-2 text-slate-900 dark:text-slate-100">{t('b2b.dash.mech', 'Mechanics')}</div>
            {(
              [
                [t('demo.b2b.mech_ahmed', 'Ahmed'), 2, 3],
                [t('demo.b2b.mech_hassan', 'Hassan'), 3, 3],
                [t('demo.b2b.mech_karim', 'Karim'), 0, 3],
              ] as const
            ).map(([n, b, cap], ix) => (
              <button
                key={n}
                type="button"
                onClick={() => setMechFocus(ix)}
                className={`mb-2 w-full rounded-xl py-2 pl-3 pr-2 text-left tap transition ring-offset-2 ring-offset-[#f8fafc] last:mb-0 dark:ring-offset-slate-900 ${
                  mechFocus === ix ? 'bg-teal-50 ring-2 ring-teal-400/70 dark:bg-teal-950/35 dark:ring-teal-700/65' : 'hover:bg-slate-50/90 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex justify-between text-xs">
                  <span className="flex items-center gap-1 font-semibold text-slate-900 dark:text-slate-100">
                    {mechFocus === ix ? <ProtoIcon name="wrench" className="h-3.5 w-3.5 text-teal-600" aria-hidden /> : null}
                    {n}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {t(
                      ix === 0 ? 'demo.b2b.mech_slots_1' : ix === 1 ? 'demo.b2b.mech_slots_2' : 'demo.b2b.mech_slots_3',
                      `${b}/${cap}`,
                    )}
                  </span>
                </div>
                <div
                  className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800/80"
                  role="progressbar"
                  aria-valuenow={b}
                  aria-valuemin={0}
                  aria-valuemax={cap}
                  aria-label={`${n}: ${b}/${cap}`}
                >
                  <div className={`h-full transition-all duration-300 ${mechFocus === ix ? 'bg-teal-500' : 'bg-teal-600'}`} style={{ width: `${(b / cap) * 100}%` }} />
                </div>
              </button>
            ))}
          </div>
          <div className="rounded-xl p-3 text-xs bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/35 border border-amber-200/70 dark:border-amber-800/50 shadow-sm text-amber-950 dark:text-amber-100">
            {t('demo.b2b.rev_need_banner_n', '3')} {t('b2b.dash.rev_banner', 'reviews')} {t('b2b.dash.rev_need', 'need a reply.')}{' '}
            <button
              type="button"
              className="text-teal-800 dark:text-teal-300 font-semibold tap rounded underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/70"
              onClick={() => show('b2b-reviews')}
            >
              {t('b2b.dash.open', 'Open')}
            </button>
          </div>
        </div>
      </div>
      <B2bTabBar active="dashboard" />
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}