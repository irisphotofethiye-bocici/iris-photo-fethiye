import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("admin-session");
  return Response.redirect(new URL("/admin/login", process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000"));
}
