import type { ReactNode } from 'react';
import { FtgHandbookSection } from '../components/FtgHandbook';
import { SpecAside } from '../components/SpecAside';
import { ProtoIcon } from '../components/proto/Icon';
import { useProto } from '../context/ProtoContext';
import { SCREENS } from '../data/screens';
import { PHONE_SCREENS } from '../screens/phoneRegistry';
import type { ScreenRow, Surface } from '../types';

function PhoneStage() {
  const { surface, currentScreen, t } = useProto();
  if (surface === 'flutterGuide') return null;
  const Cmp = PHONE_SCREENS[currentScreen];
  if (!Cmp) {
    return (
      <div className="p-4 text-sm text-slate-600 dark:text-slate-400">
        {t('shell.missing_screen', 'Missing screen component:')}{' '}
        <span className="font-mono">{currentScreen}</span>
      </div>
    );
  }
  return <Cmp />;
}

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/80 dark:focus-visible:ring-sky-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900';
const INACTIVE_TAB =
  `px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap ${FOCUS_RING}`;
const ACTIVE_TAB = `px-3 py-2 rounded-lg text-sm font-semibold tab-active whitespace-nowrap ${FOCUS_RING}`;

const PHONE_PAIR_SURFACES: { surface: Surface; layoutId: string; stageId: string; asideId: string }[] = [
  { surface: 'b2c', layoutId: 'b2cLayout', stageId: 'b2cStage', asideId: 'b2cDetailAside' },
  { surface: 'b2b', layoutId: 'b2bLayout', stageId: 'b2bStage', asideId: 'b2bDetailAside' },
];

function ScreenListItems({
  screenList,
  currentScreen,
  onSelect,
  t,
  tGroup,
  catalogField,
}: {
  screenList: ScreenRow[];
  currentScreen: string;
  onSelect: (id: string) => void;
  t: (key: string, en: string) => string;
  tGroup: (g: string) => string;
  catalogField: (s: ScreenRow, field: keyof ScreenRow | 'states' | 'group') => string;
}) {
  let lastGroup: string | null = null;
  let firstSection = true;
  const parts: ReactNode[] = [];
  for (const s of screenList) {
    const g = s.group || 'Screens';
    if (g !== lastGroup) {
      parts.push(
        <div
          key={`g-${g}`}
          className={`screen-group-label label mb-1.5 px-0.5 ${firstSection ? '' : 'mt-4'}`}
        >
          {tGroup(g)}
        </div>,
      );
      firstSection = false;
      lastGroup = g;
    }
    const nm = catalogField(s, 'name');
    parts.push(
      <button
        key={s.id}
        type="button"
        aria-current={s.id === currentScreen ? 'page' : undefined}
        className={`screen-btn ${s.id === currentScreen ? 'active' : ''} text-left text-sm px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between w-full border-0 bg-transparent font-[inherit] cursor-pointer ${FOCUS_RING}`}
        onClick={() => onSelect(s.id)}
      >
        <span className="flex items-center gap-2 min-w-0">
          <span
            className="dot flex-shrink-0"
            aria-hidden
            style={{ background: s.phase === 1 ? '#10B981' : '#F59E0B' }}
          />
          <span className="truncate">{nm}</span>
        </span>
      </button>,
    );
  }
  return <>{parts}</>;
}

export function ProtoShell() {
  const {
    surface,
    currentScreen,
    switchSurface,
    show,
    toggleTheme,
    locale,
    setLocale,
    t,
    tGroup,
    catalogField,
  } = useProto();

  const screenList = SCREENS[surface === 'flutterGuide' ? 'flutterGuide' : surface === 'b2b' ? 'b2b' : 'b2c'];

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-8 proto-shell">
      <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-md ring-1 ring-black/5 dark:ring-white/10 shrink-0"
            style={{ background: 'var(--brand)', color: 'white' }}
          >
            <ProtoIcon name="wrench" className="w-5 h-5" aria-hidden />
          </div>
          <div className="min-w-0">
            <div id="shellTitle" className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 truncate">
              {t('shell.title', 'Osta — MVP UI/UX Prototype')}
            </div>
            <div id="shellSubtitle" className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {t('shell.subtitle', 'Map-first maintenance marketplace · B2C + B2B · Flutter team handbook')}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <div className="flex items-center gap-1 rounded-xl border border-slate-200/90 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 p-1 shadow-sm">
            <button
              type="button"
              id="protoLocaleEn"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold ${FOCUS_RING} ${locale === 'en' ? 'tab-active' : 'text-slate-600 dark:text-slate-400'}`}
              title={t('shell.locale_en_title', 'English')}
              onClick={() => setLocale('en')}
            >
              EN
            </button>
            <button
              type="button"
              id="protoLocaleAr"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold ${FOCUS_RING} ${locale === 'ar-EG' ? 'tab-active' : 'text-slate-600 dark:text-slate-400'}`}
              title={t('shell.locale_ar_title', 'العربية (مصر)')}
              onClick={() => setLocale('ar-EG')}
            >
              عربي
            </button>
          </div>
          <button
            type="button"
            id="protoThemeToggle"
            className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200/90 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 shadow-sm tap ${FOCUS_RING}`}
            aria-label={t('a11y.theme_toggle', 'Toggle light or dark theme')}
            onClick={toggleTheme}
          >
            <ProtoIcon name="sun" className="w-5 h-5 dark:hidden text-amber-500" aria-hidden />
            <ProtoIcon name="moon" className="w-5 h-5 hidden dark:inline text-slate-300" aria-hidden />
          </button>
          <div className="flex flex-wrap items-center justify-end gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-2xl p-1 border border-slate-200/80 dark:border-slate-700 shadow-sm max-w-xl">
            <button
              type="button"
              id="toggleB2C"
              aria-current={surface === 'b2c' ? 'page' : undefined}
              className={surface === 'b2c' ? ACTIVE_TAB : INACTIVE_TAB}
              onClick={() => switchSurface('b2c')}
            >
              {t('shell.tab_b2c', 'B2C — Car Owner')}
            </button>
            <button
              type="button"
              id="toggleB2B"
              aria-current={surface === 'b2b' ? 'page' : undefined}
              className={surface === 'b2b' ? ACTIVE_TAB : INACTIVE_TAB}
              onClick={() => switchSurface('b2b')}
            >
              {t('shell.tab_b2b', 'B2B — Service Center')}
            </button>
            <button
              type="button"
              id="toggleFlutterGuide"
              aria-current={surface === 'flutterGuide' ? 'page' : undefined}
              className={surface === 'flutterGuide' ? ACTIVE_TAB : INACTIVE_TAB}
              onClick={() => switchSurface('flutterGuide')}
            >
              {t('shell.tab_ftg', 'Flutter Team Guide')}
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-[260px_1fr] gap-5">
        <aside className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-700 p-4 shadow-sm shadow-slate-200/50 dark:shadow-none h-fit sticky top-4">
          <div id="shellScreensLabel" className="label mb-2 text-slate-600 dark:text-slate-400">
            {t('shell.screens', 'Screens')}
          </div>
          <nav
            id="screenList"
            className="screen-list flex flex-col gap-1"
            aria-label={t('a11y.screen_nav', 'Prototype screen catalog')}
          >
            <ScreenListItems
              screenList={screenList as ScreenRow[]}
              currentScreen={currentScreen}
              onSelect={show}
              t={t}
              tGroup={tGroup}
              catalogField={catalogField}
            />
          </nav>
          <div className="divider my-4 dark:bg-slate-700" />
          <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            <div className="flex items-center gap-2 mb-1">
              <span className="dot" style={{ background: '#10B981' }} />
              <span id="shellLegendMvp">{t('shell.legend_mvp', 'MVP scope (Phase 1)')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="dot" style={{ background: '#F59E0B' }} />
              <span id="shellLegendP2">{t('shell.legend_p2', 'Phase 2 — retention layer')}</span>
            </div>
          </div>
        </aside>

        <main
          className="flex items-start justify-center pt-4 pb-10 w-full min-w-0"
          style={{ minHeight: 900 }}
          aria-label={t('a11y.main_landmark', 'Prototype preview')}
        >
          {PHONE_PAIR_SURFACES.map(({ surface: srf, layoutId, stageId, asideId }) => (
            <div
              key={layoutId}
              id={layoutId}
              className="proto-pair-layout ftg-main-layout w-full max-w-full min-w-0 px-1"
              hidden={surface !== srf}
            >
              <div id={stageId} className="phone-frame flex-shrink-0">
                {surface === srf ? <PhoneStage /> : null}
              </div>
              <aside
                id={asideId}
                className="ftg-handbook-aside proto-detail-aside dark:border-slate-700"
                aria-label={t('a11y.spec_aside', 'Screen spec')}
              >
                <SpecAside surface={srf} screenId={currentScreen} />
              </aside>
            </div>
          ))}

          <div
            id="ftgLayout"
            className="ftg-guide-layout ftg-main-layout w-full max-w-full min-w-0 px-1"
            hidden={surface !== 'flutterGuide'}
          >
            <aside
              id="ftgHandbookAside"
              className="ftg-handbook-aside proto-detail-aside ftg-guide-full mx-auto dark:border-slate-700"
              aria-label={t('a11y.ftg_handbook_aside', 'Flutter Team Guide — technical handbook')}
            >
              {surface === 'flutterGuide' ? (
                <>
                  <FtgHandbookSection screenId={currentScreen} />
                  <div className="divider my-5" />
                  <SpecAside surface="flutterGuide" screenId={currentScreen} />
                </>
              ) : null}
            </aside>
          </div>
        </main>
      </div>

      <footer id="shellFooter" className="mt-12 text-xs text-slate-500 dark:text-slate-400 text-center pb-8">
        {t(
          'shell.footer',
          'Built for developer handoff. Flutter target — layouts translate to Material/Cupertino widgets. Mock data is illustrative.',
        )}
      </footer>
    </div>
  );
}
