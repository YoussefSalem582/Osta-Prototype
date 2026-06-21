import { useState } from 'react';
import { ProtoHomeIndicator, ProtoStatusBar } from '../../../components/proto/Chrome';
import { ProtoIcon } from '../../../components/proto/Icon';
import { useProto } from '../../../context/ProtoContext';
import { ScreenWrap } from '../../shared/ScreenWrap';

export function B2bBooking() {
  const { show, t } = useProto();
  const mechs = [
    [t('demo.b2b.mech_ahmed', 'Ahmed'), 2, 3],
    [t('demo.b2b.mech_hassan', 'Hassan'), 3, 3],
    [t('demo.b2b.mech_karim', 'Karim'), 0, 3],
  ] as const;
  const [phase, setPhase] = useState<'new_booking' | 'accepted' | 'in_bay'>('new_booking');
  const [mechIx, setMechIx] = useState(2);

  return (
    <ScreenWrap id="b2b-booking">
      <ProtoStatusBar />
      <div className="flex-1 flex flex-col min-h-0 app-surface">
        <div className="b2b-topbar flex h-12 flex-shrink-0 items-center px-3">
          <button
            type="button"
            className="tap -ml-1 flex h-9 w-9 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80"
            onClick={() => show('b2b-bookings')}
          >
            <ProtoIcon name="arrow-left" className="w-5 h-5" />
          </button>
          <div className="truncate flex-1 text-sm font-semibold text-slate-900 dark:text-slate-100">{t('demo.track.booking_id', '#CC-4A1F9')}</div>
        </div>
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
          <div className={`app-panel p-4 ring-1 ring-indigo-500/10 ${phase !== 'new_booking' ? 'ring-teal-200/80 dark:ring-teal-800/50' : ''}`}>
            <div className="flex flex-wrap items-center gap-2">
              {phase === 'new_booking' ? (
                <span className="badge b-indigo">{t('b2b.booking.badge', 'New · 14m')}</span>
              ) : phase === 'accepted' ? (
                <span className="badge b-green">{t('b2b.booking.badge_accepted', 'Accepted')}</span>
              ) : (
                <span className="badge b-amber">{t('b2b.booking.badge_live', 'In bay')}</span>
              )}
              <span className="text-xs text-slate-500 dark:text-slate-400">{t('b2b.booking.when', 'Sat 18 Apr · 11:00')}</span>
            </div>
            <div className="mt-2 t-h2 text-slate-900 dark:text-slate-100">{t('b2b.on3.s1', 'Oil change (standard)')}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">{t('b2b.booking.vehicle', 'Corolla 2019 · 82,450 km')}</div>
            <div className="mt-2 flex justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">{t('b2b.booking.quote', 'Quote')}</span>
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100 num">{t('demo.track.price_350', 'EGP 350')}</span>
            </div>
            <div className="mt-3 flex flex-col gap-2">
              {phase === 'new_booking' ? (
                <>
                  <button
                    type="button"
                    className="btn-accent w-full shadow-md shadow-orange-500/20 tap active:translate-y-[0.5px]"
                    onClick={() => setPhase('accepted')}
                  >
                    {t('b2b.booking.accept', 'Accept booking')}
                  </button>
                  <button type="button" className="btn-ghost w-full border border-slate-200 bg-white text-sm dark:border-slate-600 dark:bg-slate-900">
                    {t('b2b.booking.propose', 'Propose new time')}
                  </button>
                  <button type="button" className="btn-ghost w-full border border-red-100 bg-red-50 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/35 dark:text-red-400">
                    {t('b2b.booking.reject', 'Reject')}
                  </button>
                </>
              ) : phase === 'accepted' ? (
                <>
                  <p className="rounded-xl border border-emerald-100 bg-emerald-50/90 px-3 py-2 text-[11px] font-medium leading-snug text-emerald-950 dark:border-emerald-800/55 dark:bg-emerald-950/40 dark:text-emerald-50">
                    {t('b2b.booking.accept_banner', 'Slot locked · assign a mechanic below, then pull the car into a bay when ready.')}
                  </p>
                  <button
                    type="button"
                    className="btn-primary w-full shadow-md tap"
                    onClick={() => setPhase('in_bay')}
                  >
                    {t('b2b.booking.start_bay', 'Start bay / in progress')}
                  </button>
                </>
              ) : (
                <p className="rounded-xl border border-amber-200 bg-amber-50/95 px-3 py-2 text-[11px] leading-snug text-amber-950 dark:border-amber-800 dark:bg-amber-950/35 dark:text-amber-100">
                  {t('b2b.booking.live_banner', 'Customer notified — invoice updates unlock when status is Completed.')}
                </p>
              )}
            </div>
          </div>
          <div className="app-panel p-4">
            <div className="label mb-2">{t('b2b.booking.customer', 'Customer')}</div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-teal-200/60 bg-gradient-to-br from-teal-100 to-cyan-100 text-sm font-bold text-teal-900 dark:border-teal-700/50 dark:from-teal-950/55 dark:to-cyan-950/40 dark:text-teal-100">
                {t('demo.b2b.customer_ini', 'YS')}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('demo.customer.youssef_salem', 'Youssef Salem')}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">{t('b2b.booking.bookings_count', '4 bookings')}</div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button type="button" className="btn-ghost py-2 text-xs tap active:bg-slate-100 dark:active:bg-slate-800">
                <ProtoIcon name="phone" className="inline w-3.5 h-3.5" /> {t('b2b.booking.call', 'Call')}
              </button>
              <button type="button" className="btn-ghost py-2 text-xs tap active:bg-slate-100 dark:active:bg-slate-800">
                <ProtoIcon name="message-circle" className="inline w-3.5 h-3.5" /> {t('b2b.booking.message', 'Message')}
              </button>
            </div>
          </div>
          <div className="app-panel p-4">
            <div className="label mb-2">{t('b2b.booking.assign', 'Assign mechanic')}</div>
            {mechs.map(([n, b, cap], ix) => {
              const sel = mechIx === ix;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setMechIx(ix)}
                  className={`mb-2 flex w-full items-center justify-between rounded-xl border p-2 tap last:mb-0 ${
                    sel
                      ? 'border-teal-500 bg-teal-50 shadow-sm dark:bg-teal-950/45 dark:border-teal-500'
                      : 'border-slate-200 dark:border-slate-600'
                  }`}
                >
                  <div className="text-left">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{n}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {t(
                        ix === 0 ? 'demo.b2b.mech_slots_1' : ix === 1 ? 'demo.b2b.mech_slots_2' : 'demo.b2b.mech_slots_3',
                        `${b}/${cap}`,
                      )}{' '}
                      {t('b2b.booking.slots', 'slots')}
                    </div>
                  </div>
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${sel ? 'border-teal-600 bg-white dark:bg-teal-900 dark:text-teal-100' : 'border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-900'}`} aria-hidden>
                    {sel ? <ProtoIcon name="check" className="h-4 w-4 text-teal-600" /> : null}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="app-panel p-4">
            <div className="label mb-2">{t('b2b.booking.invoice', 'Invoice (draft)')}</div>
            <div className="flex justify-between py-1 text-sm text-slate-900 dark:text-slate-100">
              <span>{t('b2b.booking.line_oil', 'Oil (std)')}</span>
              <span>{t('demo.track.price_350', 'EGP 350')}</span>
            </div>
            <div className="flex justify-between py-1 text-xs text-slate-400 dark:text-slate-500">
              {t('b2b.booking.comm', 'Commission 10%')}
              <span>{t('demo.b2b.comm_deduct', '−35')}</span>
            </div>
            <div className="divider my-2" />
            <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100">
              <span>{t('b2b.booking.payout_label', 'Your payout')}</span>
              <span>{t('demo.pay.total_315', 'EGP 315')}</span>
            </div>
          </div>
        </div>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}