import { ProtoHomeIndicator, ProtoStatusBar } from '../../../components/proto/Chrome';
import { ProtoIcon } from '../../../components/proto/Icon';
import { B2bTopbarMobile } from '../../../components/proto/TabBars';
import { useProto } from '../../../context/ProtoContext';
import { ScreenWrap } from '../../shared/ScreenWrap';

export function B2bPending() {
  const { show, t } = useProto();
  const rows: [string, 'done' | 'review' | 'pending'][] = [
    [t('b2b.pend.row1', 'Business information'), 'done'],
    [t('b2b.pend.row2', 'Service catalog'), 'done'],
    [t('b2b.pend.row3', 'Account checks'), 'review'],
    [t('b2b.pend.row4', 'List on map'), 'pending'],
  ];
  return (
    <ScreenWrap id="b2b-pending">
      <ProtoStatusBar />
      <div className="flex-1 flex flex-col min-h-0 app-surface">
        <B2bTopbarMobile title={t('b2b.top.welcome', 'Welcome, Omar')} />
        <div className="flex-1 overflow-y-auto p-4 flex items-start justify-center min-h-0">
          <div className="onboard-card-proto p-5 w-full text-center max-w-md">
            <div className="relative mx-auto w-14">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-200 to-orange-200 dark:from-amber-900/50 dark:to-orange-900/45 flex items-center justify-center shadow-md border border-amber-300/50 dark:border-amber-700/50">
                <ProtoIcon name="shield-check" className="w-7 h-7 text-amber-900 dark:text-amber-200" />
              </div>
              <span
                aria-hidden
                className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white ring-2 ring-white dark:bg-amber-400 dark:text-amber-950 dark:ring-slate-900 animate-pulse"
              >
                24h
              </span>
            </div>
            <div className="t-h2 mt-3 text-slate-900 dark:text-slate-100">{t('b2b.pend.title', 'Verification in progress')}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-2">{t('b2b.pend.lead', 'We’re reviewing your business and catalog. Typical turnaround is 24–48 hours.')}</div>
            <ol className="mt-5 rounded-2xl border border-slate-200/95 bg-white/95 p-4 text-left dark:border-slate-600 dark:bg-slate-900/40">
              {rows.map(([rowTitle, s], ix) => (
                <li key={rowTitle} className={`flex gap-3 ${ix > 0 ? 'mt-4 border-t border-slate-100 pt-4 dark:border-slate-700' : ''}`}>
                  <span
                    className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-bold tracking-tight ${
                      s === 'done'
                        ? 'border-teal-500 bg-teal-600 text-white shadow-sm shadow-teal-700/40'
                        : s === 'review'
                          ? 'animate-pulse border-amber-400 bg-amber-100 text-amber-900 shadow-[0_0_0_3px_rgba(251,191,36,0.25)] dark:border-amber-500 dark:bg-amber-900/60 dark:text-amber-100'
                          : 'border-dashed border-slate-300 bg-slate-100 text-slate-400 dark:border-slate-500 dark:bg-slate-700 dark:text-slate-500'
                    }`}
                  >
                    {s === 'done' ? '✓' : s === 'review' ? '…' : ix + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-50">{rowTitle}</div>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                      {s === 'done'
                        ? t('b2b.pend.done', 'Done')
                        : s === 'review'
                          ? t('b2b.pend.review', 'In review')
                          : t('b2b.pend.wait', 'Wait')}
                    </p>
                    {s === 'review' ? (
                      <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                        {t('b2b.pend.review_note', 'Compliance is checking registrations — no action needed.')}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-4 p-3 rounded-xl callout-success text-xs text-emerald-950 dark:text-emerald-100 text-left border border-emerald-200/60 dark:border-emerald-700/45">
              <b>{t('b2b.pend.note_title', 'While you wait')}</b> — {t('b2b.pend.note_body', 'add photos and your team. You can open the dashboard anytime.')}
            </div>
            <button type="button" className="btn-primary w-full mt-4 tap shadow-md" onClick={() => show('b2b-dashboard')}>
              {t('b2b.pend.explore', 'Explore dashboard')}
            </button>
          </div>
        </div>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}
