'use client';

import { Icon, iconNames } from '@/components/ui/Icon';

export function IconPicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="admin-field">
      <span>Icon</span>
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-[#edf2ec] text-[#28543a]"><Icon name={value} size={23} /></span>
        <select value={value} onChange={(event) => onChange(event.target.value)}>{iconNames.map((name) => <option key={name} value={name}>{name}</option>)}</select>
      </div>
    </label>
  );
}
