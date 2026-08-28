export function SectionHeading({ title, eyebrow, action }: { title: string; eyebrow: string; action?: React.ReactNode }) {
  return (
    <div className="mb-12 border-b border-[var(--line)] pb-5 lg:mb-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <h2 className="display-type text-[clamp(2.35rem,5vw,5rem)] font-semibold leading-none tracking-[-.04em]">{title}</h2>
          <span className="pb-1 text-[10px] font-semibold tracking-[.11em] text-[var(--ink-muted)]">{eyebrow}</span>
        </div>
        {action}
      </div>
    </div>
  );
}
