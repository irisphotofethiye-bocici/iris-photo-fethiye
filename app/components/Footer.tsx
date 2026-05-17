"use client";

import { useLang } from "@/app/context/LangContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer
      className="w-full py-8"
      style={{ backgroundColor: "var(--ink)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center sm:items-start gap-0.5">
          <span className="font-display text-white font-semibold italic text-lg" style={{ color: "var(--teal-l)" }}>
            Iris Photo
          </span>
          <span className="font-body text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
            Fethiye
          </span>
        </div>

        <p data-i18n="footer.rights" className="font-body text-xs text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
          © {new Date().getFullYear()} Iris Photo Fethiye. {t("footer.rights")}
        </p>

        <a
          href="/admin"
          className="font-body text-xs transition-colors hover:text-white"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          Admin
        </a>
      </div>
    </footer>
  );
}
