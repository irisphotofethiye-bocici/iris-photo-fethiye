import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found — Iris Photo Fethiye",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-dm-sans, sans-serif)",
        color: "var(--ink, #1a1a1a)",
        backgroundColor: "var(--white, #fff)",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <p style={{ fontSize: "5rem", lineHeight: 1, marginBottom: "1rem" }}>404</p>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 500, marginBottom: "0.75rem" }}>
        Page not found
      </h1>
      <p style={{ color: "var(--mid, #666)", marginBottom: "2rem", maxWidth: "320px" }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          padding: "0.75rem 1.75rem",
          backgroundColor: "var(--ink, #1a1a1a)",
          color: "#fff",
          borderRadius: "999px",
          textDecoration: "none",
          fontSize: "0.95rem",
        }}
      >
        Back to home
      </Link>
    </div>
  );
}
