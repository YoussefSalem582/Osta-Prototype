import { B2cTabBar } from '../../../components/proto/TabBars';
import { ProtoHomeIndicator, ProtoStatusBar } from '../../../components/proto/Chrome';
import { ProtoIcon } from '../../../components/proto/Icon';
import { B2cMapMainColumn } from '../../../components/proto/MapColumn';
import { useProto } from '../../../context/ProtoContext';
import { ScreenWrap } from '../../shared/ScreenWrap';

export function B2cAddcar() {
  const { show, t } = useProto();
  return (
    <ScreenWrap id="b2c-addcar">
      <ProtoStatusBar />
      <div className="screen-topbar">
        <button
          type="button"
          className="funnel-back tap -ml-1"
          onClick={() => show('b2c-login')}
          aria-label={t('disc.addcar.back', 'Back')}
        >
          <ProtoIcon name="arrow-left" className="w-5 h-5" />
        </button>
        <button type="button" className="funnel-skip tap" onClick={() => show('b2c-map')}>
          {t('disc.addcar.skip', 'Skip')}
        </button>
      </div>
      <div className="flex-1 app-surface px-6 pt-2 pb-4 flex flex-col overflow-y-auto min-h-0">
        <span className="preauth-eyebrow">{t('disc.addcar.eyebrow', 'Your garage')}</span>
        <h2 className="t-h1 text-slate-900 dark:text-slate-100">
          {t('disc.addcar.title', 'Add your car')}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5">{t('disc.addcar.lead', 'We’ll auto-log services you book through CarCare.')}</p>
        <button type="button" className="callout-violet mt-6 w-full text-left p-4 flex items-center gap-3 tap">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white dark:bg-slate-900 shadow-sm border border-violet-100 dark:border-violet-800/55">
            <ProtoIcon name="scan-line" className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t('disc.addcar.vin_title', 'Scan VIN with camera')}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">{t('disc.addcar.vin_sub', 'Autofill brand, model, year')}</div>
          </div>
          <ProtoIcon name="chevron-right" className="w-5 h-5 text-violet-400 dark:text-violet-300 flex-shrink-0" />
        </button>
        <div className="app-panel p-4 mt-5 space-y-3">
          <div>
            <div className="label mb-1.5">{t('disc.addcar.brand', 'Brand')}</div>
            <div className="proto-input px-3.5 py-3 text-sm flex justify-between items-center">
              {t('demo.addcar.brand_demo', 'Toyota')}{' '}
              <ProtoIcon name="chevron-down" className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="label mb-1.5">{t('disc.addcar.model', 'Model')}</div>
              <div className="proto-input px-3.5 py-3 text-sm">{t('demo.addcar.make_demo', 'Corolla')}</div>
            </div>
            <div>
              <div className="label mb-1.5">{t('disc.addcar.year', 'Year')}</div>
              <div className="proto-input px-3.5 py-3 text-sm">{t('demo.addcar.year_demo', '2019')}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="label mb-1.5">{t('disc.addcar.mileage', 'Mileage (km)')}</div>
              <div className="proto-input px-3.5 py-3 text-sm">{t('demo.addcar.mileage_demo', '82,450')}</div>
            </div>
            <div>
              <div className="label mb-1.5">
                {t('disc.addcar.plate', 'Plate')}{' '}
                <span className="text-slate-400 dark:text-slate-500 normal-case font-normal">{t('common.optional', 'optional')}</span>
              </div>
              <div className="proto-input px-3.5 py-3 text-sm">{t('demo.addcar.plate_demo', 'S B G 7421')}</div>
            </div>
          </div>
        </div>
        <div className="flex-1 min-h-3" />
        <button type="button" className="btn-primary btn-primary-lg w-full tap shadow-md" onClick={() => show('b2c-map')}>
          {t('disc.addcar.save', 'Save & continue')}
        </button>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}

export function B2cMap() {
  return (
    <ScreenWrap id="b2c-map">
      <ProtoStatusBar />
      <B2cMapMainColumn />
      <B2cTabBar active="map" />
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}

