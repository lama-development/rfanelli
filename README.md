# Rosanna Fanelli

## Local development

Install dependencies with `npm ci`, then run `npm run dev`.
Run `npm run check` for ESLint and TypeScript checks.

## Cloudflare Workers

Deployment uses OpenNext and the root `wrangler.jsonc`. The Worker name is
`rfanelli`, matching `rfanelli.davlamarca.workers.dev`.

- `npm run build:cloudflare` builds Next.js and creates `.open-next/worker.js`
  and `.open-next/assets`.
- `npm run preview` builds and serves the app locally in the Workers runtime.
- `npm run deploy` builds and deploys to the authenticated Cloudflare account.

For the existing Cloudflare dashboard Git integration, set:

- Root directory: the repository root.
- Build command: `npm run build:cloudflare`.
- Deploy command: `npx opennextjs-cloudflare deploy`.

These commands replace automatic framework configuration. Commit the config,
package scripts, and lockfile together before triggering a new deployment.
No additional R2 bucket is required for the current prerendered pages.
If on-demand revalidation or ISR is introduced, configure persistent caching.

`keep_names: false` is intentional: it prevents Wrangler from injecting a
`__name` helper into the serialized `next-themes` initializer, where the browser
cannot resolve it. See the
[OpenNext explanation](https://opennext.js.org/cloudflare/howtos/keep_names).
