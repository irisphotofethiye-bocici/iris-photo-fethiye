import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const DATA_FILE = join(process.cwd(), "data", "weekly-content.json");
const WEEKLY_DIR = join(process.cwd(), "public", "weekly");
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 10 * 1024 * 1024;

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

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin-session");
  return session?.value === "authenticated";
}

async function readData(): Promise<{ posts: Post[] }> {
  const raw = await readFile(DATA_FILE, "utf-8").catch(() => '{"posts":[]}');
  return JSON.parse(raw);
}

async function saveData(data: { posts: Post[] }) {
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  if (!(await checkAuth())) return new Response("Unauthorized", { status: 401 });
  const data = await readData();
  return Response.json(data);
}

export async function POST(req: NextRequest) {
  if (!(await checkAuth())) return new Response("Unauthorized", { status: 401 });

  const form = await req.formData();
  const file = form.get("image") as File | null;
  let imagePath = "";

  if (file && ALLOWED.includes(file.type) && file.size <= MAX_BYTES) {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const id = form.get("id") as string;
    const filename = `${id}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(join(WEEKLY_DIR, filename), buffer);
    imagePath = `/weekly/${filename}`;
  }

  const post: Post = {
    id: form.get("id") as string,
    week: form.get("week") as string,
    type: form.get("type") as string,
    title_en: form.get("title_en") as string,
    title_tr: form.get("title_tr") as string,
    body_en: form.get("body_en") as string,
    body_tr: form.get("body_tr") as string,
    image: imagePath,
    published: (form.get("published") as string) === "true",
    date: new Date().toISOString().slice(0, 10),
  };

  const data = await readData();
  const idx = data.posts.findIndex((p) => p.id === post.id);
  if (idx >= 0) data.posts[idx] = post;
  else data.posts.push(post);
  await saveData(data);

  return Response.json({ ok: true });
}

export async function PATCH(req: NextRequest) {
  if (!(await checkAuth())) return new Response("Unauthorized", { status: 401 });

  const { id, published } = await req.json();
  const data = await readData();
  const post = data.posts.find((p) => p.id === id);
  if (!post) return new Response("Not found", { status: 404 });

  post.published = published;
  await saveData(data);
  return Response.json({ ok: true });
}
