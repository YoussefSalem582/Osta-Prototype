import { useState } from 'react';
import { useProto } from '../../context/ProtoContext';
import { ProtoIcon } from './Icon';

type MapScenario = 'default' | 'loading' | 'empty' | 'denied' | 'emergency';

const MAP_SCENARIOS: { key: MapScenario; icon: string; labelKey: string; fallback: string }[] = [
  { key: 'default', icon: 'map-pin', labelKey: 'map.proto_strip.default', fallback: 'Pins' },
  { key: 'loading', icon: 'loader-2', labelKey: 'map.proto_strip.loading', fallback: 'Loading' },
  { key: 'empty', icon: 'search-x', labelKey: 'map.proto_strip.empty', fallback: 'No results' },
  { key: 'denied', icon: 'map-pin-off', labelKey: 'map.proto_strip.denied', fallback: 'Location off' },
  { key: 'emergency', icon: 'zap', labelKey: 'map.proto_strip.emergency', fallback: 'Emergency' },
];

export function B2cMapMainColumn() {
  const { show, t } = useProto();
  const [mapScenario, setMapScenario] = useState<MapScenario>('default');
  const selectedScenario = MAP_SCENARIOS.find((item) => item.key === mapScenario) ?? MAP_SCENARIOS[0];

  return (
    <>
      <div className="map-search-header map-search-header--mobile bg-white dark:bg-slate-900 relative z-30">
        <div className="map-demo-toolbar" role="group" aria-label={t('map.proto_strip.a11y', 'Map prototype scenario')}>
          <span className="map-demo-toolbar__label">
            {t('map.proto_strip.compact_label', 'Demo')}
            <span className="map-demo-toolbar__current">
              <ProtoIcon name={selectedScenario.icon} className="w-3 h-3" aria-hidden />
              {t(selectedScenario.labelKey, selectedScenario.fallback)}
            </span>
          </span>
          <div className="map-demo-toolbar__options no-scrollbar">
            {MAP_SCENARIOS.map((scenario) => {
              const isOn = scenario.key === mapScenario;
              return (
                <button
                  key={scenario.key}
                  type="button"
                  aria-pressed={isOn}
                  className={`map-demo-toolbar__button tap ${isOn ? 'is-on' : ''}`}
                  onClick={() => setMapScenario(scenario.key)}
                >
                  <ProtoIcon name={scenario.icon} className="w-3.5 h-3.5" aria-hidden />
                  <span>{t(scenario.labelKey, scenario.fallback)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {mapScenario === 'denied' ? (
          <div className="map-context-alert border-amber-200 bg-amber-50 dark:bg-amber-950/40 dark:border-amber-700/55">
            <ProtoIcon name="map-pin-off" className="w-4 h-4 text-amber-700 dark:text-amber-400 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-950 dark:text-amber-100 leading-snug">
              {t('map.proto.denied_msg', 'Location is off - showing Cairo city center until you grant access or pick an area manually.')}
            </p>
          </div>
        ) : null}
        {mapScenario === 'emergency' ? (
          <div className="map-context-alert border-orange-400/70 bg-orange-500/15 dark:bg-orange-950/55 dark:border-orange-600/65">
            <ProtoIcon name="zap" className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5 shrink-0" />
            <p className="text-xs text-orange-950 dark:text-orange-100 leading-snug">
              {t('map.proto.emergency_msg', 'Emergency mode prioritizes towing + 24/7 verified shops within range.')}
            </p>
          </div>
        ) : null}

        <div className="map-search-row">
          <div className="map-search-field">
            <ProtoIcon name="search" className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
            <input
              className="flex-1 bg-transparent text-sm text-slate-900 dark:text-slate-100 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
              placeholder={t('map.search_ph', 'Oil change, brakes, AC...')}
            />
            <ProtoIcon name="mic" className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0 tap" />
          </div>
          <button
            type="button"
            className="map-filter-button map-fab bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600/90 flex items-center justify-center tap flex-shrink-0"
            onClick={() => show('b2c-filters')}
            aria-label={t('map.filters.a11y', 'Open filters')}
          >
            <ProtoIcon name="sliders-horizontal" className="w-[18px] h-[18px] text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        <div className="chip-scroll-wrap -mx-1 px-1">
          <div className="chip-scroll-row no-scrollbar">
            <span className="chip on flex-shrink-0">
              <ProtoIcon name="badge-check" className="w-3.5 h-3.5" />
              {t('map.chip.verified', 'Verified')}
            </span>
            <span className="chip flex-shrink-0">
              <ProtoIcon name="clock" className="w-3.5 h-3.5" />
              {t('map.chip.open_now', 'Open now')}
            </span>
            <span className="chip flex-shrink-0 num">
              <ProtoIcon name="star" className="w-3.5 h-3.5" />
              {t('map.chip.star', '4+ stars')}
            </span>
            <span className="chip flex-shrink-0 num">
              <ProtoIcon name="map-pin" className="w-3.5 h-3.5" />
              {t('map.chip.km', '<5 km')}
            </span>
            <span className={`chip flex-shrink-0 shadow-sm bg-orange-500 text-white border-orange-500 ${mapScenario === 'emergency' ? 'ring-2 ring-orange-400/85' : ''}`}>
              <ProtoIcon name="zap" className="w-3.5 h-3.5" />
              {t('map.chip.emergency', 'Emergency')}
            </span>
            <span className="chip flex-shrink-0">
              <ProtoIcon name="truck" className="w-3.5 h-3.5" />
              {t('map.chip.tow', 'Tow truck')}
            </span>
          </div>
        </div>
      </div>

      <div
        className={`flex-1 relative map-canvas map-canvas-pro overflow-hidden min-h-0 ${
          mapScenario === 'emergency' ? 'ring-2 ring-inset ring-orange-400/55 dark:ring-orange-600/50' : ''
        }`}
      >
        <div className="map-building" style={{ left: '8%', top: '18%', width: '22%', height: '14%' }} />
        <div className="map-building" style={{ left: '38%', top: '12%', width: '18%', height: '18%' }} />
        <div className="map-building" style={{ left: '68%', top: '22%', width: '24%', height: '12%' }} />
        <div className="map-building" style={{ left: '14%', top: '52%', width: '16%', height: '16%' }} />
        <div className="map-building" style={{ left: '72%', top: '48%', width: '20%', height: '14%' }} />
        <div className="map-building" style={{ left: '44%', top: '58%', width: '14%', height: '11%' }} />

        <div className="map-road-h" style={{ top: '28%' }} />
        <div className="map-road-h" style={{ top: '62%' }} />
        <div className="map-road-v" style={{ left: '34%' }} />
        <div className="map-road-v" style={{ left: '72%' }} />

        <div
          className={`user-loc-dot-wrap transition-opacity ${mapScenario === 'denied' ? 'opacity-55' : ''}`}
          style={{ left: '48%', top: '44%' }}
        >
          <div className="user-loc-dot-pulse" />
          <div className="user-loc-dot-core" />
        </div>

        {mapScenario !== 'loading' && mapScenario !== 'empty' ? (
          <>
            <div className="absolute z-10" style={{ left: '30%', top: '24%' }}>
              <div className="pin pin--verified">
                <ProtoIcon name="badge-check" className="w-4 h-4 text-white" />
              </div>
            </div>
            <button
              type="button"
              className="absolute tap z-10"
              style={{ left: '56%', top: '36%' }}
              onClick={() => show('b2c-shop')}
            >
              <div className="pin pin--featured" style={{ transform: 'rotate(-45deg) scale(1.2)' }}>
                <ProtoIcon name="wrench" className="w-4 h-4 text-white" />
              </div>
            </button>
            <div className="absolute z-10" style={{ left: '64%', top: '66%' }}>
              <div className="pin pin--verified">
                <ProtoIcon name="badge-check" className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="absolute z-10" style={{ left: '22%', top: '70%' }}>
              <div className="pin pin--unverified">
                <ProtoIcon name="wrench" className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="absolute z-10" style={{ left: '78%', top: '18%' }}>
              <div className="pin pin--verified">
                <ProtoIcon name="badge-check" className="w-4 h-4 text-white" />
              </div>
            </div>
            <button
              type="button"
              className="absolute tap z-10"
              style={{ left: '46%', top: '68%' }}
              onClick={() => show('b2c-tow')}
            >
              <div className="pin pin--tow">
                <ProtoIcon name="truck" className="w-4 h-4 text-white" />
              </div>
            </button>
            <button
              type="button"
              className="absolute tap z-10"
              style={{ left: '12%', top: '38%' }}
              onClick={() => show('b2c-tow')}
            >
              <div className="pin pin--tow-alt">
                <ProtoIcon name="truck" className="w-4 h-4 text-white" />
              </div>
            </button>
          </>
        ) : null}

        <div className="map-control-stack">
          <button
            type="button"
            className="map-fab rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 shadow-sm flex items-center justify-center tap"
            onClick={() => show('b2c-search')}
            aria-label={t('map.list.a11y', 'Show list view')}
          >
            <ProtoIcon name="list" className="w-[18px] h-[18px] text-slate-700 dark:text-slate-300" />
          </button>
          <button
            type="button"
            className="map-fab rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 shadow-sm flex items-center justify-center tap"
            aria-label={t('map.locate.a11y', 'Recenter map on my location')}
          >
            <ProtoIcon name="locate-fixed" className="w-[18px] h-[18px] text-teal-700 dark:text-teal-400" />
          </button>
        </div>

        {mapScenario === 'loading' ? (
          <div
            className="absolute inset-x-0 top-0 bottom-[46%] z-[42] bg-white/55 dark:bg-slate-900/55 backdrop-blur-[1.5px] flex items-center justify-center pointer-events-none"
            aria-hidden
          >
            <ProtoIcon name="loader-2" className="w-9 h-9 text-teal-600 dark:text-teal-400 animate-spin" />
          </div>
        ) : null}

        <div className="sheet sheet-elevated map-results-sheet absolute left-0 right-0 bottom-0">
          <div className="sheet-handle" />
          <div className="map-results-sheet__header">
            <div className="min-w-0">
              <div className="t-title text-slate-900 dark:text-slate-100">
                {mapScenario === 'loading'
                  ? t('map.proto.loading_label', 'Loading nearby centers...')
                  : mapScenario === 'empty'
                    ? t('map.proto.sheet_empty_title', 'Nothing in this radius yet')
                    : t('map.sheet.title', 'Nearest to you')}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                {mapScenario === 'loading'
                  ? t('map.proto.loading_sub', 'Checking live availability…')
                  : mapScenario === 'empty'
                    ? t('map.proto.sheet_empty_sub', 'Loosen filters, zoom out, or move the map.')
                    : t('map.sheet.sub', 'Sorted by distance - live availability')}
              </div>
            </div>
            {mapScenario === 'loading' ? (
              <span className="skeleton h-7 w-[4.5rem] rounded-full flex-shrink-0" aria-hidden />
            ) : (
              <span
                className={`num text-[11px] font-semibold px-2.5 py-1 rounded-full border flex-shrink-0 ${
                  mapScenario === 'empty'
                    ? 'text-amber-900 dark:text-amber-100 bg-amber-50 dark:bg-amber-950/45 border-amber-200 dark:border-amber-800/60'
                    : 'text-teal-800 dark:text-teal-100 bg-teal-50 dark:bg-teal-950/45 border-teal-100 dark:border-teal-800/60'
                }`}
              >
                {mapScenario === 'empty' ? t('map.proto.sheet_badge_none', '0 centers') : t('map.sheet.badge', '17 centers')}
              </span>
            )}
          </div>
          <div className="map-results-sheet__body proto-scroll">
            {mapScenario === 'loading' ? (
              <div className="space-y-2.5" aria-hidden>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="map-listing-card border border-slate-200/80 dark:border-slate-700/70 bg-white dark:bg-slate-900"
                  >
                    <div className="map-listing-card__icon skeleton" />
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="skeleton h-3.5 w-2/3 rounded" />
                      <div className="skeleton h-3 w-1/2 rounded" />
                      <div className="skeleton h-3 w-5/12 rounded" />
                    </div>
                    <div className="skeleton h-8 w-14 rounded-lg self-center shrink-0" />
                  </div>
                ))}
              </div>
            ) : mapScenario === 'empty' ? (
              <div className="text-center py-7 px-2">
                <ProtoIcon name="search-x" className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-3" aria-hidden />
                <p className="t-title text-slate-800 dark:text-slate-200 mb-2">
                  {t('map.proto.no_results_title', 'No verified centers yet')}
                </p>
                <p className="t-callout text-slate-600 dark:text-slate-400 max-w-[240px] mx-auto">
                  {t(
                    'map.proto.no_results_body',
                    'PostGIS nearby_centers returned 0 rows for your filters - try resetting service filters or widening distance.',
                  )}
                </p>
                <button
                  type="button"
                  className="btn-secondary text-xs font-semibold mt-5 tap rounded-xl px-4 py-2.5"
                  onClick={() => show('b2c-filters')}
                >
                  {t('map.proto.adjust_filters', 'Adjust filters')}
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  className="listing-card map-listing-card map-listing-card--featured tap border-2 border-teal-300/80 dark:border-teal-600/70 bg-gradient-to-br from-teal-50 to-white dark:from-teal-950/45 dark:to-slate-900 shadow-sm w-full border-solid text-left font-inherit"
                  onClick={() => show('b2c-shop')}
                >
                  <div className="map-listing-card__icon ring-1 ring-slate-200/80 dark:ring-slate-600/80">
                    <ProtoIcon name="wrench" className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="t-title text-slate-900 dark:text-slate-100 truncate">
                        {t('demo.search.r1_name', 'AutoPro Heliopolis')}
                      </span>
                      <ProtoIcon name="badge-check" className="w-4 h-4 text-teal-700 dark:text-teal-400 flex-shrink-0" />
                    </div>
                    <div className="map-listing-meta">
                      <span className="num">{t('demo.search.r1_dist', '0.8 km')}</span>
                      <span className="map-listing-dot" aria-hidden />
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{t('map.sheet.open', 'Open')}</span>
                      <span className="map-listing-dot" aria-hidden />
                      <span>
                        {t('map.sheet.next_slot', 'Next slot')}{' '}
                        <span className="num font-semibold text-slate-700 dark:text-slate-300">{t('demo.search.r1_next', '11:30')}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 text-xs">
                      <span className="num flex items-center gap-0.5 font-semibold text-slate-800 dark:text-slate-200">
                        <ProtoIcon name="star" className="w-3 h-3 text-amber-500 fill-amber-500" />
                        {t('demo.search.r1_stars', '4.8')}
                      </span>
                      <span className="num text-slate-400 dark:text-slate-500">({t('demo.search.r1_rev_n', '312')})</span>
                      <span className="map-listing-dot" aria-hidden />
                      <span className="num text-slate-600 dark:text-slate-400 font-medium">{t('demo.search.r1_price', 'EGP 350-900')}</span>
                    </div>
                  </div>
                  <span className="map-listing-card__action btn-primary shadow-sm">{t('map.sheet.book', 'Book')}</span>
                </button>

                <div className="listing-card map-listing-card border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-sm">
                  <div className="map-listing-card__icon">
                    <ProtoIcon name="wrench" className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="t-title text-slate-900 dark:text-slate-100 truncate">
                        {t('demo.search.r2_name', 'QuickFix Nasr City')}
                      </span>
                      <ProtoIcon name="badge-check" className="w-4 h-4 text-teal-700 dark:text-teal-400 flex-shrink-0" />
                    </div>
                    <div className="map-listing-meta">
                      <span className="num">{t('demo.search.r2_dist', '1.6 km')}</span>
                      <span className="map-listing-dot" aria-hidden />
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{t('map.sheet.open', 'Open')}</span>
                      <span className="map-listing-dot" aria-hidden />
                      <span>
                        {t('map.sheet.next_slot', 'Next slot')}{' '}
                        <span className="num font-semibold text-slate-700 dark:text-slate-300">{t('demo.search.r2_next', '12:15')}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 text-xs">
                      <span className="num flex items-center gap-0.5 font-semibold text-slate-800 dark:text-slate-200">
                        <ProtoIcon name="star" className="w-3 h-3 text-amber-500 fill-amber-500" />
                        {t('demo.search.r2_stars', '4.6')}
                      </span>
                      <span className="num text-slate-400 dark:text-slate-500">({t('demo.search.r2_rev_n', '188')})</span>
                      <span className="map-listing-dot" aria-hidden />
                      <span className="num text-slate-600 dark:text-slate-400 font-medium">{t('demo.search.r2_price', 'EGP 250-1200')}</span>
                    </div>
                  </div>
                  <span className="map-listing-card__action btn-secondary">{t('map.sheet.view', 'View')}</span>
                </div>

                <button
                  type="button"
                  className="map-more-results tap num"
                  onClick={() => show('b2c-search')}
                >
                  {t('map.sheet.more', '+ 15 more centers - see full list')}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
