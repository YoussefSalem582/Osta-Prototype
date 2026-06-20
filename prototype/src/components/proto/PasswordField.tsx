import { useState } from 'react';
import { useProto } from '../../context/ProtoContext';
import { ProtoIcon } from './Icon';

/**
 * Password input with a show/hide reveal toggle. Shared across the B2C + B2B
 * auth screens. Uses logical `pe-11`/`end-1` so the eye button sits on the
 * inline-end edge in both LTR and RTL.
 */
export function ProtoPasswordField({
  id,
  defaultValue,
  autoComplete,
}: {
  id: string;
  defaultValue?: string;
  autoComplete?: string;
}) {
  const { t } = useProto();
  const [reveal, setReveal] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        type={reveal ? 'text' : 'password'}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        className="proto-input w-full ps-3.5 pe-11 py-3.5 text-sm"
      />
      <button
        type="button"
        onClick={() => setReveal((s) => !s)}
        aria-pressed={reveal}
        aria-label={reveal ? t('a11y.pwd_hide', 'Hide password') : t('a11y.pwd_show', 'Show password')}
        className="absolute inset-y-0 end-1 my-auto flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 tap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/70"
      >
        <ProtoIcon name={reveal ? 'eye-off' : 'eye'} className="w-4 h-4" aria-hidden />
      </button>
    </div>
  );
}
