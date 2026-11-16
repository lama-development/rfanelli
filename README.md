# Rosanna Fanelli

Author website built with Next.js App Router, React, Tailwind CSS v4, and Fluid Functionalism components using Base UI and Motion.

## Development

```bash
npm ci
npm run dev
```

## Validation

```bash
npm run check
npm run build
npm start
```

`check` runs ESLint and TypeScript. The production build generates the homepage, book catalog, and each book detail page. Inter uses `next/font/google`, so a fresh build needs access to Google Fonts.

## Content and UI

- `lib/books.ts` contains book details, covers, publishers, and purchase links.
- `public/books/` contains the book cover images.
- `app/theme.css` defines light and dark color tokens.
- `app/globals.css` defines shared typography and responsive site styles.
- `components/ui/` contains the UI components used by the site. Their shared contexts, hooks, and motion helpers live in `lib/` and `hooks/`.

The purchase chooser uses a dialog on desktop and a swipeable drawer on mobile. The footer supports light, dark, and system themes. Social profile and email links in `components/author-socials.tsx` are still placeholders.
