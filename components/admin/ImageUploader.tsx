'use client';

import { ImagePlus, Loader2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase';

const bucket = 'portfolio-images';

function storagePath(url: string) {
  const marker = `/storage/v1/object/public/${bucket}/`;
  return url.includes(marker) ? decodeURIComponent(url.split(marker)[1]) : null;
}

export function ImageUploader({ value, onChange, folder, alt = 'Image preview' }: { value: string | null; onChange: (url: string | null) => void; folder: string; alt?: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function removeCurrent() {
    if (!value || !window.confirm('確定要刪除這張圖片嗎？\n此操作無法復原。')) return;
    const supabase = getSupabaseClient();
    const path = storagePath(value);
    setBusy(true);
    if (supabase && path) await supabase.storage.from(bucket).remove([path]);
    onChange(null);
    setBusy(false);
  }

  async function upload(file: File) {
    const supabase = getSupabaseClient();
    if (!supabase) return setError('尚未設定 Supabase。');
    if (!file.type.startsWith('image/')) return setError('請選擇圖片檔。');
    if (file.size > 8 * 1024 * 1024) return setError('圖片不可超過 8 MB。');
    setBusy(true);
    setError('');
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const path = `${folder}/${crypto.randomUUID()}-${safeName}`;
    const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, { cacheControl: '3600', upsert: false });
    if (uploadError) {
      setError(uploadError.message);
      setBusy(false);
      return;
    }
    const oldPath = value ? storagePath(value) : null;
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    onChange(data.publicUrl);
    if (oldPath) await supabase.storage.from(bucket).remove([oldPath]);
    setBusy(false);
  }

  return (
    <div className="space-y-3">
      {value ? <img className="aspect-[16/8] w-full max-w-xl rounded-lg border border-slate-200 bg-slate-50 object-cover" src={value} alt={alt} /> : <div className="grid aspect-[16/7] w-full max-w-xl place-items-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-400">尚未上傳圖片</div>}
      <div className="flex flex-wrap gap-2">
        <label className="admin-button secondary cursor-pointer"><ImagePlus size={16} /> {busy ? '處理中…' : value ? '更換圖片' : '上傳圖片'}<input className="sr-only" type="file" accept="image/*" disabled={busy} onChange={(event) => event.target.files?.[0] && upload(event.target.files[0])} /></label>
        {value && <button className="admin-button danger" type="button" onClick={removeCurrent} disabled={busy}><Trash2 size={16} /> 刪除圖片</button>}
        {busy && <Loader2 className="animate-spin text-slate-500" size={18} />}
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
