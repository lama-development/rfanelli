Italian copy lives in `it.ts`, grouped by interface area. Import only the named
sections a component needs. Book titles, descriptions and synopses are keyed by
the same stable IDs used in `lib/books.ts`; assets, ISBNs, URLs and retailer names
stay with the catalog data.

Keep sentences complete. Use `formatMessage(message, { name: value })` for plain
text and attributes. Use `LocalizedText` with named React node slots for links,
emphasis and line breaks. Placeholder names are type checked. Locale messages
contain no HTML and are never rendered with `dangerouslySetInnerHTML`.

Use stable IDs for control flow, never translated labels. `config.ts` owns the
HTML language, formatting locale and time zone. This Italian-only setup has no
locale routing, provider or translation dependency.

`npm run lint` rejects literal JSX copy and text props in pages and components.
`npm test` checks formatting and the lint rule; `npm run typecheck` also checks
placeholder arguments. When another language is added, introduce a shared
message schema and explicit locale selection before enabling its routes.
