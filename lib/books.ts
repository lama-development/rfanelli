import { bookContent, bookAuthors as localizedBookAuthors } from "@/i18n/it"
import { formatMessage } from "@/i18n/format"
import geodeAsset from "@/public/books/geode.avif"
import previAsset from "@/public/books/il-previ-va-masa.avif"
import abateAsset from "@/public/books/il-richiamo-dell-abate.avif"

// Static imports version the URLs for immutable caching. Turbopack currently
// reports placeholder dimensions for AVIF, so keep the real dimensions here.
const geode = { src: geodeAsset.src, width: 560, height: 790 }
const previ = { src: previAsset.src, width: 500, height: 714 }
const abate = { src: abateAsset.src, width: 1584, height: 2480 }

// Official names and websites, shared by book facts and editorial copy.
export const publishers = {
  montag: {
    name: "Montag",
    url: "https://www.edizionimontag.it/",
  },
  baimaRonchetti: {
    name: "Baima Ronchetti",
    url: "https://www.baimaronchetti.it/",
  },
} as const

export type PurchaseOption = {
  store: string
  label?: string
  format: "print" | "ebook"
  url: string
}

export type Book = {
  slug: string
  title: string
  subtitle: string
  cardDescription: string
  cover: { src: string; width: number; height: number }
  category: string | null
  publisher: string | null
  publisherUrl: string | null
  description: string
  synopsis: string | null
  pages: number | null
  isbn: string | null
  purchaseUrl?: string
  purchaseOptions?: PurchaseOption[]
}

// Unknown details stay null in the data and render as "-" in the book facts.
// ISBNs use the five official groups; keep retailer URLs as placeholders for now.
export const books: Book[] = [
  {
    slug: "geode",
    ...bookContent["geode"],

    cover: geode,

    publisher: publishers.montag.name,
    publisherUrl: publishers.montag.url,

    pages: 226,
    isbn: "978-88-6892-985-5",
    purchaseOptions: [
      {
        store: "Montag",
        format: "print",
        url: "https://www.edizionimontag.it/catalogo/geode-nel-cuore-nellanima",
      },
      { store: "Amazon", format: "print", url: "https://amzn.eu/d/0egpq9Q1" },
      {
        store: "IBS",
        format: "print",
        url: "https://www.ibs.it/geode-nel-cuore-nell-anima-libro-mauro-caneparo-rosanna-fanelli/e/9788868929855",
      },
      {
        store: "Feltrinelli",
        format: "print",
        url: "https://www.lafeltrinelli.it/geode-nel-cuore-nell-anima-libro-mauro-caneparo-rosanna-fanelli/e/9788868929855",
      },
      {
        store: "Kobo",
        format: "ebook",
        url: "https://www.kobo.com/it/it/ebook/geode-nel-cuore-nell-anima",
      },
      {
        store: "Amazon (Kindle)",
        label: "Kindle",
        format: "ebook",
        url: "https://amzn.eu/d/0dlT4pGB",
      },
    ],
  },
  {
    slug: "il-previ-va-masa",
    ...bookContent["il-previ-va-masa"],

    cover: previ,

    publisher: publishers.baimaRonchetti.name,
    publisherUrl: publishers.baimaRonchetti.url,

    pages: 258,
    isbn: "978-88-31934-93-0",
    purchaseOptions: [
      {
        store: "Baima Ronchetti",
        format: "print",
        url: "https://www.baimaronchetti.it/prodotto/il-previ-va-masa/",
      },
      { store: "Amazon", format: "print", url: "https://amzn.eu/d/0cChNGwC" },
      {
        store: "IBS",
        format: "print",
        url: "https://www.ibs.it/previ-va-masa-ventennio-di-libro-mauro-caneparo-rosanna-fanelli/e/9788831934930",
      },
      {
        store: "Feltrinelli",
        format: "print",
        url: "https://www.lafeltrinelli.it/previ-va-masa-ventennio-di-libro-mauro-caneparo-rosanna-fanelli/e/9788831934930?inventoryId=235168791",
      },
    ],
  },
  {
    slug: "il-richiamo-dell-abate",
    ...bookContent["il-richiamo-dell-abate"],
    description: formatMessage(
      bookContent["il-richiamo-dell-abate"].description,
      { publisher: publishers.baimaRonchetti.name }
    ),

    cover: abate,

    publisher: publishers.baimaRonchetti.name,
    publisherUrl: publishers.baimaRonchetti.url,

    pages: 314,
    isbn: "979-12-5557-019-6",
    purchaseOptions: [
      {
        store: "Baima Ronchetti",
        format: "print",
        url: "https://www.baimaronchetti.it/prodotto/il-richiamo-dellabate/",
      },
      { store: "Amazon", format: "print", url: "https://amzn.eu/d/0edZSJNv" },
      {
        store: "IBS",
        format: "print",
        url: "https://www.ibs.it/richiamo-dell-abate-libro-mauro-caneparo-rosanna-fanelli/e/9791255570196?inventoryId=546210362",
      },
      {
        store: "Feltrinelli",
        format: "print",
        url: "https://www.lafeltrinelli.it/richiamo-dell-abate-libro-mauro-caneparo-rosanna-fanelli/e/9791255570196?inventoryId=32564153",
      },
    ],
  },
]
export const bookAuthors = localizedBookAuthors
