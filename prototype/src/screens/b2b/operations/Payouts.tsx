import { useMemo, useState } from 'react';
import { ProtoHomeIndicator, ProtoStatusBar } from '../../../components/proto/Chrome';
import { ProtoIcon } from '../../../components/proto/Icon';
import { B2bTabBar, B2bTopbarMobile } from '../../../components/proto/TabBars';
import { useProto } from '../../../context/ProtoContext';
import { ScreenWrap } from '../../shared/ScreenWrap';

export function B2bPayouts() {
  const { show, t } = useProto();
  const [requestSent, setRequestSent] = useState(false);
  const [openRow, setOpenRow] = useState<string | null>(null);
  const recent = [
    [t('demo.b2b.pay.row1_date', '11 Apr'), t('demo.b2b.pay.row1_amt', 'EGP 7,578'), 'paid'],
    [t('demo.b2b.pay.row2_date', '4 Apr'), t('demo.b2b.pay.row2_amt', 'EGP 8,892'), 'paid'],
    [t('demo.b2b.pay.row3_date', '28 Mar'), t('demo.b2b.pay.row3_amt', 'EGP 9,486'), 'paid'],
  ] as const;
  return (
    <ScreenWrap id="b2b-payouts">
      <ProtoStatusBar />
      <div className="flex-1 flex flex-col min-h-0 app-surface">
        <div className="b2b-topbar h-12 flex items-center px-2 flex-shrink-0">
          <button
            type="button"
            className="tap w-9 h-9 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80"
            onClick={() => show('b2b-more')}
          >
            <ProtoIcon name="arrow-left" className="w-5 h-5" />
          </button>
          <div className="font-semibold text-sm pl-1 text-slate-900 dark:text-slate-100">
            {t('b2b.pay.title', 'Payouts')}{' '}
            <span className="badge b-amber text-[9px] ml-1">{t('common.phase_p2', 'P2')}</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          <div className="rounded-xl border border-teal-100 dark:border-teal-800/50 bg-teal-50/80 dark:bg-teal-950/35 px-3 py-2.5 text-xs text-teal-950 dark:text-teal-100 leading-relaxed">
            {t('b2b.pay.tier_explainer', 'Commission is tiered by verification status (shown in onboarding) — payouts net of platform fees.')}
          </div>
          {requestSent ? (
            <div className="rounded-xl border border-emerald-300/80 bg-emerald-50 px-3 py-2.5 text-xs font-medium text-emerald-950 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-50" role="status">
              <ProtoIcon name="check-circle-2" className="mr-1 inline h-4 w-4 align-text-bottom text-emerald-600" aria-hidden />
              {t('b2b.pay.request_queued', 'Payout request queued — finance will email a receipt.')}
            </div>
          ) : null}
          <div className="kpi-tile kpi-tile--teal p-3 pl-4 text-center">
            <div className="text-xs text-slate-500 dark:text-slate-400">{t('b2b.pay.available', 'Available')}</div>
            <div className="t-h1 text-slate-900 dark:text-slate-100">{t('demo.b2b.pay.available_amt', 'EGP 12,840')}</div>
            <button
              type="button"
              className="btn-primary mt-2 w-full py-2 text-xs tap active:translate-y-[0.5px] disabled:opacity-60"
              disabled={requestSent}
              onClick={() => setRequestSent(true)}
            >
              {requestSent ? t('b2b.pay.requested_btn', 'Requested') : t('b2b.pay.request', 'Request payout')}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="kpi-tile kpi-tile--violet p-2 pl-3 text-center text-xs">
              {t('b2b.pay.gross_mo', 'Gross (mo)')}
              <div className="font-bold text-sm mt-0.5 text-slate-900 dark:text-slate-100">
                {t('demo.b2b.pay.gross_amt', '42,310')}
              </div>
            </div>
            <div className="kpi-tile kpi-tile--amber p-2 pl-3 text-center text-xs">
              {t('b2b.pay.comm_pct', 'Comm. 10%')}
              <div className="font-bold text-sm mt-0.5 text-slate-900 dark:text-slate-100">
                {t('demo.b2b.pay.comm_amt', '4,231')}
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">{t('b2b.pay.recent', 'Recent')}</div>
          {recent.map(([d, pay, s]) => (
            <button
              key={d}
              type="button"
              onClick={() => setOpenRow((r) => (r === d ? null : d))}
              className="app-panel tap flex w-full justify-between rounded-xl p-3 text-left text-sm transition hover:border-teal-300/80 dark:hover:border-teal-700/60"
            >
              <div>
                <div className="font-semibold text-slate-900 dark:text-slate-100">{d}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {openRow === d ? t('b2b.pay.row_expand', 'Settlement includes tax & fee lines') : t('b2b.pay.to_bank', 'Payout to bank')}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-900 dark:text-slate-100 num">{pay}</div>
                <span className={`badge ${s === 'paid' ? 'b-green' : 'b-amber'} text-[9px]`}>
                  {s === 'paid' ? t('b2b.pay.status.paid', 'paid') : s === 'pending' ? t('b2b.pay.status.pending', 'pending') : s}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}