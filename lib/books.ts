const geode = { src: "/books/geode.avif", width: 560, height: 790 }
const previ = { src: "/books/il-previ-va-masa.avif", width: 500, height: 714 }
const abate = {
  src: "/books/il-richiamo-dell-abate.avif",
  width: 1584,
  height: 2480,
}

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
    title: "Geode",
    subtitle:
      "Le certezze di Manfredo si incrinano, tra nuovi incontri e memorie che riaffiorano.",
    cardDescription:
      "Un uomo razionale riscopre sentimenti e fragilità quando le sue certezze si incrinano.",
    cover: geode,
    category: "Narrativa contemporanea",
    publisher: publishers.montag.name,
    publisherUrl: publishers.montag.url,
    description: "Un romanzo di Mauro Caneparo e Rosanna Fanelli.",
    synopsis:
      "Manfredo, dopo una vita dedicata allo sviluppo di sistemi informatici, e che ha fatto della razionalità la propria corazza, viene lavorativamente coinvolto nel cosiddetto ricambio generazionale. La sua realtà s’incrina, cede, ed è in quel momento che viene aiutato da due donne: Greta, sua collaboratrice, e Michela, responsabile del personale. Entrambe sono attratte da Manfredo: sentimentale Greta, realistica Michela. Dentro ogni geode, anche il più scuro, brillano cristalli che attendono solo una crepa per mostrarsi, e in Manfredo ambizioni, delusioni e memorie riaffioreranno come crepe nella roccia. Un romanzo intenso, dove il vero enigma non è il successo, ma l’uomo che si nasconde dietro la sua stessa corazza.",
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
    title: "Il previ va masà",
    subtitle:
      "Il diario di un parroco antifascista, tra le difficoltà del Ventennio e la Liberazione.",
    cardDescription:
      "Il diario di un parroco antifascista, dal Ventennio alla Liberazione.",
    cover: previ,
    category: "Saggistica storica",
    publisher: publishers.baimaRonchetti.name,
    publisherUrl: publishers.baimaRonchetti.url,
    description:
      "Mauro Caneparo e Rosanna Fanelli raccontano il ventennio di don Giuseppe Perinotti, parroco antifascista di San Nazzaro Sesia.",
    synopsis:
      "Il testo si sviluppa seguendo il diario dell’allora parroco di San Nazzaro Sesia, don Giuseppe Perinotti, con l’inserimento dei documenti relativi al periodo fascista e successiva Liberazione. Tale documentazione, tratta dall’Archivio Storico dello stesso comune dal curatore Mauro Caneparo, è stata opportunamente valutata con la collaborazione di Rosanna Fanelli, in linea con gli eventi descritti dal Parroco. Nel corso della lettura vengono evidenziate le difficoltà quotidiane vissute e subite dal Parroco a fronte della sua ideologia antifascista. Ne è un esempio significativo la scritta dipinta su un muro dell’abbazia nel 1925, Il previ va masà e la successiva aggressione del 3 giugno 1926, che lo costrinse alla fuga causando la sua assenza per diversi mesi. Col passare degli anni le decise prese di posizione del Parroco vengono man mano smorzate, fino a giungere al suo tanto atteso sfogo liberatorio dopo il 25 luglio 1943 con la caduta del fascismo.",
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
    title: "Il richiamo dell’abate",
    subtitle:
      "Victor Isnard e le terre della Sesia, tra vicende napoleoniche e storie di un’antica abbazia.",
    cardDescription:
      "Storia e fantasia sulle rive della Sesia, tra un’abbazia e l’epoca napoleonica.",
    cover: abate,
    category: "Romanzo storico",
    publisher: publishers.baimaRonchetti.name,
    publisherUrl: publishers.baimaRonchetti.url,
    description: `Un’opera di Mauro Caneparo e Rosanna Fanelli, pubblicata nella collana Biblioteca degli scrittori piemontesi di ${publishers.baimaRonchetti.name}.`,
    synopsis:
      "A volte le storie si intrecciano legate dal filo invisibile di un tempo senza età e senza confini, per ritornare più presenti di prima. Attorno all’Abbazia dei Santi Nazario e Celso, quasi sulle rive della Sesia, tra Novara e Vercelli, muove i suoi nuovi passi Victor Isnard, benestante francese di Lione. Qui, su antiche terre di confine e immerso nello spirito napoleonico portatore di grandi novità, Victor prende a cuore le sorti dei suoi possedimenti. Le vicende storiche accadute in luoghi di particolare fascino che tuttora ci circondano, nascondono racconti che aleggiano ancora nel corso dei secoli. Gli autori hanno voluto colmare uno spazio temporale nelle vicende degli abati vissuti tra queste mura misteriose e coinvolgenti, intrecciando fatti storici realmente accaduti ad altri di fantasia. «Finalmente è giunto il nostro tempo…».",
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
export const bookAuthors = "Mauro Caneparo e Rosanna Fanelli"
