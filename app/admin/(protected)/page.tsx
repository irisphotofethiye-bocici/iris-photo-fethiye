"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Trash2, Upload, ImageOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Toast from "@/app/admin/components/Toast";

const basename = (url: string) => url.split("/").pop() ?? url;

export default function GalleryAdmin() {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/gallery");
    const data = await res.json();
    setImages(data.images ?? []);
  }, []);

  useEffect(() => { load(); }, [load]);

  const upload = async (files: FileList | null) => {
    if (!files) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const form = new FormData();
      form.append("file", file);
      await fetch("/api/admin/gallery", { method: "POST", body: form });
    }
    await load();
    setUploading(false);
  };

  const deleteImage = async (url: string) => {
    await fetch("/api/admin/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    setConfirmDelete(null);
    await load();
    setToast("Photo deleted successfully");
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    upload(e.dataTransfer.files);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-semibold text-2xl" style={{ color: "var(--ink)" }}>Gallery</h1>
          <p className="font-body text-sm mt-1" style={{ color: "var(--mid)" }}>
            {images.length} photo{images.length !== 1 ? "s" : ""} · max 10 MB · jpg / png / webp
          </p>
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 font-body font-medium text-white px-5 py-2.5 transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: "var(--teal)", borderRadius: "24px" }}
        >
          <Upload size={15} />
          {uploading ? "Uploading…" : "Upload"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => upload(e.target.files)}
        />
      </div>

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
          Drop photos here or click to browse
        </p>
      </div>

      {/* Grid */}
      {images.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16">
          <ImageOff size={36} style={{ color: "var(--muted)" }} />
          <p className="font-body text-sm" style={{ color: "var(--muted)" }}>No photos yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {images.map((url) => (
              <motion.div
                key={url}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="group relative aspect-square rounded-[14px] overflow-hidden bg-[var(--light)]"
              >
                <Image
                  src={url}
                  alt={basename(url)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <button
                  onClick={() => setConfirmDelete(url)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: "rgba(240,112,96,0.9)" }}
                  aria-label="Delete"
                >
                  <Trash2 size={14} className="text-white" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="font-body text-[10px] text-white truncate" style={{ backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 4, padding: "2px 4px" }}>
                    {basename(url)}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Toast message={toast} onClose={() => setToast(null)} />

      {/* Confirm delete dialog */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={() => setConfirmDelete(null)}
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[14px] p-6 max-w-sm w-full flex flex-col gap-4"
            >
              <h3 className="font-display font-semibold" style={{ color: "var(--ink)" }}>Delete photo?</h3>
              <p className="font-body text-sm" style={{ color: "var(--mid)" }}>
                {basename(confirmDelete)} — this cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="font-body text-sm px-4 py-2 rounded-full border transition-colors"
                  style={{ borderColor: "var(--line)", color: "var(--mid)" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteImage(confirmDelete)}
                  className="font-body text-sm px-4 py-2 rounded-full text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "var(--coral)", borderRadius: "24px" }}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
