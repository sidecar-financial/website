"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { shouldPauseAnimation } from "./animationState";
import type { ProductAnimationVisual } from "./productVisuals";

type ProductAnimationProps = {
  visual: ProductAnimationVisual;
  className?: string;
};

export function ProductAnimation({
  visual,
  className,
}: ProductAnimationProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState<boolean | null>(null);
  const [tabHidden, setTabHidden] = useState<boolean | null>(null);

  const syncPausedClass = useCallback(() => {
    const animationRoot = iframeRef.current?.contentDocument?.querySelector(
      `.${visual.rootClass}`,
    );

    animationRoot?.classList.toggle(
      visual.pausedClass,
      shouldPauseAnimation(playing, inView, tabHidden),
    );
  }, [
    inView,
    playing,
    tabHidden,
    visual.pausedClass,
    visual.rootClass,
  ]);

  useEffect(() => {
    syncPausedClass();
  }, [syncPausedClass]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    });
    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => setTabHidden(document.hidden);
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return (
    <div ref={rootRef} className={`relative ${className ?? ""}`}>
      <div
        role="img"
        aria-label={visual.alt}
        className="relative overflow-hidden"
        style={{ aspectRatio: visual.width / visual.height }}
      >
        <iframe
          ref={iframeRef}
          src={visual.src}
          title={visual.alt}
          aria-hidden="true"
          loading={visual.src.includes("hero-tour") ? "eager" : "lazy"}
          onLoad={syncPausedClass}
          className="absolute inset-0 size-full border-0 motion-reduce:hidden"
        />
        <Image
          src={visual.fallback}
          alt=""
          fill
          sizes="100vw"
          unoptimized
          className="hidden object-contain motion-reduce:block"
        />
      </div>

      <button
        type="button"
        onClick={() => setPlaying((current) => !current)}
        aria-label={playing ? "Pause animation" : "Play animation"}
        aria-pressed={!playing}
        className="absolute bottom-3 right-3 flex size-11 cursor-pointer items-center justify-center rounded-full border border-line-strong bg-white text-ink shadow-[0_6px_16px_-8px_rgba(31,28,58,0.3)] transition-colors hover:border-ink motion-reduce:hidden"
      >
        {playing ? (
          <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true">
            <path d="M1 1h3v12H1zM8 1h3v12H8z" fill="currentColor" />
          </svg>
        ) : (
          <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true">
            <path d="M1 1l10 6-10 6z" fill="currentColor" />
          </svg>
        )}
      </button>
    </div>
  );
}
