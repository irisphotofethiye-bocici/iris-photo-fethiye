import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { writeFile, unlink, readdir } from "fs/promises";
import { join } from "path";

const PRODUCTS_DIR = join(process.cwd(), "public", "products");
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 10 * 1024 * 1024;
const PRODUCT_IDS = ["print", "necklace", "bracelet", "keychain"] as const;
type ProductId = (typeof PRODUCT_IDS)[number];

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin-session");
  return session?.value === "authenticated";
}

export async function GET() {
  if (!(await checkAuth())) return new Response("Unauthorized", { status: 401 });

  const all = await readdir(PRODUCTS_DIR).catch(() => [] as string[]);
  const byProduct: Record<string, string[]> = {};

  for (const id of PRODUCT_IDS) {
    byProduct[id] = all
      .filter((f) => f.startsWith(`${id}-`) && /\.(jpg|jpeg|png|webp)$/i.test(f))
      .sort();
  }

  return Response.json(byProduct);
}

export async function POST(req: NextRequest) {
  if (!(await checkAuth())) return new Response("Unauthorized", { status: 401 });

  const form = await req.formData();
  const file = form.get("file") as File | null;
  const product = form.get("product") as string | null;
  const slot = form.get("slot") as string | null;

  if (!file || !product || !slot) return new Response("Missing fields", { status: 400 });
  if (!(PRODUCT_IDS as readonly string[]).includes(product)) return new Response("Invalid product", { status: 400 });
  if (!ALLOWED.includes(file.type)) return new Response("Invalid type", { status: 400 });
  if (file.size > MAX_BYTES) return new Response("File too large", { status: 400 });

  const slotNum = String(slot).padStart(2, "0");
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const filename = `${product}-${slotNum}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(join(PRODUCTS_DIR, filename), buffer);

  return Response.json({ filename });
}

export async function DELETE(req: NextRequest) {
  if (!(await checkAuth())) return new Response("Unauthorized", { status: 401 });

  const { filename } = await req.json();
  if (!filename || filename.includes("/") || filename.includes("..")) {
    return new Response("Invalid filename", { status: 400 });
  }

  await unlink(join(PRODUCTS_DIR, filename)).catch(() => {});
  return Response.json({ ok: true });
}
