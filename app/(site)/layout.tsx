import { AuthorHeader, AuthorFooter } from "@/components/author-shell"

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AuthorHeader />
      {children}
      <AuthorFooter />
    </>
  )
}
