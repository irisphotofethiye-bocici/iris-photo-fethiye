"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Reorder } from "framer-motion";
import { Upload, Trash2, ImageOff } from "lucide-react";

const PRODUCTS = [
  { id: "print", label: "Fine Art Print" },
  { id: "necklace", label: "Iris Necklace" },
  { id: "bracelet", label: "Iris Bracelet" },
  { id: "keychain", label: "Iris Keychain" },
] as const;

type ProductId = (typeof PRODUCTS)[number]["id"];

export default function ProductsAdmin() {
  const [activeTab, setActiveTab] = useState<ProductId>("print");
  const [photos, setPhotos] = useState<Record<ProductId, string[]>>({
    print: [], necklace: [], bracelet: [], keychain: [],
  });
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setPhotos(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  const currentPhotos = photos[activeTab] ?? [];

  const upload = async (files: FileList | null) => {
    if (!files) return;
    setUploading(true);
    for (let i = 0; i < files.length && i < 5; i++) {
      const existingCount = currentPhotos.length;
      if (existingCount + i >= 5) break;
      const form = new FormData();
      form.append("file", files[i]);
      form.append("product", activeTab);
      form.append("slot", String(existingCount + i + 1));
      await fetch("/api/admin/products", { method: "POST", body: form });
    }
    await load();
    setUploading(false);
  };

  const deletePhoto = async (filename: string) => {
    await fetch("/api/admin/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename }),
    });
    await load();
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display font-semibold text-2xl" style={{ color: "var(--ink)" }}>Products</h1>
        <p className="font-body text-sm mt-1" style={{ color: "var(--mid)" }}>5 photo slots per product · max 10 MB</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {PRODUCTS.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveTab(p.id)}
            className="px-4 py-2 rounded-full text-sm font-body font-medium transition-colors"
            style={{
              backgroundColor: activeTab === p.id ? "var(--teal)" : "var(--teal-pale)",
              color: activeTab === p.id ? "white" : "var(--teal-d)",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Slots */}
      <div className="bg-white rounded-[14px] p-6" style={{ boxShadow: "0 4px 20px rgba(26,42,38,0.08)" }}>
        <div className="flex items-center justify-between mb-5">
          <p className="font-body text-sm font-medium" style={{ color: "var(--ink)" }}>
            {currentPhotos.length} / 5 photos
          </p>
          {currentPhotos.length < 5 && (
            <button
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 font-body text-sm font-medium text-white px-4 py-2 transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "var(--teal)", borderRadius: "24px" }}
            >
              <Upload size={14} />
              {uploading ? "Uploading…" : "Add photo"}
            </button>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={(e) => upload(e.target.files)}
          />
        </div>

        {currentPhotos.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-12">
            <ImageOff size={32} style={{ color: "var(--muted)" }} />
            <p className="font-body text-sm" style={{ color: "var(--muted)" }}>No photos for this product</p>
          </div>
        ) : (
          <Reorder.Group
            axis="x"
            values={currentPhotos}
            onReorder={(newOrder) =>
              setPhotos((prev) => ({ ...prev, [activeTab]: newOrder }))
            }
            className="flex gap-4 flex-wrap"
          >
            {currentPhotos.map((filename) => (
              <Reorder.Item
                key={filename}
                value={filename}
                className="relative w-36 h-36 rounded-[14px] overflow-hidden bg-[var(--light)] cursor-grab active:cursor-grabbing group flex-shrink-0"
              >
                <Image
                  src={`/products/${filename}`}
                  alt={filename}
                  fill
                  className="object-cover pointer-events-none"
                  sizes="144px"
                />
                <button
                  onClick={() => deletePhoto(filename)}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: "rgba(240,112,96,0.9)" }}
                  aria-label="Delete"
                >
                  <Trash2 size={12} className="text-white" />
                </button>
                <div
                  className="absolute bottom-0 left-0 right-0 px-2 py-1 text-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
                >
                  <p className="font-body text-[9px] text-white truncate">{filename}</p>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}

        {currentPhotos.length > 0 && currentPhotos.length < 5 && (
          <p className="font-body text-xs mt-4" style={{ color: "var(--muted)" }}>
            Drag to reorder · {5 - currentPhotos.length} slot{5 - currentPhotos.length !== 1 ? "s" : ""} remaining
          </p>
        )}
      </div>
    </div>
  );
}
