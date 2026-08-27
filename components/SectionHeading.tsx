export function SectionHeading({ title, eyebrow, action }: { title: string; eyebrow: string; action?: React.ReactNode }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6">
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
        <h2 className="text-2xl font-bold tracking-[-.03em] sm:text-3xl">{title}</h2>
        <span className="text-[10px] font-bold tracking-[.18em] text-[#52705c]">{eyebrow}</span>
      </div>
      {action}
    </div>
  );
}
