import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { writeFile, readdir } from "fs/promises";
import { join } from "path";

const HERO_DIR = join(process.cwd(), "public", "hero");
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 20 * 1024 * 1024;

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin-session");
  return session?.value === "authenticated";
}

export async function GET() {
  if (!(await checkAuth())) return new Response("Unauthorized", { status: 401 });

  const files = await readdir(HERO_DIR).catch(() => [] as string[]);
  const hero = files.find((f) => /\.(jpg|jpeg|png|webp)$/i.test(f)) ?? null;
  return Response.json({ hero });
}

export async function POST(req: NextRequest) {
  if (!(await checkAuth())) return new Response("Unauthorized", { status: 401 });

  const form = await req.formData();
  const file = form.get("file") as File | null;

  if (!file) return new Response("No file", { status: 400 });
  if (!ALLOWED.includes(file.type)) return new Response("Invalid type", { status: 400 });
  if (file.size > MAX_BYTES) return new Response("File too large", { status: 400 });

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const filename = `hero-01.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(join(HERO_DIR, filename), buffer);

  return Response.json({ filename });
}
