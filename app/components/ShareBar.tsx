"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Link, Check } from "lucide-react";
import { useLang } from "@/app/context/LangContext";

const IgIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.1" fill="currentColor" strokeWidth="2.5"/>
  </svg>
);

export default function ShareBar() {
  const [copied, setCopied] = useState(false);
  const { t } = useLang();

  const copy = async () => {
    await navigator.clipboard.writeText("https://www.irisphotofethiye.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="w-full py-10"
      style={{ backgroundColor: "var(--white)" }}
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <p data-i18n="share.label" className="font-body text-sm" style={{ color: "var(--mid)" }}>
          {t("share.label")}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://wa.me/905427469297"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-body font-medium text-white px-5 py-2.5 rounded-full transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--green-wa)", borderRadius: "24px" }}
          >
            <MessageCircle size={15} strokeWidth={2} />
            WhatsApp
          </a>

          <a
            href="https://instagram.com/irisphotofethiye"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-body font-medium text-white px-5 py-2.5 rounded-full transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", borderRadius: "24px" }}
          >
            <IgIcon />
            Instagram
          </a>

          <button
            onClick={copy}
            className="flex items-center gap-2 text-sm font-body font-medium px-5 py-2.5 rounded-full border transition-colors"
            style={{
              borderColor: "var(--line)",
              color: copied ? "var(--teal)" : "var(--mid)",
              borderRadius: "24px",
            }}
          >
            {copied ? <Check size={15} strokeWidth={2} /> : <Link size={15} strokeWidth={2} />}
            <span data-i18n={copied ? "share.copied" : "share.copy"}>
              {copied ? t("share.copied") : t("share.copy")}
            </span>
          </button>
        </div>
      </div>
    </motion.section>
  );
}
