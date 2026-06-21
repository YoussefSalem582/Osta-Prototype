import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { CATALOG_AR } from '../i18n/catalogAr';
import { STRINGS_AR_EG } from '../i18n/stringsArEG';
import { defaultScreenForSurface, surfaceForScreenId } from '../navigation/protoNavigation';
import type { Locale, ScreenRow, Surface, ThemeMode } from '../types';

export type MarketListingKey = 'p1' | 'p2' | 'p3' | 'p4';

/** Persisted prototype selection across Service → Slot → Payment. */
export type BookingPricingMode = 'fixed' | 'range' | 'quote';
export type BookingDraft = {
  serviceIdx: number;
  addonOn: boolean;
  pricingMode: BookingPricingMode;
};

const BOOKING_DRAFT_DEFAULT: BookingDraft = {
  serviceIdx: 0,
  addonOn: false,
  pricingMode: 'fixed',
};

const LOCALE_KEY = 'osta_proto_locale';
const THEME_KEY = 'osta_proto_theme';

type ProtoContextValue = {
  locale: Locale;
  theme: ThemeMode;
  surface: Surface;
  currentScreen: string;
  setLocale: (code: Locale) => void;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  switchSurface: (s: Surface) => void;
  show: (id: string) => void;
  t: (key: string, enFallback: string) => string;
  tGroup: (g: string) => string;
  catalogField: (s: ScreenRow, field: keyof ScreenRow | 'states' | 'group') => string;
  catalogStatesArray: (s: ScreenRow) => string[];
  bookingReturnTarget: string;
  setBookingReturnTarget: (id: string) => void;
  /** Demo: which marketplace row is open on `b2c-part-detail`. */
  marketListingKey: MarketListingKey;
  setMarketListingKey: (key: MarketListingKey) => void;
  bookingDraft: BookingDraft;
  setBookingDraft: (next: BookingDraft | ((prev: BookingDraft) => BookingDraft)) => void;
};

const ProtoContext = createContext<ProtoContextValue | null>(null);

function readStoredLocale(): Locale {
  try {
    const code = localStorage.getItem(LOCALE_KEY);
    return code === 'ar-EG' ? 'ar-EG' : 'en';
  } catch {
    return 'en';
  }
}

function readStoredTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark';
  } catch {
    /* ignore */
  }
  return 'light';
}

export function ProtoProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);
  const [theme, setThemeState] = useState<ThemeMode>(readStoredTheme);
  const [surface, setSurface] = useState<Surface>('b2c');
  const [currentScreen, setCurrentScreen] = useState('b2c-splash');
  const [bookingReturnTarget, setBookingReturnTarget] = useState('b2c-shop');
  const [marketListingKey, setMarketListingKey] = useState<MarketListingKey>('p1');
  const [bookingDraft, setBookingDraftState] = useState<BookingDraft>(BOOKING_DRAFT_DEFAULT);

  const setBookingDraft = useCallback((next: BookingDraft | ((prev: BookingDraft) => BookingDraft)) => {
    setBookingDraftState((prev) => (typeof next === 'function' ? next(prev) : next));
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === 'ar-EG' ? 'ar-EG' : 'en';
    document.documentElement.dir = locale === 'ar-EG' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem(LOCALE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale]);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const setLocale = useCallback((code: Locale) => {
    setLocaleState(code);
  }, []);

  const setTheme = useCallback((mode: ThemeMode) => {
    setThemeState(mode);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((th) => (th === 'dark' ? 'light' : 'dark'));
  }, []);

  const t = useCallback(
    (key: string, enFallback: string) => {
      if (locale === 'ar-EG') {
        const v = (STRINGS_AR_EG as Record<string, string>)[key];
        if (v != null) return v;
      }
      return enFallback;
    },
    [locale],
  );

  const tGroup = useCallback(
    (g: string) => t('group.' + g, g),
    [t],
  );

  const catalogStatesArray = useCallback(
    (s: ScreenRow) => {
      if (locale === 'ar-EG') {
        const ar = CATALOG_AR[s.id as keyof typeof CATALOG_AR];
        if (ar && Array.isArray(ar.states)) return [...ar.states];
      }
      return s.states ?? [];
    },
    [locale],
  );

  const catalogField = useCallback(
    (s: ScreenRow, field: keyof ScreenRow | 'states' | 'group') => {
      if (field === 'group') return tGroup(String(s.group));
      if (locale === 'ar-EG') {
        const ar = CATALOG_AR[s.id as keyof typeof CATALOG_AR];
        if (ar) {
          if (field === 'states') {
            const st = ar.states != null ? ar.states : s.states;
            return Array.isArray(st) ? st.join(', ') : String(st);
          }
          if (field in ar && ar[field as keyof typeof ar] != null) {
            return String(ar[field as keyof typeof ar]);
          }
        }
      }
      if (field === 'states' && s.states) return s.states.join(', ');
      const v = s[field as keyof ScreenRow];
      return v != null ? String(v) : '';
    },
    [locale, tGroup],
  );

  const show = useCallback((id: string) => {
    const target = surfaceForScreenId(id);
    setSurface((prevSurf) => {
      if (target !== prevSurf) {
        const fallback = defaultScreenForSurface(target);
        const next =
          (target === 'b2c' && !id.startsWith('b2c')) ||
          (target === 'b2b' && !id.startsWith('b2b')) ||
          (target === 'flutterGuide' && !id.startsWith('ftg'))
            ? fallback
            : id;
        setCurrentScreen(next);
        return target;
      }
      setCurrentScreen(id);
      return prevSurf;
    });
  }, []);

  const switchSurface = useCallback((s: Surface) => {
    setSurface((prev) => {
      if (prev === s) return prev;
      setCurrentScreen((cs) => {
        if (s === 'b2c' && !cs.startsWith('b2c')) return defaultScreenForSurface('b2c');
        if (s === 'b2b' && !cs.startsWith('b2b')) return defaultScreenForSurface('b2b');
        if (s === 'flutterGuide' && !cs.startsWith('ftg')) return defaultScreenForSurface('flutterGuide');
        return cs;
      });
      return s;
    });
  }, []);

  const value = useMemo(
    () => ({
      locale,
      theme,
      surface,
      currentScreen,
      setLocale,
      setTheme,
      toggleTheme,
      switchSurface,
      show,
      t,
      tGroup,
      catalogField,
      catalogStatesArray,
      bookingReturnTarget,
      setBookingReturnTarget,
      marketListingKey,
      setMarketListingKey,
      bookingDraft,
      setBookingDraft,
    }),
    [
      locale,
      theme,
      surface,
      currentScreen,
      setLocale,
      setTheme,
      toggleTheme,
      switchSurface,
      show,
      t,
      tGroup,
      catalogField,
      catalogStatesArray,
      bookingReturnTarget,
      marketListingKey,
      bookingDraft,
      setBookingDraft,
    ],
  );

  return <ProtoContext.Provider value={value}>{children}</ProtoContext.Provider>;
}

export function useProto() {
  const ctx = useContext(ProtoContext);
  if (!ctx) throw new Error('useProto requires ProtoProvider');
  return ctx;
}
