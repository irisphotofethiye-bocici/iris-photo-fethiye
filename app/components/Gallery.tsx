"use client";

import { motion } from "framer-motion";
import PlaceholderImage from "./PlaceholderImage";
import { useLang } from "@/app/context/LangContext";

const photos = [
  { src: "/gallery/iris-01.jpeg", alt: "Iris Photo Fethiye — iris jewelry necklace" },
  { src: "/gallery/iris-02.jpeg", alt: "Iris Photo Fethiye — portrait" },
  { src: "/gallery/iris-03.jpeg", alt: "Iris Photo Fethiye — iris jewelry bracelet" },
  { src: "/gallery/iris-04.jpeg", alt: "Iris Photo Fethiye — woman portrait" },
  { src: "/gallery/iris-05.jpeg", alt: "Iris Photo Fethiye — human iris macro" },
  { src: "/gallery/iris-06.jpeg", alt: "Iris Photo Fethiye — luxury fashion" },
  { src: "/gallery/iris-07.jpeg", alt: "Iris Photo Fethiye — ultra close-up iris" },
  { src: "/gallery/iris-08.jpeg", alt: "Iris Photo Fethiye — iris art" },
  { src: "/gallery/iris-09.jpeg", alt: "Iris Photo Fethiye — iris photography" },
  { src: "/gallery/iris-10.jpeg", alt: "Iris Photo Fethiye — fine art print" },
  { src: "/gallery/iris-11.jpeg", alt: "Iris Photo Fethiye — iris bracelet" },
  { src: "/gallery/iris-12.jpeg", alt: "Iris Photo Fethiye — iris bracelet detail" },
];

export default function Gallery() {
  const { t } = useLang();

  return (
    <section id="gallery" className="w-full py-20" style={{ backgroundColor: "var(--white)" }}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <h2
            data-i18n="gallery.title"
            className="font-display font-semibold mb-3"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "var(--ink)" }}
          >
            {t("gallery.title")}
          </h2>
          <p data-i18n="gallery.subtitle" className="font-body max-w-md mx-auto" style={{ color: "var(--mid)", fontWeight: 300 }}>
            {t("gallery.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="relative aspect-square rounded-[14px] overflow-hidden bg-[var(--light)] group"
            >
              <PlaceholderImage
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
