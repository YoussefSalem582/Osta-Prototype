import { useState } from 'react';
import { B2cTabBar } from '../../../components/proto/TabBars';
import { ProtoHomeIndicator, ProtoStatusBar } from '../../../components/proto/Chrome';
import { ProtoIcon } from '../../../components/proto/Icon';
import type { MarketListingKey } from '../../../context/ProtoContext';
import { useProto } from '../../../context/ProtoContext';
import { ScreenWrap } from '../../shared/ScreenWrap';
import { MARKETPLACE_ROWS, type MarketCategory } from './marketplaceListings';

export function B2cMarketplace() {
  const { t, show, setMarketListingKey } = useProto();
  const searchId = 'marketplace-search-demo';
  const goPart = (key: MarketListingKey) => {
    setMarketListingKey(key);
    show('b2c-part-detail');
  };
  const chips: { label: string; cat: 'all' | MarketCategory }[] = [
    { label: t('disc.market.chip_for_car', 'For your car'), cat: 'all' },
    { label: t('disc.market.chip_filters', 'Filters'), cat: 'filters' },
    { label: t('disc.market.chip_oil', 'Oil & fluids'), cat: 'oil' },
    { label: t('disc.market.chip_batt', 'Batteries'), cat: 'batteries' },
    { label: t('disc.market.chip_tires', 'Tires'), cat: 'tires' },
    { label: t('disc.market.chip_brakes', 'Brakes'), cat: 'brakes' },
  ];
  const [cat, setCat] = useState<'all' | MarketCategory>('all');
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();
  const filtered = MARKETPLACE_ROWS.filter((row) => {
    const matchesCat = cat === 'all' || row.category === cat;
    const matchesQ =
      !query ||
      t(row.titleKey, row.titleEn).toLowerCase().includes(query) ||
      t(row.sellerKey, row.sellerEn).toLowerCase().includes(query);
    return matchesCat && matchesQ;
  });
  const isDefaultView = cat === 'all' && !query;
  return (
    <ScreenWrap id="b2c-marketplace">
      <ProtoStatusBar />
      <div className="px-4 pt-2 pb-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700/80">
        <div className="flex items-start justify-between gap-2 pb-2">
          <div>
            <div className="font-bold text-lg leading-tight text-slate-900 dark:text-slate-100">{t('disc.market.title', 'Shop')}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t('disc.market.sub', 'Parts & accessories from verified sellers')}</div>
          </div>
          <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide bg-teal-100 dark:bg-teal-950/60 text-teal-900 dark:text-teal-200 border border-teal-200/80 dark:border-teal-800/55 whitespace-nowrap mt-1">
            {t('disc.market.phase_p1', 'P1 prototype')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 min-w-0">
            <label htmlFor={searchId} className="sr-only">
              {t('a11y.market.search', 'Search parts and accessories')}
            </label>
            <div className="rounded-2xl border border-slate-200/95 dark:border-slate-600 bg-slate-50/90 dark:bg-slate-800/90 px-3 py-2.5 flex items-center gap-2 shadow-sm ring-1 ring-black/[0.02]">
              <ProtoIcon name="search" className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" aria-hidden />
              <input
                id={searchId}
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="flex-1 min-w-0 bg-transparent text-sm text-slate-900 dark:text-slate-100 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                placeholder={t('disc.market.search_ph', 'Search parts, oil, VIN…')}
                autoComplete="off"
              />
            </div>
          </div>
          <button
            type="button"
            className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center tap shadow-sm ring-1 ring-slate-200/80 dark:ring-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/80 flex-shrink-0"
            aria-label={t('a11y.market.cart', 'Cart')}
          >
            <ProtoIcon name="shopping-bag" className="w-5 h-5 text-slate-600 dark:text-slate-400" aria-hidden />
            <span className="absolute -top-1 -right-1 min-w-[1.1rem] h-[1.1rem] px-0.5 rounded-full bg-orange-500 text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
              {t('demo.market.cart_badge', '2')}
            </span>
          </button>
        </div>
        <div className="chip-scroll-wrap pb-2 -mx-4 px-4">
          <div className="chip-scroll-row">
            {chips.map(({ label, cat: c }) => {
              const on = cat === c;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setCat(c)}
                  className={`chip tap shrink-0 whitespace-nowrap ${on ? 'on' : ''}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="text-[11px] text-slate-500 dark:text-slate-400 pb-3 flex flex-wrap items-center gap-x-2 gap-y-1">
          <ProtoIcon name="shield-check" className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" aria-hidden />
          {t('disc.market.trust_strip', 'Verified sellers · Returns within 14 days · Est. shipping 1–2 days')}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3 app-surface space-y-4 min-h-0">
        <button
          type="button"
          className="w-full text-start p-[1px] rounded-3xl promo-banner-market text-white mb-2 shadow-xl shadow-orange-900/25 ring-1 ring-white/15 tap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/90 ring-offset-2 ring-offset-transparent"
          onClick={() => goPart('p4')}
        >
          <div className="p-4 rounded-[22px]">
            <div className="text-xs font-semibold opacity-95 tracking-wide">{t('disc.market.deal', 'Weekend deal')}</div>
            <div className="font-bold text-[15px] mt-1 leading-snug">{t('disc.market.deal_title', 'Bosch oil filter + 4L 5W-30')}</div>
            <div className="flex items-end justify-between mt-3 gap-3">
              <div className="min-w-0">
                <span className="text-2xl font-extrabold tracking-tight">{t('demo.market.promo_now', 'EGP 620')}</span>
                <span className="text-sm line-through opacity-75 ms-2">{t('demo.market.promo_was', 'EGP 780')}</span>
              </div>
              <span className="shrink-0 px-4 py-2 rounded-2xl bg-white dark:bg-white/95 dark:text-slate-900 text-xs font-bold text-slate-900 shadow-md">
                {t('disc.market.add_bundle', 'View bundle')}
              </span>
            </div>
          </div>
        </button>

        <div className="flex items-end justify-between gap-2">
          <span className="label">
            {isDefaultView ? t('disc.market.popular', 'Popular this week') : `${filtered.length} ${t('disc.market.results', 'results')}`}
          </span>
          <button
            type="button"
            className="text-xs font-semibold text-teal-700 dark:text-teal-400 tap"
            onClick={isDefaultView ? undefined : () => { setCat('all'); setQ(''); }}
          >
            {isDefaultView ? t('disc.market.see_all', 'See all') : t('disc.market.clear', 'Clear')}
          </button>
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-10 px-4">
            <ProtoIcon name="search-x" className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-3" aria-hidden />
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">{t('disc.market.empty_title', 'No parts in this category yet')}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{t('disc.market.empty_sub', 'Try another category or clear your search.')}</p>
            <button
              type="button"
              className="btn-secondary text-xs font-semibold tap rounded-xl px-4 py-2.5"
              onClick={() => { setCat('all'); setQ(''); }}
            >
              {t('disc.market.empty_reset', 'Show all parts')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 pb-2">
            {filtered.map((row) => (
            <button
              key={row.key}
              type="button"
              onClick={() => goPart(row.key)}
              className="tap text-start p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/95 dark:border-slate-600/90 shadow-md shadow-slate-900/[0.04] ring-1 ring-black/[0.02] hover:border-teal-200/90 dark:hover:border-teal-700/50 hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/80"
            >
              <div
                className={`h-[5.25rem] rounded-xl bg-gradient-to-br ${row.thumbGradient} flex items-center justify-center mb-2.5 ring-1 ring-white/60 dark:ring-white/5`}
              >
                <ProtoIcon name={row.iconName} className={`w-9 h-9 ${row.iconClass}`} aria-hidden strokeWidth={1.35} />
              </div>
              <div className="text-[12px] font-semibold leading-snug line-clamp-2 text-slate-900 dark:text-slate-100">{t(row.titleKey, row.titleEn)}</div>
              <div className="mt-1.5 flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                <ProtoIcon name="star" className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0 -mt-px" aria-hidden />
                <span>
                  {t(row.starKey, row.starEn)} · {t(row.extraKey, row.extraEn)}
                </span>
              </div>
              <div className="mt-2 font-bold text-sm text-slate-900 dark:text-white">{t(row.priceKey, row.priceEn)}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{t(row.sellerKey, row.sellerEn)}</div>
              <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between text-[10px] font-semibold text-teal-700 dark:text-teal-400">
                {t('disc.market.view_details', 'Details')}
                <ProtoIcon name="chevron-right" className="w-3.5 h-3.5 text-slate-400" aria-hidden />
              </div>
            </button>
            ))}
          </div>
        )}
      </div>
      <B2cTabBar active="market" />
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}

export function B2cFilters() {
  const { show, t } = useProto();
  const services = [
    t('disc.filters.svc.oil', 'Oil change'),
    t('disc.filters.svc.brakes', 'Brakes'),
    t('disc.filters.svc.tires', 'Tires'),
    t('disc.filters.svc.ac', 'AC'),
    t('disc.filters.svc.battery', 'Battery'),
    t('disc.filters.svc.engine', 'Engine'),
    t('disc.filters.svc.body', 'Body & paint'),
    t('disc.filters.svc.elec', 'Electrical'),
  ];
  const distances = [
    t('demo.filters.dist_1', '1 km'),
    t('demo.filters.dist_5', '5 km'),
    t('demo.filters.dist_10', '10 km'),
    t('demo.filters.dist_25', '25 km'),
  ];
  const optionDefs: [string, boolean][] = [
    [t('disc.filters.opt.open', 'Open now'), true],
    [t('disc.filters.opt.verified', 'Verified only'), true],
    [t('disc.filters.opt.female', 'Female-friendly staff'), false],
    [t('disc.filters.opt.pickup', 'Home pickup available'), false],
    [t('disc.filters.opt.card', 'Accepts card'), true],
  ];
  const ratings = [3, 3.5, 4, 4.5];
  const [svc, setSvc] = useState<Set<string>>(() => new Set([services[0], services[1]]));
  const [rating, setRating] = useState(4);
  const [dist, setDist] = useState(1);
  const [opts, setOpts] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(optionDefs.map(([label, on]) => [label, on])),
  );
  const resetAll = () => {
    setSvc(new Set([services[0], services[1]]));
    setRating(4);
    setDist(1);
    setOpts(Object.fromEntries(optionDefs.map(([label, on]) => [label, on])));
  };
  const toggleSvc = (s: string) =>
    setSvc((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  return (
    <ScreenWrap id="b2c-filters">
      <ProtoStatusBar />
      <div className="screen-topbar">
        <button type="button" className="funnel-back tap -ms-1" onClick={() => show('b2c-map')} aria-label={t('disc.filters.close', 'Close')}>
          <ProtoIcon name="x" className="w-5 h-5" aria-hidden />
        </button>
        <div className="font-semibold text-slate-900 dark:text-slate-100">{t('disc.filters.title', 'Filters')}</div>
        <button type="button" className="text-sm text-teal-700 dark:text-teal-400 font-semibold tap py-2 px-1 rounded-lg" onClick={resetAll}>
          {t('disc.filters.reset', 'Reset')}
        </button>
      </div>
      <div className="flex-1 app-surface px-5 pt-4 pb-4 overflow-y-auto space-y-4 min-h-0">
        <div className="filters-section">
          <div className="label mb-2 text-indigo-700 dark:text-indigo-300">{t('disc.filters.service', 'Service')}</div>
          <div className="flex flex-wrap gap-2">
            {services.map((s) => {
              const on = svc.has(s);
              return (
                <button key={s} type="button" aria-pressed={on} className={`chip tap ${on ? 'on' : ''}`} onClick={() => toggleSvc(s)}>
                  {s}
                </button>
              );
            })}
          </div>
        </div>
        <div className="filters-section">
          <div className="flex justify-between mb-2">
            <div className="label text-cyan-800 dark:text-cyan-300">{t('disc.filters.price', 'Price range')}</div>
            <div className="text-xs font-bold text-cyan-900 dark:text-cyan-100 bg-cyan-50 dark:bg-cyan-950/45 px-2 py-0.5 rounded-lg">
              {t('demo.filters.price_chip', 'EGP 200–1500')}
            </div>
          </div>
          <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 relative" aria-hidden>
            <div className="absolute h-1.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" style={{ insetInlineStart: '10%', insetInlineEnd: '30%' }} />
            <div
              className="absolute w-4 h-4 bg-white dark:bg-slate-900 border-2 border-teal-600 rounded-full -top-1 shadow-sm"
              style={{ insetInlineStart: '9%' }}
            />
            <div
              className="absolute w-4 h-4 bg-white dark:bg-slate-900 border-2 border-cyan-600 rounded-full -top-1 shadow-sm"
              style={{ insetInlineStart: '68%' }}
            />
          </div>
        </div>
        <div className="filters-section">
          <div className="label mb-2 text-amber-800 dark:text-amber-300">{t('disc.filters.rating', 'Minimum rating')}</div>
          <div className="flex gap-2 flex-wrap">
            {ratings.map((r) => {
              const on = rating === r;
              return (
                <button key={r} type="button" aria-pressed={on} className={`chip tap ${on ? 'on' : ''}`} onClick={() => setRating(r)}>
                  <ProtoIcon name="star" className={`w-3 h-3 ${on ? '' : 'text-amber-500 fill-amber-500'}`} aria-hidden />
                  {r}+
                </button>
              );
            })}
          </div>
        </div>
        <div className="filters-section">
          <div className="label mb-2 text-violet-800 dark:text-violet-300">{t('disc.filters.distance', 'Distance')}</div>
          <div className="flex gap-2 flex-wrap">
            {distances.map((d, i) => {
              const on = dist === i;
              return (
                <button key={d} type="button" aria-pressed={on} className={`chip tap ${on ? 'on' : ''}`} onClick={() => setDist(i)}>
                  {d}
                </button>
              );
            })}
          </div>
        </div>
        <div className="filters-section space-y-3">
          <div className="label text-slate-600 dark:text-slate-400">{t('disc.filters.options', 'Options')}</div>
          {optionDefs.map(([label]) => {
            const on = opts[label];
            return (
              <button
                key={label}
                type="button"
                role="switch"
                aria-checked={on}
                className="flex justify-between items-center py-1 w-full text-start rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/70 focus-visible:ring-offset-2"
                onClick={() => setOpts((p) => ({ ...p, [label]: !p[label] }))}
              >
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{label}</span>
                <span
                  className={`w-10 h-6 rounded-full shrink-0 ${on ? 'bg-gradient-to-r from-teal-600 to-emerald-500' : 'bg-slate-200 dark:bg-slate-600'} relative transition-colors`}
                  aria-hidden
                >
                  <span
                    className={`absolute top-0.5 ${on ? 'end-0.5' : 'start-0.5'} w-5 h-5 rounded-full bg-white dark:bg-slate-900 shadow-md transition-all`}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="cta-bar">
        <button type="button" className="btn-primary btn-primary-lg w-full tap shadow-md" onClick={() => show('b2c-map')}>
          {t('disc.filters.show', 'Show 17 centers')}
        </button>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}

export function B2cSearch() {
  const { show, t } = useProto();
  const stateLabel = (s: string) => {
    if (s === 'Tow') return t('disc.search.badge_tow', 'Tow');
    if (s === 'Open') return t('disc.search.state.open', 'Open');
    if (s === 'Mobile') return t('disc.search.state.mobile', 'Mobile');
    if (s === 'Closes 6pm') return t('disc.search.state.closes', 'Closes 6pm');
    return s;
  };
  const list: [string, string, string, string, string, boolean, string, string][] = [
    [
      t('demo.search.r1_name', 'AutoPro Heliopolis'),
      t('demo.search.r1_dist', '0.8 km'),
      t('demo.search.r1_stars', '4.8'),
      t('demo.search.r1_rev_n', '312'),
      t('demo.search.r1_price', 'EGP 350–900'),
      true,
      t('demo.search.r1_next', '11:30'),
      'Open',
    ],
    [
      t('demo.search.r2_name', 'QuickFix Nasr City'),
      t('demo.search.r2_dist', '1.6 km'),
      t('demo.search.r2_stars', '4.6'),
      t('demo.search.r2_rev_n', '188'),
      t('demo.search.r2_price', 'EGP 250–1200'),
      true,
      t('demo.search.r2_next', '12:15'),
      'Open',
    ],
    [
      t('demo.search.r3_name', 'City Tow 24/7 – Heliopolis'),
      t('demo.search.r3_dist', '1.1 km'),
      t('demo.tow.stars_avg', '4.7'),
      t('demo.tow.rev_total_n', '201'),
      t('demo.search.r3_price', 'from EGP 400'),
      true,
      t('demo.search.r3_next', '~15 min'),
      'Tow',
    ],
    [
      t('demo.search.r4_name', 'Toyota Authorized – El Nozha'),
      t('demo.search.r4_dist', '2.4 km'),
      t('demo.search.r4_stars', '4.9'),
      t('demo.search.r4_rev_n', '421'),
      t('demo.search.r4_price', 'EGP 450–1800'),
      true,
      t('demo.search.r4_next', '14:00'),
      'Open',
    ],
    [
      t('demo.search.r5_name', 'Cairo Motors Workshop'),
      t('demo.search.r5_dist', '3.1 km'),
      t('demo.search.r5_stars', '4.3'),
      t('demo.search.r5_rev_n', '94'),
      t('demo.search.r5_price', 'EGP 200–700'),
      false,
      t('demo.search.r5_next', 'Tomorrow 09:00'),
      'Closes 6pm',
    ],
    [
      t('demo.search.r6_name', 'Mobile Mechanic — Khaled'),
      t('demo.search.r6_dist', ' on-demand'),
      t('demo.search.r6_stars', '4.7'),
      t('demo.search.r6_rev_n', '66'),
      t('demo.search.r6_price', 'EGP 300–600'),
      false,
      t('demo.search.r6_next', 'Now'),
      'Mobile',
    ],
  ];
  return (
    <ScreenWrap id="b2c-search">
      <ProtoStatusBar />
      <div className="px-4 pt-2 pb-2 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700/80">
        <div className="flex items-center gap-2">
          <button type="button" className="tap text-slate-500 dark:text-slate-400" onClick={() => show('b2c-map')}>
            <ProtoIcon name="arrow-left" className="w-5 h-5" />
          </button>
          <div className="flex-1 rounded-2xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/90 px-3 py-2.5 flex items-center gap-2">
            <ProtoIcon name="search" className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              className="flex-1 bg-transparent text-sm text-slate-900 dark:text-slate-100 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
              defaultValue={t('demo.search.query_oil', 'Oil change')}
            />
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="text-xs text-slate-500 dark:text-slate-400">{t('disc.search.meta', '17 centers · sorted by distance')}</div>
          <div className="text-xs font-semibold text-teal-700 dark:text-teal-400 flex items-center gap-1 tap">
            <ProtoIcon name="arrow-up-down" className="w-3.5 h-3.5" />
            {t('disc.search.sort', 'Sort')}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3 app-surface min-h-0">
        {list.map(([n, d, r, c, p, v, next, state], idx) => (
          <button
            key={n}
            type="button"
            className={`listing-card tap w-full text-start p-3.5 rounded-2xl border ${
              idx === 0
                ? 'border-2 border-teal-300/80 dark:border-teal-600/60 bg-gradient-to-br from-teal-50 to-white dark:from-teal-950/40 dark:to-slate-900 shadow-sm'
                : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm'
            }`}
            onClick={() => show(state === 'Tow' ? 'b2c-tow' : 'b2c-shop')}
          >
            <div className="flex gap-3">
              <div
                className={`w-16 h-16 rounded-xl ${
                  idx === 0
                    ? 'bg-slate-100 dark:bg-slate-800/80 ring-1 ring-slate-200/80 dark:ring-slate-600/80'
                    : 'bg-slate-200 dark:bg-slate-700/90'
                } flex items-center justify-center`}
              >
                {state === 'Tow' ? (
                  <ProtoIcon name="truck" className="w-7 h-7 text-blue-700 dark:text-blue-400" />
                ) : (
                  <ProtoIcon name="wrench" className="w-7 h-7 text-slate-500 dark:text-slate-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-900 dark:text-slate-100 truncate">{n}</span>
                  {v ? <ProtoIcon name="badge-check" className="w-4 h-4 text-teal-700 dark:text-teal-400 flex-shrink-0" /> : null}
                  {state === 'Tow' ? <span className="badge b-blue">{t('disc.search.badge_tow', 'Tow')}</span> : null}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  {d} · {stateLabel(state)}
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs">
                  <span className="flex items-center gap-0.5 font-semibold text-slate-800 dark:text-slate-200">
                    <ProtoIcon name="star" className="w-3 h-3 text-amber-500 fill-amber-500" />
                    {r}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500">({c})</span>
                  <span className="text-slate-400 dark:text-slate-500">·</span>
                  <span className="text-slate-600 dark:text-slate-400">{p}</span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <div className="text-xs text-teal-700 dark:text-teal-400 font-semibold">
                    {t('disc.search.next', 'Next')} {next}
                  </div>
                  {idx === 0 ? (
                    <span className="btn-primary py-2 px-3.5 text-xs rounded-xl flex-shrink-0">{t('disc.search.book', 'Book')}</span>
                  ) : (
                    <span className="btn-secondary py-2 px-3.5 text-xs flex-shrink-0">{t('disc.search.view', 'View')}</span>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}

