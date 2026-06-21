import { useProto } from '../context/ProtoContext';
import { SCREENS } from '../data/screens';
import type { ScreenRow, Surface } from '../types';

function escapeHtml(str: unknown) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function nl2br(escaped: string) {
  return escaped.replace(/\n/g, '<br>');
}

function specRelatedFlowsLine(screenId: string, t: (a: string, b: string) => string) {
  if (screenId.startsWith('ftg-')) {
    return t('spec.flows_ftg', 'Osta PRD · Flutter + Supabase · internal engineering handbook');
  }
  if (screenId.startsWith('b2c')) {
    return t('spec.flows_b2c', 'PRD §3 · Core flow §6.1');
  }
  return t('spec.flows_b2b', 'PRD §4 · Core flow §6.3');
}

export function SpecAside({ surface, screenId }: { surface: Surface; screenId: string }) {
  const { t, catalogField, catalogStatesArray } = useProto();
  const all = [...SCREENS.b2c, ...SCREENS.b2b, ...SCREENS.flutterGuide];
  const s = all.find((x) => x.id === screenId);
  if (!s) return null;

  const name = catalogField(s, 'name');
  const purpose = catalogField(s, 'purpose');
  const notes = catalogField(s, 'notes');
  const group = catalogField(s, 'group');
  const statesArr = catalogStatesArray(s);
  const statesJoined = catalogField(s, 'states');
  const includeProduct = surface === 'b2c' || surface === 'b2b';
  const techRaw = 'tech' in s ? (s as { tech?: unknown }).tech : undefined;
  const tech = typeof techRaw === 'string' ? techRaw : undefined;
  const codeHintRaw = 'codeHint' in s ? (s as { codeHint?: unknown }).codeHint : undefined;
  const codeHint = typeof codeHintRaw === 'string' ? codeHintRaw : undefined;
  const techHtml = tech ? nl2br(escapeHtml(tech)) : '';
  const spec = (a: string, b: string) => t(a, b);

  return (
    <div className="proto-detail-spec-block">
      <div className="label mb-2 text-slate-600 dark:text-slate-400">{spec('spec.screen_spec', 'Screen spec')}</div>
      <div className="text-lg font-bold text-slate-900 dark:text-slate-100">{name}</div>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <span className={`badge ${s.phase === 1 ? 'b-green' : 'b-amber'}`}>
          {spec('spec.phase', 'Phase')} {s.phase}
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{s.id}</span>
      </div>
      <div className="mt-3 label">{spec('spec.group', 'Group')}</div>
      <div className="text-sm mt-1 text-slate-800 dark:text-slate-200">{group}</div>
      <div className="mt-4 label">{spec('spec.purpose', 'Purpose')}</div>
      <div className="text-sm mt-1 text-slate-800 dark:text-slate-200">{purpose}</div>
      <div className="mt-4 label">{spec('spec.states', 'States to build')}</div>
      <div className="mt-1 flex flex-wrap gap-1.5">
        {statesArr.map((st) => (
          <span key={st} className="chip">
            {st}
          </span>
        ))}
      </div>
      <div className="mt-2 label" style={{ fontSize: 10, letterSpacing: '0.06em' }}>
        {spec('spec.states_copy', 'All states (copy)')}
      </div>
      <div className="text-xs mt-1 text-slate-600 dark:text-slate-400 font-mono leading-relaxed break-all">
        {statesJoined}
      </div>
      <div className="mt-4 label">{spec('spec.dev_notes', 'Dev notes')}</div>
      <div className="text-sm mt-1 text-slate-700 dark:text-slate-300 leading-relaxed">{notes}</div>

      {includeProduct ? (
        <>
          <div className="divider my-4 dark:bg-slate-700" />
          <div className="label">{spec('spec.flutter_impl', 'Flutter / implementation')}</div>
          <div
            className="text-sm mt-1 text-slate-700 dark:text-slate-300 leading-relaxed proto-tech-block"
            dangerouslySetInnerHTML={{
              __html: techHtml || '<span class="text-slate-400 dark:text-slate-500">—</span>',
            }}
          />
          <div className="mt-4 label">{spec('spec.code_hint', 'Code hint')}</div>
          {codeHint ? (
            <pre className="proto-code-hint" tabIndex={0}>
              <code>{codeHint}</code>
            </pre>
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400">—</p>
          )}
        </>
      ) : null}

      <div className="divider my-4 dark:bg-slate-700" />
      <div className="label">{spec('spec.related', 'Related flows')}</div>
      <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
        {specRelatedFlowsLine(s.id, t)}
      </div>
      <div className="divider my-4 dark:bg-slate-700" />
      <div className="label">{spec('spec.raw_catalog', 'Raw catalog')}</div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-2">
        {spec('spec.raw_hint', 'All fields from screens.js for this row.')}
      </p>
      <dl className="proto-spec-dl">
        <dt>id</dt>
        <dd>{s.id}</dd>
        <dt>name</dt>
        <dd>{name}</dd>
        <dt>group</dt>
        <dd>{group}</dd>
        <dt>phase</dt>
        <dd>{s.phase}</dd>
        <dt>purpose</dt>
        <dd>{purpose}</dd>
        <dt>states</dt>
        <dd>{statesJoined}</dd>
        <dt>notes</dt>
        <dd>{notes}</dd>
        <dt>tech</dt>
        {includeProduct && tech ? (
          <dd className="proto-spec-dd-pre">{tech}</dd>
        ) : (
          <dd>—</dd>
        )}
        <dt>codeHint</dt>
        {includeProduct && codeHint ? (
          <dd className="proto-spec-dd-pre">{codeHint}</dd>
        ) : (
          <dd>—</dd>
        )}
      </dl>
    </div>
  );
}
