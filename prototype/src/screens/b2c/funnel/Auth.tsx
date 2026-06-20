import { useProto } from '../../../context/ProtoContext';
import { ProtoFunnelProgress, ProtoHomeIndicator, ProtoStatusBar } from '../../../components/proto/Chrome';
import { ProtoIcon } from '../../../components/proto/Icon';
import { ProtoPasswordField } from '../../../components/proto/PasswordField';
import { ScreenWrap } from '../../shared/ScreenWrap';

export function B2cAuth() {
  const { show, t } = useProto();
  return (
    <ScreenWrap id="b2c-auth">
      <ProtoStatusBar />
      <ProtoFunnelProgress step={4} total={6} />
      <div className="preauth-funnel-surface min-h-0">
        <div className="funnel-nav funnel-nav--ghost">
          <button
            type="button"
            className="funnel-back tap"
            onClick={() => show('b2c-onboarding')}
            aria-label={t('a11y.back', 'Back')}
          >
            <ProtoIcon name="arrow-left" className="w-5 h-5" />
          </button>
        </div>
        <div className="preauth-funnel-scroll px-7 pt-2 pb-4 flex flex-col">
          <h2 className="preauth-page-title">{t('b2c.auth.title', 'Sign in or sign up')}</h2>
          <p className="preauth-page-lead">
            {t('b2c.auth.lead', 'Use your email and password — no SMS codes in this prototype.')}
          </p>
          <div className="preauth-auth-panel">
            <button type="button" className="btn-primary btn-primary-lg w-full tap" onClick={() => show('b2c-login')}>
              {t('b2c.auth.login', 'Log in')}
            </button>
            <button
              type="button"
              className="btn-ghost btn-ghost-lg w-full tap border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/80"
              onClick={() => show('b2c-register')}
            >
              {t('b2c.auth.register', 'Create account')}
            </button>
          </div>
          <div className="flex-1 min-h-2" />
          <p className="preauth-legal">
            {t('b2c.auth.legal', 'By continuing you agree to our')}{' '}
            <button type="button" className="preauth-link-ghost">
              {t('b2c.auth.terms', 'Terms')}
            </button>{' '}
            {t('common.and', 'and')}{' '}
            <button type="button" className="preauth-link-ghost">
              {t('b2c.auth.privacy', 'Privacy Policy')}
            </button>
            .
          </p>
        </div>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}

export function B2cLogin() {
  const { show, t } = useProto();
  return (
    <ScreenWrap id="b2c-login">
      <ProtoStatusBar trailing="icons" />
      <ProtoFunnelProgress step={5} total={6} />
      <div className="preauth-funnel-surface min-h-0">
        <div className="funnel-nav">
          <button
            type="button"
            className="funnel-back tap"
            onClick={() => show('b2c-auth')}
            aria-label={t('a11y.back', 'Back')}
          >
            <ProtoIcon name="arrow-left" className="w-5 h-5" />
          </button>
          <span className="funnel-nav-title">{t('b2c.login.nav', 'Log in')}</span>
        </div>
        <div className="preauth-funnel-scroll px-7 pt-5 pb-6 flex flex-col">
          <h2 className="preauth-page-title">{t('b2c.login.title', 'Welcome back')}</h2>
          <p className="preauth-page-lead">{t('b2c.login.lead', 'Enter the email and password for your CarCare account.')}</p>
          <div className="preauth-form-fields">
            <div>
              <label className="label mb-2 block" htmlFor="b2c-login-email">
                {t('common.email', 'Email')}
              </label>
              <input
                id="b2c-login-email"
                type="email"
                className="proto-input px-3.5 py-3.5 text-sm"
                defaultValue={t('demo.funnel.email_sample', 'you@example.com')}
                autoComplete="email"
              />
            </div>
            <div>
              <label className="label mb-2 block" htmlFor="b2c-login-password">
                {t('common.password', 'Password')}
              </label>
              <ProtoPasswordField
                id="b2c-login-password"
                defaultValue={t('demo.input.password_sample', 'CarCare#2024')}
                autoComplete="current-password"
              />
            </div>
            <button type="button" className="text-right text-xs font-semibold text-teal-700 dark:text-teal-400 tap w-full" style={{ marginTop: -6 }}>
              {t('b2c.login.forgot', 'Forgot password?')}
            </button>
          </div>
          <button
            type="button"
            className="btn-primary btn-primary-lg mt-8 tap w-full flex items-center justify-center gap-2"
            onClick={() => show('b2c-addcar')}
          >
            <span>{t('b2c.login.submit', 'Log in')}</span>
            <ProtoIcon name="arrow-right" className="w-4 h-4" />
          </button>
          <p className="preauth-form-footer">
            {t('b2c.login.no_account', 'No account?')}{' '}
            <button type="button" className="preauth-link-ghost" onClick={() => show('b2c-register')}>
              {t('b2c.login.create', 'Create one')}
            </button>
          </p>
        </div>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}

export function B2cRegister() {
  const { show, t } = useProto();
  return (
    <ScreenWrap id="b2c-register">
      <ProtoStatusBar />
      <ProtoFunnelProgress step={6} total={6} />
      <div className="preauth-funnel-surface min-h-0">
        <div className="funnel-nav">
          <button
            type="button"
            className="funnel-back tap"
            onClick={() => show('b2c-auth')}
            aria-label={t('a11y.back', 'Back')}
          >
            <ProtoIcon name="arrow-left" className="w-5 h-5" />
          </button>
          <span className="funnel-nav-title">{t('b2c.register.nav', 'Register')}</span>
        </div>
        <div className="preauth-funnel-scroll px-7 pt-5 pb-6 flex flex-col">
          <h2 className="preauth-page-title">{t('b2c.register.title', 'Create your account')}</h2>
          <p className="preauth-page-lead">{t('b2c.register.lead', 'Email and password — we’ll ask for your car next.')}</p>
          <div className="preauth-form-fields">
            <div>
              <label className="label mb-1.5 block" htmlFor="b2c-register-name">
                <span>{t('b2c.register.fullname', 'Full name')} </span>
                <span className="text-slate-400 dark:text-slate-500 normal-case font-normal">
                  {t('common.optional', 'optional')}
                </span>
              </label>
              <input id="b2c-register-name" className="proto-input px-3.5 py-3 text-sm" defaultValue={t('demo.customer.youssef_salem', 'Youssef Salem')} autoComplete="name" />
            </div>
            <div>
              <label className="label mb-1.5 block" htmlFor="b2c-register-email">
                {t('common.email', 'Email')}
              </label>
              <input id="b2c-register-email" type="email" className="proto-input px-3.5 py-3 text-sm" defaultValue={t('demo.funnel.email_sample', 'you@example.com')} autoComplete="email" />
            </div>
            <div>
              <label className="label mb-1.5 block" htmlFor="b2c-register-password">
                {t('common.password', 'Password')}
              </label>
              <ProtoPasswordField id="b2c-register-password" defaultValue={t('demo.input.password_sample', 'CarCare#2024')} autoComplete="new-password" />
            </div>
            <div>
              <label className="label mb-1.5 block" htmlFor="b2c-register-password-confirm">
                {t('b2c.register.confirm', 'Confirm password')}
              </label>
              <ProtoPasswordField
                id="b2c-register-password-confirm"
                defaultValue={t('demo.input.password_sample', 'CarCare#2024')}
                autoComplete="new-password"
              />
            </div>
          </div>
          <button type="button" className="btn-primary btn-primary-lg w-full mt-6 tap" onClick={() => show('b2c-addcar')}>
            {t('b2c.register.submit', 'Create account')}
          </button>
          <p className="preauth-form-footer mb-2">
            {t('b2c.register.have_account', 'Already have an account?')}{' '}
            <button type="button" className="preauth-link-ghost" onClick={() => show('b2c-login')}>
              {t('b2c.login.submit', 'Log in')}
            </button>
          </p>
        </div>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}
