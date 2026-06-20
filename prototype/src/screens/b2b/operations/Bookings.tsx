import { useMemo, useState } from 'react';
import { ProtoHomeIndicator, ProtoStatusBar } from '../../../components/proto/Chrome';
import { ProtoIcon } from '../../../components/proto/Icon';
import { B2bTabBar, B2bTopbarMobile } from '../../../components/proto/TabBars';
import { useProto } from '../../../context/ProtoContext';
import { ScreenWrap } from '../../shared/ScreenWrap';

export function B2bBookings() {
  const { show, t } = useProto();
  const days = [
    t('demo.b2b.cal_d1', 'S13'),
    t('demo.b2b.cal_d2', 'M14'),
    t('demo.b2b.cal_d3', 'T15'),
    t('demo.b2b.cal_d4', 'W16'),
    t('demo.b2b.cal_d5', 'T17'),
    t('demo.b2b.cal_d6', 'T18'),
    t('demo.b2b.cal_d7', 'F19'),
  ];
  const list = [
    [t('demo.slot.t1100', '11:00'), t('demo.customer.youssef_s', 'Youssef S.'), t('demo.b2b.svc.oil_std', 'Oil (std)'), 'b-blue', 'new'],
    [t('demo.slot.t1000', '10:00'), t('demo.customer.karim_h', 'Karim H.'), t('demo.b2b.svc.brake_pads', 'Brake pads'), 'b-amber', 'in_progress'],
    [t('demo.slot.t0900', '09:00'), t('demo.customer.layla_m', 'Layla M.'), t('demo.b2b.svc.oil_filter', 'Oil+filter'), 'b-green', 'done'],
  ] as const;
  const listStatus = (k: string) =>
    k === 'new'
      ? t('b2b.ops.new', 'New')
      : k === 'in_progress'
        ? t('b2b.ops.in_progress', 'In progress')
        : t('b2b.ops.done', 'Done');

  type CalMode = 'week' | 'day';
  type Sig = 'new' | 'in_progress' | 'done';

  const [calMode, setCalMode] = useState<CalMode>('week');
  const [dayIx, setDayIx] = useState(5);
  const [weekShift, setWeekShift] = useState(0);
  const [statusFilter, setStatusFilter] = useState<'all' | Sig>('all');

  const filtered = list.filter(([,,,, st]) => {
    if (statusFilter === 'all') return true;
    return st === statusFilter;
  });

  return (
    <ScreenWrap id="b2b-bookings">
      <ProtoStatusBar />
      <div className="flex-1 flex flex-col min-h-0 app-surface">
        <B2bTopbarMobile title={t('b2b.cal.title', 'Bookings')} />
        <div className="px-3 pt-2 flex flex-wrap items-center justify-between gap-2">
          <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 p-0.5 flex text-xs font-semibold shadow-sm">
            <button
              type="button"
              onClick={() => setCalMode('week')}
              className={`tap rounded-lg px-2.5 py-1 ${calMode === 'week' ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
              aria-pressed={calMode === 'week'}
            >
              {t('b2b.cal.week', 'Week')}
            </button>
            <button
              type="button"
              onClick={() => setCalMode('day')}
              className={`tap rounded-lg px-2.5 py-1 ${calMode === 'day' ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
              aria-pressed={calMode === 'day'}
            >
              {t('b2b.cal.day', 'Day')}
            </button>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="tap flex h-8 w-8 items-center justify-center rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 active:scale-95"
              onClick={() => setWeekShift((s) => s - 1)}
              aria-label={t('b2b.cal.prev_week', 'Previous week')}
            >
              <ProtoIcon name="chevron-left" className="w-4 h-4" />
            </button>
            <div className="min-w-[7.5rem] text-center">
              <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                {t('b2b.cal.range', 'Apr 13 – 19')}
                {weekShift !== 0 ? (
                  <span className="ml-1 rounded-md bg-teal-100 px-1.5 py-0.5 text-[10px] font-bold text-teal-900 dark:bg-teal-900/55 dark:text-teal-100">
                    {weekShift > 0 ? `+${weekShift}` : weekShift}
                  </span>
                ) : null}
              </div>
              {calMode === 'day' ? (
                <div className="text-[10px] font-semibold uppercase tracking-wide text-teal-700 dark:text-teal-400">
                  {t('b2b.cal.day_pick', 'Single day')} · {days[dayIx]}
                </div>
              ) : null}
            </div>
            <button
              type="button"
              className="tap flex h-8 w-8 items-center justify-center rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 active:scale-95"
              onClick={() => setWeekShift((s) => s + 1)}
              aria-label={t('b2b.cal.next_week', 'Next week')}
            >
              <ProtoIcon name="chevron-right" className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <div className="overflow-x-auto pb-2 -mx-1">
            <div className="inline-flex gap-1 min-w-max px-1">
              {days.map((d, i) => {
                const sel = dayIx === i;
                return (
                  <button
                    key={d}
                    type="button"
                    aria-pressed={sel}
                    onClick={() => setDayIx(i)}
                    className={`w-10 shrink-0 rounded-lg p-1.5 text-center text-xs font-semibold tap transition-transform active:scale-95 ${
                      sel ? 'scale-105 bg-gradient-to-br from-teal-600 to-emerald-600 text-white shadow-lg ring-2 ring-teal-300/70' : 'border border-slate-200 bg-white text-slate-600 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-400 hover:border-teal-200 dark:hover:border-teal-700'
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>
          <button type="button" className="btn-primary mb-3 w-full py-2.5 text-xs tap active:translate-y-[0.5px]">
            {t('b2b.cal.manual', '+ Manual booking')}
          </button>
          <div className="mb-3 flex flex-wrap gap-2">
            {(['all', 'new', 'in_progress', 'done'] as const).map((sf) => (
              <button
                key={sf}
                type="button"
                aria-pressed={statusFilter === sf}
                onClick={() => setStatusFilter(sf)}
                className={`tap rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide shadow-sm transition ${
                  statusFilter === sf
                    ? 'border-teal-500 bg-teal-50 text-teal-950 dark:bg-teal-950/35 dark:text-teal-100'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300'
                }`}
              >
                {sf === 'all'
                  ? t('b2b.cal.filter.all', 'All statuses')
                  : sf === 'new'
                    ? t('b2b.cal.legend.new', 'New')
                    : sf === 'in_progress'
                      ? t('b2b.cal.legend.active', 'Active')
                      : t('b2b.cal.legend.done', 'Done')}
              </button>
            ))}
          </div>
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm font-medium text-slate-600 dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-400">
              {t('b2b.cal.empty_filter', 'No bookings match — try another status.')}
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map(([time, cust, svc, badge, l]) => (
                <button
                  key={`${time}-${l}`}
                  type="button"
                  className="tap w-full text-start rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-teal-200 hover:shadow-md dark:border-slate-600 dark:bg-slate-900 dark:hover:border-teal-600/55"
                  onClick={() => show('b2b-booking')}
                >
                  <div className="flex justify-between">
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{time}</div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{cust}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{svc}</div>
                    </div>
                    <span className={`badge ${badge} self-start text-[10px]`}>{listStatus(l)}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
          <div className="mt-3 text-[10px] text-slate-500 dark:text-slate-400 flex flex-wrap gap-2">
            <span className="flex items-center gap-0.5">
              <span className="dot bg-blue-500" />
              {t('b2b.cal.legend.new', 'New')}
            </span>
            <span className="flex items-center gap-0.5">
              <span className="dot bg-amber-500" />
              {t('b2b.cal.legend.active', 'Active')}
            </span>
            <span className="flex items-center gap-0.5">
              <span className="dot bg-green-500" />
              {t('b2b.cal.legend.done', 'Done')}
            </span>
          </div>
        </div>
      </div>
      <B2bTabBar active="bookings" />
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}