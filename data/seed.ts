import type { PortfolioContent } from '@/lib/types';

const markdown = {
  travelZh: `## 專案概覽\n\n為跨部門旅遊產品建立一致的訂單、財務與供應商協作流程，降低人工對帳與資訊落差。\n\n## 背景與問題\n\n既有流程分散於試算表與多套內部工具，業務、營運與財務對訂單狀態缺少共用定義。\n\n## 規劃與解法\n\n- 訪談六個角色並整理需求優先級\n- 建立 AS-IS／TO-BE 流程與例外情境\n- 完成 Wireframe、欄位規格與驗收條件\n- 規劃分階段上線與資料移轉\n\n## 交付成果\n\n需求規格書、流程圖、Wireframe、Test Case 與 UAT 驗收清單。`,
  travelEn: `## Overview\n\nDesigned a shared order, finance, and supplier workflow for a cross-functional travel product team.\n\n## Challenge\n\nCritical operations were fragmented across spreadsheets and internal tools, leaving teams without a shared definition of order status.\n\n## Planning & solution\n\n- Interviewed six user roles and prioritized requirements\n- Mapped AS-IS and TO-BE flows, including edge cases\n- Delivered wireframes, field specifications, and acceptance criteria\n- Planned phased rollout and data migration\n\n## Deliverables\n\nProduct requirements, process maps, wireframes, test cases, and UAT checklist.`,
};

export const seedContent: PortfolioContent = {
  hero: {
    id: 'hero-main',
    eyebrow_zh: 'SYSTEM THINKER × PROBLEM SOLVER',
    eyebrow_en: 'SYSTEM THINKER × PROBLEM SOLVER',
    title_zh: '分析需求，\n定義規格，\n打造真正好用的系統。',
    title_en: 'Analyze needs.\nDefine the system.\nDeliver products that work.',
    description_zh: '具備系統規劃與專案管理經驗，擅長需求分析、流程設計、系統規格與 Wireframe 規劃，將複雜需求轉化為清晰、可執行的方案。',
    description_en: 'I translate complex business needs into clear workflows, product specifications, and executable delivery plans, helping teams build digital systems that work in the real world.',
    image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85',
    image_alt_zh: '專案經理於工作桌前進行系統規劃',
    image_alt_en: 'Project manager planning a digital system at her desk',
    primary_cta_label_zh: '查看專案案例',
    primary_cta_label_en: 'View selected cases',
    primary_cta_url: '/projects',
    secondary_cta_label_zh: '聯絡我',
    secondary_cta_label_en: 'Contact me',
    secondary_cta_url: '#contact',
  },
  about: {
    id: 'about-main',
    title_zh: '關於我',
    title_en: 'About me',
    content_zh: '我相信，好的系統來自對真實需求的深入理解。\n\n我從使用者與業務情境出發，將模糊想法整理成清晰的流程與規格，並與團隊建立共同語言，讓每個細節都能落地執行。',
    content_en: 'I believe useful systems begin with a deep understanding of real needs.\n\nStarting from users and business context, I turn ambiguous ideas into clear flows and specifications, then build the shared language a team needs to deliver with confidence.',
    note_zh: '理解需求 × 設計方案 × 驗證價值 × 持續優化',
    note_en: 'Understand × Design × Validate × Improve',
  },
  traits: [
    { id: 'trait-1', title_zh: '需求整合', title_en: 'Requirement synthesis', description_zh: '整合多方觀點，釐清問題本質，提出可執行方案。', description_en: 'Align perspectives, clarify the real problem, and shape an actionable path.', icon: 'Puzzle', sort_order: 1, is_active: true },
    { id: 'trait-2', title_zh: '邏輯清晰', title_en: 'Structured thinking', description_zh: '以流程與結構拆解複雜情境，降低理解與決策成本。', description_en: 'Break complexity into clear flows and structures that support decisions.', icon: 'Target', sort_order: 2, is_active: true },
    { id: 'trait-3', title_zh: '重視細節', title_en: 'Detail oriented', description_zh: '關注邊界條件與使用情境，確保規格完整可驗證。', description_en: 'Capture edge cases and real contexts so requirements stay testable.', icon: 'Search', sort_order: 3, is_active: true },
    { id: 'trait-4', title_zh: '溝通協調', title_en: 'Clear communication', description_zh: '在客戶、使用者與開發團隊間建立共同語言。', description_en: 'Create a shared language across clients, users, and delivery teams.', icon: 'MessagesSquare', sort_order: 4, is_active: true },
    { id: 'trait-5', title_zh: '推動落地', title_en: 'Delivery focused', description_zh: '追蹤問題與決策，讓規劃確實轉化為可用成果。', description_en: 'Keep decisions and issues moving until the plan becomes a usable outcome.', icon: 'TrendingUp', sort_order: 5, is_active: true },
  ],
  skills: [
    { id: 'skill-1', number: '01', title_zh: '系統分析', title_en: 'SYSTEM ANALYSIS', icon: 'FileSearch', sort_order: 1, is_active: true, skill_items: [
      { id: 'item-1', category_id: 'skill-1', name_zh: '需求分析', name_en: 'Requirement analysis', sort_order: 1 },
      { id: 'item-2', category_id: 'skill-1', name_zh: '流程設計', name_en: 'Process design', sort_order: 2 },
      { id: 'item-3', category_id: 'skill-1', name_zh: '功能規劃', name_en: 'Feature planning', sort_order: 3 },
    ] },
    { id: 'skill-2', number: '02', title_zh: '系統設計', title_en: 'SYSTEM DESIGN', icon: 'PanelsTopLeft', sort_order: 2, is_active: true, skill_items: [
      { id: 'item-4', category_id: 'skill-2', name_zh: 'Wireframe', name_en: 'Wireframing', sort_order: 1 },
      { id: 'item-5', category_id: 'skill-2', name_zh: 'Flowchart', name_en: 'Flowcharting', sort_order: 2 },
      { id: 'item-6', category_id: 'skill-2', name_zh: '系統規格撰寫', name_en: 'System specifications', sort_order: 3 },
    ] },
    { id: 'skill-3', number: '03', title_zh: '品質驗證', title_en: 'QUALITY ASSURANCE', icon: 'ShieldCheck', sort_order: 3, is_active: true, skill_items: [
      { id: 'item-7', category_id: 'skill-3', name_zh: 'Test Case', name_en: 'Test cases', sort_order: 1 },
      { id: 'item-8', category_id: 'skill-3', name_zh: 'UAT／驗收', name_en: 'UAT / acceptance', sort_order: 2 },
      { id: 'item-9', category_id: 'skill-3', name_zh: '系統測試與驗證', name_en: 'System validation', sort_order: 3 },
    ] },
    { id: 'skill-4', number: '04', title_zh: '專案管理', title_en: 'PROJECT MANAGEMENT', icon: 'UsersRound', sort_order: 4, is_active: true, skill_items: [
      { id: 'item-10', category_id: 'skill-4', name_zh: '專案管理', name_en: 'Project management', sort_order: 1 },
      { id: 'item-11', category_id: 'skill-4', name_zh: '開發溝通', name_en: 'Delivery communication', sort_order: 2 },
      { id: 'item-12', category_id: 'skill-4', name_zh: '問題追蹤', name_en: 'Issue tracking', sort_order: 3 },
    ] },
  ],
  projects: [
    { id: 'project-1', title_zh: '旅行社 ERP 系統規劃', title_en: 'Travel ERP System Planning', slug: 'travel-erp', short_description_zh: '從訂單、交易、帳款到財務，建立跨部門一致的營運流程與系統規格。', short_description_en: 'A unified operations model spanning orders, payments, accounting, and finance.', content_zh: markdown.travelZh, content_en: markdown.travelEn, cover_image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=82', cover_alt_zh: '飛機機翼與天空', cover_alt_en: 'Airplane wing above the clouds', gallery_images: [], category: 'ERP', tags: ['ERP', '流程設計', '規格書'], role_zh: '系統分析師／專案經理', role_en: 'System Analyst / Project Manager', project_period: '2023-2024', featured: true, published: true, sort_order: 1 },
    { id: 'project-2', title_zh: '營運數據整合平台', title_en: 'Operations Data Platform', slug: 'operations-data-platform', short_description_zh: '整合跨系統資料與權限，規劃營運儀表板及決策支援機制。', short_description_en: 'Unified cross-system data and permissions into a clearer decision-support platform.', content_zh: markdown.travelZh, content_en: markdown.travelEn, cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=82', cover_alt_zh: '筆電上的數據分析介面', cover_alt_en: 'Analytics dashboard on a laptop', gallery_images: [], category: 'System', tags: ['系統整合', '權限管理', '儀表板'], role_zh: '產品經理', role_en: 'Product Manager', project_period: '2024', featured: true, published: true, sort_order: 2 },
    { id: 'project-3', title_zh: '政府單位網站改版', title_en: 'Public Service Website Redesign', slug: 'public-service-redesign', short_description_zh: '優化資訊架構與使用體驗，建立符合內容治理與 RWD 的網站規格。', short_description_en: 'Restructured public content and defined an accessible, responsive service experience.', content_zh: markdown.travelZh, content_en: markdown.travelEn, cover_image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=82', cover_alt_zh: '政府機關建築', cover_alt_en: 'Public institution building', gallery_images: [], category: 'Government', tags: ['資訊架構', 'CMS', 'RWD'], role_zh: '系統規劃／PM', role_en: 'System Planner / PM', project_period: '2022-2023', featured: true, published: true, sort_order: 3 },
    { id: 'project-4', title_zh: '寵物商業 LINE 數位服務', title_en: 'Pet Commerce LINE Service', slug: 'pet-line-service', short_description_zh: '規劃會員、客服與推薦流程，串接日常營運所需的數位服務。', short_description_en: 'Designed membership, support, and recommendation flows for daily operations.', content_zh: markdown.travelZh, content_en: markdown.travelEn, cover_image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=82', cover_alt_zh: '金色犬隻肖像', cover_alt_en: 'Portrait of a golden dog', gallery_images: [], category: 'Digital Service', tags: ['LINE Bot', '會員系統', 'AI'], role_zh: '產品規劃', role_en: 'Product Planner', project_period: '2024', featured: true, published: true, sort_order: 4 },
  ],
  contact: {
    id: 'contact-main',
    title_zh: '有專案想合作，或想聊聊嗎？',
    title_en: 'Have a project in mind?',
    description_zh: '歡迎來信或來電，我很樂意了解你的需求。',
    description_en: 'Send me a message. I would be glad to learn about your needs.',
    email: 'yining.lo@example.com',
    phone: '0900-000-000',
    linkedin: '',
    github: '',
    location_zh: 'Taipei, Taiwan',
    location_en: 'Taipei, Taiwan',
  },
};
