"use client";

import { motion } from "framer-motion";
import { useLang } from "@/app/context/LangContext";

const stepDefs = [
  { num: "01", titleKey: "process.s1.title", bodyKey: "process.s1.body" },
  { num: "02", titleKey: "process.s2.title", bodyKey: "process.s2.body" },
  { num: "03", titleKey: "process.s3.title", bodyKey: "process.s3.body" },
];

export default function Process() {
  const { t } = useLang();

  return (
    <section id="process" className="w-full py-20" style={{ backgroundColor: "var(--light)" }}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <h2
            data-i18n="process.title"
            className="font-display font-semibold mb-3"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "var(--ink)" }}
          >
            {t("process.title")}
          </h2>
          <p data-i18n="process.subtitle" className="font-body max-w-md mx-auto" style={{ color: "var(--mid)", fontWeight: 300 }}>
            {t("process.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stepDefs.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="flex flex-col gap-4"
            >
              <span
                className="font-display text-5xl font-bold leading-none select-none"
                style={{ color: "var(--coral)", opacity: 0.85 }}
              >
                {step.num}
              </span>
              <h3
                data-i18n={step.titleKey}
                className="font-display font-semibold text-xl"
                style={{ color: "var(--ink)" }}
              >
                {t(step.titleKey)}
              </h3>
              <p
                data-i18n={step.bodyKey}
                className="font-body text-sm leading-relaxed"
                style={{ color: "var(--mid)", fontWeight: 300 }}
              >
                {t(step.bodyKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
