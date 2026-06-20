import { useEffect, useState } from 'react';
import { ProtoHomeIndicator, ProtoStatusBar } from '../../../components/proto/Chrome';
import { ProtoIcon } from '../../../components/proto/Icon';
import { ProtoStateStrip } from '../../../components/proto/ProtoStateStrip';
import { useProto } from '../../../context/ProtoContext';
import type { MarketListingKey } from '../../../context/ProtoContext';
import { ScreenWrap } from '../../shared/ScreenWrap';
import { listingByKey } from './marketplaceListings';

type StockDemo = 'in_stock' | 'low' | 'oos';

const PHOTO_LABEL_KEYS = ['disc.part.photo_1', 'disc.part.photo_2', 'disc.part.photo_3'] as const;

export function B2cPartDetail() {
  const { show, t, marketListingKey, setMarketListingKey } = useProto();
  const row = listingByKey(marketListingKey);
  const [slide, setSlide] = useState(0);
  const [qty, setQty] = useState(1);
  const [stock, setStock] = useState<StockDemo>('in_stock');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setSlide(0);
    setQty(1);
    setStock('in_stock');
    setAdded(false);
  }, [marketListingKey]);

  useEffect(() => {
    if (!added) return;
    const tm = window.setTimeout(() => setAdded(false), 1500);
    return () => window.clearTimeout(tm);
  }, [added]);

  const price = t(row.priceKey, row.priceEn);
  const title = t(row.titleKey, row.titleEn);
  const oos = stock === 'oos';
  const low = stock === 'low';

  return (
    <ScreenWrap id="b2c-part-detail">
      <div className="flex flex-col flex-1 min-h-0">
        <ProtoStatusBar />
        <div className="flex-shrink-0 z-30 flex items-center gap-2 px-3 pt-1 pb-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-700/80">
          <button
            type="button"
            className="tap w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/80"
            onClick={() => show('b2c-marketplace')}
            aria-label={t('a11y.back', 'Back')}
          >
            <ProtoIcon name="arrow-left" className="w-5 h-5 text-slate-700 dark:text-slate-200" aria-hidden />
          </button>
          <span className="flex-1 text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{title}</span>
          <button
            type="button"
            className="tap w-10 h-10 rounded-xl flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/80"
            aria-label={t('disc.part.share', 'Share')}
          >
            <ProtoIcon name="share-2" className="w-[18px] h-[18px] text-slate-600 dark:text-slate-300" aria-hidden />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 app-surface px-4">
          <ProtoStateStrip<StockDemo>
            ariaLabel={t('disc.part.stock_scenario', 'Stock scenario (demo)')}
            label={t('disc.part.stock_label', 'Inventory (prototype)')}
            value={stock}
            onChange={setStock}
            options={[
              { key: 'in_stock', label: t('disc.part.stock_in', 'In stock') },
              { key: 'low', label: t('disc.part.stock_low', 'Low stock') },
              { key: 'oos', label: t('disc.part.stock_out', 'Out of stock') },
            ]}
          />
          <div className="pb-4 space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800/90 aspect-[16/11] shadow-inner ring-1 ring-black/[0.04]">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`absolute inset-0 bg-gradient-to-br ${row.thumbGradient} transition-opacity duration-300 ${
                    slide === i ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  style={i === 1 ? { filter: 'saturate(1.08) brightness(1.03)' } : i === 2 ? { filter: 'saturate(0.92) hue-rotate(-8deg)' } : undefined}
                />
              ))}
              <div className="relative z-10 flex h-full items-center justify-center pointer-events-none">
                <ProtoIcon name={row.iconName} className={`w-20 h-20 ${row.iconClass}`} aria-hidden strokeWidth={1.25} />
              </div>
              <button
                type="button"
                className="absolute start-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-900/90 shadow-md flex items-center justify-center tap"
                aria-label={t('disc.part.prev_photo', 'Previous photo')}
                onClick={() => setSlide((s) => (s + 2) % 3)}
              >
                <ProtoIcon name="chevron-left" className="w-6 h-6 text-slate-700 dark:text-slate-200" aria-hidden />
              </button>
              <button
                type="button"
                className="absolute end-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-900/90 shadow-md flex items-center justify-center tap"
                aria-label={t('disc.part.next_photo', 'Next photo')}
                onClick={() => setSlide((s) => (s + 1) % 3)}
              >
                <ProtoIcon name="chevron-right" className="w-6 h-6 text-slate-700 dark:text-slate-200" aria-hidden />
              </button>
              <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5" role="tablist" aria-label={t('disc.part.photos', 'Photos')}>
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={slide === i}
                    className={`h-2 rounded-full transition-all tap ${slide === i ? 'w-7 bg-white shadow' : 'w-2 bg-white/55'}`}
                    onClick={() => setSlide(i)}
                    aria-label={t(PHOTO_LABEL_KEYS[i], `Photo ${i + 1} of 3`)}
                  />
                ))}
              </div>
            </div>

            {low ? (
              <div className="rounded-xl border border-amber-200/80 dark:border-amber-700/55 bg-amber-50 dark:bg-amber-950/40 px-3 py-2.5 flex items-start gap-2 text-xs text-amber-950 dark:text-amber-100">
                <ProtoIcon name="alert-triangle" className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" aria-hidden />
                <span>{t('disc.part.low_warn', 'Only a few units left at this seller — finalize within 15 minutes in checkout.')}</span>
              </div>
            ) : null}

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge b-cyan text-[10px]">{t('disc.part.tab_parts', 'Parts')}</span>
                {oos ? (
                  <span className="badge b-slate text-[10px]">{t('disc.part.badge_waitlist', 'Join waitlist')}</span>
                ) : (
                  <span className="badge b-green text-[10px]">{t('disc.part.tab_verified_seller', 'Verified seller')}</span>
                )}
              </div>
              <h1 className="text-xl font-bold leading-snug tracking-tight text-slate-900 dark:text-slate-100">{title}</h1>
              <div className="text-xs text-slate-500 dark:text-slate-400">{t(row.skuKey, row.skuEn)}</div>
            </div>

            <div className="flex items-end justify-between gap-3 flex-wrap">
              <div>
                <div className={`text-2xl font-bold ${oos ? 'line-through opacity-55 text-slate-500 dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                  {price}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t(row.shipKey, row.shipEn)}</div>
              </div>
              <div className="flex items-center gap-0.5 text-sm font-semibold text-slate-800 dark:text-slate-200">
                <ProtoIcon name="star" className="w-4 h-4 text-amber-500 fill-amber-500" aria-hidden />
                {t(row.starKey, row.starEn)}
                <span className="text-slate-400 dark:text-slate-500 font-normal ms-1">· {t(row.extraKey, row.extraEn)}</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full text-start rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-3 shadow-sm hover:border-teal-200/90 dark:hover:border-teal-700/55 tap transition-colors flex items-center gap-3"
              onClick={() => show('b2c-shop')}
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shrink-0">
                <ProtoIcon name="store" className="w-6 h-6 text-white" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  {t('disc.part.sold_by', 'Sold & fulfilled by')}
                </div>
                <div className="font-semibold text-slate-900 dark:text-slate-100 truncate">{t(row.sellerKey, row.sellerEn)}</div>
                <div className="text-xs text-teal-700 dark:text-teal-400 font-medium">{t('disc.part.view_seller', 'View storefront')}</div>
              </div>
              <ProtoIcon name="chevron-right" className="w-5 h-5 text-slate-400 shrink-0" aria-hidden />
            </button>

            <div className="rounded-2xl border border-teal-100/90 dark:border-teal-800/55 bg-teal-50/80 dark:bg-teal-950/35 px-4 py-3">
              <div className="text-xs font-semibold text-teal-900 dark:text-teal-100 flex items-center gap-2">
                <ProtoIcon name="car" className="w-4 h-4 shrink-0" aria-hidden />
                {t('disc.part.fit_title', 'Fitment')}
              </div>
              <p className="text-sm text-teal-950/90 dark:text-teal-100/95 mt-1.5 leading-relaxed">{t('demo.part.fit_line', 'Matches your garage: Toyota Corolla 2018 · VIN on file')}</p>
            </div>

            <div>
              <div className="label mb-2">{t('disc.part.highlights', 'Highlights')}</div>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {row.bulletKeys.map((k, i) => (
                  <li key={k} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500 dark:bg-teal-400" />
                    {t(k, row.bulletsEn[i])}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pb-2">
              <div className="label mb-2">{t('disc.part.related', 'Others also picked up')}</div>
              <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4 no-scrollbar snap-x snap-mandatory">
                {row.relatedSku.map((k) => (
                  <RelatedCard key={k} k={k} active={marketListingKey === k} setMarketListingKey={setMarketListingKey} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 z-40 px-4 pt-3 pb-4 border-t border-slate-100 dark:border-slate-700/90 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-2xl border border-slate-200 dark:border-slate-600 overflow-hidden shrink-0">
              <button
                type="button"
                disabled={oos}
                aria-label={t('disc.part.qty_minus', 'Decrease quantity')}
                className="w-11 h-11 flex items-center justify-center tap hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-35"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                <ProtoIcon name="minus" className="w-4 h-4" aria-hidden />
              </button>
              <span className="min-w-[2rem] text-center text-sm font-bold text-slate-900 dark:text-slate-100">{qty}</span>
              <button
                type="button"
                disabled={oos}
                aria-label={t('disc.part.qty_plus', 'Increase quantity')}
                className="w-11 h-11 flex items-center justify-center tap hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-35"
                onClick={() => setQty((q) => Math.min(12, q + 1))}
              >
                <ProtoIcon name="plus" className="w-4 h-4" aria-hidden />
              </button>
            </div>
            <button
              type="button"
              disabled={oos}
              aria-live="polite"
              onClick={() => setAdded(true)}
              className={`btn-primary flex-1 py-3 rounded-2xl text-sm font-semibold tap shadow-lg flex flex-col items-center justify-center gap-0.5 min-h-[3.25rem] ${oos ? '!opacity-50 pointer-events-none' : ''} ${added ? '!bg-emerald-600' : ''}`}
            >
              {oos ? (
                t('disc.part.cta_notify', 'Notify when back')
              ) : added ? (
                <span className="flex items-center gap-1.5">
                  <ProtoIcon name="check" className="w-4 h-4" aria-hidden />
                  {t('disc.part.cta_added', 'Added to cart')}
                </span>
              ) : (
                <>
                  <span>{t('disc.part.cta_add', 'Add to cart')}</span>
                  <span className="text-[11px] font-medium opacity-95">
                    {qty} × {price}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
        <ProtoHomeIndicator />
      </div>
    </ScreenWrap>
  );
}

function RelatedCard({
  k,
  active,
  setMarketListingKey,
}: {
  k: MarketListingKey;
  active: boolean;
  setMarketListingKey: (k: MarketListingKey) => void;
}) {
  const { t } = useProto();
  const r = listingByKey(k);
  return (
    <button
      type="button"
      onClick={() => setMarketListingKey(k)}
      aria-pressed={active}
      className={`snap-start shrink-0 w-[132px] text-start rounded-2xl border p-3 tap shadow-sm ring-1 transition-colors ${
        active
          ? 'border-teal-400 bg-teal-50/70 dark:bg-teal-950/45 ring-teal-500/35'
          : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 ring-black/[0.02]'
      }`}
    >
      <div className={`mb-2 h-16 rounded-xl bg-gradient-to-br ${r.thumbGradient} flex items-center justify-center`}>
        <ProtoIcon name={r.iconName} className={`w-7 h-7 ${r.iconClass}`} aria-hidden strokeWidth={1.35} />
      </div>
      <div className="text-[11px] font-semibold text-slate-900 dark:text-slate-100 line-clamp-2 leading-tight">{t(r.titleKey, r.titleEn)}</div>
      <div className="mt-2 text-xs font-bold text-slate-900 dark:text-white">{t(r.priceKey, r.priceEn)}</div>
    </button>
  );
}
