import { useProto } from '../../../context/ProtoContext';
import { ProtoFunnelProgress, ProtoHomeIndicator, ProtoStatusBar } from '../../../components/proto/Chrome';
import { BrandLogo } from '../../../components/proto/BrandLogo';
import { ProtoIcon } from '../../../components/proto/Icon';
import { ScreenWrap } from '../../shared/ScreenWrap';

export function B2cSplash() {
  const { show, t } = useProto();
  const goNext = () => show('b2c-lang');
  return (
    <ScreenWrap id="b2c-splash">
      <ProtoStatusBar trailing="icons" />
      <div
        className="splash-minimal splash-minimal--b2c funnel-hero-b2c flex-1 flex flex-col min-h-0"
        role="button"
        tabIndex={0}
        onClick={goNext}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            goNext();
          }
        }}
        aria-label={t('a11y.splash.continue', 'Continue')}
      >
        <div className="flex-1 flex flex-col items-center justify-center px-8 sm:px-10 text-center gap-5 min-h-0">
          <BrandLogo className="splash-minimal-logo" alt="" />
          <div className="flex flex-col items-center gap-2 max-w-md">
            <h1 className="splash-minimal-title splash-minimal-title--b2c">{t('b2c.splash.title', 'Osta')}</h1>
            <p className="splash-minimal-tagline splash-minimal-tagline--b2c">{t('b2c.splash.tagline', 'Verified workshops near you. Book maintenance in minutes.')}</p>
          </div>
        </div>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}

export function B2cLang() {
  const { show, t, locale, setLocale } = useProto();
  return (
    <ScreenWrap id="b2c-lang">
      <ProtoStatusBar />
      <ProtoFunnelProgress step={2} total={6} />
      <div className="preauth-funnel-surface preauth-funnel-surface--white min-h-0">
        <div className="funnel-nav">
          <button
            type="button"
            className="funnel-back tap"
            onClick={() => show('b2c-splash')}
            aria-label={t('a11y.back', 'Back')}
          >
            <ProtoIcon name="arrow-left" className="w-5 h-5" />
          </button>
          <span className="funnel-nav-title">{t('b2c.lang.nav_title', 'Language')}</span>
        </div>
        <div className="preauth-funnel-scroll px-6 pt-5 pb-5 flex flex-col">
          <span className="preauth-eyebrow">{t('b2c.lang.eyebrow', 'Preferences')}</span>
          <h2 className="preauth-headline">{t('b2c.lang.headline', 'Choose your language')}</h2>
          <p className="preauth-sub">{t('b2c.lang.sub', 'You can change this anytime in Settings.')}</p>
          <div className="preauth-lang-grid">
            <button
              type="button"
              className={`preauth-lang-option ${locale === 'en' ? 'preauth-lang-option--active' : ''} tap`}
              onClick={() => setLocale('en')}
            >
              <span className="preauth-lang-label">{t('b2c.lang.en', 'English')}</span>
              {locale === 'en' ? (
                <ProtoIcon name="check" className="w-5 h-5 text-teal-700 dark:text-teal-400 flex-shrink-0" />
              ) : null}
            </button>
            <button
              type="button"
              className={`preauth-lang-option ${locale === 'ar-EG' ? 'preauth-lang-option--active' : ''} tap`}
              onClick={() => setLocale('ar-EG')}
            >
              <span className="preauth-lang-label">{t('b2c.lang.ar_eg', 'العربية (مصر)')}</span>
              <span className="preauth-lang-meta">{t('b2c.lang.ar_meta', 'RTL layout')}</span>
              {locale === 'ar-EG' ? (
                <ProtoIcon name="check" className="w-5 h-5 text-teal-700 dark:text-teal-400 flex-shrink-0" />
              ) : null}
            </button>
          </div>
          <div className="flex-1 min-h-4" />
          <button type="button" className="btn-primary btn-primary-lg w-full tap" onClick={() => show('b2c-onboarding')}>
            {t('common.continue', 'Continue')}
          </button>
        </div>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}

export function B2cOnboarding() {
  const { show, t } = useProto();
  return (
    <ScreenWrap id="b2c-onboarding">
      <ProtoStatusBar />
      <ProtoFunnelProgress step={3} total={6} />
      <div className="preauth-funnel-surface min-h-0">
        <div className="funnel-nav">
          <button
            type="button"
            className="funnel-back tap"
            onClick={() => show('b2c-lang')}
            aria-label={t('a11y.back', 'Back')}
          >
            <ProtoIcon name="arrow-left" className="w-5 h-5" />
          </button>
          <span className="funnel-nav-spacer" />
          <button type="button" className="funnel-skip tap" onClick={() => show('b2c-auth')}>
            {t('common.skip', 'Skip')}
          </button>
        </div>
        <div className="preauth-funnel-scroll px-6 pt-4 pb-6 flex flex-col">
          <span className="preauth-eyebrow">{t('b2c.onb.eyebrow', 'Why Osta')}</span>
          <h2 className="preauth-headline">{t('b2c.onb.headline', 'Maintain your car with less guesswork')}</h2>
          <p className="preauth-sub">{t('b2c.onb.sub', 'Three ways we save you time before you even book.')}</p>
          <div className="preauth-feature-stack">
            <div className="preauth-feature-card">
              <div className="preauth-feature-icon">
                <ProtoIcon name="map-pin" className="w-5 h-5" />
              </div>
              <div className="preauth-feature-title">{t('b2c.onb.f1.title', 'Map-first discovery')}</div>
              <p className="preauth-feature-desc">
                {t('b2c.onb.f1.desc', 'See trusted centers around you with distance, hours, and ratings at a glance.')}
              </p>
            </div>
            <div className="preauth-feature-card">
              <div className="preauth-feature-icon">
                <ProtoIcon name="badge-check" className="w-5 h-5" />
              </div>
              <div className="preauth-feature-title">{t('b2c.onb.f2.title', 'Verified for quality')}</div>
              <p className="preauth-feature-desc">
                {t('b2c.onb.f2.desc', 'We highlight vetted partners so you can book with confidence.')}
              </p>
            </div>
            <div className="preauth-feature-card">
              <div className="preauth-feature-icon">
                <ProtoIcon name="calendar-check" className="w-5 h-5" />
              </div>
              <div className="preauth-feature-title">{t('b2c.onb.f3.title', 'Book & track')}</div>
              <p className="preauth-feature-desc">
                {t('b2c.onb.f3.desc', 'Pick a slot, pay your way, and follow status until pickup.')}
              </p>
            </div>
          </div>
          <button type="button" className="btn-primary btn-primary-lg w-full tap mt-6" onClick={() => show('b2c-auth')}>
            {t('common.continue', 'Continue')}
          </button>
        </div>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}
