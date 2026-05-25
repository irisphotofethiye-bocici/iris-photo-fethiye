"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import { useLang } from "@/app/context/LangContext";

const productKeys = ["print", "necklace", "bracelet", "keychain"] as const;
type ProductKey = typeof productKeys[number];

const productPhotos: Record<ProductKey, string[]> = {
  print:    ["/products/print-01.webp", "/products/print-02.webp", "/products/print-03.webp"],
  necklace: ["/products/necklace-01.webp", "/products/necklace-02.webp", "/products/necklace-03.webp", "/products/necklace-04.webp", "/products/necklace-05.webp"],
  bracelet: ["/products/bracelet-01.webp", "/products/bracelet-02.webp", "/products/bracelet-03.webp", "/products/bracelet-04.webp", "/products/bracelet-05.webp"],
  keychain: ["/products/keychain-01.webp", "/products/keychain-02.webp"],
};

type LightboxState = { key: ProductKey; photoIndex: number } | null;

function Lightbox({
  state,
  onClose,
}: {
  state: LightboxState;
  onClose: () => void;
}) {
  const { t } = useLang();
  const [idx, setIdx] = useState(state?.photoIndex ?? 0);

  useEffect(() => { setIdx(state?.photoIndex ?? 0); }, [state]);

  const photos = state ? productPhotos[state.key] : [];

  const prev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIdx((i) => (i - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const next = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIdx((i) => (i + 1) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")  setIdx((i) => (i - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [photos.length, onClose]);

  useEffect(() => {
    document.body.style.overflow = state ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [state]);

  if (!state) return null;
  const { key } = state;

  return (
    <AnimatePresence>
      {state && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.78)", backdropFilter: "blur(6px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative rounded-[14px] overflow-hidden w-full max-w-3xl max-h-[90vh] flex flex-col md:flex-row"
            style={{ backgroundColor: "var(--surface)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors"
              aria-label="Close"
            >
              <X size={16} style={{ color: "var(--ink)" }} />
            </button>

            {/* Photo */}
            <div className="relative w-full md:w-1/2 aspect-square flex-shrink-0 bg-[var(--light)]">
              <PlaceholderImage
                src={photos[idx]}
                alt={`${t(`products.${key}.title`)} photo ${idx + 1}`}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {photos.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors"
                    aria-label="Previous"
                  >
                    <ChevronLeft size={18} style={{ color: "var(--ink)" }} />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors"
                    aria-label="Next"
                  >
                    <ChevronRight size={18} style={{ color: "var(--ink)" }} />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {photos.map((_, di) => (
                      <button
                        key={di}
                        onClick={(e) => { e.stopPropagation(); setIdx(di); }}
                        className="w-1.5 h-1.5 rounded-full transition-colors"
                        style={{ backgroundColor: di === idx ? "var(--teal)" : "rgba(255,255,255,0.5)" }}
                        aria-label={`Photo ${di + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4 p-7 justify-center">
              <h3 data-i18n={`products.${key}.title`} className="font-display font-semibold text-2xl" style={{ color: "var(--ink)" }}>
                {t(`products.${key}.title`)}
              </h3>
              <span
                data-i18n={`products.${key}.subtitle`}
                className="self-start px-3 py-1 rounded-full text-xs font-body font-medium"
                style={{ backgroundColor: "var(--teal-pale)", color: "var(--teal-d)" }}
              >
                {t(`products.${key}.subtitle`)}
              </span>
              <p className="font-body text-sm leading-relaxed" style={{ color: "var(--mid)", fontWeight: 300 }}>
                {(() => { const k = `products.${key}.desc.${idx}`; const v = t(k); return v !== k ? v : t(`products.${key}.desc`); })()}
              </p>
              <a
                href="https://wa.me/905427469297"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-body font-medium text-white py-3 px-6 transition-opacity hover:opacity-90 mt-2"
                style={{ backgroundColor: "var(--teal)", borderRadius: "24px" }}
              >
                <span data-i18n="products.lightbox.cta">{t("products.lightbox.cta")}</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Products() {
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const { t } = useLang();

  return (
    <>
      <section id="products" className="w-full py-20" style={{ backgroundColor: "var(--white)" }}>
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="text-center mb-14"
          >
            <h2
              data-i18n="products.title"
              className="font-display font-semibold mb-3"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "var(--ink)" }}
            >
              {t("products.title")}
            </h2>
            <p data-i18n="products.subtitle" className="font-body max-w-md mx-auto" style={{ color: "var(--mid)", fontWeight: 300 }}>
              {t("products.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productKeys.map((key, i) => (
              <motion.button
                key={key}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setLightbox({ key, photoIndex: 0 })}
                className="group text-left flex flex-col rounded-[14px] overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-200"
                style={{ backgroundColor: "var(--surface)", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
              >
                <div className="relative w-full aspect-square bg-[var(--light)] overflow-hidden">
                  <PlaceholderImage
                    src={productPhotos[key][0]}
                    alt={`${t(`products.${key}.title`)} — Iris Photo Fethiye`}
                    fill
                    className="object-contain p-4 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-5 flex flex-col gap-1">
                  <h3 data-i18n={`products.${key}.title`} className="font-display font-semibold text-lg" style={{ color: "var(--ink)" }}>
                    {t(`products.${key}.title`)}
                  </h3>
                  <p data-i18n={`products.${key}.subtitle`} className="font-body text-xs" style={{ color: "var(--muted)" }}>
                    {t(`products.${key}.subtitle`)}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <Lightbox state={lightbox} onClose={() => setLightbox(null)} />
    </>
  );
}
