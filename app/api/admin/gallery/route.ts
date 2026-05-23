import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { put, del, list } from "@vercel/blob";

const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 10 * 1024 * 1024;

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin-session");
  return session?.value === "authenticated";
}

export async function GET() {
  if (!(await checkAuth())) return new Response("Unauthorized", { status: 401 });
  const { blobs } = await list({ prefix: "gallery/" });
  return Response.json({ images: blobs.map((b) => b.url) });
}

export async function POST(req: NextRequest) {
  if (!(await checkAuth())) return new Response("Unauthorized", { status: 401 });

  const form = await req.formData();
  const file = form.get("file") as File | null;

  if (!file) return new Response("No file", { status: 400 });
  if (!ALLOWED.includes(file.type)) return new Response("Invalid type", { status: 400 });
  if (file.size > MAX_BYTES) return new Response("File too large", { status: 400 });

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const blob = await put(`gallery/${Date.now()}.${ext}`, file, { access: "public" });

  return Response.json({ url: blob.url });
}

export async function DELETE(req: NextRequest) {
  if (!(await checkAuth())) return new Response("Unauthorized", { status: 401 });

  const { url } = await req.json();
  if (!url || typeof url !== "string") return new Response("Invalid url", { status: 400 });

  await del(url);
  return Response.json({ ok: true });
}
