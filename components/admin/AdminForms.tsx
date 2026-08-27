'use client';

import { useState } from 'react';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import type {
  AboutContent, ContactContent, EditableTable, HeroContent, Project, SkillCategory,
  SkillItem, Trait,
} from '@/lib/types';
import { FormActions, TextArea, TextField, Toggle } from './FormFields';
import { IconPicker } from './IconPicker';
import { ImageUploader } from './ImageUploader';

type SaveFn = (table: EditableTable, record: Record<string, unknown>) => Promise<boolean>;
type RemoveFn = (table: EditableTable, id: string) => Promise<boolean>;
type CompleteFn = (message?: string) => Promise<void>;

function PanelTitle({ title, description }: { title: string; description: string }) {
  return <div className="mb-7"><h2 className="text-xl font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{description}</p></div>;
}

export function HeroForm({ initial, save, complete }: { initial: HeroContent; save: SaveFn; complete: CompleteFn }) {
  const [form, setForm] = useState(initial);
  const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent) { event.preventDefault(); setBusy(true); if (await save('hero', { ...form })) await complete(); setBusy(false); }
  return (
    <form className="admin-panel" onSubmit={submit}>
      <PanelTitle title="Hero 管理" description="首頁第一屏的標籤、標題、介紹、CTA 與人物圖片。標題與內文皆保留換行。" />
      <div className="admin-grid-2">
        <TextField label="標籤（中文）" value={form.eyebrow_zh} onChange={(value) => setForm({ ...form, eyebrow_zh: value })} />
        <TextField label="Eyebrow (English)" value={form.eyebrow_en} onChange={(value) => setForm({ ...form, eyebrow_en: value })} />
        <TextArea label="Hero 標題（中文）" value={form.title_zh} rows={5} hint="Enter 換行會原樣呈現在前台" onChange={(value) => setForm({ ...form, title_zh: value })} />
        <TextArea label="Hero title (English)" value={form.title_en} rows={5} onChange={(value) => setForm({ ...form, title_en: value })} />
        <TextArea label="介紹文案（中文）" value={form.description_zh} rows={6} onChange={(value) => setForm({ ...form, description_zh: value })} />
        <TextArea label="Description (English)" value={form.description_en} rows={6} onChange={(value) => setForm({ ...form, description_en: value })} />
      </div>
      <div className="mt-7"><h3 className="mb-3 text-sm font-bold">Hero Image</h3><ImageUploader value={form.image_url} folder="hero" alt={form.image_alt_zh} onChange={(value) => setForm({ ...form, image_url: value })} /></div>
      <div className="admin-grid-2 mt-7">
        <TextField label="圖片 Alt（中文）" value={form.image_alt_zh} onChange={(value) => setForm({ ...form, image_alt_zh: value })} />
        <TextField label="Image alt (English)" value={form.image_alt_en} onChange={(value) => setForm({ ...form, image_alt_en: value })} />
        <TextField label="主要 CTA（中文）" value={form.primary_cta_label_zh} onChange={(value) => setForm({ ...form, primary_cta_label_zh: value })} />
        <TextField label="Primary CTA (English)" value={form.primary_cta_label_en} onChange={(value) => setForm({ ...form, primary_cta_label_en: value })} />
        <TextField label="主要 CTA 連結" value={form.primary_cta_url} onChange={(value) => setForm({ ...form, primary_cta_url: value })} />
        <span />
        <TextField label="次要 CTA（中文）" value={form.secondary_cta_label_zh} onChange={(value) => setForm({ ...form, secondary_cta_label_zh: value })} />
        <TextField label="Secondary CTA (English)" value={form.secondary_cta_label_en} onChange={(value) => setForm({ ...form, secondary_cta_label_en: value })} />
        <TextField label="次要 CTA 連結" value={form.secondary_cta_url} onChange={(value) => setForm({ ...form, secondary_cta_url: value })} />
      </div>
      <FormActions busy={busy} onCancel={() => setForm(initial)} />
    </form>
  );
}

export function AboutForm({ initial, save, complete }: { initial: AboutContent; save: SaveFn; complete: CompleteFn }) {
  const [form, setForm] = useState(initial);
  const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent) { event.preventDefault(); setBusy(true); if (await save('about', { ...form })) await complete(); setBusy(false); }
  return (
    <form className="admin-panel" onSubmit={submit}>
      <PanelTitle title="About 管理" description="空行會切成不同段落；英文未填時前台自動顯示中文。" />
      <div className="admin-grid-2">
        <TextField label="標題（中文）" value={form.title_zh} onChange={(value) => setForm({ ...form, title_zh: value })} />
        <TextField label="Title (English)" value={form.title_en} onChange={(value) => setForm({ ...form, title_en: value })} />
        <TextArea label="內容（中文）" value={form.content_zh} rows={11} hint="用空行分隔段落" onChange={(value) => setForm({ ...form, content_zh: value })} />
        <TextArea label="Content (English)" value={form.content_en} rows={11} onChange={(value) => setForm({ ...form, content_en: value })} />
        <TextField label="手寫註記（中文）" value={form.note_zh} onChange={(value) => setForm({ ...form, note_zh: value })} />
        <TextField label="Note (English)" value={form.note_en} onChange={(value) => setForm({ ...form, note_en: value })} />
      </div>
      <FormActions busy={busy} onCancel={() => setForm(initial)} />
    </form>
  );
}

export function ContactForm({ initial, save, complete }: { initial: ContactContent; save: SaveFn; complete: CompleteFn }) {
  const [form, setForm] = useState(initial);
  const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent) { event.preventDefault(); setBusy(true); if (await save('contact', { ...form })) await complete(); setBusy(false); }
  return (
    <form className="admin-panel" onSubmit={submit}>
      <PanelTitle title="Contact 管理" description="Email 與 Phone 為必要欄位；前台自動產生 mailto: 與 tel: 連結。" />
      <div className="admin-grid-2">
        <TextField label="標題（中文）" value={form.title_zh} onChange={(value) => setForm({ ...form, title_zh: value })} />
        <TextField label="Title (English)" value={form.title_en} onChange={(value) => setForm({ ...form, title_en: value })} />
        <TextArea label="說明（中文）" value={form.description_zh} onChange={(value) => setForm({ ...form, description_zh: value })} />
        <TextArea label="Description (English)" value={form.description_en} onChange={(value) => setForm({ ...form, description_en: value })} />
        <TextField label="Email" type="email" required value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
        <TextField label="Phone" type="tel" required value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
        <TextField label="LinkedIn" value={form.linkedin} onChange={(value) => setForm({ ...form, linkedin: value })} />
        <TextField label="GitHub" value={form.github} onChange={(value) => setForm({ ...form, github: value })} />
        <TextField label="地點（中文）" value={form.location_zh} onChange={(value) => setForm({ ...form, location_zh: value })} />
        <TextField label="Location (English)" value={form.location_en} onChange={(value) => setForm({ ...form, location_en: value })} />
      </div>
      <FormActions busy={busy} onCancel={() => setForm(initial)} />
    </form>
  );
}

function emptyTrait(): Trait { return { id: crypto.randomUUID(), title_zh: '', title_en: '', description_zh: '', description_en: '', icon: 'Puzzle', sort_order: 0, is_active: true }; }

export function TraitsPanel({ items, save, remove, complete }: { items: Trait[]; save: SaveFn; remove: RemoveFn; complete: CompleteFn }) {
  const [draft, setDraft] = useState<Trait | null>(null);
  const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent) { event.preventDefault(); if (!draft) return; setBusy(true); if (await save('traits', { ...draft })) { await complete(); setDraft(null); } setBusy(false); }
  async function destroy(item: Trait) { if (!window.confirm('確定要刪除這筆資料嗎？\n此操作無法復原。')) return; if (await remove('traits', item.id)) { await complete('刪除成功'); if (draft?.id === item.id) setDraft(null); } }
  return (
    <section className="admin-panel">
      <div className="flex items-start justify-between gap-4"><PanelTitle title="Traits 管理" description="新增、編輯、刪除、排序與啟用／停用個人特質。" /><button className="admin-button primary" type="button" onClick={() => setDraft(emptyTrait())}><Plus size={16} /> 新增</button></div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{items.map((item) => <article className="rounded-lg border border-slate-200 p-4" key={item.id}><div className="flex items-center justify-between"><strong>{item.title_zh || '未命名'}</strong><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${item.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{item.is_active ? '啟用' : '停用'}</span></div><p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{item.description_zh}</p><div className="mt-4 flex gap-2"><button className="admin-icon-button" type="button" onClick={() => setDraft({ ...item })}><Pencil size={15} /> 編輯</button><button className="admin-icon-button danger" type="button" onClick={() => destroy(item)}><Trash2 size={15} /> 刪除</button></div></article>)}</div>
      {draft && <form className="mt-8 border-t border-slate-200 pt-7" onSubmit={submit}><h3 className="mb-5 text-lg font-bold">{items.some((item) => item.id === draft.id) ? '編輯特質' : '新增特質'}</h3><div className="admin-grid-2"><TextField label="名稱（中文）" required value={draft.title_zh} onChange={(value) => setDraft({ ...draft, title_zh: value })} /><TextField label="Name (English)" value={draft.title_en} onChange={(value) => setDraft({ ...draft, title_en: value })} /><TextArea label="說明（中文）" value={draft.description_zh} onChange={(value) => setDraft({ ...draft, description_zh: value })} /><TextArea label="Description (English)" value={draft.description_en} onChange={(value) => setDraft({ ...draft, description_en: value })} /><IconPicker value={draft.icon} onChange={(value) => setDraft({ ...draft, icon: value })} /><TextField label="排序" type="number" value={draft.sort_order} onChange={(value) => setDraft({ ...draft, sort_order: Number(value) })} /><Toggle label="啟用" checked={draft.is_active} onChange={(value) => setDraft({ ...draft, is_active: value })} /></div><FormActions busy={busy} onCancel={() => setDraft(null)} /></form>}
    </section>
  );
}

function emptySkill(): SkillCategory { return { id: crypto.randomUUID(), number: '00', title_zh: '', title_en: '', icon: 'FileSearch', sort_order: 0, is_active: true, skill_items: [] }; }
function emptySkillItem(categoryId: string): SkillItem { return { id: crypto.randomUUID(), category_id: categoryId, name_zh: '', name_en: '', sort_order: 0 }; }

export function SkillsPanel({ items, save, remove, complete }: { items: SkillCategory[]; save: SaveFn; remove: RemoveFn; complete: CompleteFn }) {
  const [draft, setDraft] = useState<SkillCategory | null>(null);
  const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent) {
    event.preventDefault(); if (!draft) return; setBusy(true);
    const { skill_items, ...category } = draft;
    const categorySaved = await save('skill_categories', { ...category });
    const itemResults = categorySaved ? await Promise.all(skill_items.map((item) => save('skill_items', { ...item, category_id: draft.id }))) : [false];
    if (categorySaved && itemResults.every(Boolean)) { await complete(); setDraft(null); }
    setBusy(false);
  }
  async function destroyCategory(item: SkillCategory) { if (!window.confirm('確定要刪除這筆資料嗎？\n此操作無法復原。')) return; if (await remove('skill_categories', item.id)) { await complete('刪除成功'); setDraft(null); } }
  async function destroyItem(item: SkillItem) { if (!draft || !window.confirm('確定要刪除這筆資料嗎？\n此操作無法復原。')) return; await remove('skill_items', item.id); setDraft({ ...draft, skill_items: draft.skill_items.filter((current) => current.id !== item.id) }); }
  return (
    <section className="admin-panel">
      <div className="flex items-start justify-between gap-4"><PanelTitle title="Core Skills 管理" description="維護能力分類、統一圖示、子技能、排序與啟用狀態。" /><button className="admin-button primary" type="button" onClick={() => setDraft(emptySkill())}><Plus size={16} /> 新增分類</button></div>
      <div className="grid gap-3 md:grid-cols-2">{items.map((item) => <article className="rounded-lg border border-slate-200 p-4" key={item.id}><div className="flex items-start justify-between"><div><span className="text-xs font-bold text-[#487055]">{item.number}</span><h3 className="mt-1 font-bold">{item.title_zh} / {item.title_en}</h3></div><span className="text-xs text-slate-400">{item.skill_items.length} items</span></div><div className="mt-4 flex gap-2"><button className="admin-icon-button" type="button" onClick={() => setDraft(JSON.parse(JSON.stringify(item)) as SkillCategory)}><Pencil size={15} /> 編輯</button><button className="admin-icon-button danger" type="button" onClick={() => destroyCategory(item)}><Trash2 size={15} /> 刪除</button></div></article>)}</div>
      {draft && <form className="mt-8 border-t border-slate-200 pt-7" onSubmit={submit}><h3 className="mb-5 text-lg font-bold">技能分類</h3><div className="admin-grid-2"><TextField label="編號" value={draft.number} onChange={(value) => setDraft({ ...draft, number: value })} /><TextField label="排序" type="number" value={draft.sort_order} onChange={(value) => setDraft({ ...draft, sort_order: Number(value) })} /><TextField label="標題（中文）" value={draft.title_zh} onChange={(value) => setDraft({ ...draft, title_zh: value })} /><TextField label="Title (English)" value={draft.title_en} onChange={(value) => setDraft({ ...draft, title_en: value })} /><IconPicker value={draft.icon} onChange={(value) => setDraft({ ...draft, icon: value })} /><Toggle label="啟用" checked={draft.is_active} onChange={(value) => setDraft({ ...draft, is_active: value })} /></div><div className="mt-8"><div className="mb-4 flex items-center justify-between"><h4 className="font-bold">子技能</h4><button className="admin-button secondary" type="button" onClick={() => setDraft({ ...draft, skill_items: [...draft.skill_items, emptySkillItem(draft.id)] })}><Plus size={15} /> 新增子技能</button></div><div className="space-y-3">{draft.skill_items.map((item, index) => <div className="grid items-end gap-3 rounded-lg bg-slate-50 p-3 sm:grid-cols-[1fr_1fr_100px_auto]" key={item.id}><TextField label="中文" value={item.name_zh} onChange={(value) => setDraft({ ...draft, skill_items: draft.skill_items.map((current) => current.id === item.id ? { ...current, name_zh: value } : current) })} /><TextField label="English" value={item.name_en} onChange={(value) => setDraft({ ...draft, skill_items: draft.skill_items.map((current) => current.id === item.id ? { ...current, name_en: value } : current) })} /><TextField label="排序" type="number" value={item.sort_order || index + 1} onChange={(value) => setDraft({ ...draft, skill_items: draft.skill_items.map((current) => current.id === item.id ? { ...current, sort_order: Number(value) } : current) })} /><button className="admin-icon-button danger mb-0.5" type="button" onClick={() => destroyItem(item)}><Trash2 size={15} /></button></div>)}</div></div><FormActions busy={busy} onCancel={() => setDraft(null)} /></form>}
    </section>
  );
}

function emptyProject(): Project {
  return { id: crypto.randomUUID(), title_zh: '', title_en: '', slug: '', short_description_zh: '', short_description_en: '', content_zh: '', content_en: '', cover_image: null, cover_alt_zh: '', cover_alt_en: '', gallery_images: [], category: 'System', tags: [], role_zh: '', role_en: '', project_period: '', featured: false, published: false, sort_order: 0 };
}

export function ProjectsPanel({ items, save, remove, complete }: { items: Project[]; save: SaveFn; remove: RemoveFn; complete: CompleteFn }) {
  const [draft, setDraft] = useState<Project | null>(null);
  const [busy, setBusy] = useState(false);
  const [tags, setTags] = useState('');
  function edit(item: Project) { setDraft(JSON.parse(JSON.stringify(item)) as Project); setTags(item.tags.join(', ')); }
  function create() { const next = emptyProject(); setDraft(next); setTags(''); }
  async function submit(event: React.FormEvent) { event.preventDefault(); if (!draft) return; setBusy(true); const record = { ...draft, tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean) }; if (await save('projects', record)) { await complete(); setDraft(null); } setBusy(false); }
  async function destroy(item: Project) { if (!window.confirm('確定要刪除這筆資料嗎？\n此操作無法復原。')) return; if (await remove('projects', item.id)) { await complete('刪除成功'); if (draft?.id === item.id) setDraft(null); } }
  return (
    <section className="admin-panel">
      <div className="flex items-start justify-between gap-4"><PanelTitle title="Projects 管理" description="完整 CRUD、上架／下架、精選、排序、封面與 Markdown 詳細內容。" /><button className="admin-button primary" type="button" onClick={create}><Plus size={16} /> 新增專案</button></div>
      <div className="space-y-3">{items.map((item) => <article className="grid items-center gap-4 rounded-lg border border-slate-200 p-3 sm:grid-cols-[80px_1fr_auto]" key={item.id}>{item.cover_image ? <img className="aspect-square rounded-md object-cover" src={item.cover_image} alt="" /> : <div className="aspect-square rounded-md bg-slate-100" />}<div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="truncate font-bold">{item.title_zh || '未命名專案'}</h3>{item.featured && <span className="rounded bg-amber-50 px-2 py-1 text-[9px] font-bold text-amber-700">FEATURED</span>}<span className={`rounded px-2 py-1 text-[9px] font-bold ${item.published ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{item.published ? 'PUBLISHED' : 'DRAFT'}</span></div><p className="mt-1 text-xs text-slate-500">/{item.slug} · {item.category}</p></div><div className="flex flex-wrap gap-2"><button className="admin-icon-button" type="button" onClick={() => edit(item)}><Pencil size={15} /> 編輯</button>{item.published && <a className="admin-icon-button" href={`/zh-TW/projects/${item.slug}`} target="_blank"><Eye size={15} /> 預覽</a>}<button className="admin-icon-button danger" type="button" onClick={() => destroy(item)}><Trash2 size={15} /></button></div></article>)}</div>
      {draft && <form className="mt-8 border-t border-slate-200 pt-7" onSubmit={submit}><div className="mb-6 flex items-center justify-between"><h3 className="text-lg font-bold">專案內容</h3>{draft.slug && <a className="admin-icon-button" href={`/zh-TW/projects/${draft.slug}`} target="_blank"><Eye size={15} /> 前台預覽</a>}</div><div className="admin-grid-2"><TextField label="專案名稱（中文）" required value={draft.title_zh} onChange={(value) => setDraft({ ...draft, title_zh: value })} /><TextField label="Project title (English)" value={draft.title_en} onChange={(value) => setDraft({ ...draft, title_en: value })} /><TextField label="Slug" required value={draft.slug} placeholder="travel-erp" onChange={(value) => setDraft({ ...draft, slug: value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })} /><TextField label="Category" value={draft.category} onChange={(value) => setDraft({ ...draft, category: value })} /><TextArea label="簡短說明（中文）" value={draft.short_description_zh} onChange={(value) => setDraft({ ...draft, short_description_zh: value })} /><TextArea label="Short description (English)" value={draft.short_description_en} onChange={(value) => setDraft({ ...draft, short_description_en: value })} /><TextField label="角色（中文）" value={draft.role_zh} onChange={(value) => setDraft({ ...draft, role_zh: value })} /><TextField label="Role (English)" value={draft.role_en} onChange={(value) => setDraft({ ...draft, role_en: value })} /><TextField label="專案期間" value={draft.project_period} onChange={(value) => setDraft({ ...draft, project_period: value })} /><TextField label="Tags（逗號分隔）" value={tags} onChange={setTags} /><TextField label="排序" type="number" value={draft.sort_order} onChange={(value) => setDraft({ ...draft, sort_order: Number(value) })} /><div className="flex flex-wrap items-center gap-5"><Toggle label="上架 Published" checked={draft.published} onChange={(value) => setDraft({ ...draft, published: value })} /><Toggle label="設為精選 Featured" checked={draft.featured} onChange={(value) => setDraft({ ...draft, featured: value })} /></div></div><div className="mt-7"><h4 className="mb-3 font-bold">Cover Image</h4><ImageUploader value={draft.cover_image} folder="projects/covers" alt={draft.cover_alt_zh} onChange={(value) => setDraft({ ...draft, cover_image: value })} /></div><div className="admin-grid-2 mt-5"><TextField label="封面 Alt（中文）" value={draft.cover_alt_zh} onChange={(value) => setDraft({ ...draft, cover_alt_zh: value })} /><TextField label="Cover alt (English)" value={draft.cover_alt_en} onChange={(value) => setDraft({ ...draft, cover_alt_en: value })} /></div><div className="admin-grid-2 mt-7"><TextArea label="詳細內容（中文 Markdown）" value={draft.content_zh} rows={18} hint="支援標題、清單、連結等 Markdown 語法" onChange={(value) => setDraft({ ...draft, content_zh: value })} /><TextArea label="Detail content (English Markdown)" value={draft.content_en} rows={18} onChange={(value) => setDraft({ ...draft, content_en: value })} /></div><div className="mt-7"><h4 className="mb-4 font-bold">Gallery Images</h4><div className="grid gap-4 md:grid-cols-2">{draft.gallery_images.map((image, index) => <ImageUploader key={`${image}-${index}`} value={image} folder="projects/gallery" onChange={(value) => setDraft({ ...draft, gallery_images: value ? draft.gallery_images.map((current, currentIndex) => currentIndex === index ? value : current) : draft.gallery_images.filter((_, currentIndex) => currentIndex !== index) })} />)}<ImageUploader value={null} folder="projects/gallery" alt="新增專案圖片" onChange={(value) => value && setDraft({ ...draft, gallery_images: [...draft.gallery_images, value] })} /></div></div><FormActions busy={busy} onCancel={() => setDraft(null)} /></form>}
    </section>
  );
}
