# 羅翊寧 Yi-Ning Lo — Portfolio CMS

可正式部署、由 Supabase 驅動的 Product Manager × System Analyst 雙語作品集。公開前台、專案列表／詳細頁與 `/admin` 內容管理後台共用同一份資料結構。

## 專案結構

```text
app/
├─ [locale]/                 # zh-TW / en 公開前台
│  ├─ page.tsx               # 首頁
│  └─ projects/              # 專案列表與 [slug] 詳細頁
├─ admin/page.tsx            # 受 Supabase Auth 保護的後台
├─ globals.css
└─ layout.tsx
components/
├─ admin/                    # Sidebar、表單、圖片上傳、Icon Picker
├─ projects/                 # ProjectList / ProjectGallery
└─ 公開網站各區塊
data/seed.ts                 # 未連 Supabase 時的開發預覽資料
lib/                         # 資料讀取、雙語 fallback、Supabase client、型別
supabase/
├─ schema.sql                # 資料表、RLS、Storage policies
└─ seed.sql                  # 初始 CMS 內容
public/og.png                # 社群分享圖
```

前台 Component 只負責呈現；Hero、About、Traits、Core Skills、Projects、Contact 皆由 `lib/content.ts` 讀取 Supabase。若本機尚未設定環境變數，會使用 `data/seed.ts` 方便預覽，但後台會要求先連接 Supabase。

## Database Schema

主要資料表：

- `hero`：雙語標題／描述、圖片、Alt、兩組 CTA。
- `about`：雙語標題、多段內容與註記。
- `traits`：雙語特質、Icon、排序、啟用狀態。
- `skill_categories`、`skill_items`：技能分類與子技能。
- `projects`：雙語摘要／Markdown 內容、slug、封面、Gallery、分類、Tags、角色、期間、精選、上架、排序。
- `contact`：雙語聯絡區、Email、Phone、LinkedIn、GitHub、Location。
- `admin_users`：可進入後台的 Supabase Auth User ID allowlist。
- Storage bucket：`portfolio-images`，公開讀取、僅管理者可新增／修改／刪除。

所有資料表均啟用 Row Level Security。公開訪客只能讀取啟用內容與 `published = true` 的專案；寫入權限由 `admin_users` 控制。

## 環境變數

複製 `.env.example` 為 `.env.local`：

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

正式部署時，`NEXT_PUBLIC_SITE_URL` 請改成正式 HTTPS 網址，確保 Open Graph 圖片使用正確絕對網址。前端不需要也不應放置 Supabase service-role key。

## Supabase 設定

1. 在 Supabase 建立新 Project。
2. 開啟 SQL Editor，先執行 `supabase/schema.sql`，再執行 `supabase/seed.sql`。
3. 在 Authentication → Users 建立管理者帳號（Email / Password）。
4. 於 SQL Editor 將帳號加入管理者 allowlist：

```sql
insert into public.admin_users (user_id)
select id from auth.users where email = 'your-admin@example.com'
on conflict do nothing;
```

5. 從 Connect 或 Settings → API Keys 取得 Project URL 與 Publishable key，填入 `.env.local`。程式亦相容既有的 `NEXT_PUBLIC_SUPABASE_ANON_KEY`。

## 本機啟動

需求：Node.js 22.13+ 與 pnpm。

```bash
pnpm install
pnpm dev
```

網站預設在 `http://localhost:3000`。若 Windows 的 Cloudflare Workers runtime 缺少 Visual C++ Runtime，可先安裝最新版 Microsoft Visual C++ Redistributable，或在純 Next.js 本機預覽時使用：

```bash
pnpm dev:next
```

驗證指令：

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Admin 使用方式

1. 前往 `/admin`。
2. 使用已加入 `admin_users` 的 Supabase Auth 帳號登入。
3. Sidebar 可維護 Hero、About、Traits、Core Skills、Projects、Contact。
4. 圖片上傳後會儲存至 `portfolio-images` Storage bucket；表單會顯示 Preview，也可更換或刪除。
5. 專案需同時設定 `published = true` 與 `featured = true` 才會出現在首頁；首頁依 `sort_order ASC` 最多顯示 4 筆。
6. 專案詳細內容支援 Markdown，Gallery 可上傳多張圖片。

## 部署

此專案的正式建置使用 Vinext / Cloudflare Worker 相容輸出，並保留 `.openai/hosting.json` 供 Sites 部署。部署前請在平台設定三個環境變數，尤其將 `NEXT_PUBLIC_SITE_URL` 指向正式網域，再執行 `pnpm build`。

也可部署至支援 Next.js App Router 的平台；若改用 Vercel，設定相同環境變數並以標準 Next.js build 流程部署即可。Supabase Database、Auth 與 Storage 為外部服務，前後台在不同部署平台仍會保持資料同步。

## 雙語與 SEO

- Route：`/zh-TW`、`/en`、`/[locale]/projects`、`/[locale]/projects/[slug]`。
- 語言切換會保留目前頁面與 slug。
- 英文欄位空白時以繁體中文 fallback。
- 各語言首頁／專案列表有獨立 title、description、alternate language；專案詳細頁以專案內容產生 Open Graph / X metadata。
