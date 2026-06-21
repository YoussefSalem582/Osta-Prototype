import { useMemo, useState } from 'react';
import { ProtoHomeIndicator, ProtoStatusBar } from '../../../components/proto/Chrome';
import { ProtoIcon } from '../../../components/proto/Icon';
import { B2bTopbarMobile, OnboardStepper } from '../../../components/proto/TabBars';
import { useProto } from '../../../context/ProtoContext';
import { ScreenWrap } from '../../shared/ScreenWrap';

type SvcCat = 'oil' | 'brakes' | 'ac' | 'general';
type CatalogLine = { key: string; title: string; dur: string; typ: string; price: string; cat: SvcCat };

export function B2bOnboard3() {
  const { show, t } = useProto();
  const fixed = t('b2b.cat.fixed', 'Fixed');

  const baseLines: CatalogLine[] = useMemo(
    () => [
      {
        key: 's1',
        cat: 'oil',
        title: t('b2b.on3.s1', 'Oil change (standard)'),
        dur: t('b2b.on3.s1.dur', '45 min'),
        typ: fixed,
        price: t('demo.shop.svc1_price', 'EGP 350'),
      },
      {
        key: 's2',
        cat: 'brakes',
        title: t('b2b.on3.s2', 'Brake pads — front'),
        dur: t('b2b.on3.s2.dur', '1.5 h'),
        typ: fixed,
        price: t('demo.shop.svc2_price', 'EGP 650'),
      },
      {
        key: 's3',
        cat: 'ac',
        title: t('b2b.on3.s3', 'AC recharge'),
        dur: t('b2b.on3.s3.dur', '1 h'),
        typ: fixed,
        price: t('demo.shop.svc3_price', 'EGP 450'),
      },
    ],
    [t, fixed],
  );

  const extraLines: CatalogLine[] = useMemo(
    () => [
      {
        key: 'e1',
        cat: 'general',
        title: t('b2b.on3.e1', 'Tire rotation'),
        dur: t('b2b.on3.e1.dur', '30 min'),
        typ: fixed,
        price: t('b2b.on3.e1.price', 'EGP 200'),
      },
      {
        key: 'e2',
        cat: 'general',
        title: t('b2b.on3.e2', 'Battery diagnostic'),
        dur: t('b2b.on3.e2.dur', '20 min'),
        typ: fixed,
        price: t('b2b.on3.e2.price', 'EGP 120'),
      },
      {
        key: 'e3',
        cat: 'general',
        title: t('b2b.on3.e3', 'Wheel alignment'),
        dur: t('b2b.on3.e3.dur', '1 h'),
        typ: fixed,
        price: t('b2b.on3.e3.price', 'EGP 500'),
      },
    ],
    [t, fixed],
  );

  const [presetsMerged, setPresetsMerged] = useState(false);
  const merged = presetsMerged ? [...baseLines, ...extraLines] : baseLines;
  const [filterChip, setFilterChip] = useState<'all' | SvcCat>('all');

  const visible =
    filterChip === 'all' ? merged : merged.filter((line) => line.cat === filterChip);

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const chipChoices: ('all' | SvcCat)[] = ['all', 'oil', 'brakes', 'ac'];

  function chipLabel(c: typeof chipChoices[number]) {
    if (c === 'all') return t('b2b.cat.chip.all', 'All');
    if (c === 'oil') return t('b2b.cat.chip.oil', 'Oil');
    if (c === 'brakes') return t('b2b.cat.chip.brakes', 'Brakes');
    return t('b2b.cat.chip.ac', 'AC');
  }

  return (
    <ScreenWrap id="b2b-onboard-3">
      <ProtoStatusBar />
      <div className="flex-1 flex flex-col min-h-0 app-surface">
        <B2bTopbarMobile title={t('b2b.top.welcome', 'Welcome, Omar')} />
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          <OnboardStepper active={1} interactive />
          <div className="onboard-card-proto p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="t-h2 text-slate-900 dark:text-slate-100">{t('b2b.cat.title', 'Your service catalog')}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{t('b2b.cat.lead', 'Start with presets — you can edit any time.')}</div>
              </div>
              <span className="shrink-0 rounded-full bg-teal-600/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-teal-950 dark:bg-teal-500/25 dark:text-teal-100">
                {t('b2b.on3.phase', 'Catalog')}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {chipChoices.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={filterChip === c}
                  onClick={() => {
                    setFilterChip(c);
                    setOpenIdx(null);
                  }}
                  className={`tap rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide shadow-sm transition ${
                    filterChip === c
                      ? 'border-teal-500 bg-teal-50 text-teal-950 shadow-teal-900/10 dark:bg-teal-950/35 dark:text-teal-100'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300'
                  }`}
                >
                  {chipLabel(c)}
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={presetsMerged}
              onClick={() => setPresetsMerged(true)}
              className="btn-ghost mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50/60 py-2.5 text-xs font-semibold text-violet-900 shadow-sm hover:bg-violet-50 disabled:opacity-60 dark:border-violet-700/55 dark:bg-violet-950/55 dark:text-violet-100"
              aria-busy={presetsMerged}
            >
              <ProtoIcon name="wand-2" className="h-3.5 w-3.5" />
              {presetsMerged ? t('b2b.on3.presets_done', 'Common services added') : t('b2b.cat.presets', 'Add 12 common services')}
            </button>
            {presetsMerged ? (
              <p className="mt-2 rounded-lg bg-emerald-50/95 px-3 py-2 text-[11px] font-medium leading-relaxed text-emerald-950 dark:bg-emerald-950/35 dark:text-emerald-100" role="status">
                <ProtoIcon name="sparkles" className="mr-1 inline h-3.5 w-3.5" aria-hidden /> {t('b2b.on3.presets_banner', 'We matched services to Cairo pricing — edit durations before you publish.')}
              </p>
            ) : null}

            {visible.length === 0 ? (
              <p className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm font-medium text-slate-600 dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-400">
                {t('b2b.on3.filter_empty', 'Nothing in this filter — pick All or add presets.')}
              </p>
            ) : (
            <div className="mt-4 space-y-2">
              {visible.map((line, ix) => {
                const expanded = openIdx === ix;
                const key = `${line.key}-${ix}`;
                return (
                  <div
                    key={key}
                    className={`overflow-hidden rounded-xl border bg-gradient-to-r from-white to-teal-50/30 shadow-sm transition dark:from-slate-900 dark:to-teal-950/25 ${expanded ? 'border-teal-400/90 ring-1 ring-teal-300/50 dark:border-teal-600 dark:ring-teal-800/70' : 'border-slate-200 dark:border-slate-600/90'} `}
                  >
                    <button
                      type="button"
                      className="flex w-full justify-between gap-2 p-3 text-left tap dark:hover:bg-slate-800/40"
                      onClick={() => setOpenIdx((prev) => (prev === ix ? null : ix))}
                      aria-expanded={expanded}
                    >
                      <div className="min-w-0">
                        <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">{line.title}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          {line.dur} · <span className="badge b-slate">{line.typ}</span>{' '}
                          <span className="ml-1 inline rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                            {line.cat === 'general' ? t('b2b.on3.cat_other', 'Other') : chipLabel(line.cat)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-shrink-0 items-center gap-1">
                        <span className="text-sm font-bold text-teal-800 dark:text-teal-200">{line.price}</span>
                        <ProtoIcon name={expanded ? 'chevron-up' : 'chevron-down'} className="h-4 w-4 text-slate-400" aria-hidden />
                      </div>
                    </button>
                    {expanded ? (
                      <div className="space-y-2 border-t border-slate-100 px-3 py-3 text-xs dark:border-slate-700/80">
                        <div className="flex flex-wrap gap-2">
                          <button type="button" className="tap rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
                            {t('b2b.on3.adjust_price', 'Adjust price')}
                          </button>
                          <button type="button" className="tap rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
                            {t('b2b.on3.duplicate', 'Duplicate')}
                          </button>
                          <button type="button" className="tap rounded-lg border border-red-200 bg-red-50/80 px-2.5 py-1.5 font-medium text-red-800 dark:border-red-800/55 dark:bg-red-950/40 dark:text-red-100">
                            {t('b2b.on3.pause', 'Pause listing')}
                          </button>
                        </div>
                        <label className="flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/65">
                          <input type="checkbox" className="mt-0.5 h-4 w-4 accent-teal-600" defaultChecked />
                          <span>{t('b2b.on3.show_map', 'Show on map discovery & profile')}</span>
                        </label>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
            )}
            <button type="button" className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl py-2.5 text-sm font-semibold text-teal-700 tap dark:text-teal-400">
              <ProtoIcon name="plus" className="h-4 w-4" />
              {t('b2b.cat.custom', 'Add custom service')}
            </button>
            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                className="btn-ghost tap border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900"
                onClick={() => show('b2b-onboard-1')}
              >
                <ProtoIcon name="arrow-left" className="w-4 h-4" /> {t('b2b.cat.back', 'Back')}
              </button>
              <button type="button" className="btn-primary tap shadow-md" onClick={() => show('b2b-pending')}>
                {t('b2b.cat.submit', 'Submit for verification')} <ProtoIcon name="arrow-right" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}
