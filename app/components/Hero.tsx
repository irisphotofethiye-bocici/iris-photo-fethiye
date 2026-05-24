"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useLang } from "@/app/context/LangContext";

const IMAGES_DESKTOP = [
  "/hero/hero-01.jpeg",
  "/hero/hero-02.jpeg",
  "/hero/hero-03.jpeg",
  "/hero/hero-04.jpeg",
  "/hero/hero-05.jpeg",
];

const IMAGES_MOBILE = [
  "/hero/hero-01-mobile.jpeg",
  "/hero/hero-02-mobile.jpeg",
  "/hero/hero-03-mobile.jpeg",
  "/hero/hero-04-mobile.jpeg",
  "/hero/hero-05-mobile.jpeg",
];

const INTERVAL = 5000;
const FADE_DURATION = 0.8;

export default function Hero() {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const advance = useCallback((dir: 1 | -1) => {
    setCurrent((prev) => (prev + dir + IMAGES_DESKTOP.length) % IMAGES_DESKTOP.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => advance(1), INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, advance]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) advance(delta < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <section
      className="relative w-full min-h-[100svh] md:min-h-[90vh] flex items-center overflow-hidden"
      style={{ backgroundColor: "var(--off-white)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slider images */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: FADE_DURATION, ease: "easeInOut" }}
          >
            {/* Masaüstü: landscape görsel */}
            <Image
              src={IMAGES_DESKTOP[current]}
              alt=""
              fill
              priority={current === 0}
              className="hidden md:block object-cover object-center"
              sizes="100vw"
            />
            {/* Mobil: portrait görsel (kırpma yok) */}
            <Image
              src={IMAGES_MOBILE[current]}
              alt=""
              fill
              priority={current === 0}
              className="block md:hidden object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        {/* Bottom-left gradient only */}
        <div
          className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 60%)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 py-12 md:py-20 w-full">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="flex items-center gap-2 mb-5"
          >
            <MapPin size={14} className="text-[var(--teal-l)]" />
            <span data-i18n="hero.location" className="text-sm font-body tracking-widest uppercase text-white/80">
              {t("hero.location")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="font-display text-white mb-8 leading-tight"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 600 }}
          >
            <span data-i18n="hero.heading" style={{ color: "var(--teal-l)" }}>{t("hero.heading")}</span>{" "}
            <em className="italic" style={{ color: "white" }}>
              <span data-i18n="hero.headingEm">{t("hero.headingEm")}</span>
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            data-i18n="hero.subtext"
            className="font-body mb-8 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.75)", fontWeight: 300, fontSize: "1.05rem" }}
          >
            {t("hero.subtext")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
          >
            <a
              href="#process"
              className="inline-flex items-center gap-2 font-body font-medium px-7 py-3.5 border transition-colors hover:bg-white/10"
              style={{ color: "white", borderColor: "rgba(255,255,255,0.4)", borderRadius: "24px" }}
            >
              <span data-i18n="hero.cta.how">{t("hero.cta.how")}</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Line indicators */}
      <div className="absolute bottom-12 md:bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {IMAGES_DESKTOP.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className="transition-all duration-300"
            style={{
              width: "24px",
              height: "2px",
              backgroundColor: i === current ? "white" : "rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
      >
        <span className="text-white/50 text-xs font-body tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8"
          style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
        />
      </motion.div>
    </section>
  );
}
