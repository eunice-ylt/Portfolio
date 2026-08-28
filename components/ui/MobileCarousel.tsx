'use client';

import { Children, type PointerEvent, type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type MobileCarouselProps = {
  children: ReactNode;
  label: string;
  previousLabel: string;
  nextLabel: string;
  tone?: 'light' | 'dark';
  intervalMs?: number;
};

export function MobileCarousel({
  children,
  label,
  previousLabel,
  nextLabel,
  tone = 'light',
  intervalMs = 3000,
}: MobileCarouselProps) {
  const slides = Children.toArray(children);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mobileEnabled, setMobileEnabled] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const dark = tone === 'dark';

  const previous = useCallback(() => {
    setIndex((current) => (current - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => {
    setIndex((current) => (current + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setMobileEnabled(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!mobileEnabled || paused || reduceMotion || slides.length < 2) return;
    const timer = window.setInterval(next, intervalMs);
    return () => window.clearInterval(timer);
  }, [intervalMs, mobileEnabled, next, paused, slides.length]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = event.clientX;
    setPaused(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current !== null) {
      const distance = event.clientX - pointerStart.current;
      if (Math.abs(distance) >= 42) {
        if (distance > 0) previous();
        else next();
      }
    }
    pointerStart.current = null;
    setPaused(false);
  };

  if (slides.length === 0) return null;

  return (
    <div
      aria-label={label}
      aria-roledescription="carousel"
      className="relative min-w-0 max-w-full"
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      onFocusCapture={() => setPaused(true)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') previous();
        if (event.key === 'ArrowRight') next();
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
    >
      <div
        className={`w-full max-w-full overflow-hidden border ${dark ? 'border-white/20 bg-white/[.025]' : 'border-[var(--line)] bg-[var(--surface)]'}`}
        onPointerCancel={() => {
          pointerStart.current = null;
          setPaused(false);
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        style={{ touchAction: 'pan-y' }}
      >
        <div
          className="flex w-full transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, slideIndex) => (
            <div
              aria-hidden={slideIndex !== index}
              aria-label={`${slideIndex + 1} / ${slides.length}`}
              aria-roledescription="slide"
              className="w-full shrink-0"
              key={slideIndex}
              role="group"
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            aria-label={previousLabel}
            className={`absolute -left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border shadow-[0_8px_22px_rgb(20_45_30/12%)] transition active:scale-95 ${dark ? 'border-white/20 bg-[var(--sand)] text-[var(--accent-strong)]' : 'border-[var(--line)] bg-[var(--paper)] text-[var(--accent-strong)]'}`}
            onClick={previous}
            type="button"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            aria-label={nextLabel}
            className={`absolute -right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border shadow-[0_8px_22px_rgb(20_45_30/12%)] transition active:scale-95 ${dark ? 'border-white/20 bg-[var(--sand)] text-[var(--accent-strong)]' : 'border-[var(--line)] bg-[var(--paper)] text-[var(--accent-strong)]'}`}
            onClick={next}
            type="button"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      <div className="mt-5 flex items-center justify-between gap-4">
        <div aria-hidden="true" className="flex gap-2">
          {slides.map((_, dotIndex) => (
            <span
              className={`h-1 transition-[width,background-color] duration-300 ${dotIndex === index ? `w-8 ${dark ? 'bg-[var(--sand)]' : 'bg-[var(--accent)]'}` : `w-3 ${dark ? 'bg-white/20' : 'bg-[var(--line-strong)]'}`}`}
              key={dotIndex}
            />
          ))}
        </div>
        <span aria-live={paused ? 'polite' : 'off'} className={`text-[10px] font-semibold tabular-nums tracking-[.12em] ${dark ? 'text-white/65' : 'text-[var(--ink-muted)]'}`}>
          {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
