import { useEffect, useState } from 'react';
import { ProtoHomeIndicator, ProtoStatusBar } from '../../../components/proto/Chrome';
import { ProtoIcon } from '../../../components/proto/Icon';
import { B2bTopbarMobile, OnboardStepper } from '../../../components/proto/TabBars';
import { useProto } from '../../../context/ProtoContext';
import { ScreenWrap } from '../../shared/ScreenWrap';

export function B2bOnboard1() {
  const { show, t } = useProto();
  type BizKey = 'independent' | 'dealer' | 'chain';

  const [kind, setKind] = useState<BizKey>('independent');
  const [mapOpen, setMapOpen] = useState(false);
  const [pinSaved, setPinSaved] = useState(false);
  const [pin, setPin] = useState({ x: 46, y: 43 });
  const [draftSaved, setDraftSaved] = useState(false);
  useEffect(() => {
    if (!draftSaved) return;
    const tm = window.setTimeout(() => setDraftSaved(false), 2000);
    return () => window.clearTimeout(tm);
  }, [draftSaved]);

  const bizChips: { id: BizKey; labelKey: string; fb: string }[] = [
    { id: 'independent', labelKey: 'b2b.on1.biz.ind', fb: 'Independent workshop' },
    { id: 'dealer', labelKey: 'b2b.on1.biz.dealer', fb: 'Authorized dealer' },
    { id: 'chain', labelKey: 'b2b.on1.biz.chain', fb: 'Multi-location chain' },
  ];

  return (
    <ScreenWrap id="b2b-onboard-1">
      <ProtoStatusBar />
      <div className="flex-1 flex flex-col min-h-0 app-surface">
        <B2bTopbarMobile title={t('b2b.top.welcome', 'Welcome, Omar')} />
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          <OnboardStepper active={0} interactive />
          <div className="onboard-card-proto p-4">
            <div className="t-h2 text-slate-900 dark:text-slate-100">{t('b2b.on1.title', 'Business information')}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{t('b2b.on1.lead', 'Used for verification and on your public listing.')}</div>

            <div className="mt-4 rounded-xl border border-dashed border-teal-200/80 bg-gradient-to-br from-teal-50/40 to-transparent p-3 dark:border-teal-800/50 dark:from-teal-950/30">
              <div className="text-xs font-semibold uppercase tracking-wide text-teal-800 dark:text-teal-200">
                {t('b2b.on1.setup_label', 'Setup progress')}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow-sm ring-1 ring-teal-100 dark:bg-slate-900/80 dark:text-slate-200 dark:ring-teal-900/50">
                  <ProtoIcon name="check" className="h-3 w-3 text-teal-600" aria-hidden />
                  {t('b2b.on1.setup_trade', 'Trade name')}
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium shadow-sm ring-1 transition ${
                    pinSaved
                      ? 'bg-white/90 text-slate-700 ring-teal-200 dark:bg-slate-900/80 dark:text-slate-200 dark:ring-teal-800/60'
                      : 'bg-white/90 text-slate-700 shadow-sm ring-slate-200 dark:bg-slate-900/80 dark:text-slate-200 dark:ring-slate-600'
                  }`}
                >
                  <ProtoIcon
                    name={pinSaved ? 'check' : 'map-pin'}
                    className={`h-3 w-3 ${pinSaved ? 'text-teal-600' : 'text-slate-400'}`}
                    aria-hidden
                  />
                  {t('b2b.on1.setup_map', 'Map pin')}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900/80 dark:text-slate-200 dark:ring-slate-600">
                  <ProtoIcon name="file-text" className="h-3 w-3 text-slate-400" aria-hidden />
                  {t('b2b.on1.setup_cr', 'CR / Tax')}
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <div className="label mb-1.5">{t('b2b.on1.legal', 'Legal name')}</div>
                <input className="proto-input w-full px-3.5 py-2.5 text-sm" defaultValue={t('demo.onboard.legal_name', 'AutoPro Automotive Services LLC')} autoComplete="off" />
              </div>
              <div>
                <div className="label mb-1.5">{t('b2b.on1.trade', 'Trade name (shown to users)')}</div>
                <input className="proto-input w-full px-3.5 py-2.5 text-sm" defaultValue={t('demo.shop.name', 'AutoPro Heliopolis')} autoComplete="off" />
              </div>
              <div>
                <div className="label mb-1.5">{t('b2b.on1.tax', 'Tax ID')}</div>
                <input className="proto-input w-full px-3.5 py-2.5 text-sm" defaultValue={t('demo.onboard.tax_id', '415-228-9910')} autoComplete="off" />
              </div>
              <div>
                <div className="label mb-1.5">{t('b2b.on1.cr', 'Commercial registration #')}</div>
                <input className="proto-input w-full px-3.5 py-2.5 text-sm" defaultValue={t('demo.onboard.cr', 'CR-88421')} autoComplete="off" />
              </div>
              <div>
                <div className="label mb-1.5">{t('b2b.on1.address', 'Address')}</div>
                <input className="proto-input w-full px-3.5 py-2.5 text-sm" defaultValue={t('demo.onboard.address_line', '12 Baghdad St, Heliopolis, Cairo')} autoComplete="off" />
              </div>
              <div>
                <div className="label mb-1.5">{t('b2b.on1.city', 'City')}</div>
                <input className="proto-input w-full px-3.5 py-2.5 text-sm" defaultValue={t('demo.onboard.city', 'Cairo')} autoComplete="off" />
              </div>
              <div>
                <div className="label mb-1.5">{t('b2b.on1.pin', 'Pin on map')}</div>
                <button
                  type="button"
                  className={`proto-input flex w-full items-center justify-between px-3.5 py-2.5 text-left text-sm tap ${mapOpen ? 'ring-2 ring-teal-400/70' : ''}`}
                  onClick={() => setMapOpen((o) => !o)}
                  aria-expanded={mapOpen}
                >
                  <span>{t('demo.onboard.coords', '30.0980°N · 31.3411°E')}</span>
                  <span className="font-semibold text-teal-700 dark:text-teal-400">{t('b2b.on1.adjust', 'Adjust')}</span>
                </button>
              </div>
              {mapOpen ? (
                <div className="rounded-xl border border-teal-200/90 bg-white p-3 shadow-inner dark:border-teal-800/55 dark:bg-slate-900/85">
                  <div className="relative aspect-[5/3] overflow-hidden rounded-lg bg-gradient-to-br from-slate-200 via-emerald-100/50 to-teal-200/70 dark:from-slate-800 dark:via-emerald-950/40 dark:to-slate-900">
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-55"
                      style={{
                        backgroundImage: `linear-gradient(to right,#94a3b822 1px,transparent 1px),linear-gradient(#94a3b822 1px,transparent 1px)`,
                        backgroundSize: '18px 18px',
                      }}
                    />
                    <div
                      className="absolute flex flex-col items-center"
                      style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: 'translate(-50%, -50%)' }}
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-600 text-white shadow-lg ring-4 ring-white/90 dark:bg-teal-500 dark:ring-slate-800">
                        <ProtoIcon name="map-pin" className="h-6 w-6" aria-hidden />
                      </span>
                      <span className="mt-1 rounded-md bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-slate-700 shadow dark:bg-slate-800 dark:text-slate-200">
                        {t('b2b.on1.map_drag', 'Drag to adjust')}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{t('b2b.on1.map_hint', 'Drivers use this pin for navigation. Keep it inside your gates.')}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      className="btn-ghost rounded-xl border border-slate-200 py-2.5 text-xs font-semibold active:scale-[0.98] dark:border-slate-600"
                      onClick={() =>
                        setPin((p) => ({
                          x: Math.min(68, Math.max(28, p.x + (Math.random() > 0.5 ? 5 : -5))),
                          y: Math.min(62, Math.max(30, p.y + (Math.random() > 0.5 ? 4 : -4))),
                        }))
                      }
                    >
                      <ProtoIcon name="move-horizontal" className="mr-1 inline h-4 w-4" aria-hidden />
                      {t('b2b.on1.nudge', 'Fine-tune')}
                    </button>
                    <button
                      type="button"
                      className="btn-primary rounded-xl py-2.5 text-xs font-semibold shadow-sm"
                      onClick={() => {
                        setPinSaved(true);
                        setMapOpen(false);
                      }}
                    >
                      {t('b2b.on1.map_save', 'Save pin')}
                    </button>
                  </div>
                </div>
              ) : null}
              <div>
                <div className="label mb-2">{t('b2b.on1.biztype', 'Business type')}</div>
                <div className="flex flex-wrap gap-2">
                  {bizChips.map((chip) => {
                    const sel = kind === chip.id;
                    return (
                      <button
                        key={chip.id}
                        type="button"
                        onClick={() => setKind(chip.id)}
                        className={`tap rounded-xl border px-3 py-2 text-xs font-semibold transition shadow-sm ${sel ? 'border-teal-500 bg-teal-50 text-teal-950 ring-1 ring-teal-400 dark:border-teal-600 dark:bg-teal-950/50 dark:text-teal-50' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-500'}`}
                        aria-pressed={sel}
                      >
                        {t(chip.labelKey, chip.fb)}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <div className="label mb-1.5">{t('b2b.on1.founded', 'Year founded')}</div>
                <input className="proto-input w-full px-3.5 py-2.5 text-sm" defaultValue={t('demo.onboard.year', '2014')} autoComplete="off" />
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setDraftSaved(true)}
                aria-live="polite"
                className={`btn-ghost tap w-full border bg-white dark:bg-slate-900 ${draftSaved ? 'border-emerald-300 text-emerald-700 dark:border-emerald-700 dark:text-emerald-300' : 'border-slate-200 dark:border-slate-600'}`}
              >
                {draftSaved ? (
                  <span className="flex items-center justify-center gap-1.5">
                    <ProtoIcon name="check" className="w-4 h-4" aria-hidden />
                    {t('b2b.on1.draft_saved', 'Draft saved')}
                  </span>
                ) : (
                  t('b2b.on1.draft', 'Save draft')
                )}
              </button>
              <button type="button" className="btn-primary tap shadow-md" onClick={() => show('b2b-onboard-3')}>
                {t('b2b.on1.cont', 'Continue')} <ProtoIcon name="arrow-right" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}
