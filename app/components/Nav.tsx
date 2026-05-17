"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Menu, X, Sun, Moon } from "lucide-react";
import Image from "next/image";
import { useLang } from "@/app/context/LangContext";
import { useTheme } from "@/app/context/ThemeContext";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { key: "nav.experience", href: "#process" },
    { key: "nav.products",   href: "#products" },
    { key: "nav.gallery",    href: "#gallery" },
    { key: "nav.findUs",     href: "#find-us" },
  ];

  return (
    <header
      className="sticky top-0 z-40 w-full transition-all duration-300 backdrop-blur-md"
      style={{
        backgroundColor: scrolled ? "var(--nav-bg-solid)" : "var(--nav-bg-blur)",
        boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 leading-tight">
          <Image
            src="/logo/logo.jpg"
            alt="Iris Photo Fethiye"
            width={68}
            height={68}
            className="rounded-full"
          />
          <div className="flex flex-col leading-tight">
            <span
              className="font-body font-bold tracking-[0.2em] uppercase"
              style={{ fontSize: "1rem", color: "var(--mid)" }}
            >
              Iris Photo
            </span>
            <span
              className="font-display italic"
              style={{ fontSize: "1.45rem", color: "var(--mid)", lineHeight: 1.1 }}
            >
              Fethiye
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-i18n={l.key}
              className="text-sm font-body transition-colors hover:text-[var(--teal)]"
              style={{ color: "var(--mid)" }}
            >
              {t(l.key)}
            </a>
          ))}
        </nav>

        {/* Right side: lang switcher + WhatsApp + hamburger */}
        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
            style={{ color: "var(--mid)", border: "1px solid var(--line)" }}
          >
            {theme === "dark" ? <Sun size={15} strokeWidth={2} /> : <Moon size={15} strokeWidth={2} />}
          </button>

          {/* EN / TR toggle */}
          <div className="flex items-center gap-1">
            {(["en", "tr"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className="text-xs font-body font-medium px-2.5 py-1 rounded-full transition-colors"
                style={{
                  backgroundColor: lang === l ? "var(--teal)" : "transparent",
                  color: lang === l ? "white" : "var(--muted)",
                  border: lang === l ? "none" : "1px solid var(--line)",
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <a
            href="https://wa.me/905427469297"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-sm font-body font-medium text-white px-5 py-2 rounded-full transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--green-wa)", borderRadius: "24px" }}
          >
            <MessageCircle size={15} strokeWidth={2} />
            WhatsApp
          </a>

          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: "var(--ink)" }}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t px-4 pb-5 pt-2 flex flex-col gap-4" style={{ backgroundColor: "var(--nav-bg-solid)", borderColor: "var(--line)" }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-i18n={l.key}
              className="text-base font-body py-1"
              style={{ color: "var(--ink)" }}
              onClick={() => setOpen(false)}
            >
              {t(l.key)}
            </a>
          ))}
          <a
            href="https://wa.me/905427469297"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm font-body font-medium text-white py-3 rounded-full mt-2"
            style={{ backgroundColor: "var(--green-wa)", borderRadius: "24px" }}
          >
            <MessageCircle size={15} strokeWidth={2} />
            WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
