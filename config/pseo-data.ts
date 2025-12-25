export const LOCALES = ['en', 'es', 'de', 'ja'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const DICTIONARY = {
  en: {
    title: "Photo to Coloring Page Converter",
    uploadTitle: "Convert Your Photo to Coloring Page",
    uploadSubtitle: "Turn any photo into a custom coloring page in seconds. Perfect for kids, adults, and artists.",
    dropzone: "Drag & drop an image here, or click to select",
    processing: "Generating your coloring page...",
    download: "Download Coloring Page",
    examples: "Examples"
  },
  es: {
    title: "Convertidor de Fotos a Páginas para Colorear",
    uploadTitle: "Convierte tu foto en una página para colorear",
    uploadSubtitle: "Transforma cualquier foto en una página para colorear personalizada en segundos. ideal para niños, adultos y artistas.",
    dropzone: "Arrastra y suelta una imagen aquí, o haz clic para seleccionar",
    processing: "Generando tu página para colorear...",
    download: "Descargar página para colorear",
    examples: "Ejemplos"
  },
  de: {
    title: "Foto in Malvorlage Konverter",
    uploadTitle: "Verwandeln Sie Ihr Foto in eine Malvorlage",
    uploadSubtitle: "Verwandeln Sie jedes Foto in Sekunden in eine benutzerdefinierte Malvorlage. Perfekt für Kinder, Erwachsene und Künstler.",
    dropzone: "Ziehen Sie ein Bild hierher oder klicken Sie zum Auswählen",
    processing: "Ihre Malvorlage wird erstellt...",
    download: "Malvorlage herunterladen",
    examples: "Beispiele"
  },
  ja: {
    title: "写真から塗り絵への変換",
    uploadTitle: "写真を塗り絵に変換",
    uploadSubtitle: "どんな写真でも数秒でオリジナルの塗り絵に変身させます。子供から大人まで楽しめます。",
    dropzone: "画像をここにドラッグ＆ドロップ、またはクリックして選択",
    processing: "塗り絵を生成中...",
    download: "塗り絵をダウンロード",
    examples: "例"
  }
} as const;

export const CATEGORIES = {
  pets: {
    slug: 'pets',
    niches: ['dog', 'cat', 'horse', 'rabbit', 'hamster', 'bird']
  },
  people: {
    slug: 'people',
    niches: ['portrait', 'baby', 'family', 'couple', 'selfie']
  },
  architecture: {
    slug: 'architecture',
    niches: ['house', 'building', 'landmark', 'interior']
  },
  nature: {
    slug: 'nature',
    niches: ['flower', 'tree', 'landscape', 'mountain', 'beach']
  },
  vehicles: {
    slug: 'vehicles',
    niches: ['car', 'motorcycle', 'truck', 'boat', 'airplane']
  }
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

export const NICHE_DATA = {
  dog: {
    titleTemplate: "Convert Your Dog Photo to Coloring Page",
    metaTemplate: "Turn your favorite dog photo into a printable coloring page. Free AI dog coloring page generator.",
    keywords: ["dog coloring page", "puppy outline", "dog sketch"]
  },
  cat: {
    titleTemplate: "Convert Your Cat Photo to Coloring Page",
    metaTemplate: "Create a custom coloring page from your cat photo. best tool for cat lovers.",
    keywords: ["cat coloring page", "kitten line art", "cat drawing"]
  },
  // Default fallback for others
  default: {
    titleTemplate: "Convert Your {niche} Photo to Coloring Page",
    metaTemplate: "Turn any {niche} photo into a coloring page instantly. AI powered line art generator.",
    keywords: ["{niche} coloring page", "{niche} outline"]
  }
};
