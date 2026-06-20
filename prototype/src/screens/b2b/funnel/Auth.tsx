import { ProtoFunnelProgress, ProtoHomeIndicator, ProtoStatusBar } from '../../../components/proto/Chrome';
import { BrandLogo } from '../../../components/proto/BrandLogo';
import { ProtoIcon } from '../../../components/proto/Icon';
import { ProtoPasswordField } from '../../../components/proto/PasswordField';
import { useProto } from '../../../context/ProtoContext';
import { ScreenWrap } from '../../shared/ScreenWrap';

export function B2bAuth() {
  const { show, t } = useProto();
  return (
    <ScreenWrap id="b2b-auth">
      <ProtoStatusBar />
      <ProtoFunnelProgress step={4} total={6} />
      <div className="preauth-funnel-surface preauth-funnel-surface--white min-h-0">
        <div className="funnel-nav funnel-nav--ghost">
          <button
            type="button"
            className="funnel-back tap"
            onClick={() => show('b2b-onboarding')}
            aria-label={t('a11y.back', 'Back')}
          >
            <ProtoIcon name="arrow-left" className="w-5 h-5" />
          </button>
        </div>
        <div className="preauth-funnel-scroll px-7 pt-2 pb-4 flex flex-col">
          <h2 className="preauth-page-title">{t('b2b.auth.title', 'Business sign in')}</h2>
          <p className="preauth-page-lead">{t('b2b.auth.lead', 'Use your work email — same flow as production, without SMS.')}</p>
          <div className="preauth-auth-panel">
            <button type="button" className="btn-primary btn-primary-lg w-full tap" onClick={() => show('b2b-login')}>
              {t('b2c.auth.login', 'Log in')}
            </button>
            <button
              type="button"
              className="btn-ghost btn-ghost-lg w-full tap border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/80"
              onClick={() => show('b2b-signup')}
            >
              {t('b2b.auth.create_business', 'Create business account')}
            </button>
          </div>
          <div className="flex-1 min-h-2" />
          <p className="preauth-legal">
            {t('b2b.auth.legal', 'By continuing you agree to')}{' '}
            <button type="button" className="preauth-link-ghost">
              {t('b2b.auth.terms', 'Business Terms')}
            </button>{' '}
            {t('common.and', 'and')}{' '}
            <button type="button" className="preauth-link-ghost">
              {t('b2b.auth.privacy', 'Privacy')}
            </button>
            .
          </p>
        </div>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}

export function B2bLogin() {
  const { show, t } = useProto();
  return (
    <ScreenWrap id="b2b-login">
      <ProtoStatusBar />
      <ProtoFunnelProgress step={5} total={6} />
      <div className="preauth-funnel-surface preauth-funnel-surface--white min-h-0">
        <div className="funnel-nav">
          <button
            type="button"
            className="funnel-back tap"
            onClick={() => show('b2b-auth')}
            aria-label={t('a11y.back', 'Back')}
          >
            <ProtoIcon name="arrow-left" className="w-5 h-5" />
          </button>
          <span className="funnel-nav-title">{t('b2c.login.nav', 'Log in')}</span>
        </div>
        <div className="preauth-funnel-scroll px-7 pt-5 pb-6 flex flex-col">
          <h2 className="preauth-page-title">{t('b2c.login.title', 'Welcome back')}</h2>
          <p className="preauth-page-lead">{t('b2b.login.lead', 'Sign in with the email you use for your shop on CarCare.')}</p>
          <div className="preauth-form-fields">
            <div>
              <label className="label mb-2 block" htmlFor="b2b-login-email">
                {t('b2b.login.work_email', 'Work email')}
              </label>
              <input id="b2b-login-email" type="email" className="proto-input px-3.5 py-3.5 text-sm" defaultValue={t('demo.funnel.email_b2b', 'omar@autopro.eg')} autoComplete="email" />
            </div>
            <div>
              <label className="label mb-2 block" htmlFor="b2b-login-password">
                {t('common.password', 'Password')}
              </label>
              <ProtoPasswordField id="b2b-login-password" defaultValue={t('demo.input.password_sample', 'CarCare#2024')} autoComplete="current-password" />
            </div>
            <button type="button" className="text-right text-xs font-semibold text-teal-700 dark:text-teal-400 tap w-full" style={{ marginTop: -6 }}>
              {t('b2c.login.forgot', 'Forgot password?')}
            </button>
          </div>
          <button type="button" className="btn-primary btn-primary-lg mt-8 tap w-full" onClick={() => show('b2b-dashboard')}>
            {t('b2c.login.submit', 'Log in')}
          </button>
          <p className="preauth-form-footer">
            {t('b2b.login.new', 'New here?')}{' '}
            <button type="button" className="preauth-link-ghost" onClick={() => show('b2b-signup')}>
              {t('b2b.login.create', 'Create account')}
            </button>
          </p>
        </div>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}

export function B2bSignup() {
  const { show, t } = useProto();
  const bullets: [string, string][] = [
    [t('b2b.signup.bullet1', 'Real-time bookings'), 'calendar-check'],
    [t('b2b.signup.bullet2', 'Service records / car'), 'clipboard-list'],
    [t('b2b.signup.bullet3', 'Payouts & commission'), 'coins'],
  ];
  return (
    <ScreenWrap id="b2b-signup">
      <ProtoStatusBar />
      <ProtoFunnelProgress step={6} total={6} />
      <div className="flex-1 overflow-y-auto min-h-0 bg-slate-100 dark:bg-slate-900/50">
        <div className="preauth-signup-hero funnel-hero-b2b">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-white/95 border border-white/35 flex items-center justify-center overflow-hidden p-1">
              <BrandLogo className="w-full h-full object-contain" alt="" />
            </div>
            <span className="font-bold text-white text-[15px]">{t('b2b.signup.brand', 'CarCare for Business')}</span>
          </div>
          <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-white">
            {t('b2b.signup.hero_title', 'Fill your schedule. Grow your shop.')}
          </h2>
          <p className="mt-3 text-sm text-white/90 leading-relaxed">
            {t('b2b.signup.hero_lead', 'Verified drivers book on your calendar. Service history per vehicle. Compete on quality, not ads.')}
          </p>
          <ul className="mt-5 space-y-2.5">
            {bullets.map(([text, ic]) => (
              <li key={text} className="flex items-center gap-3 text-sm text-white/95">
                <span className="w-8 h-8 rounded-full bg-white dark:bg-slate-900/15 border border-white/20 flex items-center justify-center flex-shrink-0">
                  <ProtoIcon name={ic} className="w-3.5 h-3.5 text-white" />
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="preauth-signup-sheet">
          <h3 className="preauth-page-title">{t('b2b.signup.sheet_title', 'Create your business account')}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2 mb-4">
            {t('b2b.signup.sheet_lead', 'Free to join. Commission on bookings only (tiered 8–15%). Phone may be requested later for verification.')}
          </p>
          <div className="space-y-3">
            <div>
              <label className="label mb-1.5 block" htmlFor="b2b-signup-biz">
                {t('b2b.signup.biz_name', 'Business name')}
              </label>
              <input id="b2b-signup-biz" className="proto-input w-full px-3.5 py-2.5 text-sm" defaultValue={t('demo.funnel.biz_name_sample', 'AutoPro Heliopolis')} autoComplete="organization" />
            </div>
            <div>
              <label className="label mb-1.5 block" htmlFor="b2b-signup-owner">
                {t('b2b.signup.owner_name', 'Owner name')}
              </label>
              <input id="b2b-signup-owner" className="proto-input w-full px-3.5 py-2.5 text-sm" defaultValue={t('demo.funnel.owner_b2b', 'Omar Saleh')} autoComplete="name" />
            </div>
            <div>
              <label className="label mb-1.5 block" htmlFor="b2b-signup-email">
                {t('b2b.login.work_email', 'Work email')}
              </label>
              <input id="b2b-signup-email" type="email" className="proto-input w-full px-3.5 py-2.5 text-sm" defaultValue={t('demo.funnel.email_b2b', 'omar@autopro.eg')} autoComplete="email" />
            </div>
            <div>
              <label className="label mb-1.5 block" htmlFor="b2b-signup-password">
                {t('common.password', 'Password')}
              </label>
              <ProtoPasswordField id="b2b-signup-password" defaultValue={t('demo.input.password_sample', 'CarCare#2024')} autoComplete="new-password" />
            </div>
            <div>
              <label className="label mb-1.5 block" htmlFor="b2b-signup-password2">
                {t('b2c.register.confirm', 'Confirm password')}
              </label>
              <ProtoPasswordField id="b2b-signup-password2" defaultValue={t('demo.input.password_sample', 'CarCare#2024')} autoComplete="new-password" />
            </div>
          </div>
          <button type="button" className="btn-primary btn-primary-lg w-full mt-5 tap" onClick={() => show('b2b-onboard-1')}>
            {t('b2b.signup.cta', 'Create account & continue')}
          </button>
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-4">
            {t('b2b.signup.have_account', 'Already have an account?')}{' '}
            <button type="button" className="preauth-link-ghost text-[13px]" onClick={() => show('b2b-login')}>
              {t('b2b.signup.signin', 'Sign in')}
            </button>
          </p>
        </div>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}
