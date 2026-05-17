import { motion } from "framer-motion";
import Image from "next/image";
import { readFileSync } from "fs";
import { join } from "path";

type Post = {
  id: string;
  week: string;
  type: string;
  title_en: string;
  body_en: string;
  image: string;
  published: boolean;
  date: string;
};

function getLatestPost(): Post | null {
  try {
    const raw = readFileSync(join(process.cwd(), "data/weekly-content.json"), "utf-8");
    const data = JSON.parse(raw) as { posts: Post[] };
    return data.posts.filter((p) => p.published).at(-1) ?? null;
  } catch {
    return null;
  }
}

const typeLabels: Record<string, string> = {
  iris_of_week: "Iris of the Week",
  oludeniz: "Ölüdeniz",
  product: "Featured Product",
  moment: "A Moment",
};

export default function WeeklyContent() {
  const post = getLatestPost();
  if (!post) return null;

  return (
    <section className="w-full py-20" style={{ backgroundColor: "var(--light)" }}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-body font-medium tracking-wider uppercase mb-4"
            style={{ backgroundColor: "var(--teal-pale)", color: "var(--teal-d)" }}
          >
            {typeLabels[post.type] ?? post.type}
          </span>
          <h2
            className="font-display font-semibold"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "var(--ink)" }}
          >
            {post.title_en}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">
          {post.image && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
              className="relative aspect-square rounded-[14px] overflow-hidden"
              style={{ boxShadow: "0 4px 20px rgba(26,42,38,0.08)" }}
            >
              <Image
                src={post.image}
                alt={post.title_en}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <p
              className="font-body leading-relaxed"
              style={{ color: "var(--mid)", fontWeight: 300, fontSize: "1.05rem" }}
            >
              {post.body_en}
            </p>
            <p className="font-body text-xs" style={{ color: "var(--muted)" }}>
              {post.week}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
