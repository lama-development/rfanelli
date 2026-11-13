import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { GeistSerifRegular } from "geist/font/serif/regular"

import "./globals.css"
import { Providers } from "@/components/providers"
import { AuthorHeader, AuthorFooter } from "@/components/author-shell"

// Inter with its optical-size axis: Fluid Functionalism animates a label's
// weight together with opsz, so it gets bolder without getting wider. Without
// the axis (or with a static Inter) weight changes shift the layout.
const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-sans",
})
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const viewport: Viewport = { viewportFit: "cover" }

export const metadata: Metadata = {
  title: {
    default: "Rosanna Fanelli — I libri",
    template: "%s | Rosanna Fanelli",
  },
  description:
    "I libri di Rosanna Fanelli, scritti insieme a Mauro Caneparo. Scopri Geode, Il previ va masà e Il richiamo dell’abate.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="it"
      suppressHydrationWarning
      className={`${inter.variable} ${mono.variable} ${GeistSerifRegular.variable} font-sans antialiased`}
    >
      <body>
        <Providers>
          <div className="author-site">
            <AuthorHeader />
            {children}
            <AuthorFooter />
          </div>
        </Providers>
      </body>
    </html>
  )
}
