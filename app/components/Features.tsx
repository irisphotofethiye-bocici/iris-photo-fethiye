"use client";

import { motion } from "framer-motion";
import { Camera, Printer, Gem } from "lucide-react";
import { useLang } from "@/app/context/LangContext";

const cardDefs = [
  { icon: Camera, titleKey: "features.c1.title", bodyKey: "features.c1.body" },
  { icon: Printer, titleKey: "features.c2.title", bodyKey: "features.c2.body" },
  { icon: Gem,    titleKey: "features.c3.title", bodyKey: "features.c3.body" },
];

export default function Features() {
  const { t } = useLang();

  return (
    <section className="w-full py-20" style={{ backgroundColor: "var(--off-white)" }}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <h2
            data-i18n="features.title"
            className="font-display font-semibold mb-3"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "var(--ink)" }}
          >
            {t("features.title")}
          </h2>
          <p data-i18n="features.subtitle" className="font-body max-w-xl mx-auto" style={{ color: "var(--mid)", fontWeight: 300 }}>
            {t("features.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cardDefs.map(({ icon: Icon, titleKey, bodyKey }, i) => (
            <motion.div
              key={titleKey}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="flex flex-col gap-4 p-7 rounded-[14px]"
              style={{ backgroundColor: "var(--surface)", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--teal-pale)" }}
              >
                <Icon size={20} strokeWidth={1.8} style={{ color: "var(--teal)" }} />
              </div>
              <h3 data-i18n={titleKey} className="font-display font-semibold text-lg" style={{ color: "var(--ink)" }}>
                {t(titleKey)}
              </h3>
              <p data-i18n={bodyKey} className="font-body text-sm leading-relaxed" style={{ color: "var(--mid)", fontWeight: 300 }}>
                {t(bodyKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
