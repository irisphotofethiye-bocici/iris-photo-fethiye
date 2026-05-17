"use client";

import { Clock, CloudSun } from "lucide-react";
import { useLang } from "@/app/context/LangContext";

export default function StatusBar() {
  const { t } = useLang();

  return (
    <div className="w-full bg-[var(--teal-d)] text-white text-xs font-body">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-1.5">
          <Clock size={12} strokeWidth={2} />
          <span data-i18n="status.hours">{t("status.hours")}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[var(--teal-pale)]">
          <CloudSun size={12} strokeWidth={2} />
          <span data-i18n="status.weather">{t("status.weather")}</span>
        </div>
      </div>
    </div>
  );
}
