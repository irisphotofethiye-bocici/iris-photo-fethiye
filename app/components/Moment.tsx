"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { useLang } from "@/app/context/LangContext";

const IMAGES = [
  { src: "/about/moment-01.jpg", alt: "Family with iris fine art print, Ölüdeniz Art Street" },
  { src: "/about/moment-02.jpg", alt: "Iris fine art print souvenir, Fethiye" },
  { src: "/about/moment-03.jpg", alt: "Iris jewelry keepsake, Ölüdeniz" },
  { src: "/about/moment-04.jpg", alt: "Iris photo session moment, Fethiye" },
];

const INTERVAL = 4000;

export default function Moment() {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % IMAGES.length);
  }, []);

  useEffect(() => {
    if (IMAGES.length <= 1) return;
    timerRef.current = setInterval(advance, INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [advance]);

  const handleClick = () => {
    if (IMAGES.length <= 1) return;
    if (timerRef.current) clearInterval(timerRef.current);
    advance();
    timerRef.current = setInterval(advance, INTERVAL);
  };

  return (
    <section className="w-full py-20" style={{ backgroundColor: "var(--white)" }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Slideshow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-[4/5] rounded-[14px] overflow-hidden"
            style={{
              boxShadow: "0 4px 20px rgba(26,42,38,0.08)",
              cursor: IMAGES.length > 1 ? "pointer" : "default",
            }}
            onClick={handleClick}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={current}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <Image
                  src={IMAGES[current].src}
                  alt={IMAGES[current].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Dot indicators */}
            {IMAGES.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {IMAGES.map((_, i) => (
                  <div
                    key={i}
                    className="transition-all duration-300"
                    style={{
                      width: "20px",
                      height: "2px",
                      borderRadius: "1px",
                      backgroundColor: i === current ? "white" : "rgba(255,255,255,0.4)",
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div
              data-i18n="moment.badge"
              className="inline-block self-start px-3 py-1 rounded-full text-xs font-body font-medium tracking-wider uppercase"
              style={{ backgroundColor: "var(--teal-pale)", color: "var(--teal-d)" }}
            >
              {t("moment.badge")}
            </div>

            <h2
              className="font-display font-semibold leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "var(--ink)" }}
            >
              <span data-i18n="moment.title">{t("moment.title")}</span>{" "}
              <em className="italic" style={{ color: "var(--teal)" }}>
                <span data-i18n="moment.titleEm">{t("moment.titleEm")}</span>
              </em>
            </h2>

            <p data-i18n="moment.body1" className="font-body leading-relaxed" style={{ color: "var(--mid)", fontWeight: 300 }}>
              {t("moment.body1")}
            </p>

            <p data-i18n="moment.body2" className="font-body leading-relaxed" style={{ color: "var(--mid)", fontWeight: 300 }}>
              {t("moment.body2")}
            </p>

            <a
              href="https://wa.me/905427469297"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start inline-flex items-center gap-2 font-body font-medium text-white px-7 py-3.5 transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--teal)", borderRadius: "24px" }}
            >
              <MessageCircle size={16} strokeWidth={2} />
              <span data-i18n="moment.cta">{t("moment.cta")}</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
