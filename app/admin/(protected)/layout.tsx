import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { href: "/admin", label: "Gallery" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/hero", label: "Hero" },
  { href: "/admin/weekly", label: "Weekly" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin-session");

  if (!session || session.value !== "authenticated") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--off-white)" }}>
      {/* Admin nav */}
      <header className="w-full bg-white border-b" style={{ borderColor: "var(--line)" }}>
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-display font-semibold italic" style={{ color: "var(--teal)" }}>
              Iris Admin
            </span>
            <nav className="flex items-center gap-4">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm font-body transition-colors hover:text-[var(--teal)]"
                  style={{ color: "var(--mid)" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="text-sm font-body transition-colors hover:text-[var(--ink)]"
              style={{ color: "var(--muted)" }}
            >
              Logout
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
