import { useMemo, useState } from 'react';
import { ProtoHomeIndicator, ProtoStatusBar } from '../../../components/proto/Chrome';
import { ProtoIcon } from '../../../components/proto/Icon';
import { B2bTabBar, B2bTopbarMobile } from '../../../components/proto/TabBars';
import { useProto } from '../../../context/ProtoContext';
import { ScreenWrap } from '../../shared/ScreenWrap';

export function B2bReviews() {
  const { show, t } = useProto();
  type RS = 'responded' | 'pending';
  const reviews: [string, string, number, string, RS][] = [
    [
      t('demo.b2b.rev1_name', 'Mohamed H.'),
      t('demo.b2b.rev1_ini', 'MH'),
      5,
      t('demo.b2b.rev1_txt', 'Great service & honest pricing.'),
      'responded',
    ],
    [
      t('demo.b2b.rev2_name', 'Sara A.'),
      t('demo.b2b.rev2_ini', 'SA'),
      4,
      t('demo.b2b.rev2_txt', 'Good, slight wait.'),
      'pending',
    ],
  ];
  type RChip = 'all' | 'pending' | 'five';
  const [revChip, setRevChip] = useState<RChip>('all');
  const [composeFor, setComposeFor] = useState<string | null>(null);
  const [answered, setAnswered] = useState<Record<string, boolean>>({});

  const filtered = reviews.filter(([n, , stars, , st]) => {
    const effective = answered[n] ? ('responded' as const) : st;
    if (revChip === 'all') return true;
    if (revChip === 'pending') return effective === 'pending';
    return stars === 5;
  });

  return (
    <ScreenWrap id="b2b-reviews">
      <ProtoStatusBar />
      <div className="flex min-h-0 flex-1 flex-col app-surface">
        <div className="b2b-topbar flex h-12 flex-shrink-0 items-center px-2">
          <button
            type="button"
            className="tap flex h-9 w-9 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80"
            onClick={() => show('b2b-dashboard')}
          >
            <ProtoIcon name="arrow-left" className="w-5 h-5" />
          </button>
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('b2b.rev.title', 'Reviews')}</div>
        </div>
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
          <button
            type="button"
            className="kpi-tile kpi-tile--amber tap w-full p-3 pl-4 text-left"
            onClick={() => setRevChip('pending')}
          >
            <div className="t-display text-slate-900 dark:text-slate-100 num">
              {t('demo.search.r1_stars', '4.8')}{' '}
              <span className="text-sm font-normal text-slate-500 dark:text-slate-400">{t('b2b.rev.reviews_n', '312 reviews')}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-xs font-semibold text-amber-800 dark:text-amber-300">
              {t('b2b.rev.need_n', '24 need reply')}
              <ProtoIcon name="chevron-right" className="h-4 w-4 opacity-70" aria-hidden />
            </div>
          </button>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {(['all', 'pending', 'five'] as const).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={revChip === c}
                onClick={() => {
                  setRevChip(c);
                  setComposeFor(null);
                }}
                className={`chip tap flex-shrink-0 ${revChip === c ? 'on shadow-md' : ''}`}
              >
                {c === 'all'
                  ? t('b2b.rev.chip.all', 'All')
                  : c === 'pending'
                    ? t('b2b.rev.chip.pending', 'Pending')
                    : t('b2b.rev.chip.5', '5★')}
              </button>
            ))}
          </div>
          <div className="app-panel divide-y divide-slate-100 overflow-hidden p-0 dark:divide-slate-700">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-sm font-medium text-slate-500 dark:text-slate-400">{t('b2b.rev.none_filter', 'No reviews in this filter.')}</div>
            ) : (
              filtered.map(([n, ini, r, txt, rawState]) => {
                const state = answered[n] ? ('responded' as RS) : rawState;
                return (
                <div key={n} className="p-3">
                  <div className="flex gap-2">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-800 dark:bg-teal-950/55 dark:text-teal-200">
                      {ini}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{n}</span>
                        {state === 'pending' ? (
                          <button
                            type="button"
                            className={`badge b-amber text-[9px] tap`}
                            aria-expanded={composeFor === n}
                            onClick={() => setComposeFor((prev) => (prev === n ? null : n))}
                          >
                            {t('b2b.rev.reply', 'Reply')}
                          </button>
                        ) : (
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                            {answered[n] ? t('b2b.rev.sent_demo', 'Sent') : t('b2b.rev.responded_demo', 'Replied')}
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <ProtoIcon
                            key={i}
                            name="star"
                            className={`h-3 w-3 ${i <= r ? 'fill-amber-500 text-amber-500' : 'text-slate-300 dark:text-slate-600'}`}
                          />
                        ))}
                      </div>
                      <div className="mt-1 text-sm text-slate-700 dark:text-slate-300">{txt}</div>
                      {state === 'pending' && composeFor === n ? (
                        <div className="mt-3 space-y-2 rounded-xl border border-amber-200/80 bg-amber-50/60 p-3 dark:border-amber-800/55 dark:bg-amber-950/25">
                          <textarea
                            className="proto-input max-h-32 min-h-[4.25rem] w-full resize-none px-3 py-2.5 text-xs"
                            rows={4}
                            placeholder={t('b2b.rev.placeholder', 'Thanks for visiting — glad we could help.')}
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              className="btn-ghost rounded-lg px-3 py-1.5 text-xs"
                              onClick={() => setComposeFor(null)}
                            >
                              {t('common.cancel', 'Cancel')}
                            </button>
                            <button
                              type="button"
                              className="btn-primary rounded-lg px-3 py-1.5 text-xs"
                              onClick={() => {
                                setAnswered((a) => ({ ...a, [n]: true }));
                                setComposeFor(null);
                              }}
                            >
                              {t('b2b.rev.send_demo', 'Send reply')}
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              );})
            )}
          </div>
        </div>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}