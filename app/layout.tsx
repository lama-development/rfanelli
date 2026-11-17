import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { GeistSerifRegular } from "geist/font/serif/regular"

import "./globals.css"
import { Providers } from "@/components/providers"
import { locale } from "@/i18n/config"
import { siteMetadata } from "@/i18n/it"

// Inter with its optical-size axis: Fluid Functionalism animates a label's
// weight together with opsz, so it gets bolder without getting wider. Without
// the axis (or with a static Inter) weight changes shift the layout.
const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-sans",
})

export const viewport: Viewport = { viewportFit: "cover" }

export const metadata: Metadata = {
  title: {
    default: siteMetadata.title,
    template: siteMetadata.titleTemplate,
  },
  description: siteMetadata.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${GeistSerifRegular.variable} font-sans antialiased`}
    >
      <body>
        <Providers>
          <div className="mx-auto max-w-6xl p-[env(safe-area-inset-top)_max(var(--site-gutter),env(safe-area-inset-right))_env(safe-area-inset-bottom)_max(var(--site-gutter),env(safe-area-inset-left))] text-body [--site-gutter:48px] tablet:[--site-gutter:28px] mobile:[--site-gutter:22px] [&_:is(a,button):focus-visible]:outline-2 [&_:is(a,button):focus-visible]:outline-offset-4 [&_:is(a,button):focus-visible]:outline-fluid-accent forced-colors:[&_:is(a,button):focus-visible]:outline-[Highlight] [&_section[id]]:scroll-mt-7">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
