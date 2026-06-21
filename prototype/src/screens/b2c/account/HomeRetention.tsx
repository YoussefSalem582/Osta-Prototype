import { B2cTabBar } from '../../../components/proto/TabBars';
import { ProtoHomeIndicator, ProtoStatusBar } from '../../../components/proto/Chrome';
import { ProtoIcon } from '../../../components/proto/Icon';
import { useProto } from '../../../context/ProtoContext';
import { ScreenWrap } from '../../shared/ScreenWrap';

function greetingKey(): 'acct.dash.greet_morning' | 'acct.dash.greet_afternoon' | 'acct.dash.greet_evening' {
  const h = new Date().getHours();
  if (h < 12) return 'acct.dash.greet_morning';
  if (h < 17) return 'acct.dash.greet_afternoon';
  return 'acct.dash.greet_evening';
}

export function B2cDashboard() {
  const { show, t } = useProto();
  const greetK = greetingKey();
  const greetFallback =
    greetK === 'acct.dash.greet_morning'
      ? 'Good morning,'
      : greetK === 'acct.dash.greet_afternoon'
        ? 'Good afternoon,'
        : 'Good evening,';
  return (
    <ScreenWrap id="b2c-dashboard">
      <ProtoStatusBar />
      <div className="px-5 pt-3 pb-3 flex items-center justify-between bg-gradient-to-r from-white via-teal-50/30 to-indigo-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 border-b border-slate-100 dark:border-slate-700/80">
        <div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            {t(greetK, greetFallback)}          </div>
          <div className="t-h1 text-slate-900 dark:text-slate-100">{t('acct.dash.demo_first_name', 'Youssef')}</div>
        </div>
        <button
          type="button"
          aria-label={t('acct.dash.avatar_a11y', 'Garage')}
          className="w-11 h-11 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold shadow-md tap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
          onClick={() => show('b2c-garage')}
        >
          {t('acct.dash.demo_avatar_initial', 'Y')}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 space-y-4 pt-4 app-surface min-h-0">
        <section aria-labelledby="dash-alert-title" className="p-4 rounded-2xl text-white bg-gradient-to-br from-orange-500 via-amber-500 to-rose-500 shadow-lg shadow-orange-500/25 ring-1 ring-white/10">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 ring-1 ring-white/25" aria-hidden>
              <ProtoIcon name="bell" className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 id="dash-alert-title" className="font-bold text-[15px] leading-snug">
                {t('acct.dash.remind_title', 'Oil change due soon')}
              </h2>
              <p className="text-sm text-white/90 mt-1 leading-relaxed">{t('acct.dash.remind_sub', 'Due in ~1,200 km · book at 3 verified shops nearby')}</p>
            </div>
          </div>
          <button
            type="button"
            className="mt-3.5 w-full py-2.5 rounded-xl bg-white text-slate-900 text-sm font-semibold tap shadow-sm ring-1 ring-black/5 dark:bg-slate-950/25 dark:text-white dark:ring-white/10"
            onClick={() => show('b2c-reminder')}
          >
            {t('acct.dash.recs', 'See recommendations')}
          </button>
        </section>

        <nav aria-label={t('acct.dash.quick_nav_a11y', 'Shortcuts')} className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => show('b2c-map')}
            className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-slate-200/90 dark:border-slate-600/85 bg-white/90 dark:bg-slate-900/90 py-3 px-2 tap shadow-sm hover:border-teal-300/70 dark:hover:border-teal-700/65 active:scale-[0.98] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <ProtoIcon name="map" className="w-[22px] h-[22px] text-teal-600 dark:text-teal-400" aria-hidden />
            <span className="text-[10px] font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200">{t('acct.dash.quick_map', 'Map')}</span>
          </button>
          <button
            type="button"
            onClick={() => show('b2c-reminder')}
            className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-slate-200/90 dark:border-slate-600/85 bg-white/90 dark:bg-slate-900/90 py-3 px-2 tap shadow-sm hover:border-orange-300/70 dark:hover:border-orange-800/65 active:scale-[0.98] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            <ProtoIcon name="calendar-check" className="w-[22px] h-[22px] text-orange-600 dark:text-orange-400" aria-hidden />
            <span className="text-[10px] font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200">{t('acct.dash.quick_book', 'Book oil')}</span>
          </button>
          <button
            type="button"
            onClick={() => show('b2c-garage')}
            className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-slate-200/90 dark:border-slate-600/85 bg-white/90 dark:bg-slate-900/90 py-3 px-2 tap shadow-sm hover:border-teal-300/70 dark:hover:border-teal-700/65 active:scale-[0.98] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <ProtoIcon name="car" className="w-[22px] h-[22px] text-teal-600 dark:text-teal-400" aria-hidden />
            <span className="text-[10px] font-bold uppercase tracking-wide text-slate-700 dark:text-slate-200">{t('acct.dash.quick_garage', 'Garage')}</span>
          </button>
        </nav>

        <section className="app-panel p-4 shadow-sm ring-1 ring-black/[0.03] dark:ring-white/[0.06]" aria-labelledby="dash-health-title">
          <h2 id="dash-health-title" className="label mb-3">
            {t('acct.dash.health', 'Car health')}
          </h2>
          <div className="flex items-end gap-2 mb-3">
            <div className="t-display text-teal-700 dark:text-teal-300 tabular-nums">{t('demo.dash.health_score', '82')}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 pb-1">{t('acct.dash.good', '/ 100 · Good')}</div>
          </div>
          <div
            className="h-2 rounded-full bg-slate-100 dark:bg-slate-800/80 overflow-hidden ring-1 ring-slate-200/80 dark:ring-slate-700/60"
            role="img"
            aria-label={t('acct.dash.health_meter_a11y', 'Health meter: 82 of 100')}
          >
            <div className="h-full rounded-full bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 transition-[width] duration-300 ease-out" style={{ width: '82%' }} />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-center leading-tight">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/45 text-emerald-900 dark:text-emerald-100 font-semibold border border-emerald-100 dark:border-emerald-800/55">
              {t('acct.dash.eng_ok', 'Engine: OK')}
            </div>
            <button
              type="button"
              onClick={() => show('b2c-reminder')}
              className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/45 text-amber-900 dark:text-amber-100 font-semibold border border-amber-200 dark:border-amber-800/55 tap hover:bg-amber-100/90 dark:hover:bg-amber-900/55 active:scale-[0.98] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ring-offset-1 ring-offset-white dark:ring-offset-slate-900"
              aria-label={t('acct.dash.oil_chip_a11y', 'Book oil change reminder')}
            >
              {t('acct.dash.oil_due', 'Oil: Due')}
            </button>
            <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/45 text-cyan-900 dark:text-cyan-100 font-semibold border border-cyan-100 dark:border-cyan-800/55">
              {t('acct.dash.tires_ok', 'Tires: OK')}
            </div>
          </div>
        </section>

        <section className="app-panel p-4 shadow-sm ring-1 ring-black/[0.03] dark:ring-white/[0.06]">
          <div className="flex justify-between items-center mb-1">
            <h2 className="label">{t('acct.dash.upcoming', 'Upcoming')}</h2>
            <button
              type="button"
              className="text-xs text-teal-700 dark:text-teal-400 font-semibold tap py-2 -my-2 px-2 -mr-2 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              onClick={() => show('b2c-bookings')}
            >
              {t('acct.dash.see_all', 'See all')}
            </button>
          </div>
          <button
            type="button"
            className="flex w-full items-center gap-2 sm:gap-3 rounded-xl px-1 py-2.5 -mx-1 text-start tap hover:bg-slate-50 dark:hover:bg-slate-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 transition-colors"
            onClick={() => show('b2c-progress')}
            aria-label={t('acct.dash.upcoming_a11y', 'Open booking: Oil change at AutoPro')}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-950/70 dark:to-cyan-950/60 text-teal-800 dark:text-teal-100 border border-teal-200/60 dark:border-teal-700/50 flex flex-col items-center justify-center shadow-sm shrink-0 leading-none">
              <div className="text-[10px] font-bold">{t('demo.dash.cal_month_apr', 'APR')}</div>
              <div className="text-sm font-bold mt-0.5">{t('demo.dash.cal_day_n', '18')}</div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate">{t('acct.dash.booking_line', 'Oil change · AutoPro')}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t('acct.dash.today', 'Today · 11:00')}</div>
            </div>
            <span className="badge b-indigo shrink-0">{t('book.list.badge.confirmed', 'Confirmed')}</span>
            <ProtoIcon name="chevron-right" className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" aria-hidden />
          </button>
        </section>

        <section className="app-panel p-4 shadow-sm ring-1 ring-black/[0.03] dark:ring-white/[0.06]" aria-labelledby="dash-month-title">
          <h2 id="dash-month-title" className="label mb-3">
            {t('acct.dash.month', 'This month')}
          </h2>
          <div className="grid grid-cols-3 gap-0 divide-x divide-slate-100 dark:divide-slate-700">
            <div className="text-center px-2 first:pl-0">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">{t('demo.dash.spent_month', 'EGP 970')}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">{t('acct.dash.spent', 'Spent')}</div>
            </div>
            <div className="text-center px-2">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">{t('demo.dash.month_svc_n', '2')}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">{t('acct.dash.services', 'Services')}</div>
            </div>
            <div className="text-center px-2 last:pr-0">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">{t('demo.dash.streak_n', '28')}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">{t('acct.dash.streak', 'Days streak')}</div>
            </div>
          </div>
        </section>
        <div className="h-2" />
      </div>
      <B2cTabBar active="home" />
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}

export function B2cReminder() {
  const { show, t } = useProto();
  const recs: (readonly [string, string, string, string, string, number])[] = [
    [
      t('demo.remind.shop1', 'AutoPro Heliopolis'),
      t('demo.search.r1_dist', '0.8 km'),
      t('demo.remind.stars_1', '4.8'),
      t('demo.track.price_350', 'EGP 350'),
      t('demo.remind.next1', 'Next: 11:30'),
      0,
    ],
    [
      t('demo.remind.shop2', 'QuickFix Nasr City'),
      t('demo.search.r2_dist', '1.6 km'),
      t('demo.remind.stars_2', '4.6'),
      t('demo.remind.price_320', 'EGP 320'),
      t('demo.remind.next2', 'Next: 12:15'),
      1,
    ],
    [
      t('demo.remind.shop3', 'Toyota Authorized'),
      t('demo.search.r4_dist', '2.4 km'),
      t('demo.remind.stars_3', '4.9'),
      t('demo.remind.price_520', 'EGP 520'),
      t('demo.remind.next3', 'Next: 14:00'),
      2,
    ],
  ];
  return (
    <ScreenWrap id="b2c-reminder">
      <ProtoStatusBar />
      <div className="screen-topbar">
        <button
          type="button"
          className="funnel-back tap -ml-1 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          onClick={() => show('b2c-dashboard')}
          aria-label={t('a11y.back', 'Back')}
        >
          <ProtoIcon name="arrow-left" className="w-5 h-5" />
        </button>
        <div className="font-semibold text-slate-900 dark:text-slate-100">{t('acct.remind.title', 'Oil change')}</div>
        <div className="w-10" />
      </div>
      <div className="flex-1 overflow-y-auto px-5 pt-4 app-surface min-h-0">
        <div className="callout-success p-4 flex items-start gap-3 mb-3 border border-emerald-200/60 dark:border-emerald-700/45">
          <ProtoIcon name="sparkles" className="w-5 h-5 text-emerald-700 dark:text-emerald-400 mt-0.5 shrink-0" aria-hidden />
          <div className="text-sm text-emerald-950 dark:text-emerald-100">
            <b>{t('acct.remind.rec_title', 'Recommended for you')}</b>
            <br />
            <span className="text-xs text-emerald-900/80 dark:text-emerald-200/85">
              {t('acct.remind.rec_sub', 'Based on your car, location, and last oil change (8 Feb).')}
            </span>
          </div>
        </div>
        <p className="label mb-2">{t('acct.remind.nearby_heading', 'Nearby picks')}</p>
        {recs.map(([n, d, r, p, s, i]) => {
          const tileBg =
            i === 0
              ? 'from-teal-500 via-teal-600 to-cyan-600'
              : i === 1
                ? 'from-slate-500 via-slate-600 to-slate-700'
                : 'from-violet-500 via-purple-600 to-indigo-600';
          return (
            <button
              key={`${n}-${i}`}
              type="button"
              className={`w-full text-start tap p-3.5 rounded-2xl border mb-2 active:scale-[0.992] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
                i === 0
                  ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/40 dark:border-teal-500 shadow-sm'
                  : 'border-slate-200 dark:border-slate-600 hover:bg-slate-50/90 dark:hover:bg-slate-800/60'
              }`}
              onClick={() => show('b2c-shop')}
            >
              <div className="flex items-center gap-3">
                <div
                  aria-hidden
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tileBg} shrink-0 opacity-90 shadow-inner ring-1 ring-white/20`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 font-semibold text-sm text-slate-900 dark:text-slate-100">
                    <span className="truncate">{n}</span>
                    {i < 2 ? <ProtoIcon name="badge-check" className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0" /> : null}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {d}
                    <span aria-hidden className="mx-1">
                      ·
                    </span>
                    <ProtoIcon name="star" className="w-3 h-3 text-amber-500 fill-amber-500 inline-block align-middle -mt-px" />
                    <span>{r}</span>
                    <span aria-hidden className="mx-1">
                      ·
                    </span>
                    {s}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-bold text-sm text-slate-900 dark:text-slate-100 tabular-nums">{p}</div>
                  {i === 0 ? (
                    <div className="text-[10px] font-bold text-teal-700 dark:text-teal-400 uppercase">{t('acct.remind.best', 'Best pick')}</div>
                  ) : null}
                </div>
              </div>
            </button>
          );
        })}
        <button type="button" className="btn-primary w-full tap mt-3" onClick={() => show('b2c-slot')}>
          {t('acct.remind.cta', 'Book at AutoPro · EGP 350')}
        </button>
        <div className="flex flex-col items-center gap-2 text-xs text-center text-slate-500 dark:text-slate-400 mt-2">
          <button
            type="button"
            className="text-teal-800 dark:text-teal-300 font-semibold tap underline-offset-2 hover:underline decoration-teal-600/50"
            onClick={() => show('b2c-cardetail')}
          >
            {t('acct.remind.view_vehicle', 'Vehicle details & history')}
          </button>
          <div>
            {t('acct.remind.or', 'Or')}{' '}
            <button type="button" className="text-teal-700 dark:text-teal-400 font-semibold tap" onClick={() => show('b2c-map')}>
              {t('acct.remind.map', 'see all on map')}
            </button>
          </div>
        </div>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}

export function B2cExpenses() {
  const { show, t } = useProto();
  const bars = [40, 55, 48, 62, 51, 67, 58, 72, 61, 55, 48, 62];
  return (
    <ScreenWrap id="b2c-expenses">
      <ProtoStatusBar />
      <div className="screen-topbar">
        <button
          type="button"
          className="funnel-back tap -ml-1 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          onClick={() => show('b2c-dashboard')}
          aria-label={t('a11y.back', 'Back')}
        >
          <ProtoIcon name="arrow-left" className="w-5 h-5" />
        </button>
        <div className="font-semibold text-slate-900 dark:text-slate-100">{t('acct.exp.title', 'Expenses')}</div>
        <span className="badge b-amber">{t('acct.exp.phase2', 'Phase 2')}</span>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pt-4 app-surface min-h-0 space-y-3">
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {t('acct.exp.lead', 'Log fuel, parts, and recurring costs per car — complements bookings you make in CarCare.')}
        </p>
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-white/10">
          <div className="text-xs uppercase tracking-wider opacity-70">{t('acct.exp.year', 'Spent this year')}</div>
          <div className="text-3xl font-bold mt-1 num">{t('demo.exp.year_total', 'EGP 7,820')}</div>
          <div className="text-xs opacity-70 mt-1">{t('acct.exp.across', 'Across 14 services · 2 cars')}</div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="p-3 rounded-xl border border-teal-100 dark:border-teal-800/60 bg-teal-50/80 dark:bg-teal-950/40">
            <div className="text-xs text-teal-800 dark:text-teal-200 font-medium">{t('acct.exp.maintenance', 'Maintenance')}</div>
            <div className="font-bold text-teal-950 dark:text-teal-100">{t('demo.exp.maint', 'EGP 4,200')}</div>
          </div>
          <div className="p-3 rounded-xl border border-amber-100 dark:border-amber-800/60 bg-amber-50/80 dark:bg-amber-950/40">
            <div className="text-xs text-amber-800 dark:text-amber-200 font-medium">{t('acct.exp.fuel', 'Fuel')}</div>
            <div className="font-bold text-amber-950 dark:text-amber-100">{t('demo.exp.fuel_amt', 'EGP 3,120')}</div>
          </div>
          <div className="p-3 rounded-xl border border-violet-100 dark:border-violet-800/60 bg-violet-50/80 dark:bg-violet-950/40">
            <div className="text-xs text-violet-800 dark:text-violet-200 font-medium">{t('acct.exp.insurance', 'Insurance')}</div>
            <div className="font-bold text-violet-950 dark:text-violet-100">{t('demo.exp.ins_amt', 'EGP 500')}</div>
          </div>
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900">
            <div className="text-xs text-slate-500 dark:text-slate-400">{t('acct.exp.other', 'Other')}</div>
            <div className="font-bold text-slate-900 dark:text-slate-100">{t('demo.exp.other_amt', 'EGP 0')}</div>
          </div>
        </div>
        <div className="label mt-5 mb-2">{t('acct.exp.cpk', 'Cost per km')}</div>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-900/40">
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 num">{t('demo.exp.cpk', 'EGP 0.84')}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">{t('acct.exp.rolling', 'Corolla · rolling 3 months')}</div>
          <div className="h-20 mt-2 bg-slate-50 dark:bg-slate-800/90 rounded flex items-end gap-1 p-1">
            {bars.map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t ${i % 3 === 0 ? 'bg-teal-500/85' : i % 3 === 1 ? 'bg-cyan-500/80' : 'bg-indigo-400/85'}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-800/60 mt-4 text-xs text-amber-900 dark:text-amber-100">
          <b>{t('acct.exp.devnote_label', 'Dev note:')}</b>{' '}
          {t('acct.exp.devnote', 'This is a Phase 2 feature included here for spec completeness. Ship Phase 1 without it.')}
        </div>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}

