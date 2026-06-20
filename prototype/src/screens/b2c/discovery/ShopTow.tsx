import { B2cTabBar } from '../../../components/proto/TabBars';
import { ProtoHomeIndicator, ProtoStatusBar } from '../../../components/proto/Chrome';
import { ProtoIcon } from '../../../components/proto/Icon';
import { B2cMapMainColumn } from '../../../components/proto/MapColumn';
import { useProto } from '../../../context/ProtoContext';
import { ScreenWrap } from '../../shared/ScreenWrap';

export function B2cShop() {
  const { show, setBookingReturnTarget, t } = useProto();
  const goBook = () => {
    setBookingReturnTarget('b2c-shop');
    show('b2c-service');
  };
  const services = [
    [
      t('demo.shop.svc1_title', 'Oil change (standard)'),
      t('demo.shop.svc1_dur', '45 min'),
      t('demo.shop.svc1_price', 'EGP 350'),
    ],
    [
      t('demo.shop.svc2_title', 'Brake pads — front'),
      t('demo.shop.svc2_dur', '1.5 h'),
      t('demo.shop.svc2_price', 'EGP 650'),
    ],
    [
      t('demo.shop.svc3_title', 'AC recharge'),
      t('demo.shop.svc3_dur', '1 h'),
      t('demo.shop.svc3_price', 'EGP 450'),
    ],
    [
      t('demo.shop.svc4_title', 'Full engine diagnostic'),
      t('demo.shop.svc4_dur', '30 min'),
      t('demo.shop.svc4_price', 'From EGP 200 (quote)'),
    ],
  ];
  return (
    <ScreenWrap id="b2c-shop">
      <div className="flex-1 overflow-y-auto">
        <div className="relative h-52 gradient-hero-shop">
          <div className="status-bar absolute top-0 left-0 right-0" style={{ color: 'white' }}>
            <span>{t('demo.status.time', '9:41')}</span>
            <span />
          </div>
          <button
            type="button"
            className="absolute top-12 start-4 w-10 h-10 rounded-full bg-white dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 flex items-center justify-center tap shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/80 focus-visible:ring-offset-2"
            onClick={() => show('b2c-map')}
            aria-label={t('a11y.back', 'Back')}
          >
            <ProtoIcon name="arrow-left" className="w-4 h-4" aria-hidden />
          </button>
          <div className="absolute top-12 end-4 flex gap-2">
            <button
              type="button"
              className="w-10 h-10 rounded-full bg-white dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 flex items-center justify-center tap shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/80 focus-visible:ring-offset-2"
              aria-label={t('a11y.share', 'Share')}
            >
              <ProtoIcon name="share-2" className="w-4 h-4" aria-hidden />
            </button>
            <button
              type="button"
              className="w-10 h-10 rounded-full bg-white dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 flex items-center justify-center tap shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/80 focus-visible:ring-offset-2"
              aria-label={t('a11y.save', 'Save')}
            >
              <ProtoIcon name="heart" className="w-4 h-4" aria-hidden />
            </button>
          </div>
          <div className="absolute bottom-3 end-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded">{t('disc.shop.photo_idx', '1/12')}</div>
        </div>
        <div className="px-5 -mt-6 relative z-10">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-lg border border-slate-200 dark:border-slate-600/80 ring-1 ring-black/[0.03]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-xl font-bold text-slate-900 dark:text-slate-100">{t('demo.shop.name', 'AutoPro Heliopolis')}</div>
                  <ProtoIcon name="badge-check" className="w-5 h-5 text-teal-700 dark:text-teal-400" />
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('disc.shop.subtitle', 'Authorized dealer · Independent workshop')}</div>
                <div className="flex items-center gap-2 mt-2 text-xs">
                  <span className="flex items-center gap-0.5 font-semibold text-slate-900 dark:text-slate-100">
                    <ProtoIcon name="star" className="w-3 h-3 text-amber-500 fill-amber-500" />
                    {t('demo.search.r1_stars', '4.8')}
                  </span>
                  <span className="text-slate-400 dark:text-slate-500">
                    ({t('demo.search.r1_rev_n', '312')} {t('disc.shop.reviews', 'reviews')})
                  </span>
                  <span className="text-slate-400 dark:text-slate-500">·</span>
                  <span className="text-green-600 dark:text-green-400 font-semibold">{t('disc.shop.open_until', 'Open · closes 10pm')}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('demo.shop.dist', '0.8 km')}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{t('demo.shop.area', 'Heliopolis')}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <button type="button" className="btn-ghost py-2.5 text-xs flex flex-col items-center">
                <ProtoIcon name="phone" className="w-4 h-4 mb-1" />
                {t('disc.shop.call', 'Call')}
              </button>
              <button type="button" className="btn-ghost py-2.5 text-xs flex flex-col items-center">
                <ProtoIcon name="navigation" className="w-4 h-4 mb-1" />
                {t('disc.shop.directions', 'Directions')}
              </button>
              <button type="button" className="btn-ghost py-2.5 text-xs flex flex-col items-center">
                <ProtoIcon name="message-circle" className="w-4 h-4 mb-1" />
                {t('disc.shop.message', 'Message')}
              </button>
            </div>
          </div>
        </div>
        <div className="px-5 pt-5">
          <div className="label mb-2">{t('disc.shop.popular', 'Popular services')}</div>
          <div className="space-y-2">
            {services.map(([title, dur, price], i) => (
              <button
                key={i}
                type="button"
                className="tap flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-600/90 bg-white dark:bg-slate-900 shadow-sm hover:border-teal-200/80 dark:hover:border-teal-600/45 w-full text-left font-inherit"
                onClick={goBook}
              >
                <div>
                  <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">{title}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{dur}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">{price}</div>
                  <ProtoIcon name="chevron-right" className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="px-5 pt-5">
          <div className="label mb-2">{t('disc.shop.photos', 'Photos')}</div>
          <div className="flex gap-2 overflow-x-auto">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="w-28 h-20 rounded-xl bg-slate-200 dark:bg-slate-700 flex-shrink-0" />
            ))}
          </div>
        </div>
        <div className="px-5 pt-5">
          <div className="flex justify-between items-end mb-2">
            <div className="label">
              {t('disc.shop.rev_title', 'Reviews')} · {t('demo.search.r1_stars', '4.8')}
            </div>
            <div className="text-xs text-teal-700 dark:text-teal-400 font-semibold">{t('disc.shop.see_all', 'See all')}</div>
          </div>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {(
              [
                ['Quality', '4.9', 'teal'],
                ['Price', '4.6', 'amber'],
                ['Speed', '4.8', 'cyan'],
                ['Honesty', '4.9', 'violet'],
              ] as const
            ).map(([l, , tone]) => (
              <div
                key={l}
                className={`p-2 rounded-xl text-center ${
                  tone === 'teal'
                    ? 'bg-teal-50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-100'
                    : tone === 'amber'
                      ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-100'
                      : tone === 'cyan'
                        ? 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-100'
                        : 'bg-violet-50 dark:bg-violet-950/40 text-violet-900 dark:text-violet-100'
                }`}
              >
                <div className="text-[10px] font-semibold uppercase tracking-wide opacity-80">
                  {l === 'Quality'
                    ? t('disc.shop.rev.quality', 'Quality')
                    : l === 'Price'
                      ? t('disc.shop.rev.price', 'Price')
                      : l === 'Speed'
                        ? t('disc.shop.rev.speed', 'Speed')
                        : t('disc.shop.rev.honesty', 'Honesty')}
                </div>
                <div className="font-bold">
                  {l === 'Quality'
                    ? t('demo.shop.rev_v_quality', '4.9')
                    : l === 'Price'
                      ? t('demo.shop.rev_v_price', '4.6')
                      : l === 'Speed'
                        ? t('demo.shop.rev_v_speed', '4.8')
                        : t('demo.shop.rev_v_honesty', '4.9')}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-600">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-full bg-teal-100 dark:bg-teal-950/55 flex items-center justify-center text-xs font-semibold text-teal-700 dark:text-teal-200">
                {t('demo.shop.rev_ini_mh', 'MH')}
              </div>
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('demo.shop.rev_name', 'Mohamed H.')}</div>
              <div className="text-xs text-slate-400 dark:text-slate-500 ml-auto">{t('demo.shop.rev_when', '2 days ago')}</div>
            </div>
            <div className="flex gap-0.5 mb-1">
              {[1, 1, 1, 1, 1].map((_, i) => (
                <ProtoIcon key={i} name="star" className="w-3 h-3 text-amber-500 fill-amber-500" />
              ))}
            </div>
            <div className="text-sm text-slate-700 dark:text-slate-300">{t('disc.shop.rev.sample', 'Fast, clean, honest pricing. Texted me when the car was ready.')}</div>
          </div>
        </div>
        <div className="h-24" />
      </div>
      <div className="p-4 border-t border-slate-200 dark:border-slate-600/90 bg-white dark:bg-slate-900/95 backdrop-blur-sm shadow-[0_-8px_30px_rgba(15,23,42,.08)]">
        <button type="button" className="btn-primary w-full tap rounded-2xl py-3.5 shadow-md" onClick={goBook}>
          {t('disc.shop.cta', 'Book service · from EGP 350')}
        </button>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}

export function B2cTow() {
  const { show, setBookingReturnTarget, t } = useProto();
  const svcRows = [
    ['layers', t('disc.tow.svc.flatbed', 'Flatbed'), t('disc.tow.svc.flatbed_sub', 'Cars & SUVs · low clearance OK'), t('disc.tow.price.from_450', 'from EGP 450')],
    ['battery-charging', t('disc.tow.svc.jump', 'Jump & lockout'), t('disc.tow.svc.jump_sub', 'Battery boost · unlock'), t('disc.tow.price.from_200', 'from EGP 200')],
    ['anchor', t('disc.tow.svc.winch', 'Winch recovery'), t('disc.tow.svc.winch_sub', 'Stuck / off-road add-on'), t('disc.tow.quote', 'Quote')],
    ['droplet', t('disc.tow.svc.fuel', 'Fuel delivery'), t('disc.tow.svc.fuel_sub', '5L emergency top-up'), t('disc.tow.price.fuel_line', 'EGP 120 + fuel')],
  ];
  return (
    <ScreenWrap id="b2c-tow">
      <div className="flex-1 overflow-y-auto min-h-0 bg-slate-50 dark:bg-slate-800/90">
        <div className="relative h-56 gradient-hero-tow tow-hero">
          <div className="relative z-10">
            <div className="status-bar" style={{ color: 'rgba(255,255,255,.95)' }}>
              <span>{t('demo.status.time', '9:41')}</span>
              <span />
            </div>
            <div className="flex items-center justify-between px-4 pt-1">
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white dark:bg-slate-900/95 shadow-md flex items-center justify-center tap ring-1 ring-white/40 dark:ring-slate-600/80"
                onClick={() => show('b2c-map')}
                aria-label={t('a11y.back', 'Back')}
              >
                <ProtoIcon name="arrow-left" className="w-5 h-5 text-slate-800 dark:text-slate-200" />
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="w-10 h-10 rounded-full bg-white dark:bg-slate-900/95 shadow-md flex items-center justify-center tap ring-1 ring-white/40 dark:ring-slate-600/80"
                  aria-label={t('a11y.share', 'Share')}
                >
                  <ProtoIcon name="share-2" className="w-[18px] h-[18px] text-slate-800 dark:text-slate-200" />
                </button>
                <button
                  type="button"
                  className="w-10 h-10 rounded-full bg-white dark:bg-slate-900/95 shadow-md flex items-center justify-center tap ring-1 ring-white/40 dark:ring-slate-600/80"
                  aria-label={t('a11y.save', 'Save')}
                >
                  <ProtoIcon name="heart" className="w-[18px] h-[18px] text-slate-800 dark:text-slate-200" />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center pt-1 pb-2 relative z-10">
              <div className="tow-hero-icon-wrap flex items-center justify-center">
                <ProtoIcon name="truck" className="w-14 h-14 text-white opacity-95" />
              </div>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-900/15 backdrop-blur-md border border-white/25 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="tow-live-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-white/30" />
                </span>
                {t('disc.tow.live', 'Live dispatch · high demand')}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-3 pt-6 flex gap-2">
              <div className="flex-1 rounded-2xl bg-white dark:bg-slate-900/95 backdrop-blur-md border border-white/50 shadow-lg px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/55 flex items-center justify-center flex-shrink-0">
                    <ProtoIcon name="clock" className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      {t('disc.tow.avg_arrival', 'Avg. arrival')}
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">
                      {t('demo.tow.eta_range', '12–18 min')}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 rounded-2xl bg-white dark:bg-slate-900/95 backdrop-blur-md border border-white/50 shadow-lg px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center flex-shrink-0">
                    <ProtoIcon name="truck" className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      {t('disc.tow.on_shift', 'On shift')}
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">
                      {t('demo.tow.on_shift_trucks_n', '4')} {t('disc.tow.trucks', 'trucks')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-14 right-4 z-20 rounded-full bg-black/45 text-white text-[11px] font-medium px-2.5 py-1 backdrop-blur-sm">
            {t('disc.tow.photos', 'Photos · 1/6')}
          </div>
        </div>
        <div className="px-4 -mt-7 relative z-20 pb-6">
          <div className="bg-white dark:bg-slate-900 rounded-[22px] p-4 shadow-xl border border-slate-200 dark:border-slate-600/90 ring-1 ring-black/[0.04]">
            <div className="flex gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-900/25">
                <ProtoIcon name="truck" className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h1 className="text-[19px] font-extrabold text-slate-900 dark:text-slate-100 leading-snug tracking-tight">
                      {t('demo.tow.brand_title', 'City Tow 24/7')}
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {t('demo.tow.brand_sub', 'Heliopolis · East Cairo')}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {t('demo.search.r3_dist', '1.1 km')}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{t('disc.tow.straight', 'straight line')}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 dark:bg-teal-950/45 text-teal-900 dark:text-teal-100 border border-teal-100 dark:border-teal-800/60 px-2 py-0.5 text-[11px] font-semibold">
                    <ProtoIcon name="badge-check" className="w-3 h-3" />
                    {t('disc.tow.verified', 'Verified')}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-950/45 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-blue-800/60 px-2 py-0.5 text-[11px] font-semibold">
                    {t('disc.tow.partner', 'Tow partner')}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600/80 px-2 py-0.5 text-[11px] font-semibold">
                    {t('demo.tow.badge_247', '24/7')}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-100 dark:border-slate-700/80 px-2 py-2.5 text-center">
                <div className="flex items-center justify-center gap-0.5 text-amber-500">
                  <ProtoIcon name="star" className="w-3.5 h-3.5 fill-amber-500" />
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {t('demo.tow.stars_avg', '4.7')}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {t('demo.tow.rev_total_n', '201')} {t('disc.tow.reviews_n', 'reviews')}
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-100 dark:border-slate-700/80 px-2 py-2.5 text-center">
                <div className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center justify-center gap-1">
                  <ProtoIcon name="zap" className="w-3.5 h-3.5 text-amber-500" />
                  {t('demo.tow.response_eta', '~15m')}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{t('disc.tow.response', 'response')}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-100 dark:border-slate-700/80 px-2 py-2.5 text-center">
                <div className="text-sm font-bold text-slate-900 dark:text-slate-100">{t('demo.tow.radius_km', '15 km')}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{t('disc.tow.radius', 'radius')}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <button
                type="button"
                className="tap flex flex-col items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/35 border border-blue-100 dark:border-blue-800/50 py-3 text-[11px] font-semibold text-blue-900 dark:text-blue-100"
              >
                <ProtoIcon name="phone" className="w-[18px] h-[18px] mb-1 text-blue-700 dark:text-blue-300" />
                {t('disc.shop.call', 'Call')}
              </button>
              <button
                type="button"
                className="tap flex flex-col items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-600 py-3 text-[11px] font-semibold text-slate-800 dark:text-slate-200"
              >
                <ProtoIcon name="navigation" className="w-[18px] h-[18px] mb-1 text-slate-600 dark:text-slate-400" />
                {t('disc.tow.garage_btn', 'Garage')}
              </button>
              <button
                type="button"
                className="tap flex flex-col items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-600 py-3 text-[11px] font-semibold text-slate-800 dark:text-slate-200"
              >
                <ProtoIcon name="message-circle" className="w-[18px] h-[18px] mb-1 text-slate-600 dark:text-slate-400" />
                {t('disc.shop.message', 'Chat')}
              </button>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-amber-200/90 dark:border-amber-800/50 bg-gradient-to-br from-amber-50 to-orange-50/80 dark:from-amber-950/50 dark:to-orange-950/40 p-3.5 flex gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900/90 border border-amber-100 dark:border-amber-800/40 flex items-center justify-center flex-shrink-0 shadow-sm">
              <ProtoIcon name="alert-triangle" className="w-5 h-5 text-amber-700 dark:text-amber-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold text-amber-950 dark:text-amber-100">{t('disc.tow.unsafe_title', 'Unsafe to drive?')}</div>
              <p className="text-xs text-amber-900/85 dark:text-amber-200/90 leading-relaxed mt-0.5">{t('disc.tow.unsafe_body', 'Stay parked with hazards on. Call dispatch for priority routing — mention “roadside emergency”.')}</p>
              <button type="button" className="mt-2 text-xs font-bold text-amber-900 dark:text-amber-200 underline underline-offset-2 tap">
                {t('disc.tow.priority_call', 'Call priority line')}
              </button>
            </div>
          </div>
          <div className="callout-info p-4 rounded-2xl flex gap-3 mt-4 border border-blue-100 dark:border-blue-800/50 shadow-sm">
            <div className="w-11 h-11 rounded-2xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-800/50 flex items-center justify-center flex-shrink-0 shadow-sm">
              <ProtoIcon name="shield-check" className="w-5 h-5 text-blue-700 dark:text-blue-400" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100">{t('disc.tow.insured_title', 'Licensed & insured')}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                {t('disc.tow.insured_body', 'Commercial registration on file. Cargo cover up to')}{' '}
                <span className="font-semibold text-slate-800 dark:text-slate-200">{t('demo.tow.cargo_cap', 'EGP 500k')}</span>{' '}
                {t('disc.tow.per_job', 'per job.')}
              </p>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex items-end justify-between mb-2 px-0.5">
              <div className="label mb-0">{t('disc.tow.can_do', 'What they can do')}</div>
              <span className="text-[11px] font-semibold text-blue-700 dark:text-blue-400 tap">{t('disc.tow.compare', 'Compare')}</span>
            </div>
            <div className="space-y-2">
              {svcRows.map(([icon, title, sub, price]) => (
                <button
                  key={title}
                  type="button"
                  className="tap w-full flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-600/90 bg-white dark:bg-slate-900 shadow-sm text-left ring-1 ring-black/[0.02] hover:border-blue-200/80 dark:hover:border-blue-700/45 hover:shadow-md transition-shadow font-inherit"
                >
                  <div className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-100 dark:border-slate-700/80 flex items-center justify-center flex-shrink-0">
                    <ProtoIcon name={icon} className="w-5 h-5 text-blue-700 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">{title}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sub}</div>
                  </div>
                  <div className="text-right flex-shrink-0 pl-1">
                    <div className="text-xs font-bold text-slate-900 dark:text-slate-100">{price}</div>
                    <ProtoIcon name="chevron-right" className="w-4 h-4 text-slate-400 dark:text-slate-500 inline-block mt-1" />
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-slate-200 dark:border-slate-600/90 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="label mb-0">{t('disc.tow.fleet', 'Fleet availability')}</div>
              <span className="text-xs font-bold text-blue-700 dark:text-blue-400">{t('disc.tow.fleet_active', '4 of 6 active')}</span>
            </div>
            <div className="tow-fleet-bar">
              <span className="tow-fleet-bar-fill" style={{ width: '66.67%' }} />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{t('disc.tow.fleet_note', 'Busy nights can add a few minutes — you’ll see live ETA after you request.')}</p>
          </div>
          <div className="mt-5 rounded-2xl border border-slate-200 dark:border-slate-600/90 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <div className="label mb-3">{t('disc.tow.pricing', 'Pricing snapshot')}</div>
            <div className="space-y-2 mb-4">
              {(
                [
                  [
                    t('disc.tow.price_row.hook', 'Hook + dispatch'),
                    t('disc.tow.price_row.hook_val', 'from EGP 400'),
                  ],
                  [
                    t('disc.tow.price_row.km', 'Per km (loaded)'),
                    t('disc.tow.price_row.km_val', 'EGP 12–18'),
                  ],
                  [
                    t('disc.tow.price_row.after_hours', 'After hours'),
                    t('disc.tow.price_row.after_val', '+25% · 11pm–6am'),
                  ],
                ] as const
              ).map(([rowTitle, rowPrice]) => (
                <div
                  key={rowTitle}
                  className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700/80 last:border-0 last:pb-0"
                >
                  <span className="text-sm text-slate-600 dark:text-slate-400">{rowTitle}</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{rowPrice}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-blue-50 dark:bg-blue-950/35 border border-blue-100 dark:border-blue-800/50 px-3 py-3">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-blue-800/80 dark:text-blue-300/90">{t('disc.tow.ex_est', 'Example estimate')}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">{t('disc.tow.ex_note', '8 km tow · weekday · standard car')}</div>
                </div>
                <div className="text-lg font-extrabold text-blue-900 dark:text-blue-200">
                  {t('demo.tow.example_total', '~EGP 520')}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{t('disc.tow.final_note', 'Final price confirmed before dispatch. Surge possible in storms.')}</p>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex justify-between items-center mb-2 px-0.5">
              <div className="label mb-0">
                {t('disc.tow.rev_title', 'Reviews')} · {t('demo.tow.stars_avg', '4.7')}
              </div>
              <button type="button" className="text-xs font-bold text-blue-700 dark:text-blue-400 tap py-1">
                {t('disc.shop.see_all', 'See all')}
              </button>
            </div>
            <div className="grid grid-cols-4 gap-1.5 mb-3">
              {(
                [
                  ['Response', '4.8', 'teal'],
                  ['Price', '4.5', 'amber'],
                  ['Care', '4.7', 'cyan'],
                  ['Safety', '4.9', 'violet'],
                ] as const
              ).map(([l, , tone]) => (
                <div
                  key={l}
                  className={`p-2 rounded-xl text-center ${
                    tone === 'teal'
                      ? 'bg-teal-50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-100'
                      : tone === 'amber'
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-100'
                        : tone === 'cyan'
                          ? 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-100'
                          : 'bg-violet-50 dark:bg-violet-950/40 text-violet-900 dark:text-violet-100'
                  }`}
                >
                  <div className="text-[9px] font-semibold uppercase tracking-wide opacity-80">
                    {l === 'Response'
                      ? t('disc.tow.rev_response', 'Response')
                      : l === 'Price'
                        ? t('disc.shop.rev.price', 'Price')
                        : l === 'Care'
                          ? t('disc.tow.rev_care', 'Care')
                          : t('disc.tow.rev_safety', 'Safety')}
                  </div>
                  <div className="font-bold text-sm">
                    {l === 'Response'
                      ? t('demo.tow.rev_v_response', '4.8')
                      : l === 'Price'
                        ? t('demo.tow.rev_v_price', '4.5')
                        : l === 'Care'
                          ? t('demo.tow.rev_v_care', '4.7')
                          : t('demo.tow.rev_v_safety', '4.9')}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-600/90 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-950/70 dark:to-blue-900/45 flex items-center justify-center text-xs font-bold text-blue-800 dark:text-blue-200 ring-2 ring-white dark:ring-slate-700 shadow-sm">
                  {t('demo.tow.rev_initials', 'SK')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100">{t('demo.tow.rev_author', 'Sara K.')}</div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500">
                    {t('demo.tow.rev_meta', 'Verified ride · 1 week ago')}
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[1, 1, 1, 1, 1].map((_, i) => (
                    <ProtoIcon key={i} name="star" className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{t('disc.tow.rev_sample', 'Arrived in 12 minutes, driver was careful with my lowered car. Fair price.')}</p>
            </div>
          </div>
          <div className="h-20" />
        </div>
      </div>
      <div className="flex-shrink-0 p-4 pt-3 border-t border-slate-200 dark:border-slate-600/90 bg-white dark:bg-slate-900/98 backdrop-blur-md shadow-[0_-12px_40px_rgba(15,23,42,.1)]">
        <button
          type="button"
          className="w-full tap rounded-2xl py-3.5 px-4 shadow-lg shadow-blue-900/20 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-[15px] ring-1 ring-blue-500/30"
          onClick={() => {
            setBookingReturnTarget('b2c-tow');
            show('b2c-service');
          }}
        >
          {t('disc.tow.request', 'Request tow · from EGP 400')}
        </button>
        <div className="flex items-center justify-center gap-4 mt-3 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <button type="button" className="tap flex items-center gap-1.5 py-1">
            <ProtoIcon name="phone" className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            {t('demo.tow.hotline', '19255')}
          </button>
          <span className="text-slate-300 dark:text-slate-600">·</span>
          <button type="button" className="tap py-1 text-blue-700 dark:text-blue-400">
            {t('disc.tow.share_loc', 'Share live location')}
          </button>
        </div>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}

