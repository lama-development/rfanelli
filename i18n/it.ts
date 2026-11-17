// Named exports let client components import UI copy without book synopses.
export const common = {
  close: "Chiudi",
  dismiss: "Rimuovi",
  scrollArea: "area di scorrimento",
  notAvailable: "-",
  discoverBook: "Scopri il libro",
  discoverTitle: "Scopri {title}",
  coverAlt: "Copertina di {title}",
} as const

export const author = {
  givenName: "Rosanna",
  familyName: "Fanelli",
  name: "Rosanna Fanelli",
} as const

export const navigation = {
  skipToContent: "Vai al contenuto",
  mainLabel: "Navigazione principale",
  books: "I libri",
  allBooks: "Tutti i libri",
  about: "L’autrice",
  socialsLabel: "Social e contatti",
  socials: { linkedin: "LinkedIn", instagram: "Instagram", email: "Email" },
  copyright: "© {year} {author}",
} as const

export const theme = {
  change: "Cambia tema: {theme}",
  options: { light: "Chiaro", dark: "Scuro", system: "Sistema" },
} as const

export const isbn = {
  copy: "Copia ISBN",
  copied: "ISBN copiato",
  error: "Copia non riuscita. Riprova",
} as const

export const purchase = {
  title: "Acquista {title}",
  description: "Scegli il formato e il rivenditore.",
  action: "Acquista",
  externalAction: "Acquista il libro",
  formats: { print: "Cartaceo", ebook: "Ebook" },
} as const

export const siteMetadata = {
  title: "Rosanna Fanelli — I libri",
  titleTemplate: "%s | Rosanna Fanelli",
  description:
    "I libri di Rosanna Fanelli, scritti insieme a Mauro Caneparo. Scopri Geode, Il previ va masà e Il richiamo dell’abate.",
} as const

export const notFoundPage = {
  title: "Pagina non trovata",
  description:
    "La pagina che cerchi non esiste o è stata spostata.",
  home: "Torna alla home",
} as const

export const home = {
  lead: "Tra storia, memoria{break} e immaginazione.",
  introduction:
    "Le opere di Rosanna Fanelli, scritte insieme a Mauro Caneparo.",
  biography: {
    introduction:
      "Rosanna Fanelli è nata a Bari e risiede a Novara. È insegnante alla scuola primaria da vent’anni.",
    beginnings:
      "Nel 2017 inizia la collaborazione con Mauro Caneparo con lavoro di editing per il romanzo {tanit} e la biografia {orlando}. A questi uniscono una serie di racconti presentati e premiati in diversi concorsi.",
    books:
      "Nel 2022 pubblica, sempre in collaborazione con Caneparo, il libro {previ}, edito da {publisher}. Con Caneparo firma anche {abate} e il romanzo {geode}.",
  },
  referencedBooks: {
    tanit: "Il segno di Tanit",
    orlando: "Ricordi di Orlando",
  },
} as const

export const catalog = {
  description: "Le opere di Rosanna Fanelli e Mauro Caneparo.",
  metadataDescription:
    "Le opere di Rosanna Fanelli e Mauro Caneparo: Geode, Il previ va masà e Il richiamo dell’abate.",
} as const

export const bookPage = {
  facts: {
    authors: "Autori",
    publisher: "Editore",
    category: "Genere",
    pages: "Pagine",
    isbn: "ISBN",
  },
  synopsis: "Dentro il libro",
  readAlso: "Leggi anche",
} as const

// Editorial copy shares stable book IDs with the catalog data.
export const bookAuthors = "Mauro Caneparo e Rosanna Fanelli"

export const bookContent = {
  geode: {
    title: "Geode",
    subtitle:
      "Le certezze di Manfredo si incrinano, tra nuovi incontri e memorie che riaffiorano.",
    cardDescription:
      "Un uomo razionale riscopre sentimenti e fragilità quando le sue certezze si incrinano.",
    category: "Narrativa contemporanea",
    description: "Un romanzo di Mauro Caneparo e Rosanna Fanelli.",
    synopsis:
      "Manfredo, dopo una vita dedicata allo sviluppo di sistemi informatici, e che ha fatto della razionalità la propria corazza, viene lavorativamente coinvolto nel cosiddetto ricambio generazionale. La sua realtà s’incrina, cede, ed è in quel momento che viene aiutato da due donne: Greta, sua collaboratrice, e Michela, responsabile del personale. Entrambe sono attratte da Manfredo: sentimentale Greta, realistica Michela. Dentro ogni geode, anche il più scuro, brillano cristalli che attendono solo una crepa per mostrarsi, e in Manfredo ambizioni, delusioni e memorie riaffioreranno come crepe nella roccia. Un romanzo intenso, dove il vero enigma non è il successo, ma l’uomo che si nasconde dietro la sua stessa corazza.",
  },
  "il-previ-va-masa": {
    title: "Il previ va masà",
    subtitle:
      "Il diario di un parroco antifascista, tra le difficoltà del Ventennio e la Liberazione.",
    cardDescription:
      "Il diario di un parroco antifascista, dal Ventennio alla Liberazione.",
    category: "Saggistica storica",
    description:
      "Mauro Caneparo e Rosanna Fanelli raccontano il ventennio di don Giuseppe Perinotti, parroco antifascista di San Nazzaro Sesia.",
    synopsis:
      "Il testo si sviluppa seguendo il diario dell’allora parroco di San Nazzaro Sesia, don Giuseppe Perinotti, con l’inserimento dei documenti relativi al periodo fascista e successiva Liberazione. Tale documentazione, tratta dall’Archivio Storico dello stesso comune dal curatore Mauro Caneparo, è stata opportunamente valutata con la collaborazione di Rosanna Fanelli, in linea con gli eventi descritti dal Parroco. Nel corso della lettura vengono evidenziate le difficoltà quotidiane vissute e subite dal Parroco a fronte della sua ideologia antifascista. Ne è un esempio significativo la scritta dipinta su un muro dell’abbazia nel 1925, Il previ va masà e la successiva aggressione del 3 giugno 1926, che lo costrinse alla fuga causando la sua assenza per diversi mesi. Col passare degli anni le decise prese di posizione del Parroco vengono man mano smorzate, fino a giungere al suo tanto atteso sfogo liberatorio dopo il 25 luglio 1943 con la caduta del fascismo.",
  },
  "il-richiamo-dell-abate": {
    title: "Il richiamo dell’abate",
    subtitle:
      "Victor Isnard e le terre della Sesia, tra vicende napoleoniche e storie di un’antica abbazia.",
    cardDescription:
      "Storia e fantasia sulle rive della Sesia, tra un’abbazia e l’epoca napoleonica.",
    category: "Romanzo storico",
    description:
      "Un’opera di Mauro Caneparo e Rosanna Fanelli, pubblicata nella collana Biblioteca degli scrittori piemontesi di {publisher}.",
    synopsis:
      "A volte le storie si intrecciano legate dal filo invisibile di un tempo senza età e senza confini, per ritornare più presenti di prima. Attorno all’Abbazia dei Santi Nazario e Celso, quasi sulle rive della Sesia, tra Novara e Vercelli, muove i suoi nuovi passi Victor Isnard, benestante francese di Lione. Qui, su antiche terre di confine e immerso nello spirito napoleonico portatore di grandi novità, Victor prende a cuore le sorti dei suoi possedimenti. Le vicende storiche accadute in luoghi di particolare fascino che tuttora ci circondano, nascondono racconti che aleggiano ancora nel corso dei secoli. Gli autori hanno voluto colmare uno spazio temporale nelle vicende degli abati vissuti tra queste mura misteriose e coinvolgenti, intrecciando fatti storici realmente accaduti ad altri di fantasia. «Finalmente è giunto il nostro tempo…».",
  },
} as const
