'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  Contact, FolderKanban, Gauge, Image, LayoutList, LogOut, PanelLeftClose,
  PanelLeftOpen, Sparkles, UserRound, type LucideIcon,
} from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import Link from 'next/link';
import { seedContent } from '@/data/seed';
import { getSupabaseClient, hasSupabaseConfig } from '@/lib/supabase';
import type { EditableTable, PortfolioContent, SkillCategory, SkillItem } from '@/lib/types';
import { AboutForm, ContactForm, HeroForm, ProjectsPanel, SkillsPanel, TraitsPanel } from './AdminForms';

type Tab = 'dashboard' | 'hero' | 'about' | 'traits' | 'skills' | 'projects' | 'contact';
type Notice = { type: 'success' | 'error'; message: string } | null;

const tabs: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Gauge },
  { id: 'hero', label: 'Hero', icon: Image },
  { id: 'about', label: 'About', icon: UserRound },
  { id: 'traits', label: 'Traits', icon: Sparkles },
  { id: 'skills', label: 'Core Skills', icon: LayoutList },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'contact', label: 'Contact', icon: Contact },
];

function Login({ onReady }: { onReady: (session: Session) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const supabase = getSupabaseClient();
    if (!supabase) return;
    setBusy(true);
    setError('');
    const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    if (loginError || !data.session) {
      setError(loginError?.message || '登入失敗。');
      setBusy(false);
      return;
    }
    const { data: admin } = await supabase.from('admin_users').select('user_id').eq('user_id', data.session.user.id).maybeSingle();
    if (!admin) {
      await supabase.auth.signOut();
      setError('此帳號沒有後台管理權限。');
      setBusy(false);
      return;
    }
    onReady(data.session);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#f3f5f2] px-5">
      <form className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/5" onSubmit={submit}>
        <span className="font-serif text-4xl italic text-[#1d4b31]">YL</span>
        <h1 className="mt-5 text-2xl font-bold">內容管理後台</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">請使用已加入 admin_users 的 Supabase Auth 帳號登入。</p>
        <label className="admin-field mt-7"><span>Email</span><input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
        <label className="admin-field mt-4"><span>Password</span><input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        <button className="admin-button primary mt-6 w-full justify-center" disabled={busy} type="submit">{busy ? '登入中…' : '登入'}</button>
        <Link className="mt-5 block text-center text-xs font-semibold text-[#315c3e]" href="/zh-TW">返回公開網站</Link>
      </form>
    </main>
  );
}

export function AdminSidebar({ active, setActive, collapsed, setCollapsed, logout }: { active: Tab; setActive: (tab: Tab) => void; collapsed: boolean; setCollapsed: (value: boolean) => void; logout: () => void }) {
  return (
    <aside className={`admin-sidebar sticky top-0 flex h-screen shrink-0 flex-col bg-[#153d27] text-white transition-[width] ${collapsed ? 'w-[76px]' : 'w-[240px]'}`}>
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-5"><span className="font-serif text-3xl italic">YL</span>{!collapsed && <span className="admin-nav-label text-xs font-semibold tracking-wider">ADMIN</span>}</div>
      <nav className="flex-1 space-y-1 p-3">{tabs.map(({ id, label, icon: Icon }) => <button className={`admin-nav ${active === id ? 'active' : ''}`} key={id} type="button" onClick={() => setActive(id)}><Icon size={18} />{!collapsed && <span className="admin-nav-label">{label}</span>}</button>)}</nav>
      <div className="space-y-1 border-t border-white/10 p-3">
        <button className="admin-nav" type="button" onClick={() => setCollapsed(!collapsed)}>{collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}{!collapsed && <span className="admin-nav-label">收合選單</span>}</button>
        <button className="admin-nav" type="button" onClick={logout}><LogOut size={18} />{!collapsed && <span className="admin-nav-label">Logout</span>}</button>
      </div>
    </aside>
  );
}

export function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(hasSupabaseConfig());
  const [active, setActive] = useState<Tab>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [content, setContent] = useState<PortfolioContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);

  const notify = useCallback((type: 'success' | 'error', message: string) => {
    setNotice({ type, message });
    window.setTimeout(() => setNotice(null), 3200);
  }, []);

  const load = useCallback(async () => {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    setLoading(true);
    const [hero, about, traits, categories, items, projects, contact] = await Promise.all([
      supabase.from('hero').select('*').limit(1).maybeSingle(), supabase.from('about').select('*').limit(1).maybeSingle(),
      supabase.from('traits').select('*').order('sort_order'), supabase.from('skill_categories').select('*').order('sort_order'),
      supabase.from('skill_items').select('*').order('sort_order'), supabase.from('projects').select('*').order('sort_order'),
      supabase.from('contact').select('*').limit(1).maybeSingle(),
    ]);
    const error = [hero, about, traits, categories, items, projects, contact].find((result) => result.error)?.error;
    if (error) {
      notify('error', `載入失敗：${error.message}`);
      setLoading(false);
      return;
    }
    const skillItems = (items.data ?? []) as SkillItem[];
    const skills = ((categories.data ?? []) as Omit<SkillCategory, 'skill_items'>[]).map((category) => ({ ...category, skill_items: skillItems.filter((item) => item.category_id === category.id) }));
    setContent({
      hero: hero.data ?? seedContent.hero, about: about.data ?? seedContent.about, traits: traits.data ?? [],
      skills, projects: projects.data ?? [], contact: contact.data ?? seedContent.contact,
    } as PortfolioContent);
    setLoading(false);
  }, [notify]);

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    supabase.auth.getSession().then(async ({ data }) => {
      const current = data.session;
      if (current) {
        const { data: admin } = await supabase.from('admin_users').select('user_id').eq('user_id', current.user.id).maybeSingle();
        if (admin) { setSession(current); await load(); } else await supabase.auth.signOut();
      }
      setChecking(false);
    });
  }, [load]);

  async function save(table: EditableTable, record: Record<string, unknown>) {
    const supabase = getSupabaseClient();
    if (!supabase) return false;
    const { error } = await supabase.from(table).upsert(record);
    if (error) { notify('error', '儲存失敗，請稍後再試。'); return false; }
    return true;
  }

  async function remove(table: EditableTable, id: string) {
    const supabase = getSupabaseClient();
    if (!supabase) return false;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) { notify('error', '刪除失敗，請稍後再試。'); return false; }
    return true;
  }

  async function complete(message = '儲存成功') {
    notify('success', message);
    await load();
  }

  if (!hasSupabaseConfig()) return <main className="grid min-h-screen place-items-center bg-[#f3f5f2] p-6"><div className="max-w-lg rounded-xl border border-amber-200 bg-white p-8"><h1 className="text-2xl font-bold">尚未連接 Supabase</h1><p className="mt-4 text-sm leading-7 text-slate-600">請先依 README 設定 NEXT_PUBLIC_SUPABASE_URL 與 NEXT_PUBLIC_SUPABASE_ANON_KEY，並執行 supabase/schema.sql。後台登入與資料維護就會啟用。</p><Link className="admin-button secondary mt-6" href="/zh-TW">返回前台</Link></div></main>;
  if (checking) return <main className="grid min-h-screen place-items-center bg-[#f3f5f2] text-sm text-slate-500">驗證登入狀態…</main>;
  if (!session) return <Login onReady={(nextSession) => { setSession(nextSession); void load(); }} />;

  return (
    <main className="flex min-h-screen bg-[#f4f6f3] text-slate-900">
      <AdminSidebar active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} logout={async () => { await getSupabaseClient()?.auth.signOut(); setSession(null); }} />
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur sm:px-8"><div><p className="text-[10px] font-bold tracking-widest text-[#52705c]">PORTFOLIO CMS</p><h1 className="mt-1 text-xl font-bold">{tabs.find((tab) => tab.id === active)?.label}</h1></div><Link className="admin-button secondary" href="/zh-TW" target="_blank">查看前台</Link></header>
        <div className="p-5 sm:p-8">
          {loading && !content ? <p className="text-sm text-slate-500">載入內容中…</p> : content && (
            <>
              {active === 'dashboard' && <section><div className="grid gap-4 sm:grid-cols-3"><div className="admin-stat"><span>已上架專案</span><strong>{content.projects.filter((p) => p.published).length}</strong></div><div className="admin-stat"><span>精選專案</span><strong>{content.projects.filter((p) => p.featured && p.published).length}</strong></div><div className="admin-stat"><span>啟用技能分類</span><strong>{content.skills.filter((s) => s.is_active).length}</strong></div></div><div className="admin-panel mt-6"><h2 className="text-lg font-bold">網站狀態</h2><p className="mt-3 text-sm leading-7 text-slate-600">前台內容由 Supabase 即時讀取；儲存後重新整理公開頁面即可看到最新資料。</p></div></section>}
              {active === 'hero' && <HeroForm initial={content.hero} save={save} complete={complete} />}
              {active === 'about' && <AboutForm initial={content.about} save={save} complete={complete} />}
              {active === 'traits' && <TraitsPanel items={content.traits} save={save} remove={remove} complete={complete} />}
              {active === 'skills' && <SkillsPanel items={content.skills} save={save} remove={remove} complete={complete} />}
              {active === 'projects' && <ProjectsPanel items={content.projects} save={save} remove={remove} complete={complete} />}
              {active === 'contact' && <ContactForm initial={content.contact} save={save} complete={complete} />}
            </>
          )}
        </div>
      </div>
      {notice && <div role="status" className={`admin-toast ${notice.type}`}>{notice.message}</div>}
    </main>
  );
}
