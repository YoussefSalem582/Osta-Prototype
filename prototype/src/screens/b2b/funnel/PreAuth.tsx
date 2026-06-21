import { useCallback, useId, useMemo, useRef, useState, type KeyboardEvent as ReactKb } from 'react';
import { ProtoFunnelProgress, ProtoHomeIndicator, ProtoStatusBar } from '../../../components/proto/Chrome';
import { BrandLogo } from '../../../components/proto/BrandLogo';
import { ProtoIcon } from '../../../components/proto/Icon';
import { useProto } from '../../../context/ProtoContext';
import { ScreenWrap } from '../../shared/ScreenWrap';

const ONB_SLIDE_COUNT = 3;

export function B2bSplash() {
  const { show, t } = useProto();
  const goNext = () => show('b2b-lang');
  return (
    <ScreenWrap id="b2b-splash">
      <ProtoStatusBar />
      <div
        className="splash-minimal splash-minimal--b2b funnel-hero-b2b flex-1 flex flex-col min-h-0"
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
          <BrandLogo className="splash-minimal-logo splash-minimal-logo--b2b" alt="" />
          <div className="flex flex-col items-center gap-2 max-w-md">
            <h1 className="splash-minimal-title splash-minimal-title--b2b">{t('b2b.splash.title', 'Osta Business')}</h1>
            <p className="splash-minimal-tagline splash-minimal-tagline--b2b">{t('b2b.splash.tagline', 'Take bookings, manage your catalog, get paid.')}</p>
          </div>
        </div>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}

export function B2bLang() {
  const { show, t, locale, setLocale } = useProto();
  return (
    <ScreenWrap id="b2b-lang">
      <ProtoStatusBar />
      <ProtoFunnelProgress step={2} total={6} />
      <div className="preauth-funnel-surface preauth-funnel-surface--white min-h-0">
        <div className="funnel-nav">
          <button
            type="button"
            className="funnel-back tap"
            onClick={() => show('b2b-splash')}
            aria-label={t('a11y.back', 'Back')}
          >
            <ProtoIcon name="arrow-left" className="w-5 h-5" />
          </button>
          <span className="funnel-nav-title">{t('b2c.lang.nav_title', 'Language')}</span>
        </div>
        <div className="preauth-funnel-scroll px-6 pt-5 pb-5 flex flex-col">
          <span className="preauth-eyebrow">{t('b2b.lang.eyebrow', 'Business app')}</span>
          <h2 className="preauth-headline">{t('b2c.lang.headline', 'Choose your language')}</h2>
          <p className="preauth-sub">
            {t('b2b.lang.sub', 'Applies to your dashboard and customer-facing copy. Change anytime in Settings.')}
          </p>
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
          <button type="button" className="btn-primary btn-primary-lg w-full tap" onClick={() => show('b2b-onboarding')}>
            {t('common.continue', 'Continue')}
          </button>
        </div>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}

export function B2bOnboarding() {
  const { show, t } = useProto();
  const carouselId = useId();
  const [slideIdx, setSlideIdx] = useState(0);
  const touchStart = useRef<number | null>(null);

  type SlideCopy = {
    icon: string;
    titleKey: string;
    titleFb: string;
    descKey: string;
    descFb: string;
  };

  const slides: SlideCopy[] = useMemo(
    () => [
      {
        icon: 'calendar-check',
        titleKey: 'b2b.onb.f1.title',
        titleFb: 'Live bookings',
        descKey: 'b2b.onb.f1.desc',
        descFb: 'New jobs land on your calendar — assign techs and update status in one flow.',
      },
      {
        icon: 'tag',
        titleKey: 'b2b.onb.f2.title',
        titleFb: 'Catalog & pricing',
        descKey: 'b2b.onb.f2.desc',
        descFb: 'Fixed, range, or quote-only services. Bulk-add common jobs to go live faster.',
      },
      {
        icon: 'shield-check',
        titleKey: 'b2b.onb.f3.title',
        titleFb: 'Verification & payouts',
        descKey: 'b2b.onb.f3.desc',
        descFb: 'Get verified to appear on the map. Track commissions and payout cycles.',
      },
    ],
    [],
  );

  const goPrev = useCallback(() => setSlideIdx((i) => Math.max(0, i - 1)), []);
  const goNext = useCallback(() => setSlideIdx((i) => Math.min(ONB_SLIDE_COUNT - 1, i + 1)), []);

  function onCarouselKeyDown(e: ReactKb<HTMLDivElement>) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    }
  }

  const trackPercent = -(slideIdx * (100 / ONB_SLIDE_COUNT));

  return (
    <ScreenWrap id="b2b-onboarding">
      <ProtoStatusBar />
      <ProtoFunnelProgress step={3} total={6} />
      <div className="preauth-funnel-surface min-h-0">
        <div className="funnel-nav">
          <button
            type="button"
            className="funnel-back tap"
            onClick={() => show('b2b-lang')}
            aria-label={t('a11y.back', 'Back')}
          >
            <ProtoIcon name="arrow-left" className="w-5 h-5" />
          </button>
          <span className="funnel-nav-spacer" />
          <button type="button" className="funnel-skip tap" onClick={() => show('b2b-auth')}>
            {t('common.skip', 'Skip')}
          </button>
        </div>
        <div className="preauth-funnel-scroll px-6 pt-4 pb-6 flex flex-col">
          <span className="preauth-eyebrow">{t('b2b.onb.eyebrow', 'For service centers')}</span>
          <h2 className="preauth-headline">{t('b2b.onb.headline', 'Run your shop from one place')}</h2>
          <p className="preauth-sub">{t('b2b.onb.sub', 'What owners see after they download the Business app.')}</p>

          <div
            id={carouselId}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label={t('b2b.onb.carousel_a11y', 'Business onboarding highlights')}
            aria-live="polite"
            aria-atomic={false}
            onKeyDown={onCarouselKeyDown}
            onTouchStart={(e) => {
              touchStart.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStart.current == null) return;
              const delta = e.changedTouches[0].clientX - touchStart.current;
              touchStart.current = null;
              if (delta > 52) goPrev();
              if (delta < -52) goNext();
            }}
            className="mt-2 rounded-none outline-none focus-visible:ring-2 focus-visible:ring-teal-500/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8fafc] dark:focus-visible:ring-offset-slate-900"
          >
            <p id={`${carouselId}-status`} className="sr-only">
              {slideIdx + 1}/{ONB_SLIDE_COUNT} · {t(slides[slideIdx].titleKey, slides[slideIdx].titleFb)}
            </p>

            <div className="relative overflow-hidden rounded-[22px] border border-slate-200/90 bg-white/90 shadow-[0_8px_32px_rgba(15,23,42,0.07)] backdrop-blur-[2px] dark:border-slate-600/85 dark:bg-slate-900/85">
              <div
                className="flex w-[300%] transition-transform duration-300 ease-out motion-reduce:transition-none"
                style={{ transform: `translateX(${trackPercent}%)` }}
              >
                {slides.map((s, i) => (
                  <article key={s.titleKey} className="w-1/3 shrink-0 px-5 pb-6 pt-6 sm:px-8">
                    <div className="mx-auto flex max-w-[17rem] flex-col items-center text-center">
                      <div className="preauth-feature-icon scale-105 shadow-md">
                        <ProtoIcon name={s.icon} className="w-6 h-6" aria-hidden />
                      </div>
                      <div className="preauth-feature-title mt-5 text-[17px]" id={`${carouselId}-t-${i}`}>
                        {t(s.titleKey, s.titleFb)}
                      </div>
                      <p className="preauth-feature-desc mt-3 text-[14px] leading-relaxed">{t(s.descKey, s.descFb)}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-1.5">
                <button
                  type="button"
                  className={`tap grid h-9 w-9 place-items-center rounded-full border border-white/75 bg-white/95 text-slate-700 shadow-md backdrop-blur dark:border-slate-600/85 dark:bg-slate-800/95 dark:text-slate-100 ${slideIdx === 0 ? 'invisible pointer-events-none' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  aria-label={t('b2b.onb.prev_slide', 'Previous')}
                >
                  <ProtoIcon name="chevron-left" className="h-5 w-5" aria-hidden />
                </button>
                <button
                  type="button"
                  className={`tap grid h-9 w-9 place-items-center rounded-full border border-white/75 bg-white/95 text-slate-700 shadow-md backdrop-blur dark:border-slate-600/85 dark:bg-slate-800/95 dark:text-slate-100 ${slideIdx === ONB_SLIDE_COUNT - 1 ? 'invisible pointer-events-none' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  aria-label={t('b2b.onb.next_slide', 'Next')}
                >
                  <ProtoIcon name="chevron-right" className="h-5 w-5" aria-hidden />
                </button>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <span className="text-[11px] font-semibold tracking-wide text-slate-500 dark:text-slate-400">
                {t('b2b.onb.intro_meta', 'Intro')} · {slideIdx + 1}/{ONB_SLIDE_COUNT}
              </span>
              <div className="flex justify-end gap-2" role="group" aria-label={t('b2b.onb.carousel_dots', 'Slides')}>
                {slides.map((s, dotIdx) => {
                  const sel = slideIdx === dotIdx;
                  return (
                    <button
                      key={s.titleKey}
                      type="button"
                      aria-label={`${t(s.titleKey, s.titleFb)} · ${dotIdx + 1}/${ONB_SLIDE_COUNT}`}
                      aria-current={sel ? 'step' : undefined}
                      className={`h-2.5 rounded-full transition-all tap ${sel ? 'w-8 bg-teal-600 shadow-sm' : 'w-2.5 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'}`}
                      onClick={() => setSlideIdx(dotIdx)}
                    />
                  );
                })}
              </div>
            </div>

            <div className={`mt-6 flex gap-3 ${slideIdx === 0 ? 'justify-stretch' : ''}`}>
              {slideIdx > 0 ? (
                <div className="min-w-0 flex-1">
                  <button type="button" className="btn-secondary btn-secondary-lg w-full tap" onClick={goPrev}>
                    {t('b2b.onb.carousel_back_cta', 'Back')}
                  </button>
                </div>
              ) : null}
              <div className={slideIdx === 0 ? 'w-full' : 'min-w-0 flex-[1.5]'}>
                {slideIdx < ONB_SLIDE_COUNT - 1 ? (
                  <button type="button" className="btn-primary btn-primary-lg w-full tap" onClick={goNext}>
                    {t('b2b.onb.slide_next', 'Next')}
                    <ProtoIcon name="arrow-right" className="ml-1 inline h-4 w-4" aria-hidden />
                  </button>
                ) : (
                  <button type="button" className="btn-primary btn-primary-lg w-full tap" onClick={() => show('b2b-auth')}>
                    {t('b2b.onb.cta_finish', 'Get started')}
                    <ProtoIcon name="arrow-right" className="ml-1 inline h-4 w-4" aria-hidden />
                  </button>
                )}
              </div>
            </div>
            <p className="mt-3 text-center text-[11px] font-medium text-slate-400 dark:text-slate-500">
              {t('b2b.onb.hint', 'Swipe the card — or tap Next')}
            </p>
          </div>
        </div>
      </div>
      <ProtoHomeIndicator />
    </ScreenWrap>
  );
}

