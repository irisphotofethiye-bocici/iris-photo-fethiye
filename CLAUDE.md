# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server (Turbopack, --max-old-space-size=4096)
npm run build    # production build
npm run lint     # ESLint
```

No test suite exists. UI verification is done with Playwright (installed as devDependency) via MCP.

## Architecture

Single-page marketing site for Iris Photo Fethiye (Ölüdeniz, Turkey). All sections render in order from `app/page.tsx`: StatusBar → Nav → Hero → Features → Process → Moment → Products → Gallery → WeeklyContent → ShareBar → FindUs → Footer.

### i18n

All user-visible strings live in `app/lib/i18n.ts` as a flat `Record<string, Record<"en"|"tr", string>>`. Components access them via `const { t } = useLang()` (from `app/context/LangContext.tsx`). Language preference is persisted to `localStorage["iris-lang"]`. To add a new string, add the key to `i18n.ts` first, then reference it in the component with `data-i18n="key"` attribute + `{t("key")}`.

### Theming

Light/dark mode is controlled by `data-theme` attribute on `<html>`. CSS custom properties are defined twice in `app/globals.css`: under `:root` (light) and `html[data-theme="dark"]` (dark). Components always use `var(--token)` rather than Tailwind color classes for themeable values. ThemeContext (`app/context/ThemeContext.tsx`) persists to `localStorage["iris-theme"]`.

### Styling

Tailwind v4 with CSS-first config — the `@theme` block in `app/globals.css` defines all design tokens. There is no `tailwind.config.js`. Font classes: `font-display` = Playfair Display (headings), `font-body` = DM Sans (body text). Responsive font sizes use `clamp()` via inline `style` props, not Tailwind responsive prefixes.

### Images

Static images are served from `public/`:
- `public/hero/` — hero-01.jpeg … hero-05.jpeg (slideshow)
- `public/gallery/` — iris-01.jpeg … iris-12.jpeg
- `public/products/` — bracelet-*, keychain-*, necklace-*, print-*
- `public/about/` — moment-01.jpg, moment-02.jpg … (Moment section slideshow)

Use `next/image` with `fill` + `sizes` for all images. `PlaceholderImage` (`app/components/PlaceholderImage.tsx`) is a wrapper that renders an iris SVG fallback on load error — use it when the image file might be missing.

### Admin Panel

Routes under `app/admin/` and `app/api/admin/`. Auth uses an HttpOnly cookie `admin-session` set by `/api/admin/login`. Password checked against `process.env.ADMIN_PASSWORD` (`.env.local`, not committed).

Image upload routes (`gallery`, `hero`, `products`) use `@vercel/blob` (`put`/`del`/`list`) — requires `BLOB_READ_WRITE_TOKEN` env var on Vercel. Remote pattern `*.public.blob.vercel-storage.com` is allowed in `next.config.ts` for `next/image`.

**Critical**: The `weekly` route still uses `fs.writeFile` on the local filesystem (`data/weekly-content.json`, `public/weekly/`). This only works in local/VPS environments, not on Vercel serverless.

### WeeklyContent

`app/components/WeeklyContent.tsx` is the only server component. It reads `data/weekly-content.json` synchronously at build/request time via `readFileSync`. If the file is absent or no post is published, the section renders nothing.

## Deployment

Target: Vercel. Required env vars: `ADMIN_PASSWORD`, `BLOB_READ_WRITE_TOKEN`. Domain: `irisphotofethiye.com` (Cloudflare DNS).
