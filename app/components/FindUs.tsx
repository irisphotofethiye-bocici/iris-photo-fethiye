"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { useLang } from "@/app/context/LangContext";

const IgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.1" fill="currentColor" strokeWidth="2.5"/>
  </svg>
);

const FbIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function FindUs() {
  const { t } = useLang();

  return (
    <section
      id="find-us"
      className="w-full py-20"
      style={{ backgroundColor: "var(--ink)" }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <h2
            data-i18n="findus.title"
            className="font-display font-semibold text-white mb-3"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}
          >
            {t("findus.title")}
          </h2>
          <p data-i18n="findus.subtitle" className="font-body" style={{ color: "rgba(255,255,255,0.6)", fontWeight: 300 }}>
            {t("findus.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="flex flex-col gap-7"
          >
            <div className="flex gap-4 items-start">
              <MapPin size={18} strokeWidth={1.8} className="mt-0.5 flex-shrink-0" style={{ color: "var(--teal-l)" }} />
              <div>
                <p className="font-body text-white font-medium">Ölüdeniz Art Street, Fethiye / Muğla, Turkey</p>
                <a
                  href="https://maps.google.com/?q=Ölüdeniz+Art+Street+Fethiye"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-i18n="findus.maps"
                  className="font-body text-sm mt-1 inline-block transition-colors hover:text-white"
                  style={{ color: "var(--teal-l)" }}
                >
                  {t("findus.maps")}
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock size={18} strokeWidth={1.8} className="mt-0.5 flex-shrink-0" style={{ color: "var(--teal-l)" }} />
              <div>
                <p data-i18n="findus.hours" className="font-body text-white font-medium">{t("findus.hours")}</p>
                <p data-i18n="findus.weather" className="font-body text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {t("findus.weather")}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Phone size={18} strokeWidth={1.8} className="mt-0.5 flex-shrink-0" style={{ color: "var(--teal-l)" }} />
              <a
                href="tel:+905427469297"
                className="font-body text-white transition-colors hover:text-[var(--teal-l)]"
              >
                +90 542 746 92 97
              </a>
            </div>

            <div className="flex gap-4 items-start">
              <Mail size={18} strokeWidth={1.8} className="mt-0.5 flex-shrink-0" style={{ color: "var(--teal-l)" }} />
              <a
                href="mailto:irisphotofethiye@gmail.com"
                className="font-body text-white transition-colors hover:text-[var(--teal-l)]"
              >
                irisphotofethiye@gmail.com
              </a>
            </div>

            <div className="flex gap-4 pt-2">
              <a
                href="https://instagram.com/irisphotofethiye"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border transition-colors hover:border-[var(--teal-l)] hover:text-[var(--teal-l)]"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)" }}
                aria-label="Instagram"
              >
                <IgIcon />
              </a>
              <a
                href="https://facebook.com/irisphotofethiye"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border transition-colors hover:border-[var(--teal-l)] hover:text-[var(--teal-l)]"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)" }}
                aria-label="Facebook"
              >
                <FbIcon />
              </a>
            </div>
          </motion.div>

          {/* Map embed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="w-full h-72 lg:h-80 rounded-[14px] overflow-hidden"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
          >
            <iframe
              title="Iris Photo Fethiye location"
              src="https://maps.google.com/maps?q=Iris+Photo+Fethiye+Oludeniz+Art+Street&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
