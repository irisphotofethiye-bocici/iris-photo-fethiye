"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Plus, Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const TYPES = [
  { value: "iris_of_week", label: "Iris of the Week" },
  { value: "oludeniz", label: "Ölüdeniz" },
  { value: "product", label: "Featured Product" },
  { value: "moment", label: "A Moment" },
] as const;

type Post = {
  id: string;
  week: string;
  type: string;
  title_en: string;
  title_tr: string;
  body_en: string;
  body_tr: string;
  image: string;
  published: boolean;
  date: string;
};

function weekId() {
  const now = new Date();
  const onejan = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${String(week).padStart(2, "0")}`;
}

const emptyForm = () => ({
  id: weekId(),
  week: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
  type: "iris_of_week" as string,
  title_en: "",
  title_tr: "",
  body_en: "",
  body_tr: "",
  image: null as File | null,
  published: false,
});

export default function WeeklyAdmin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/weekly");
    const data = await res.json();
    setPosts((data.posts ?? []).slice().reverse());
  }, []);

  useEffect(() => { load(); }, [load]);

  const set = (field: string, value: string | boolean | File | null) =>
    setForm((f) => ({ ...f, [field]: value }));

  const save = async (publish: boolean) => {
    setSaving(true);
    const fd = new FormData();
    Object.entries({ ...form, published: publish }).forEach(([k, v]) => {
      if (k === "image" && v instanceof File) fd.append("image", v);
      else if (k !== "image") fd.append(k, String(v));
    });
    await fetch("/api/admin/weekly", { method: "POST", body: fd });
    await load();
    setShowForm(false);
    setForm(emptyForm());
    setPreview(null);
    setSaving(false);
  };

  const togglePublish = async (post: Post) => {
    await fetch("/api/admin/weekly", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: post.id, published: !post.published }),
    });
    await load();
  };

  const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-semibold text-2xl" style={{ color: "var(--ink)" }}>Weekly Content</h1>
          <p className="font-body text-sm mt-1" style={{ color: "var(--mid)" }}>
            {posts.length} post{posts.length !== 1 ? "s" : ""} · only last published is shown on site
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 font-body font-medium text-white px-5 py-2.5 transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--teal)", borderRadius: "24px" }}
        >
          {showForm ? <ChevronUp size={15} /> : <Plus size={15} />}
          {showForm ? "Cancel" : "New post"}
        </button>
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-[14px] p-6 flex flex-col gap-5" style={{ boxShadow: "0 4px 20px rgba(26,42,38,0.08)" }}>
              <h2 className="font-display font-semibold text-lg" style={{ color: "var(--ink)" }}>New post</h2>

              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-body text-xs font-medium" style={{ color: "var(--mid)" }}>ID</label>
                  <input
                    value={form.id}
                    onChange={(e) => set("id", e.target.value)}
                    className="px-3 py-2 text-sm font-body border rounded-lg outline-none focus:border-[var(--teal)]"
                    style={{ borderColor: "var(--line)", color: "var(--ink)" }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-body text-xs font-medium" style={{ color: "var(--mid)" }}>Week label</label>
                  <input
                    value={form.week}
                    onChange={(e) => set("week", e.target.value)}
                    className="px-3 py-2 text-sm font-body border rounded-lg outline-none focus:border-[var(--teal)]"
                    style={{ borderColor: "var(--line)", color: "var(--ink)" }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-body text-xs font-medium" style={{ color: "var(--mid)" }}>Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => set("type", e.target.value)}
                    className="px-3 py-2 text-sm font-body border rounded-lg outline-none focus:border-[var(--teal)]"
                    style={{ borderColor: "var(--line)", color: "var(--ink)" }}
                  >
                    {TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(["en", "tr"] as const).map((lang) => (
                  <div key={lang} className="flex flex-col gap-1">
                    <label className="font-body text-xs font-medium" style={{ color: "var(--mid)" }}>
                      Title ({lang.toUpperCase()})
                    </label>
                    <input
                      value={form[`title_${lang}`]}
                      onChange={(e) => set(`title_${lang}`, e.target.value)}
                      className="px-3 py-2 text-sm font-body border rounded-lg outline-none focus:border-[var(--teal)]"
                      style={{ borderColor: "var(--line)", color: "var(--ink)" }}
                    />
                  </div>
                ))}
              </div>

              {/* Body texts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(["en", "tr"] as const).map((lang) => {
                  const val = form[`body_${lang}`];
                  const wc = wordCount(val);
                  return (
                    <div key={lang} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <label className="font-body text-xs font-medium" style={{ color: "var(--mid)" }}>
                          Text ({lang.toUpperCase()})
                        </label>
                        <span
                          className="font-body text-xs"
                          style={{ color: wc > 120 ? "var(--coral)" : "var(--muted)" }}
                        >
                          {wc}/120 words
                        </span>
                      </div>
                      <textarea
                        rows={5}
                        value={val}
                        onChange={(e) => set(`body_${lang}`, e.target.value)}
                        className="px-3 py-2 text-sm font-body border rounded-lg outline-none focus:border-[var(--teal)] resize-none"
                        style={{ borderColor: "var(--line)", color: "var(--ink)" }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Image upload */}
              <div className="flex flex-col gap-2">
                <label className="font-body text-xs font-medium" style={{ color: "var(--mid)" }}>Photo</label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    set("image", f);
                    setPreview(f ? URL.createObjectURL(f) : null);
                  }}
                  className="font-body text-sm"
                  style={{ color: "var(--ink)" }}
                />
                {preview && (
                  <div className="relative w-40 h-40 rounded-[10px] overflow-hidden bg-[var(--light)]">
                    <Image src={preview} alt="preview" fill className="object-cover" sizes="160px" />
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => save(false)}
                  disabled={saving}
                  className="font-body text-sm px-5 py-2.5 rounded-full border transition-colors disabled:opacity-50"
                  style={{ borderColor: "var(--line)", color: "var(--mid)" }}
                >
                  Save draft
                </button>
                <button
                  onClick={() => save(true)}
                  disabled={saving}
                  className="font-body text-sm font-medium px-5 py-2.5 text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: "var(--teal)", borderRadius: "24px" }}
                >
                  {saving ? "Publishing…" : "Publish"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Post list */}
      <div className="flex flex-col gap-3">
        {posts.length === 0 && (
          <p className="font-body text-sm text-center py-10" style={{ color: "var(--muted)" }}>
            No posts yet
          </p>
        )}
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-[14px] p-5 flex items-center gap-4"
            style={{ boxShadow: "0 4px 20px rgba(26,42,38,0.08)" }}
          >
            {post.image && (
              <div className="relative w-16 h-16 rounded-[8px] overflow-hidden flex-shrink-0 bg-[var(--light)]">
                <Image src={post.image} alt={post.title_en} fill className="object-cover" sizes="64px" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-body font-medium text-sm truncate" style={{ color: "var(--ink)" }}>{post.title_en}</p>
              <p className="font-body text-xs mt-0.5" style={{ color: "var(--muted)" }}>{post.week} · {post.type}</p>
            </div>
            <span
              className="px-2.5 py-1 rounded-full text-xs font-body font-medium flex-shrink-0"
              style={{
                backgroundColor: post.published ? "var(--teal-pale)" : "rgba(0,0,0,0.05)",
                color: post.published ? "var(--teal-d)" : "var(--muted)",
              }}
            >
              {post.published ? "Published" : "Draft"}
            </span>
            <button
              onClick={() => togglePublish(post)}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-[var(--light)]"
              title={post.published ? "Unpublish" : "Publish"}
            >
              {post.published
                ? <EyeOff size={16} style={{ color: "var(--muted)" }} />
                : <Eye size={16} style={{ color: "var(--teal)" }} />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
