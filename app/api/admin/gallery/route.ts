import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { writeFile, unlink, readdir } from "fs/promises";
import { join } from "path";

const GALLERY_DIR = join(process.cwd(), "public", "gallery");
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 10 * 1024 * 1024;

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin-session");
  return session?.value === "authenticated";
}

export async function GET() {
  if (!(await checkAuth())) return new Response("Unauthorized", { status: 401 });

  const files = await readdir(GALLERY_DIR).catch(() => [] as string[]);
  const images = files.filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
  return Response.json({ images });
}

export async function POST(req: NextRequest) {
  if (!(await checkAuth())) return new Response("Unauthorized", { status: 401 });

  const form = await req.formData();
  const file = form.get("file") as File | null;

  if (!file) return new Response("No file", { status: 400 });
  if (!ALLOWED.includes(file.type)) return new Response("Invalid type", { status: 400 });
  if (file.size > MAX_BYTES) return new Response("File too large", { status: 400 });

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const filename = `${Date.now()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(join(GALLERY_DIR, filename), buffer);

  return Response.json({ filename });
}

export async function DELETE(req: NextRequest) {
  if (!(await checkAuth())) return new Response("Unauthorized", { status: 401 });

  const { filename } = await req.json();
  if (!filename || filename.includes("/") || filename.includes("..")) {
    return new Response("Invalid filename", { status: 400 });
  }

  await unlink(join(GALLERY_DIR, filename)).catch(() => {});
  return Response.json({ ok: true });
}
