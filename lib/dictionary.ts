import type { Locale } from './types';

const dictionaries = {
  'zh-TW': {
    home: '首頁', about: '關於我', projects: '專案案例', skills: '核心技能', contact: '聯絡我',
    aboutEyebrow: 'ABOUT ME', traits: '我的特質', traitsEyebrow: 'MY STRENGTHS', skillsEyebrow: 'CORE SKILLS',
    selected: '精選專案', selectedEyebrow: 'SELECTED CASES', allProjects: '查看所有專案', viewCase: 'VIEW CASE',
    casesTitle: '專案案例', casesDescription: '從需求定義到系統落地，這些案例呈現我如何整理複雜問題、建立共同語言並推動成果。',
    all: '全部', back: '返回專案列表', overview: '專案內容', category: '分類', role: '角色', period: '期間',
    email: 'EMAIL', phone: 'PHONE', location: 'LOCATION', copyright: 'All rights reserved.', menu: '開啟選單', close: '關閉選單',
  },
  en: {
    home: 'Home', about: 'About', projects: 'Cases', skills: 'Core skills', contact: 'Contact',
    aboutEyebrow: 'ABOUT ME', traits: 'My strengths', traitsEyebrow: 'MY STRENGTHS', skillsEyebrow: 'CORE SKILLS',
    selected: 'Selected cases', selectedEyebrow: 'SELECTED CASES', allProjects: 'View all projects', viewCase: 'VIEW CASE',
    casesTitle: 'Project cases', casesDescription: 'From requirement definition to delivery, these cases show how I structure complex problems, align teams, and move work forward.',
    all: 'All', back: 'Back to projects', overview: 'Project story', category: 'Category', role: 'Role', period: 'Period',
    email: 'EMAIL', phone: 'PHONE', location: 'LOCATION', copyright: 'All rights reserved.', menu: 'Open menu', close: 'Close menu',
  },
} as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
