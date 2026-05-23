import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { put, del, list } from "@vercel/blob";

const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 20 * 1024 * 1024;

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin-session");
  return session?.value === "authenticated";
}

export async function GET() {
  if (!(await checkAuth())) return new Response("Unauthorized", { status: 401 });
  const { blobs } = await list({ prefix: "hero/" });
  return Response.json({ url: blobs[0]?.url ?? null });
}

export async function POST(req: NextRequest) {
  if (!(await checkAuth())) return new Response("Unauthorized", { status: 401 });

  const form = await req.formData();
  const file = form.get("file") as File | null;

  if (!file) return new Response("No file", { status: 400 });
  if (!ALLOWED.includes(file.type)) return new Response("Invalid type", { status: 400 });
  if (file.size > MAX_BYTES) return new Response("File too large", { status: 400 });

  const { blobs: existing } = await list({ prefix: "hero/" });
  if (existing.length > 0) await del(existing.map((b) => b.url));

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const blob = await put(`hero/hero-01.${ext}`, file, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  return Response.json({ url: blob.url });
}
