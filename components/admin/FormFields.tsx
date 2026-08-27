'use client';

export function TextField({ label, value, onChange, type = 'text', required, placeholder }: { label: string; value: string | number; onChange: (value: string) => void; type?: string; required?: boolean; placeholder?: string }) {
  return <label className="admin-field"><span>{label}{required && ' *'}</span><input type={type} value={value} required={required} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /></label>;
}

export function TextArea({ label, value, onChange, rows = 5, hint }: { label: string; value: string; onChange: (value: string) => void; rows?: number; hint?: string }) {
  return <label className="admin-field"><span>{label}</span><textarea value={value} rows={rows} onChange={(event) => onChange(event.target.value)} />{hint && <small>{hint}</small>}</label>;
}

export function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return <label className="flex items-center gap-3 text-sm font-semibold text-slate-700"><input className="h-4 w-4 accent-[#214e33]" type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />{label}</label>;
}

export function FormActions({ busy, onCancel }: { busy: boolean; onCancel: () => void }) {
  return <div className="flex gap-3 border-t border-slate-200 pt-5"><button className="admin-button primary" type="submit" disabled={busy}>{busy ? '儲存中…' : '儲存'}</button><button className="admin-button secondary" type="button" onClick={onCancel}>取消</button></div>;
}
