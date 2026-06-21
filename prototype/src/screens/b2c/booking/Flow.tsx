import { useEffect, useState } from 'react';
import { ProtoFunnelProgress, ProtoHomeIndicator, ProtoStatusBar } from '../../../components/proto/Chrome';
import { ProtoIcon } from '../../../components/proto/Icon';
import { ProtoStateStrip } from '../../../components/proto/ProtoStateStrip';
import { useProto, type BookingPricingMode } from '../../../context/ProtoContext';
import { ScreenWrap } from '../../shared/ScreenWrap';

type PricingDemo = BookingPricingMode;
type SlotDemo = 'held' | 'empty_day' | 'expired';
type PayDemo = 'card_promo' | 'cash' | 'fail';

/** Visual progress toward checkout (demo). */
function BookingFlowChrome({ step }: { step: 1 | 2 | 3 | 4 }) {
  const { t } = useProto();
  const funnelStep = Math.min(step, 3);

  const hint =
    step === 1
      ? t('book.flow.hint_service', 'Choose your car & line items')
      : step === 2
        ? t('book.flow.hint_slot', 'Pick date & arrival time')
        : step === 3
          ? t('book.flow.hint_pay', 'Review total & pay securely')
          : t('book.flow.hint_done', 'Saved — reminder before visit');

  return (
    <div className="px-4 pt-1 pb-3 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700/85">
      <ProtoFunnelProgress step={step >= 4 ? 3 : funnelStep} total={3} />
      <div className="flex justify-between mt-2.5 text-[10px] font-semibold uppercase tracking-[0.05em] text-slate-500 dark:text-slate-400 gap-1">
        <span className={`flex-1 text-center truncate ${step >= 1 ? 'text-teal-700 dark:text-teal-400' : ''}`}>{t('book.flow.nav_service', 'Service')}</span>
        <span className={`flex-1 text-center truncate ${step >= 2 ? 'text-teal-700 dark:text-teal-400' : ''}`}>{t('book.flow.nav_slot', 'Time')}</span>
        <span className={`flex-1 text-center truncate ${step >= 3 ? 'text-teal-700 dark:text-teal-400' : ''}`}>{t('book.flow.nav_pay', 'Pay')}</span>
        <span className={`flex-1 text-center truncate ${step >= 4 ? 'text-teal-700 dark:text-teal-400' : ''}`}>{t('book.flow.nav_done', 'Done')}</span>
      </div>
      <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 mt-2 leading-snug">{hint}</p>
    </div>
  );
}

/** Shop teaser used on booking steps 1–2. */
function BookingShopPeek() {
  const { t } = useProto();
  return (
    <div className="rounded-2xl border border-teal-100/90 dark:border-teal-800/50 bg-gradient-to-br from-teal-50/90 via-white to-slate-50/90 dark:from-teal-950/35 dark:via-slate-900 dark:to-slate-900 px-4 py-3 mb-5 flex gap-3 items-center shadow-sm ring-1 ring-black/[0.02]">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shrink-0 shadow-md text-white">
        <ProtoIcon name="wrench" className="w-6 h-6" aria-hidden strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-bold text-[15px] text-slate-900 dark:text-slate-100 leading-tight truncate">{t('book.flow.shop_name', 'AutoPro Heliopolis')}</div>
        <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 flex flex-wrap items-center gap-x-1 gap-y-0.5">
          <ProtoIcon name="map-pin" className="w-3.5 h-3.5 shrink-0 inline text-teal-600 dark:text-teal-400" aria-hidden />
          <span>{t('book.flow.shop_meta', '0.8 km · Heliopolis · Open until 10pm')}</span>
          <span className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0 rounded-md bg-teal-100 dark:bg-teal-950/60 text-teal-900 dark:text-teal-200 border border-teal-200/80 dark:border-teal-800/55">
            {t('book.flow.shop_verified', 'Verified')}
          </span>
        </div>
      </div>
    </div>
  );
}

type SvcOpt = {
  titleKey: string;
  titleEn: string;
  subKey: string;
  durKey: string;
  priceKey: string;
  priceEn: string;
  priceNum: number;
  typ: 'fixed' | 'range';
};

const SERVICE_OPTIONS_STATIC: readonly SvcOpt[] = [
  {
    titleKey: 'demo.flow.svc_std_title',
    titleEn: 'Oil change (standard)',
    subKey: 'demo.flow.svc_std_sub',
    durKey: 'demo.flow.svc_std_dur',
    priceKey: 'demo.flow.price_350',
    priceEn: 'EGP 350',
    priceNum: 350,
    typ: 'fixed',
  },
  {
    titleKey: 'demo.flow.svc_prem_title',
    titleEn: 'Oil change (premium)',
    subKey: 'demo.flow.svc_prem_sub',
    durKey: 'demo.flow.svc_std_dur',
    priceKey: 'demo.flow.price_620',
    priceEn: 'EGP 620',
    priceNum: 620,
    typ: 'fixed',
  },
  {
    titleKey: 'demo.flow.svc_combo_title',
    titleEn: 'Oil + filter combo',
    subKey: 'demo.flow.svc_combo_sub',
    durKey: 'demo.flow.svc_combo_dur',
    priceKey: 'demo.flow.price_450',
    priceEn: 'EGP 450',
    priceNum: 450,
    typ: 'fixed',
  },
  {
    titleKey: 'demo.flow.svc_insp_title',
    titleEn: 'Brake inspection',
    subKey: 'demo.flow.svc_insp_sub',
    durKey: 'demo.flow.svc_insp_dur',
    priceKey: 'demo.flow.price_free',
    priceEn: 'Free',
    priceNum: 0,
    typ: 'range',
  },
];

export function B2cService() {
  const { show, t, bookingReturnTarget, bookingDraft, setBookingDraft } = useProto();
  const [pricingDemo, setPricingDemo] = useState<PricingDemo>(bookingDraft.pricingMode);
  const [selectedIdx, setSelectedIdx] = useState(bookingDraft.serviceIdx);
  const [addonOn, setAddonOn] = useState(bookingDraft.addonOn);

  useEffect(() => {
    if (pricingDemo === 'range') setSelectedIdx(3);
    else if (pricingDemo === 'fixed') setSelectedIdx(0);
  }, [pricingDemo]);

  const sel = SERVICE_OPTIONS_STATIC[selectedIdx];
  const addonEligible = pricingDemo !== 'quote' && sel.priceNum > 0;
  const addonCharge = addonOn && addonEligible ? 180 : 0;
  const lineTotal = sel.priceNum + addonCharge;

  const totalDisplay =
    pricingDemo === 'quote'
      ? t('demo.flow.quote_pending', 'Quote pending')
      : lineTotal <= 0
        ? t('demo.flow.price_free', 'Free')
        : `${t('book.flow.currency_prefix', 'EGP')} ${lineTotal.toLocaleString('en-EG')}`;

  const canContinueQuote = pricingDemo === 'quote';

  return (
    <ScreenWrap id="b2c-service">
      <ProtoStatusBar />
      <BookingFlowChrome step={1} />
      <div className="screen-topbar border-b border-slate-100/80 dark:border-slate-800/90">
        <button
          type="button"
          className="funnel-back tap -ml-1 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          onClick={() => show(bookingReturnTarget)}
          aria-label={t('a11y.back', 'Back')}
        >
          <ProtoIcon name="arrow-left" className="w-5 h-5 text-slate-700 dark:text-slate-200" aria-hidden />
        </button>
        <div className="font-semibold text-slate-900 dark:text-slate-100 truncate px-2">{t('book.service.title', 'Select service')}</div>
        <button
          type="button"
          className="tap w-10 h-10 flex justify-end items-start text-xs font-semibold text-teal-700 dark:text-teal-400"
          aria-label={t('book.flow.help_demo', 'How pricing works')}
        >
          ?
        </button>
      </div>
      <div className="flex-1 app-surface px-5 pt-4 overflow-y-auto min-h-0">
        <BookingShopPeek />
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="label">{t('book.pick_car', 'Pick your car')}</span>
          <button type="button" className="text-[11px] font-semibold text-teal-700 dark:text-teal-400 tap shrink-0">
            {t('book.flow.change_vehicle', 'Garage')}
          </button>
        </div>
        <div className="flex gap-2 mb-6 overflow-x-auto chip-scroll-row no-scrollbar pb-1">
          <button type="button" className="chip on whitespace-nowrap tap shrink-0 rounded-full px-4 py-2">
            <ProtoIcon name="car" className="w-3.5 h-3.5 shrink-0" aria-hidden />
            {t('demo.flow.car_corolla_2019', 'Toyota Corolla 2019')}
          </button>
          <button type="button" className="chip whitespace-nowrap tap shrink-0 rounded-full px-4 py-2">
            <ProtoIcon name="car" className="w-3.5 h-3.5 shrink-0 text-slate-500" aria-hidden />
            {t('demo.flow.car_tucson_2022', 'Hyundai Tucson 2022')}
          </button>
          <button type="button" className="chip whitespace-nowrap tap shrink-0 rounded-full px-4 py-2">
            <ProtoIcon name="plus" className="w-3.5 h-3.5" aria-hidden />
            {t('book.add_car', 'Add car')}
          </button>
        </div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="label">{t('book.services', 'Services')}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/45 text-indigo-800 dark:text-indigo-200 font-semibold uppercase tracking-wide shrink-0 ring-1 ring-indigo-200/60 dark:ring-indigo-800/50">
            {pricingDemo === 'quote' ? t('book.proto.quote_short', 'Quote') : t('book.flow.pricing_estimate', 'Est.')}
          </span>
        </div>
        <ProtoStateStrip<PricingDemo>
          ariaLabel={t('book.proto.pricing_strip_a11y', 'Pricing model preview')}
          label={t('book.proto.pricing_strip', 'Demo pricing type')}
          value={pricingDemo}
          onChange={setPricingDemo}
          options={[
            { key: 'fixed', label: t('book.proto.fixed', 'Fixed price') },
            { key: 'range', label: t('book.proto.range', 'Price range') },
            { key: 'quote', label: t('book.proto.quote', 'Quote only') },
          ]}
        />
        <div className="space-y-2 mt-3">
          {pricingDemo === 'quote' ? (
            <div className="rounded-2xl border-2 border-dashed border-teal-300 bg-teal-50/70 dark:bg-teal-950/35 dark:border-teal-600/65 p-4">
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('book.proto.quote_title', 'Custom quote requested')}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">{t('book.proto.quote_body', 'The shop confirms price in-app after inspection — tap-to-call is the MVP fallback.')}</p>
            </div>
          ) : (
            SERVICE_OPTIONS_STATIC.map((row, idx) => {
              const on = selectedIdx === idx;
              const subs = [
                t('demo.flow.svc_std_sub', '5W-30 semi-synthetic · 4L'),
                t('demo.flow.svc_prem_sub', '5W-30 full synthetic · 4L'),
                t('demo.flow.svc_combo_sub', 'Standard oil + OEM filter'),
                t('demo.flow.svc_insp_sub', 'Free with any service'),
              ];
              const durs = [t('demo.flow.svc_std_dur', '45 min'), t('demo.flow.svc_std_dur', '45 min'), t('demo.flow.svc_combo_dur', '1 h'), t('demo.flow.svc_insp_dur', '15 min')];
              const sub = subs[idx];
              const dur = durs[idx];
              return (
                <button
                  key={row.titleKey}
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left tap transition-colors shadow-sm ring-1 ring-black/[0.02] ${
                    on
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/40 dark:border-teal-500 ring-teal-500/25'
                      : 'border-slate-200 dark:border-slate-600 hover:border-teal-200/80 dark:hover:border-teal-700/55'
                  }`}
                >
                  <div
                    className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center ${
                      on ? 'border-teal-600' : 'border-slate-300 dark:border-slate-600'
                    }`}
                    aria-hidden
                  >
                    {on ? <div className="w-2.5 h-2.5 rounded-full bg-teal-600" /> : null}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">{t(row.titleKey, row.titleEn)}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {sub} · {dur}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-bold text-[15px] text-slate-900 dark:text-slate-100">{t(row.priceKey, row.priceEn)}</div>
                    <div className="text-[10px] uppercase text-slate-400 dark:text-slate-500 font-semibold">
                      {row.typ === 'range' ? t('book.from', 'from') : t('book.fixed', 'fixed')}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>

        <div className="label mt-8 mb-2">{t('book.addons', 'Add-ons')}</div>
        <button
          type="button"
          onClick={() => addonEligible && setAddonOn((x) => !x)}
          disabled={!addonEligible}
          className={`w-full p-4 rounded-xl border flex justify-between items-center text-left tap transition-colors shadow-sm ring-1 ring-black/[0.02] ${
            addonOn ? 'border-teal-400 bg-teal-50/60 dark:bg-teal-950/35 ring-teal-500/25' : 'border-slate-200 dark:border-slate-600'
          } ${!addonEligible ? 'opacity-45 pointer-events-none' : ''}`}
        >
          <div className="min-w-0 pr-3">
            <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">{t('book.cabin_filter', 'Cabin air filter')}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{t('book.cabin_sub', 'OEM · +10 min')}</div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className={`text-sm font-bold ${addonOn ? 'text-teal-800 dark:text-teal-200' : 'text-slate-900 dark:text-slate-100'}`}>{t('demo.flow.addon_180', '+EGP 180')}</div>
            <div
              className={`w-11 h-7 rounded-full flex items-center px-1 transition-colors ${
                addonOn ? 'bg-gradient-to-r from-teal-600 to-emerald-500 justify-end' : 'bg-slate-200 dark:bg-slate-600 justify-start'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-white dark:bg-slate-900 shadow flex items-center justify-center">
                <ProtoIcon name={addonOn ? 'check' : 'plus'} className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" aria-hidden />
              </span>
            </div>
          </div>
        </button>
        {!addonEligible ? <p className="text-[11px] text-slate-500 mt-2 leading-snug">{t('book.flow.addon_blocked', 'Add-ons unlock after selecting a priced service.')}</p> : null}
      </div>
      <div className="cta-bar border-t border-slate-100 dark:border-slate-700/80 bg-white dark:bg-slate-900 pt-4 pb-3">
        <div className="flex items-end justify-between gap-3 px-5 mb-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400">{pricingDemo === 'quote' ? t('book.flow.next_schedule', 'Next: schedule arrival') : t('book.flow.running_total', 'Running total')}</span>
          <span className="font-bold text-slate-900 dark:text-slate-50 text-[15px]">{totalDisplay}</span>
        </div>
        <button
          type="button"
          className={`btn-primary btn-primary-lg w-full tap shadow-lg flex flex-col items-center justify-center py-4 gap-0.5`}
          onClick={() => {
            setBookingDraft({ serviceIdx: selectedIdx, addonOn, pricingMode: pricingDemo });
            show('b2c-slot');
          }}
        >
          <span>{canContinueQuote ? t('book.flow.cta_quote', 'Continue to schedule') : t('book.flow.cta_continue', 'Continue')}</span>
          <span className="text-[11px] font-medium opacity-90">{pricingDemo !== 'quote' ? totalDisplay : ''}</span>
        </button>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}

export function B2cSlot() {
  const { show, t, bookingDraft } = useProto();
  const [slotDemo, setSlotDemo] = useState<SlotDemo>('held');
  const [dayIdx, setDayIdx] = useState(0);
  const morning = [
    t('demo.slot.t0900', '09:00'),
    t('demo.slot.t0930', '09:30'),
    t('demo.slot.t1000', '10:00'),
    t('demo.slot.t1030', '10:30'),
    t('demo.slot.t1100', '11:00'),
    t('demo.slot.t1130', '11:30'),
  ];
  const afternoon = [
    t('demo.slot.t1200', '12:00'),
    t('demo.slot.t1230', '12:30'),
    t('demo.slot.t1300', '13:00'),
    t('demo.slot.t1400', '14:00'),
    t('demo.slot.t1430', '14:30'),
    t('demo.slot.t1500', '15:00'),
  ];

  const [selectedMorningIdx, setSelectedMorningIdx] = useState(4);

  useEffect(() => {
    setSelectedMorningIdx(4);
  }, [slotDemo, dayIdx]);

  // Live 10-minute hold countdown — restarts whenever the scenario or day
  // changes so the "slot is held" narrative reads as real, not frozen.
  const [holdSecs, setHoldSecs] = useState(9 * 60 + 42);
  useEffect(() => {
    setHoldSecs(9 * 60 + 42);
    const id = setInterval(() => setHoldSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [slotDemo, dayIdx]);
  const holdLabel = `${Math.floor(holdSecs / 60)}:${String(holdSecs % 60).padStart(2, '0')}`;

  const days = [
    t('demo.slot.d1', 'Sat 18'),
    t('demo.slot.d2', 'Sun 19'),
    t('demo.slot.d3', 'Mon 20'),
    t('demo.slot.d4', 'Tue 21'),
    t('demo.slot.d5', 'Wed 22'),
    t('demo.slot.d6', 'Thu 23'),
    t('demo.slot.d7', 'Fri 24'),
  ];

  const blockContinue = slotDemo === 'empty_day';

  const summarySvc = SERVICE_OPTIONS_STATIC[bookingDraft.serviceIdx];
  const summaryAddonEligible = bookingDraft.pricingMode !== 'quote' && summarySvc.priceNum > 0;
  const summaryAddonCharge = bookingDraft.addonOn && summaryAddonEligible ? 180 : 0;
  const summaryLineTotal = summarySvc.priceNum + summaryAddonCharge;

  return (
    <ScreenWrap id="b2c-slot">
      <ProtoStatusBar />
      <BookingFlowChrome step={2} />
      <div className="screen-topbar border-b border-slate-100/80 dark:border-slate-800/90">
        <button
          type="button"
          className="funnel-back tap -ml-1 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          onClick={() => show('b2c-service')}
          aria-label={t('a11y.back', 'Back')}
        >
          <ProtoIcon name="arrow-left" className="w-5 h-5 text-slate-700 dark:text-slate-200" aria-hidden />
        </button>
        <div className="font-semibold text-slate-900 dark:text-slate-100 truncate px-2">{t('book.slot.title', 'Pick a slot')}</div>
        <div className="w-10" />
      </div>
      <div className="flex-1 app-surface px-5 pt-4 overflow-y-auto min-h-0">
        <BookingShopPeek />
        <div className="rounded-xl border border-indigo-100 dark:border-indigo-800/50 bg-indigo-50/65 dark:bg-indigo-950/35 px-3 py-2.5 mb-4 text-[12px] text-indigo-950 dark:text-indigo-100 ring-1 ring-indigo-200/70 dark:ring-indigo-800/50 leading-snug flex flex-wrap items-baseline gap-x-1 gap-y-1">
          <span className="font-semibold text-indigo-900 dark:text-indigo-100">{t('book.flow.slot_summary_label', 'Current selection')}:</span>
          <span>{t(summarySvc.titleKey, summarySvc.titleEn)}</span>
          {bookingDraft.addonOn && summaryAddonCharge > 0 ? (
            <span className="text-[11px] font-medium text-teal-800 dark:text-teal-300">
              + {t('book.cabin_filter_short', 'cabin filter')}
            </span>
          ) : null}
          <span className="text-indigo-600 dark:text-indigo-300">·</span>
          {bookingDraft.pricingMode === 'quote' ? (
            <span>{t('demo.flow.quote_pending', 'Quote pending')}</span>
          ) : summaryLineTotal <= 0 ? (
            <span>{t('demo.flow.price_free', 'Free')}</span>
          ) : (
            <span>{`${t('book.flow.currency_prefix', 'EGP')} ${summaryLineTotal.toLocaleString('en-EG')}`}</span>
          )}
        </div>
        <ProtoStateStrip<SlotDemo>
          ariaLabel={t('book.proto.slot_strip_a11y', 'Slot availability preview')}
          label={t('book.proto.slot_strip', 'Demo scenario')}
          value={slotDemo}
          onChange={setSlotDemo}
          options={[
            { key: 'held', label: t('book.proto.slot_held', 'Held slot') },
            { key: 'empty_day', label: t('book.proto.slot_empty', 'No slots today') },
            { key: 'expired', label: t('book.proto.slot_expired', 'Hold expired') },
          ]}
        />
        {slotDemo === 'empty_day' ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 dark:bg-rose-950/40 dark:border-rose-700/55 px-3 py-2 mb-4 text-xs text-rose-950 dark:text-rose-100 leading-snug flex gap-2">
            <ProtoIcon name="info" className="w-4 h-4 shrink-0 mt-0.5" aria-hidden />
            {t('book.proto.slot_empty_banner', 'This day has no open capacity matching your filters — try another date or widen the search.')}
          </div>
        ) : null}
        <div className="flex items-center justify-between mb-2">
          <span className="label mb-0">{t('book.slot.choose_day', 'Date')}</span>
          <button type="button" className="text-[11px] font-semibold text-teal-700 dark:text-teal-400 tap">
            {t('book.slot.view_week', 'Week view')}
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 chip-scroll-row no-scrollbar" role="listbox" aria-label={t('book.slot.day_strip_a11y', 'Available days')}>
          {days.map((d, i) => (
            <button
              key={d}
              type="button"
              role="option"
              aria-selected={dayIdx === i}
              onClick={() => setDayIdx(i)}
              className={`min-w-[62px] text-center px-2 py-2.5 rounded-2xl transition-all tap shrink-0 ${
                i === dayIdx
                  ? 'bg-gradient-to-br from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-900/25 ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 ring-teal-400/50'
                  : 'border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100'
              }`}
            >
              <div className={`text-[11px] font-semibold uppercase ${i === dayIdx ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'}`}>{d.split(' ')[0]}</div>
              <div className={`font-bold ${i === dayIdx ? 'text-xl' : 'text-lg'}`}>{d.split(' ')[1]}</div>
            </button>
          ))}
        </div>
        <div className="label mt-6 mb-2">{t('book.slot.morning', 'Morning')}</div>
        <div className="grid grid-cols-3 gap-2">
          {morning.map((time, i) => {
            const muted = slotDemo === 'empty_day' ? true : i === 1 || i === 3;
            const sel = !muted && slotDemo !== 'empty_day' && selectedMorningIdx === i;
            const disabled = muted || slotDemo === 'empty_day';
            return (
              <button
                key={time}
                type="button"
                disabled={disabled}
                onClick={() => !muted && setSelectedMorningIdx(i)}
                className={`text-center py-3 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                  disabled
                    ? 'bg-slate-100 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 line-through opacity-65 cursor-not-allowed'
                    : sel
                      ? 'bg-gradient-to-br from-teal-600 to-emerald-600 text-white font-semibold shadow-md ring-1 ring-teal-500/35'
                      : 'border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 hover:border-teal-200 dark:hover:border-teal-700'
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>
        <div className="label mt-6 mb-2">{t('book.slot.afternoon', 'Afternoon')}</div>
        <div className="grid grid-cols-3 gap-2">
          {afternoon.map((time) => (
            <button
              key={time}
              type="button"
              disabled={slotDemo === 'empty_day'}
              className={`text-center py-3 rounded-xl text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                slotDemo === 'empty_day'
                  ? 'bg-slate-100 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 line-through opacity-65 cursor-not-allowed'
                  : 'border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 hover:border-teal-200 dark:hover:border-teal-700 text-slate-900 dark:text-slate-100 tap'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
        {slotDemo === 'expired' ? (
          <div className="mt-6 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200/90 dark:border-red-800/60 flex gap-2 items-start shadow-sm">
            <ProtoIcon name="alert-circle" className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 shrink-0" aria-hidden />
            <div className="text-xs text-red-950 dark:text-red-100 leading-relaxed">
              <b>{t('book.proto.slot_expired_title', 'Hold expired — pick a slot again')}</b>
              <span className="block mt-1 font-normal">{t('book.proto.slot_expired_body', 'The 10‑minute lock was released.')}</span>
            </div>
          </div>
        ) : (
          <div className="mt-6 p-3.5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/45 dark:to-orange-950/35 border border-amber-200/80 dark:border-amber-800/50 flex gap-3 items-start shadow-sm ring-1 ring-amber-200/70 dark:ring-amber-800/50">
            <ProtoIcon name="timer" className="w-5 h-5 text-amber-700 dark:text-amber-400 mt-0.5 shrink-0" aria-hidden />
            <div className="text-xs text-amber-950 dark:text-amber-100 leading-relaxed">
              <div className="font-bold text-[13px]">
                {t('book.slot.hold_for', 'Slot held for')} {morning[selectedMorningIdx]} · {slotDemo !== 'empty_day' ? `${t('book.slot.live_hold', 'lock active')}: ${holdLabel}` : '—'}
              </div>
              <span className="block mt-1 opacity-95">{t('book.slot.hold_confirm', 'Complete payment to confirm.')}</span>
            </div>
          </div>
        )}
        {blockContinue ? (
          <p className="mt-5 text-[12px] text-center text-slate-500 dark:text-slate-400">{t('book.slot.no_capacity_hint', 'Pick another day above to unlock checkout.')}</p>
        ) : null}
      </div>
      <div className="cta-bar bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-700">
        <button
          type="button"
          disabled={blockContinue}
          className={`btn-primary btn-primary-lg w-full tap shadow-lg ${blockContinue ? '!opacity-50 pointer-events-none' : ''}`}
          onClick={() => show('b2c-payment')}
        >
          {blockContinue ? t('book.slot.cta_blocked', 'No slots — adjust date') : t('common.continue', 'Continue')}
        </button>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}

export function B2cPayment() {
  const { show, t, bookingDraft } = useProto();
  const [payDemo, setPayDemo] = useState<PayDemo>('card_promo');

  const cardSelected = payDemo === 'card_promo' || payDemo === 'fail';
  const cashSelected = payDemo === 'cash';

  const payGroup = 'booking-payment-demo';

  const svc = SERVICE_OPTIONS_STATIC[bookingDraft.serviceIdx];
  const addonEligible = bookingDraft.pricingMode !== 'quote' && svc.priceNum > 0;
  const addonCharge = bookingDraft.addonOn && addonEligible ? 180 : 0;
  const subtotalNum = svc.priceNum + addonCharge;
  const feeNum = bookingDraft.pricingMode !== 'quote' ? 15 : 0;
  const promoApplied = bookingDraft.pricingMode !== 'quote' && !cashSelected;
  const totalCard = Math.max(0, subtotalNum + feeNum - (promoApplied ? 50 : 0));
  const totalCash = Math.max(0, subtotalNum + feeNum);
  const isQuote = bookingDraft.pricingMode === 'quote';

  const fmt = (n: number) => `${t('book.flow.currency_prefix', 'EGP')} ${n.toLocaleString('en-EG')}`;

  const totalLabel = isQuote
    ? t('demo.flow.quote_pending', 'Quote pending')
    : payDemo === 'cash'
      ? `${fmt(totalCash)} ${t('book.pay.at_shop', 'at shop')}`
      : fmt(totalCard);

  const payCtaLabel =
    payDemo === 'cash'
      ? t('book.pay.cta_cash_demo', 'Confirm booking · pay at shop')
      : isQuote
        ? t('book.pay.cta_confirm_quote', 'Confirm booking')
        : t('book.pay.cta_card', 'Pay {amount} & confirm').replace('{amount}', fmt(totalCard));

  return (
    <ScreenWrap id="b2c-payment">
      <ProtoStatusBar />
      <BookingFlowChrome step={3} />
      <div className="screen-topbar border-b border-slate-100/80 dark:border-slate-800/90">
        <button
          type="button"
          className="funnel-back tap -ml-1 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          onClick={() => show('b2c-slot')}
          aria-label={t('a11y.back', 'Back')}
        >
          <ProtoIcon name="arrow-left" className="w-5 h-5 text-slate-700 dark:text-slate-200" aria-hidden />
        </button>
        <div className="font-semibold text-slate-900 dark:text-slate-100 truncate px-2">{t('book.pay.title', 'Review & pay')}</div>
        <div className="w-10" />
      </div>
      <div className="flex-1 app-surface px-5 pt-4 overflow-y-auto min-h-0">
        <ProtoStateStrip<PayDemo>
          ariaLabel={t('book.proto.pay_strip_a11y', 'Payment outcome preview')}
          label={t('book.proto.pay_strip', 'Demo scenario')}
          value={payDemo}
          onChange={setPayDemo}
          options={[
            { key: 'card_promo', label: t('book.proto.pay_card', 'Card + promo') },
            { key: 'cash', label: t('book.proto.pay_cash_demo', 'Cash') },
            { key: 'fail', label: t('book.proto.pay_failed', 'Card declined') },
          ]}
        />
        <div className="app-panel p-4 mt-2 shadow-md shadow-slate-900/[0.04] ring-1 ring-black/[0.03] rounded-2xl border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-950/50 dark:to-cyan-950/40 flex items-center justify-center">
              <ProtoIcon name="wrench" className="w-6 h-6 text-teal-700 dark:text-teal-400" aria-hidden />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate">{t('book.pay.center', 'AutoPro Heliopolis')}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{t('book.pay.when', 'Sat 18 Apr · 11:00 · ~45 min')}</div>
              <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">{t('demo.track.booking_id', '#CC-4A1F9')}</div>
            </div>
          </div>
          <div className="divider my-3" />
          {isQuote ? (
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t('book.pay.quote_checkout', 'Price is set after inspection — you will confirm before work starts.')}</p>
          ) : (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-900 dark:text-slate-100 gap-2">
                <span className="min-w-0 truncate">{t(svc.titleKey, svc.titleEn)}</span>
                <span className="shrink-0 tabular-nums">{t(svc.priceKey, svc.priceEn)}</span>
              </div>
              {addonCharge > 0 ? (
                <div className="flex justify-between text-slate-700 dark:text-slate-300 gap-2">
                  <span className="min-w-0">{t('book.cabin_filter', 'Cabin air filter')}</span>
                  <span className="shrink-0 tabular-nums">{t('demo.flow.addon_180', '+EGP 180')}</span>
                </div>
              ) : null}
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>{t('book.pay.fee', 'Service fee')}</span>
                <span className="tabular-nums">{t('demo.pay.fee_15', 'EGP 15')}</span>
              </div>
              <div
                className={`flex justify-between transition-opacity ${
                  payDemo === 'cash' ? 'opacity-35 text-slate-500 dark:text-slate-500' : 'text-green-700 dark:text-green-400'
                }`}
              >
                <span>{t('book.pay.promo', 'Promo FIRST50')}</span>
                <span className="tabular-nums">{t('demo.pay.discount_50', '−EGP 50')}</span>
              </div>
            </div>
          )}
          <div className="divider my-3" />
          <div className="flex justify-between items-baseline gap-2 font-bold text-lg text-slate-900 dark:text-slate-100 num">
            <span>{t('book.pay.total', 'Total')}</span>
            <span className="text-end leading-tight tabular-nums">{totalLabel}</span>
          </div>
        </div>

        <div className="label mt-6 mb-2">{t('book.pay.method', 'Payment method')}</div>
        <div className="space-y-2" role="radiogroup" aria-label={t('book.pay.method', 'Payment method')}>
          <label
            className={`relative flex cursor-pointer items-center gap-3 p-3.5 rounded-2xl border-2 transition-colors tap ${
              cardSelected
                ? 'border-teal-500 bg-gradient-to-r from-teal-50 to-emerald-50/80 dark:from-teal-950/45 dark:to-emerald-950/35 dark:border-teal-500 shadow-sm'
                : 'border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900'
            } ${payDemo === 'fail' ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 ring-red-400/75' : ''}`}
          >
            <input
              type="radio"
              name={payGroup}
              value="card"
              checked={cardSelected}
              onChange={() => setPayDemo('card_promo')}
              className="absolute opacity-0 w-0 h-0"
              aria-describedby="pay-desc-card"
            />
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                cardSelected ? 'border-teal-600' : 'border-slate-300 dark:border-slate-600'
              }`}
              aria-hidden
            >
              {cardSelected ? <div className="w-2.5 h-2.5 rounded-full bg-teal-600" /> : null}
            </div>
            <ProtoIcon name="credit-card" className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" aria-hidden />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('demo.pay.card_mask', 'Visa •• 4242')}</div>
              <div id="pay-desc-card" className="text-xs text-slate-500 dark:text-slate-400">{t('book.pay.card_sub', 'Expires 08/27')}</div>
            </div>
          </label>
          <label
            className={`flex cursor-pointer items-center gap-3 p-3.5 rounded-2xl border-2 tap transition-colors ${
              cashSelected
                ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/40 dark:border-teal-500 shadow-sm'
                : 'border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900'
            }`}
          >
            <input
              type="radio"
              name={payGroup}
              value="cash"
              checked={cashSelected}
              onChange={() => setPayDemo('cash')}
              className="sr-only"
              aria-describedby="pay-desc-cash"
            />
            <div
              className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center ${
                cashSelected ? 'border-teal-600' : 'border-slate-300 dark:border-slate-600'
              }`}
              aria-hidden
            >
              {cashSelected ? <div className="w-2.5 h-2.5 rounded-full bg-teal-600" /> : null}
            </div>
            <ProtoIcon name="banknote" className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden />
            <div className="flex-1">
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('book.pay.cash', 'Cash on service')}</div>
              <div id="pay-desc-cash" className="text-xs text-slate-500 dark:text-slate-400">{t('book.pay.cash_sub', 'Pay at the center')}</div>
            </div>
          </label>
          <button
            type="button"
            className="w-full flex cursor-not-allowed items-center gap-3 p-3.5 rounded-2xl border border-dashed border-slate-200 dark:border-slate-600 bg-slate-50/70 dark:bg-slate-900/60 text-start opacity-80"
          >
            <div className="w-5 h-5 shrink-0 rounded-full border-2 border-slate-300 dark:border-slate-600 opacity-55" aria-hidden />
            <ProtoIcon name="wallet" className="w-5 h-5 text-violet-600 dark:text-violet-400 shrink-0 opacity-80" aria-hidden />
            <div className="flex-1">
              <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">{t('book.pay.vf', 'Vodafone Cash')}</div>
              <div className="text-xs text-slate-400 dark:text-slate-500">{t('book.pay_vf_soon', 'Coming soon in demo')}</div>
            </div>
          </button>
        </div>
        {payDemo === 'fail' ? (
          <div className="mt-4 rounded-xl border border-red-200/90 dark:border-red-800/60 bg-red-50 dark:bg-red-950/40 px-3 py-2.5 flex gap-2 items-start">
            <ProtoIcon name="x-circle" className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 shrink-0" aria-hidden />
            <p className="text-xs text-red-950 dark:text-red-100 leading-relaxed">{t('book.proto.pay_fail_msg', 'Bank declined this charge — switch method or retry.')}</p>
          </div>
        ) : null}
        <div className="mt-5 callout-info flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 p-3 rounded-xl ring-1 ring-slate-200/80 dark:ring-slate-700">
          <ProtoIcon name="shield-check" className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" aria-hidden />
          <div>
            {t('book.pay.refund', 'If the service can’t be completed as described, Osta refunds within 48h.')}{' '}
            <button type="button" className="text-teal-700 dark:text-teal-400 font-semibold tap">
              {t('book.pay.learn', 'Learn more')}
            </button>
          </div>
        </div>
      </div>
      <div className="cta-bar bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-700 pt-4">
        <button
          type="button"
          className={`w-full rounded-2xl py-4 font-semibold tap shadow-lg shadow-orange-500/20 ${
            payDemo === 'fail' ? 'btn-secondary border-2 border-red-200 dark:border-red-800' : 'btn-accent'
          }`}
          onClick={() => show('b2c-confirmed')}
        >
          {payCtaLabel}
        </button>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}

export function B2cConfirmed() {
  const { show, t, bookingDraft } = useProto();
  const svc = SERVICE_OPTIONS_STATIC[bookingDraft.serviceIdx];
  return (
    <ScreenWrap id="b2c-confirmed">
      <ProtoStatusBar />
      <BookingFlowChrome step={4} />
      <div className="flex-1 app-surface px-6 pt-10 pb-4 flex flex-col items-center text-center min-h-0 overflow-y-auto">
        <div className="confirmed-hero-icon mb-4 ring-8 ring-teal-500/15 dark:ring-teal-400/25">
          <ProtoIcon name="check" className="w-11 h-11" aria-hidden />
        </div>
        <div className="rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-wider bg-teal-100 dark:bg-teal-950/60 text-teal-900 dark:text-teal-100 ring-1 ring-teal-200/80 mb-3">
          {t('book.confirmed.badge', 'Confirmed')}
        </div>
        <div className="t-h1 text-slate-900 dark:text-slate-100">{t('book.confirmed.title', 'Booking confirmed')}</div>
        <div className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-[20rem] leading-relaxed">{t('book.confirmed.lead', "You're booked at AutoPro Heliopolis on Sat 18 Apr at 11:00. We'll remind you an hour before.")}</div>
        <div className="mt-8 w-full app-panel p-4 text-start shadow-xl shadow-slate-900/15 ring-1 ring-teal-100/80 dark:ring-teal-900/30 rounded-2xl border border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-baseline gap-4 text-xs text-slate-500 dark:text-slate-400 pb-3 border-b border-slate-100 dark:border-slate-700 mb-4">
            <span className="font-semibold uppercase tracking-wide">{t('book.confirmed.id', 'Booking ID')}</span>
            <span className="font-mono font-semibold text-slate-900 dark:text-slate-50">{t('demo.track.booking_id', '#CC-4A1F9')}</span>
          </div>
          <div className="space-y-3 text-sm text-slate-900 dark:text-slate-100">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-950/50">
                <ProtoIcon name="calendar" className="w-4 h-4 text-teal-700 dark:text-teal-400" aria-hidden />
              </span>
              <span className="leading-snug">{t('demo.confirmed.when_detail', 'Sat 18 Apr · 11:00 AM')}</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-50 dark:bg-cyan-950/50">
                <ProtoIcon name="map-pin" className="w-4 h-4 text-cyan-700 dark:text-cyan-400" aria-hidden />
              </span>
              <span className="leading-snug">{t('demo.confirmed.address', 'AutoPro, 12 Baghdad St, Heliopolis')}</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800/80">
                <ProtoIcon name="car" className="w-4 h-4 text-slate-600 dark:text-slate-400" aria-hidden />
              </span>
              <span className="leading-snug">{t('demo.confirmed.car_line', 'Toyota Corolla 2019')}</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/50">
                <ProtoIcon name="wrench" className="w-4 h-4 text-amber-700 dark:text-amber-400" aria-hidden />
              </span>
              <span className="leading-snug">{t(svc.titleKey, svc.titleEn)}</span>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full grid grid-cols-3 gap-2">
          <button type="button" className="btn-ghost py-3 rounded-2xl text-xs flex flex-col items-center gap-1 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 tap">
            <ProtoIcon name="calendar-plus" className="w-4 h-4" aria-hidden />
            {t('book.confirmed.cal', 'Add to calendar')}
          </button>
          <button type="button" className="btn-ghost py-3 rounded-2xl text-xs flex flex-col items-center gap-1 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 tap">
            <ProtoIcon name="navigation" className="w-4 h-4" aria-hidden />
            {t('book.confirmed.nav', 'Directions')}
          </button>
          <button type="button" className="btn-ghost py-3 rounded-2xl text-xs flex flex-col items-center gap-1 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 tap">
            <ProtoIcon name="phone" className="w-4 h-4" aria-hidden />
            {t('book.confirmed.call', 'Call')}
          </button>
        </div>
      </div>
      <div className="cta-bar space-y-2 border-t border-slate-100 dark:border-slate-700 pt-4 bg-white dark:bg-slate-900">
        <button type="button" className="btn-primary btn-primary-lg w-full tap shadow-lg" onClick={() => show('b2c-progress')}>
          {t('book.confirmed.view', 'View booking')}
        </button>
        <button type="button" className="text-sm w-full text-slate-600 dark:text-slate-400 font-medium tap py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80" onClick={() => show('b2c-map')}>
          {t('book.confirmed.map', 'Back to map')}
        </button>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}
