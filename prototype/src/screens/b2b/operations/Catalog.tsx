import { useCallback, useEffect, useMemo, useState } from 'react';
import { ProtoHomeIndicator, ProtoStatusBar } from '../../../components/proto/Chrome';
import { ProtoIcon } from '../../../components/proto/Icon';
import { ProtoSwitchVisual } from '../../../components/proto/ProtoSwitch';
import { B2bTabBar, B2bTopbarMobile } from '../../../components/proto/TabBars';
import { useProto } from '../../../context/ProtoContext';
import { ScreenWrap } from '../../shared/ScreenWrap';

type Chip = 'all' | 'oil' | 'brakes' | 'ac';
type SortMode = 'popular' | 'name' | 'price';
type CatKey = Exclude<Chip, 'all'>;

type SvcRow = {
  key: string;
  title: string;
  priceFb: string;
  priceSort: number;
  bookingsFb: string;
  bookingsSort: number;
  cat: CatKey;
  durKey: string;
  durFb: string;
};

function parsePriceDigits(t: string) {
  const n = Number.parseInt(t.replace(/\D/g, ''), 10);
  return Number.isFinite(n) ? n : 0;
}

export function B2bCatalog() {
  const { t } = useProto();
  const fixed = t('b2b.cat.fixed', 'Fixed');

  const defs = useMemo<SvcRow[]>(
    () => [
      {
        key: 'oil_std',
        title: t('demo.b2b.cat.oil_std', 'Oil (standard)'),
        priceFb: t('demo.shop.svc1_price', 'EGP 350'),
        priceSort: 350,
        bookingsFb: t('demo.b2b.cat.book_mo_1', '62'),
        bookingsSort: 62,
        cat: 'oil',
        durKey: 'b2b.on3.s1.dur',
        durFb: '45 min',
      },
      {
        key: 'brake',
        title: t('demo.b2b.cat.brake', 'Brake pads'),
        priceFb: t('demo.shop.svc2_price', 'EGP 650'),
        priceSort: 650,
        bookingsFb: t('demo.b2b.cat.book_mo_2', '22'),
        bookingsSort: 22,
        cat: 'brakes',
        durKey: 'b2b.on3.s2.dur',
        durFb: '1.5 h',
      },
      {
        key: 'ac',
        title: t('demo.b2b.cat.ac', 'AC recharge'),
        priceFb: t('demo.shop.svc3_price', 'EGP 450'),
        priceSort: 450,
        bookingsFb: t('demo.b2b.cat.book_mo_3', '34'),
        bookingsSort: 34,
        cat: 'ac',
        durKey: 'b2b.on3.s3.dur',
        durFb: '1 h',
      },
    ],
    [t],
  );

  const [chip, setChip] = useState<Chip>('all');
  const [sortMode, setSortMode] = useState<SortMode>('popular');
  const [query, setQuery] = useState('');
  const [live, setLive] = useState<Record<string, boolean>>({ oil_std: true, brake: true, ac: true });
  const [promo, setPromo] = useState<Record<string, boolean>>({});
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [priceOverride, setPriceOverride] = useState<Record<string, string>>({});
  const [draftPrice, setDraftPrice] = useState<Record<string, string>>({});
  const [importBanner, setImportBanner] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [addName, setAddName] = useState('');
  const [addPrice, setAddPrice] = useState('');
  const [addCat, setAddCat] = useState<CatKey>('oil');
  const [customRows, setCustomRows] = useState<SvcRow[]>([]);

  useEffect(() => {
    if (!importBanner) return;
    const id = window.setTimeout(() => setImportBanner(false), 4500);
    return () => window.clearTimeout(id);
  }, [importBanner]);

  const merged = useMemo(() => [...defs, ...customRows], [defs, customRows]);

  const filteredSorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = merged.filter((d) => chip === 'all' || d.cat === chip);
    if (q) rows = rows.filter((d) => d.title.toLowerCase().includes(q));
    rows = [...rows];
    rows.sort((a, b) => {
      if (sortMode === 'name') return a.title.localeCompare(b.title);
      if (sortMode === 'price') return a.priceSort - b.priceSort;
      return b.bookingsSort - a.bookingsSort;
    });
    return rows;
  }, [merged, chip, query, sortMode]);

  function chipLabel(c: Chip) {
    if (c === 'all') return t('b2b.cat.chip.all', 'All');
    if (c === 'oil') return t('b2b.cat.chip.oil', 'Oil');
    if (c === 'brakes') return t('b2b.cat.chip.brakes', 'Brakes');
    return t('b2b.cat.chip.ac', 'AC');
  }

  function catBadge(cat: CatKey) {
    if (cat === 'oil') return t('b2b.cat.chip.oil', 'Oil');
    if (cat === 'brakes') return t('b2b.cat.chip.brakes', 'Brakes');
    return t('b2b.cat.chip.ac', 'AC');
  }

  const displayPrice = useCallback(
    (r: SvcRow) => priceOverride[r.key] ?? r.priceFb,
    [priceOverride],
  );

  const onImport = () => {
    setImportBanner(true);
    setChip('all');
    setQuery('');
  };

  const onAddPreview = () => {
    const name = addName.trim();
    const pv = parsePriceDigits(addPrice) || 0;
    if (!name || pv <= 0) return;
    const key = `c_${Date.now()}`;
    setCustomRows((prev) => [
      ...prev,
      {
        key,
        title: name,
        priceFb: `EGP ${pv.toLocaleString('en-US')}`,
        priceSort: pv,
        bookingsFb: '0',
        bookingsSort: 0,
        cat: addCat,
        durKey: 'b2b.on3.s1.dur',
        durFb: '—',
      },
    ]);
    setLive((prev) => ({ ...prev, [key]: true }));
    setExpandedKey(key);
    setAddOpen(false);
    setAddName('');
    setAddPrice('');
    setSortMode('popular');
  };

  return (
    <ScreenWrap id="b2b-catalog">
      <ProtoStatusBar />
      <div className="relative flex min-h-0 flex-1 flex-col app-surface">
        <B2bTopbarMobile title={t('b2b.cat.nav', 'Catalog')} />

        <div className="px-3 pt-2">
          <div className="relative">
            <ProtoIcon name="search" className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('b2b.cat.search_ph', 'Search services…')}
              className="proto-input w-full rounded-xl py-2.5 ps-9 pe-3 text-sm"
              aria-label={t('b2b.cat.search_ph', 'Search services…')}
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
          </div>

          <div className="no-scrollbar mt-2 flex gap-1.5 overflow-x-auto pb-1" role="group" aria-label={t('b2b.cat.sort_group', 'Sort catalog')}>
            {(['popular', 'name', 'price'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                aria-pressed={sortMode === mode}
                onClick={() => setSortMode(mode)}
                className={`tap flex-shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
                  sortMode === mode
                    ? 'bg-slate-900 text-white shadow dark:bg-slate-100 dark:text-slate-900'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {mode === 'popular'
                  ? t('b2b.cat.sort.popular', 'Most booked')
                  : mode === 'name'
                    ? t('b2b.cat.sort.name', 'A–Z')
                    : t('b2b.cat.sort.price', 'Price')}
              </button>
            ))}
          </div>
        </div>

        {importBanner ? (
          <div
            className="mx-3 mt-2 flex gap-2 rounded-xl border border-teal-200/80 bg-teal-50/95 px-3 py-2 text-[11px] font-medium leading-snug text-teal-950 shadow-sm dark:border-teal-800/60 dark:bg-teal-950/40 dark:text-teal-50"
            role="status"
          >
            <ProtoIcon name="package" className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden />
            {t('b2b.cat.import_banner', 'Preset pack loaded — browse and toggle Live.')}
          </div>
        ) : null}

        <div className="no-scrollbar flex gap-2 overflow-x-auto px-3 pb-2 pt-2">
          {(['all', 'oil', 'brakes', 'ac'] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={chip === c}
              onClick={() => setChip(c)}
              className={`chip tap flex-shrink-0 ${chip === c ? 'on shadow-md shadow-teal-900/15' : ''}`}
            >
              {chipLabel(c)}
            </button>
          ))}
        </div>

        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-3 pt-1">
          <div className="flex gap-2">
            <button
              type="button"
              className="btn-ghost py-2.5 text-xs tap active:bg-slate-100 dark:active:bg-slate-800 dark:active:bg-slate-900/70"
              onClick={onImport}
            >
              <ProtoIcon name="download" className="mr-1 inline h-3.5 w-3.5" aria-hidden />
              {t('b2b.cat.import', 'Import')}
            </button>
            <button
              type="button"
              className="btn-primary tap flex flex-1 items-center justify-center py-2.5 text-xs active:translate-y-[0.5px]"
              onClick={() => setAddOpen(true)}
            >
              <ProtoIcon name="plus" className="mr-1 h-3.5 w-3.5" aria-hidden />
              {t('b2b.cat.add_svc', '+ Service')}
            </button>
          </div>

          {filteredSorted.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm font-medium text-slate-600 dark:border-slate-600 dark:text-slate-400">
              {t('b2b.cat.none_filter', 'No services in this filter.')}
            </div>
          ) : (
            filteredSorted.map((r) => {
              const on = live[r.key] ?? false;
              const open = expandedKey === r.key;
              const pk = promo[r.key];

              const startDraft = () => {
                if (draftPrice[r.key] !== undefined) return;
                const cur = String(parsePriceDigits(displayPrice(r)) || r.priceSort);
                setDraftPrice((m) => ({ ...m, [r.key]: cur }));
              };

              return (
                <div
                  key={r.key}
                  className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ring-1 ring-violet-500/5 transition dark:border-slate-600/90 dark:bg-slate-900 ${
                    on ? '' : 'opacity-[0.88]'
                  } ${pk ? 'ring-2 ring-amber-400/50 dark:ring-amber-500/40' : ''}`}
                >
                  <div className="flex gap-2 p-3 sm:items-start">
                    <button
                      type="button"
                      className="min-w-0 flex-1 rounded-lg text-left transition hover:bg-slate-50/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/55 dark:hover:bg-slate-800/50"
                      aria-expanded={open}
                      onClick={() => setExpandedKey((k) => (k === r.key ? null : r.key))}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{r.title}</span>
                            {pk ? (
                              <span className="inline-flex items-center gap-0.5 rounded-md bg-amber-100 px-1.5 py-0 text-[9px] font-bold uppercase tracking-wide text-amber-900 dark:bg-amber-950/65 dark:text-amber-100">
                                <ProtoIcon name="sparkles" className="h-2.5 w-2.5" aria-hidden /> {t('b2b.cat.promo_badge', 'Promo')}
                              </span>
                            ) : null}
                            <span className="rounded-md bg-violet-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-violet-900 dark:bg-violet-950/65 dark:text-violet-100">
                              {catBadge(r.cat)}
                            </span>
                          </div>
                          <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                            <span className="badge b-slate">{fixed}</span> {r.bookingsFb}
                            {t('b2b.cat.per_mo', '/mo')}
                          </div>
                          <div className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">{displayPrice(r)}</div>
                        </div>
                        <ProtoIcon
                          name="chevron-down"
                          className={`mt-1 h-5 w-5 flex-shrink-0 text-slate-400 transition dark:text-slate-500 ${open ? 'rotate-180' : ''}`}
                          aria-hidden
                        />
                      </div>
                    </button>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={on}
                        aria-label={
                          on ? t('b2b.cat.aria_live', 'Listed on catalogue') : t('b2b.cat.aria_hidden', 'Hidden from catalogue')
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          setLive((m) => ({ ...m, [r.key]: !on }));
                        }}
                        className="mt-1 shrink-0 rounded-full tap"
                      >
                        <ProtoSwitchVisual on={on} />
                      </button>
                      <span className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                        {on ? t('b2b.cat.live_on', 'Live') : t('b2b.cat.live_off', 'Off')}
                      </span>
                    </div>
                  </div>

                  {open ? (
                    <div className="space-y-3 border-t border-slate-100 px-3 pb-3 pt-2 dark:border-slate-700/80">
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="rounded-lg bg-slate-50 px-2.5 py-2 dark:bg-slate-800/85">
                          <div className="font-semibold text-slate-500 dark:text-slate-400">{t('b2b.cat.dur_label', 'Duration')}</div>
                          <div className="mt-0.5 font-semibold text-slate-900 dark:text-slate-100">{t(r.durKey, r.durFb)}</div>
                        </div>
                        <div className="rounded-lg bg-slate-50 px-2.5 py-2 dark:bg-slate-800/85">
                          <div className="font-semibold text-slate-500 dark:text-slate-400">{t('b2b.cat.sku_lab', 'Service ID')}</div>
                          <div className="mt-0.5 font-mono font-semibold text-slate-900 dark:text-slate-100">#{r.key.replace(/_/g, '').slice(0, 8).toUpperCase()}</div>
                        </div>
                      </div>

                      <button
                        type="button"
                        role="switch"
                        aria-checked={pk}
                        onClick={(e) => {
                          e.stopPropagation();
                          setPromo((m) => ({ ...m, [r.key]: !pk }));
                        }}
                        className="flex w-full items-center justify-between rounded-xl border border-amber-200/80 bg-amber-50/60 px-3 py-2 text-left text-xs font-medium text-amber-950 tap dark:border-amber-800/50 dark:bg-amber-950/30 dark:text-amber-100"
                      >
                        <span className="flex items-center gap-2">
                          <ProtoIcon name="sparkles" className="h-4 w-4" aria-hidden />
                          {t('b2b.cat.promo', 'Spotlight promo (demo)')}
                        </span>
                        <ProtoSwitchVisual on={pk} tone="amber" />
                      </button>
                      <p className="-mt-1 text-[10px] text-slate-500 dark:text-slate-400">{t('b2b.cat.promo_hint', 'Highlights this line in search results.')}</p>

                      <div>
                        <div className="mb-1.5 flex items-center justify-between">
                          <span className="label text-[11px]">{t('b2b.cat.price_quick_label', 'Quick price')}</span>
                          <span className="text-[10px] text-slate-400">{t('b2b.cat.price_hint', 'Tap Apply to preview new price.')}</span>
                        </div>
                        <div className="flex gap-2">
                          <label className="sr-only" htmlFor={`price-${r.key}`}>
                            {t('b2b.cat.price_quick_label', 'Quick price')}
                          </label>
                          <input
                            id={`price-${r.key}`}
                            type="tel"
                            inputMode="numeric"
                            className="proto-input flex-1 px-3 py-2 text-sm font-semibold tabular-nums"
                            placeholder="350"
                            value={draftPrice[r.key] ?? ''}
                            onFocus={startDraft}
                            onChange={(e) =>
                              setDraftPrice((m) => ({
                                ...m,
                                [r.key]: e.target.value.replace(/\D/g, ''),
                              }))
                            }
                          />
                          <button
                            type="button"
                            className="btn-primary tap shrink-0 rounded-xl px-4 py-2 text-xs active:translate-y-[0.5px]"
                            onClick={() => {
                              const raw = draftPrice[r.key] ?? String(parsePriceDigits(displayPrice(r)) || r.priceSort);
                              const nv = Number.parseInt(raw, 10) || r.priceSort;
                              setPriceOverride((prev) => ({
                                ...prev,
                                [r.key]: `EGP ${nv.toLocaleString('en-US')}`,
                              }));
                              setDraftPrice((m) => {
                                const n = { ...m };
                                delete n[r.key];
                                return n;
                              });
                              setExpandedKey(r.key);
                            }}
                          >
                            {t('b2b.cat.apply', 'Apply')}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })
          )}
        </div>

        {/* Add-service sheet */}
        {addOpen ? (
          <>
            <button type="button" className="absolute inset-0 z-40 bg-black/45 backdrop-blur-[1px]" aria-label={t('common.dismiss', 'Dismiss')} onClick={() => setAddOpen(false)} />
            <div className="absolute bottom-0 left-0 right-0 z-50 translate-y-0 transition-opacity duration-200">
              <div className="mx-auto max-h-[72vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-slate-200 bg-white px-4 pb-8 pt-5 shadow-[0_-8px_32px_-8px_rgba(0,0,0,.2)] dark:border-slate-700 dark:bg-slate-900">
                <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-slate-200 dark:bg-slate-700" aria-hidden />
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">{t('b2b.cat.sheet_title', 'Quick add service')}</h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t('b2b.cat.sheet_sub', 'Local preview for this prototype session.')}</p>

                <div className="mt-4 space-y-3">
                  <div>
                    <label className="label mb-1 block text-xs" htmlFor="b2b-cat-add-name">
                      {t('b2b.cat.sheet_name', 'Service name')}
                    </label>
                    <input
                      id="b2b-cat-add-name"
                      className="proto-input w-full px-3.5 py-2.5 text-sm"
                      value={addName}
                      onChange={(e) => setAddName(e.target.value)}
                      autoFocus
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <span className="label mb-1.5 block text-xs">{t('b2b.cat.sheet_cat_label', 'Category')}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(['oil', 'brakes', 'ac'] as const).map((c) => (
                        <button
                          key={c}
                          type="button"
                          aria-pressed={addCat === c}
                          className={`chip tap text-[11px] ${addCat === c ? 'on' : ''}`}
                          onClick={() => setAddCat(c)}
                        >
                          {catBadge(c)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="label mb-1 block text-xs" htmlFor="b2b-cat-add-price">
                      {t('b2b.cat.sheet_price', 'Display price (EGP)')}
                    </label>
                    <input
                      id="b2b-cat-add-price"
                      type="tel"
                      inputMode="numeric"
                      className="proto-input w-full px-3.5 py-2.5 text-sm font-semibold tabular-nums"
                      placeholder="500"
                      value={addPrice}
                      onChange={(e) => setAddPrice(e.target.value.replace(/\D/g, ''))}
                    />
                  </div>
                </div>

                <div className="mt-5 flex gap-2 pb-6">
                  <button type="button" className="btn-ghost flex-1 rounded-xl py-3 tap" onClick={() => setAddOpen(false)}>
                    {t('common.cancel', 'Cancel')}
                  </button>
                  <button type="button" className="btn-primary flex-[1.15] rounded-xl py-3 tap shadow-md active:translate-y-[0.5px]" onClick={onAddPreview}>
                    {t('b2b.cat.add_preview', 'Add to catalog (preview)')}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
      <B2bTabBar active="catalog" />
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}
