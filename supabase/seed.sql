insert into public.hero (id, eyebrow_zh, eyebrow_en, title_zh, title_en, description_zh, description_en, image_url, image_alt_zh, image_alt_en, primary_cta_label_zh, primary_cta_label_en, primary_cta_url, secondary_cta_label_zh, secondary_cta_label_en, secondary_cta_url) values
('hero-main','SYSTEM THINKER × PROBLEM SOLVER','SYSTEM THINKER × PROBLEM SOLVER',E'分析需求，\n定義規格，\n打造真正好用的系統。',E'Analyze needs.\nDefine the system.\nDeliver products that work.','具備系統規劃與專案管理經驗，擅長需求分析、流程設計、系統規格與 Wireframe 規劃，將複雜需求轉化為清晰、可執行的方案。','I translate complex business needs into clear workflows, product specifications, and executable delivery plans—helping teams build digital systems that work in the real world.','https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85','專案經理於工作桌前進行系統規劃','Project manager planning a digital system at her desk','查看專案案例','View selected cases','/projects','聯絡我','Contact me','#contact')
on conflict (id) do nothing;

insert into public.about (id, title_zh, title_en, content_zh, content_en, note_zh, note_en) values
('about-main','關於我','About me',E'我相信，好的系統來自對真實需求的深入理解。\n\n我從使用者與業務情境出發，將模糊想法整理成清晰的流程與規格，並與團隊建立共同語言，讓每個細節都能落地執行。',E'I believe useful systems begin with a deep understanding of real needs.\n\nStarting from users and business context, I turn ambiguous ideas into clear flows and specifications, then build the shared language a team needs to deliver with confidence.','理解需求 × 設計方案 × 驗證價值 × 持續優化','Understand × Design × Validate × Improve')
on conflict (id) do nothing;

insert into public.contact (id, title_zh, title_en, description_zh, description_en, email, phone, linkedin, github, location_zh, location_en) values
('contact-main','有專案想合作，或想聊聊嗎？','Have a project in mind?','歡迎來信或來電，我很樂意了解你的需求。','Send me a message—I would be glad to learn about your needs.','yining.lo@example.com','0900-000-000','','','Taipei, Taiwan','Taipei, Taiwan')
on conflict (id) do nothing;

insert into public.traits (id,title_zh,title_en,description_zh,description_en,icon,sort_order,is_active) values
('trait-1','需求整合','Requirement synthesis','整合多方觀點，釐清問題本質，提出可執行方案。','Align perspectives, clarify the real problem, and shape an actionable path.','Puzzle',1,true),
('trait-2','邏輯清晰','Structured thinking','以流程與結構拆解複雜情境，降低理解與決策成本。','Break complexity into clear flows and structures that support decisions.','Target',2,true),
('trait-3','重視細節','Detail oriented','關注邊界條件與使用情境，確保規格完整可驗證。','Capture edge cases and real contexts so requirements stay testable.','Search',3,true),
('trait-4','溝通協調','Clear communication','在客戶、使用者與開發團隊間建立共同語言。','Create a shared language across clients, users, and delivery teams.','MessagesSquare',4,true),
('trait-5','推動落地','Delivery focused','追蹤問題與決策，讓規劃確實轉化為可用成果。','Keep decisions and issues moving until the plan becomes a usable outcome.','TrendingUp',5,true)
on conflict (id) do nothing;

insert into public.skill_categories (id,number,title_zh,title_en,icon,sort_order,is_active) values
('skill-1','01','系統分析','SYSTEM ANALYSIS','FileSearch',1,true),('skill-2','02','系統設計','SYSTEM DESIGN','PanelsTopLeft',2,true),
('skill-3','03','品質驗證','QUALITY ASSURANCE','ShieldCheck',3,true),('skill-4','04','專案管理','PROJECT MANAGEMENT','UsersRound',4,true)
on conflict (id) do nothing;

insert into public.skill_items (id,category_id,name_zh,name_en,sort_order) values
('item-1','skill-1','需求分析','Requirement analysis',1),('item-2','skill-1','流程設計','Process design',2),('item-3','skill-1','功能規劃','Feature planning',3),
('item-4','skill-2','Wireframe','Wireframing',1),('item-5','skill-2','Flowchart','Flowcharting',2),('item-6','skill-2','系統規格撰寫','System specifications',3),
('item-7','skill-3','Test Case','Test cases',1),('item-8','skill-3','UAT／驗收','UAT / acceptance',2),('item-9','skill-3','系統測試與驗證','System validation',3),
('item-10','skill-4','專案管理','Project management',1),('item-11','skill-4','開發溝通','Delivery communication',2),('item-12','skill-4','問題追蹤','Issue tracking',3)
on conflict (id) do nothing;

insert into public.projects (id,title_zh,title_en,slug,short_description_zh,short_description_en,content_zh,content_en,cover_image,cover_alt_zh,cover_alt_en,category,tags,role_zh,role_en,project_period,featured,published,sort_order) values
('project-1','旅行社 ERP 系統規劃','Travel ERP System Planning','travel-erp','從訂單、交易、帳款到財務，建立跨部門一致的營運流程與系統規格。','A unified operations model spanning orders, payments, accounting, and finance.',E'## 專案概覽\n\n為跨部門旅遊產品建立一致的訂單、財務與供應商協作流程。\n\n## 規劃與解法\n\n- 訪談六個角色並整理需求優先級\n- 建立 AS-IS／TO-BE 流程\n- 完成 Wireframe、欄位規格與驗收條件',E'## Overview\n\nDesigned a shared order, finance, and supplier workflow.\n\n## Planning & solution\n\n- Interviewed six user roles\n- Mapped AS-IS and TO-BE flows\n- Delivered wireframes and acceptance criteria','https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=82','飛機機翼與天空','Airplane wing above the clouds','ERP',array['ERP','流程設計','規格書'],'系統分析師／專案經理','System Analyst / Project Manager','2023–2024',true,true,1),
('project-2','營運數據整合平台','Operations Data Platform','operations-data-platform','整合跨系統資料與權限，規劃營運儀表板及決策支援機制。','Unified cross-system data and permissions into a clearer decision-support platform.',E'## 專案概覽\n\n整合營運資料與權限。',E'## Overview\n\nUnified operational data and permissions.','https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=82','筆電上的數據分析介面','Analytics dashboard on a laptop','System',array['系統整合','權限管理','儀表板'],'產品經理','Product Manager','2024',true,true,2),
('project-3','政府單位網站改版','Public Service Website Redesign','public-service-redesign','優化資訊架構與使用體驗，建立符合內容治理與 RWD 的網站規格。','Restructured public content and defined an accessible, responsive service experience.',E'## 專案概覽\n\n優化公共服務網站。',E'## Overview\n\nImproved a public service experience.','https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=82','政府機關建築','Public institution building','Government',array['資訊架構','CMS','RWD'],'系統規劃／PM','System Planner / PM','2022–2023',true,true,3),
('project-4','寵物商業 LINE 數位服務','Pet Commerce LINE Service','pet-line-service','規劃會員、客服與推薦流程，串接日常營運所需的數位服務。','Designed membership, support, and recommendation flows for daily operations.',E'## 專案概覽\n\n規劃會員與客服流程。',E'## Overview\n\nDesigned membership and support flows.','https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=82','金色犬隻肖像','Portrait of a golden dog','Digital Service',array['LINE Bot','會員系統','AI'],'產品規劃','Product Planner','2024',true,true,4)
on conflict (id) do nothing;
