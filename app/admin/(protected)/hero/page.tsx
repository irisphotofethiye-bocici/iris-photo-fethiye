"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Upload, ImageOff } from "lucide-react";

export default function HeroAdmin() {
  const [hero, setHero] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/hero");
    const data = await res.json();
    setHero(data.hero ?? null);
  }, []);

  useEffect(() => { load(); }, [load]);

  const upload = async (files: FileList | null) => {
    if (!files?.[0]) return;
    setUploading(true);
    const form = new FormData();
    form.append("file", files[0]);
    await fetch("/api/admin/hero", { method: "POST", body: form });
    await load();
    setUploading(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    upload(e.dataTransfer.files);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display font-semibold text-2xl" style={{ color: "var(--ink)" }}>Hero Photo</h1>
        <p className="font-body text-sm mt-1" style={{ color: "var(--mid)" }}>
          Recommended: 1920×1080 px or larger · max 20 MB
        </p>
      </div>

      {/* Current hero */}
      {hero ? (
        <div className="bg-white rounded-[14px] p-4 flex flex-col gap-3" style={{ boxShadow: "0 4px 20px rgba(26,42,38,0.08)" }}>
          <p className="font-body text-sm font-medium" style={{ color: "var(--mid)" }}>Current hero</p>
          <div className="relative w-full aspect-video rounded-[10px] overflow-hidden bg-[var(--light)]">
            <Image
              src={`/hero/${hero}`}
              alt="Current hero"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <p className="font-body text-xs" style={{ color: "var(--muted)" }}>{hero}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-12">
          <ImageOff size={32} style={{ color: "var(--muted)" }} />
          <p className="font-body text-sm" style={{ color: "var(--muted)" }}>No hero photo uploaded yet</p>
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed rounded-[14px] p-10 flex flex-col items-center gap-3 cursor-pointer transition-colors"
        style={{
          borderColor: dragging ? "var(--teal)" : "var(--line)",
          backgroundColor: dragging ? "var(--teal-pale)" : "transparent",
        }}
      >
        <Upload size={28} style={{ color: dragging ? "var(--teal)" : "var(--muted)" }} />
        <p className="font-body text-sm" style={{ color: "var(--mid)" }}>
          {uploading ? "Uploading…" : hero ? "Drop to replace hero photo" : "Drop hero photo here"}
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => upload(e.target.files)}
      />
    </div>
  );
}
