"use client";

import { motion } from "framer-motion";
import { MessageCircle, MapPin } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import { useLang } from "@/app/context/LangContext";

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden" style={{ backgroundColor: "var(--off-white)" }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <PlaceholderImage
          src="/hero/hero-01.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(26,42,38,0.75) 0%, rgba(26,42,38,0.3) 60%, transparent 100%)" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 w-full">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-2 mb-5"
          >
            <MapPin size={14} className="text-[var(--teal-l)]" />
            <span data-i18n="hero.location" className="text-sm font-body tracking-widest uppercase text-white/80">
              {t("hero.location")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            className="font-display text-white mb-5 leading-tight"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 600 }}
          >
            <span data-i18n="hero.heading">{t("hero.heading")}</span>{" "}
            <em className="italic" style={{ color: "var(--teal-l)" }}>
              <span data-i18n="hero.headingEm">{t("hero.headingEm")}</span>
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
            data-i18n="hero.body"
            className="font-body text-white/85 mb-8 leading-relaxed"
            style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", fontWeight: 300 }}
          >
            {t("hero.body")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="https://wa.me/905427469297"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body font-medium text-white px-7 py-3.5 transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--teal)", borderRadius: "24px" }}
            >
              <MessageCircle size={17} strokeWidth={2} />
              <span data-i18n="hero.cta.whatsapp">{t("hero.cta.whatsapp")}</span>
            </a>
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

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
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
