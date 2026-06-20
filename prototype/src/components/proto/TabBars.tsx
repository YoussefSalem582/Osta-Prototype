import { Fragment } from 'react';
import { useProto } from '../../context/ProtoContext';
import { ProtoIcon } from './Icon';

/** Shared inner content for a bottom-nav tab: the icon inside the
 *  active-indicator pill, with the label beneath. Used by both tab bars. */
function TabInner({ icon, label }: { icon: string; label: string }) {
  return (
    <>
      <span className="tab-ic-pill">
        <ProtoIcon name={icon} className="ic" strokeWidth={1.75} aria-hidden />
      </span>
      <span className="tab-label">{label}</span>
    </>
  );
}

export function B2cTabBar({ active }: { active: string }) {
  const { show, t } = useProto();
  /** Order: Home first (conventional), then map → bookings → shop → garage. */
  const items: [string, string, string, string][] = [
    ['b2c-dashboard', t('tabs.b2c.home', 'Home'), 'home', 'home'],
    ['b2c-map', t('tabs.b2c.map', 'Map'), 'map', 'map'],
    ['b2c-bookings', t('tabs.b2c.bookings', 'Bookings'), 'calendar-check', 'bookings'],
    ['b2c-marketplace', t('tabs.b2c.shop', 'Shop'), 'store', 'market'],
    ['b2c-garage', t('tabs.b2c.garage', 'Garage'), 'car', 'garage'],
  ];
  return (
    <nav className="tab-bar" aria-label={t('tabs.b2c.nav_label', 'Primary navigation')}>
      {items.map(([id, label, icon, key]) => {
        const isOn = active === key;
        if (isOn) {
          return (
            <span key={id} className="tab on" aria-current="page">
              <TabInner icon={icon} label={label} />
            </span>
          );
        }
        return (
          <button key={id} type="button" className="tab tap" onClick={() => show(id)}>
            <TabInner icon={icon} label={label} />
          </button>
        );
      })}
    </nav>
  );
}

export function B2bTopbarMobile({ title }: { title: string }) {
  const { t } = useProto();
  return (
    <div className="b2b-topbar h-12 flex items-center px-4 justify-between flex-shrink-0">
      <div className="font-semibold text-sm truncate max-w-[200px] text-slate-900 dark:text-slate-100">{title}</div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-600 flex items-center justify-center tap"
          aria-label={t('a11y.search', 'Search')}
        >
          <ProtoIcon name="search" className="w-4 h-4 text-slate-500 dark:text-slate-400" aria-hidden />
        </button>
        <button type="button" className="relative w-10 h-10 rounded-xl flex items-center justify-center tap" aria-label={t('a11y.notifications', 'Notifications, 3 unread')}>
          <ProtoIcon name="bell" className="w-5 h-5 text-slate-500 dark:text-slate-400" aria-hidden />
          <span
            className="absolute top-1 end-1 w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center"
            aria-hidden
          >
            3
          </span>
        </button>
      </div>
    </div>
  );
}

export function B2bTabBar({ active }: { active: string }) {
  const { show, t } = useProto();
  const items: [string, string, string, string][] = [
    ['b2b-dashboard', t('tabs.b2b.today', 'Today'), 'layout-dashboard', 'dashboard'],
    ['b2b-bookings', t('tabs.b2b.bookings', 'Bookings'), 'calendar', 'bookings'],
    ['b2b-catalog', t('tabs.b2b.catalog', 'Catalog'), 'tag', 'catalog'],
    ['b2b-more', t('tabs.b2b.more', 'More'), 'menu', 'more'],
  ];
  return (
    <nav className="b2b-tab-bar" aria-label={t('tabs.b2b.nav_label', 'Workshop navigation')}>
      {items.map(([id, label, icon, key]) => {
        const isOn = active === key;
        if (isOn) {
          return (
            <span key={id} className="tab on" aria-current="page">
              <TabInner icon={icon} label={label} />
            </span>
          );
        }
        return (
          <button key={id} type="button" className="tab tap" onClick={() => show(id)}>
            <TabInner icon={icon} label={label} />
          </button>
        );
      })}
    </nav>
  );
}

export function OnboardStepper({
  active,
  interactive,
}: {
  active: number;
  /** Navigate between business onboarding screens (prototype). */
  interactive?: boolean;
}) {
  const { t, show } = useProto();
  const steps = [t('onboard.step_business', 'Business'), t('onboard.step_catalog', 'Catalog')];
  const targets = ['b2b-onboard-1', 'b2b-onboard-3'];

  function goTo(i: number) {
    if (!interactive || i === active || i < 0 || i >= targets.length) return;
    show(targets[i]);
  }

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2 sm:gap-3">
      {steps.map((s, i) => (
        <Fragment key={s}>
          {interactive ? (
            <button
              type="button"
              onClick={() => goTo(i)}
              aria-current={active === i ? 'step' : undefined}
              className={`tap flex shrink-0 items-center gap-2 rounded-xl px-2 py-1.5 text-left outline-none ring-offset-white transition hover:bg-slate-100/95 focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 dark:ring-offset-slate-900 dark:hover:bg-slate-800/80 ${
                i === active ? 'bg-teal-50/90 shadow-sm shadow-teal-900/10 dark:bg-teal-950/35' : ''
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold shadow-sm ring-2 ring-transparent ring-offset-white transition dark:ring-offset-slate-900 ${
                  i < active ? 'bg-teal-600 text-white' : i === active ? 'scale-105 bg-teal-600 text-white ring-teal-200 dark:ring-teal-900' : 'bg-slate-200 text-slate-500 dark:bg-slate-600 dark:text-slate-300'
                }`}
              >
                {i < active ? '✓' : i + 1}
              </span>
              <span
                className={`max-w-[9rem] text-sm font-medium ${i === active ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}
              >
                {s}
              </span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  i <= active ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-500 dark:bg-slate-600 dark:text-slate-300'
                }`}
              >
                {i < active ? '✓' : i + 1}
              </div>
              <div
                className={`text-sm font-medium ${i === active ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}
              >
                {s}
              </div>
            </div>
          )}
          {i < steps.length - 1 ? (
            <div className={`h-px w-6 shrink-0 sm:w-10 ${i < active ? 'bg-teal-600' : 'bg-slate-200 dark:bg-slate-600'}`} aria-hidden />
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}
