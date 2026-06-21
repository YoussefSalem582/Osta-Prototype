import type { ReactNode } from 'react';
import { BrandLogo } from '../../../components/proto/BrandLogo';
import { ProtoHomeIndicator, ProtoStatusBar } from '../../../components/proto/Chrome';
import { ProtoIcon } from '../../../components/proto/Icon';
import { B2cTabBar } from '../../../components/proto/TabBars';
import { useProto } from '../../../context/ProtoContext';
import { ScreenWrap } from '../../shared/ScreenWrap';

/** Uppercase section eyebrow. */
function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="label px-1 mt-5 mb-2">{children}</div>;
}

/** Grouped card holding a stack of rows with hairline separators. */
function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="app-panel p-0 overflow-hidden divide-y divide-slate-100 dark:divide-slate-700/70">
      {children}
    </div>
  );
}

/** Tappable settings row. With no onClick it's a display-only stub (prototype). */
function NavRow({
  icon,
  iconClass = 'text-teal-600 dark:text-teal-400',
  label,
  value,
  onClick,
}: {
  icon: string;
  iconClass?: string;
  label: string;
  value?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className="w-full px-3.5 py-3.5 flex items-center justify-between gap-3 text-left tap hover:bg-slate-50 dark:hover:bg-slate-800/60"
      onClick={onClick}
    >
      <span className="flex items-center gap-3 min-w-0">
        <ProtoIcon name={icon} className={`w-[18px] h-[18px] flex-shrink-0 ${iconClass}`} aria-hidden />
        <span className="t-callout font-medium text-slate-900 dark:text-slate-100 truncate">{label}</span>
      </span>
      <span className="flex items-center gap-1.5 flex-shrink-0">
        {value ? <span className="text-xs text-slate-500 dark:text-slate-400 num">{value}</span> : null}
        <ProtoIcon name="chevron-right" className="w-4 h-4 text-slate-300 dark:text-slate-600" aria-hidden />
      </span>
    </button>
  );
}

/** Muted, non-interactive row with a "Soon" pill. */
function SoonRow({ icon, label, soon }: { icon: string; label: string; soon: string }) {
  return (
    <div className="w-full px-3.5 py-3.5 flex items-center justify-between gap-3 text-slate-400 dark:text-slate-500">
      <span className="flex items-center gap-3 min-w-0">
        <ProtoIcon name={icon} className="w-[18px] h-[18px] flex-shrink-0" aria-hidden />
        <span className="t-callout truncate">{label}</span>
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 flex-shrink-0">
        {soon}
      </span>
    </div>
  );
}

/** Row with a secondary line (URL / email / phone). */
function LinkRow({ icon, label, sub }: { icon: string; label: string; sub: string }) {
  return (
    <button
      type="button"
      className="w-full px-3.5 py-3 flex items-center justify-between gap-3 text-left tap hover:bg-slate-50 dark:hover:bg-slate-800/60"
    >
      <span className="flex items-center gap-3 min-w-0">
        <ProtoIcon name={icon} className="w-[18px] h-[18px] flex-shrink-0 text-teal-600 dark:text-teal-400" aria-hidden />
        <span className="min-w-0">
          <span className="block t-callout font-medium text-slate-900 dark:text-slate-100 truncate">{label}</span>
          <span className="block text-[11px] text-slate-500 dark:text-slate-400 truncate num">{sub}</span>
        </span>
      </span>
      <ProtoIcon name="chevron-right" className="w-4 h-4 text-slate-300 dark:text-slate-600 flex-shrink-0" aria-hidden />
    </button>
  );
}

export function B2cMore() {
  const { show, t, theme, toggleTheme, locale, setLocale } = useProto();
  const isDark = theme === 'dark';
  const isAr = locale === 'ar-EG';
  return (
    <ScreenWrap id="b2c-more">
      <ProtoStatusBar />
      <div className="flex-1 flex flex-col min-h-0 app-surface">
        <div
          className="relative flex items-center justify-center h-14 px-5 flex-shrink-0"
          style={{ borderBottom: '1px solid var(--hairline)' }}
        >
          <span className="absolute start-5 w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center bg-teal-600/10">
            <BrandLogo className="w-5 h-5 object-contain" alt="" />
          </span>
          <span className="t-title text-slate-900 dark:text-slate-100">{t('more.title', 'More')}</span>
        </div>

        <div className="flex-1 overflow-y-auto proto-scroll px-4 pb-6">
          <SectionLabel>{t('more.profile', 'Profile')}</SectionLabel>
          <button
            type="button"
            className="app-panel w-full p-3.5 flex items-center gap-3.5 text-left tap"
            onClick={() => show('b2c-dashboard')}
          >
            <span className="w-12 h-12 rounded-full flex items-center justify-center bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-bold text-lg flex-shrink-0">
              Y
            </span>
            <span className="flex-1 min-w-0">
              <span className="block t-title text-slate-900 dark:text-slate-100 truncate">
                {t('demo.customer.youssef_salem', 'Youssef Salem')}
              </span>
              <span className="block text-xs font-medium text-teal-700 dark:text-teal-400">
                {t('more.view_profile', 'View profile')}
              </span>
            </span>
            <ProtoIcon name="chevron-right" className="w-5 h-5 text-slate-300 dark:text-slate-600 flex-shrink-0" aria-hidden />
          </button>

          <SectionLabel>{t('more.preferences', 'Preferences')}</SectionLabel>
          <Panel>
            <NavRow
              icon="palette"
              iconClass="text-violet-500 dark:text-violet-400"
              label={t('more.appearance', 'Appearance')}
              value={isDark ? t('more.theme_dark', 'Dark') : t('more.theme_light', 'Light')}
              onClick={toggleTheme}
            />
            <NavRow
              icon="languages"
              iconClass="text-violet-500 dark:text-violet-400"
              label={t('more.language', 'Language')}
              value={isAr ? 'العربية' : 'English'}
              onClick={() => setLocale(isAr ? 'en' : 'ar-EG')}
            />
          </Panel>

          <SectionLabel>{t('more.services', 'Services')}</SectionLabel>
          <Panel>
            <NavRow icon="car" label={t('more.my_garage', 'My garage')} onClick={() => show('b2c-garage')} />
            <SoonRow icon="credit-card" label={t('more.payments', 'Payment methods')} soon={t('more.soon', 'Soon')} />
            <SoonRow icon="map-pin" label={t('more.addresses', 'Addresses')} soon={t('more.soon', 'Soon')} />
            <SoonRow icon="bell" label={t('more.notifications', 'Notifications')} soon={t('more.soon', 'Soon')} />
          </Panel>

          <SectionLabel>{t('more.about', 'About')}</SectionLabel>
          <Panel>
            <NavRow icon="info" label={t('more.about_us', 'About us')} />
            <NavRow icon="shield" label={t('more.privacy', 'Privacy policy')} />
            <NavRow icon="file-text" label={t('more.terms', 'Terms of service')} />
            <NavRow icon="star" iconClass="text-amber-500" label={t('more.rate', 'Rate the app')} />
            <div className="w-full px-3.5 py-3.5 flex items-center justify-between gap-3 text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-3">
                <ProtoIcon name="info" className="w-[18px] h-[18px]" aria-hidden />
                <span className="t-callout">{t('more.version', 'App version')}</span>
              </span>
              <span className="text-xs num">1.0.0</span>
            </div>
          </Panel>

          <SectionLabel>{t('more.contact', 'Contact us')}</SectionLabel>
          <Panel>
            <LinkRow icon="globe" label={t('more.website', 'Our website')} sub="osta.app" />
            <LinkRow icon="circle-help" label={t('more.help', 'Help & support')} sub="help@osta.app" />
            <LinkRow icon="phone" label={t('more.numbers', 'Our numbers')} sub="+20 100 000 0000" />
          </Panel>

          <SectionLabel>{t('more.account', 'Account')}</SectionLabel>
          <Panel>
            <NavRow icon="log-out" label={t('more.logout', 'Log out')} onClick={() => show('b2c-splash')} />
          </Panel>

          <SectionLabel>{t('more.delete', 'Delete account')}</SectionLabel>
          <Panel>
            <button
              type="button"
              className="w-full px-3.5 py-3.5 flex items-center gap-3 text-left tap hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              <ProtoIcon name="trash-2" className="w-[18px] h-[18px] text-red-500 flex-shrink-0" aria-hidden />
              <span className="t-callout font-medium text-red-600 dark:text-red-400">{t('more.delete', 'Delete account')}</span>
            </button>
          </Panel>
        </div>
      </div>
      <B2cTabBar active="more" />
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}
