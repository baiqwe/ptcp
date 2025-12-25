export const LOCALES = ["en", "es", "de", "ja"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export interface FAQ {
  question: string;
  answer: string;
}

export interface NicheData {
  title: string;
  description: string;
  keywords: string[];
  faqs: FAQ[];
  relatedTerms: string[];
}

export const DICTIONARY = {
  en: {
    title: "Photo to Coloring Page Converter",
    subtitle: "Turn your photos into beautiful coloring pages in seconds.",
    uploadBtn: "Upload Photo",
    uploadSubtitle: "Drag & drop or click to upload",
    processing: "Generating...",
    before: "Original Photo",
    after: "Coloring Page",
    download: "Download Printable",
    features: {
      instant: "Instant Conversion",
      quality: "High Quality Lines",
      secure: "Private & Secure"
    },
    seo: {
      titleTemplate: "{niche} Coloring Page Generator - Convert Photo to Coloring Page",
      descTemplate: "Create custom {niche} coloring pages from your photos. Free, instant, and high quality. Perfect for {useCase}.",
    },
    home: {
      howTo: {
        title: "How to Turn Photo to Coloring Page?",
        steps: [
          { title: "Upload", desc: "Select your favorite photo from your device. Clear, high-contrast images work best." },
          { title: "Convert", desc: "Our AI automatically detects edges and converts your photo into a clean outline." },
          { title: "Download", desc: "Get your high-resolution printable PDF or Image and start coloring!" }
        ]
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { q: "Is it free?", a: "Yes, our standard conversion tool is 100% free to use." },
          { q: "What image formats are supported?", a: "We support JPG, PNG, and WebP images up to 10MB." },
          { q: "Do you keep my photos?", a: "No, your photos are processed in the browser or temporarily on our server and deleted immediately." }
        ]
      },
      popularCategories: "Popular Coloring Page Converters"
    }
  },
  es: {
    title: "Convertidor de Foto a Página para Colorear",
    subtitle: "Convierte tus fotos en hermosas páginas para colorear en segundos.",
    uploadBtn: "Subir Foto",
    uploadSubtitle: "Arrastra y suelta o haz clic para subir",
    processing: "Generando...",
    before: "Foto Original",
    after: "Página para Colorear",
    download: "Descargar Imprimible",
    features: {
      instant: "Conversión Instantánea",
      quality: "Líneas de Alta Calidad",
      secure: "Privado y Seguro"
    },
    seo: {
      titleTemplate: "Generador de Páginas para Colorear de {niche} - Convertir Foto",
      descTemplate: "Crea páginas para colorear de {niche} personalizadas desde tus fotos. Gratis, instantáneo y de alta calidad.",
    },
    home: {
      howTo: {
        title: "¿Cómo convertir foto a página para colorear?",
        steps: [
          { title: "Subir", desc: "Selecciona tu foto favorita. Las imágenes claras y con alto contraste funcionan mejor." },
          { title: "Convertir", desc: "Nuestra IA detecta automáticamente los bordes y convierte tu foto en un contorno limpio." },
          { title: "Descargar", desc: "¡Obtén tu PDF o imagen imprimible de alta resolución y comienza a colorear!" }
        ]
      },
      faq: {
        title: "Preguntas Frecuentes",
        items: [
          { q: "¿Es gratis?", a: "Sí, nuestra herramienta de conversión estándar es 100% gratuita." },
          { q: "¿Qué formatos de imagen son compatibles?", a: "Admitimos imágenes JPG, PNG y WebP de hasta 10MB." },
          { q: "¿Guardan mis fotos?", a: "No, tus fotos se procesan y se eliminan inmediatamente." }
        ]
      },
      popularCategories: "Convertidores Populares"
    }
  },
  de: {
    title: "Foto in Malvorlage Konverter",
    subtitle: "Verwandeln Sie Ihre Fotos in Sekundenschnelle in schöne Malvorlagen.",
    uploadBtn: "Foto Hochladen",
    uploadSubtitle: "Ziehen und ablegen oder klicken zum Hochladen",
    processing: "Generieren...",
    before: "Originalfoto",
    after: "Malvorlage",
    download: "Druckversion Herunterladen",
    features: {
      instant: "Sofortige Umwandlung",
      quality: "Hochwertige Linien",
      secure: "Privat & Sicher"
    },
    seo: {
      titleTemplate: "{niche} Malvorlagen Generator - Foto in Malvorlage",
      descTemplate: "Erstellen Sie benutzerdefinierte {niche} Malvorlagen aus Ihren Fotos. Kostenlos, sofort und hochwertig.",
    },
    home: {
      howTo: {
        title: "Wie wandle ich ein Foto in eine Malvorlage um?",
        steps: [
          { title: "Hochladen", desc: "Wählen Sie Ihr Lieblingsfoto aus. Klare Bilder mit hohem Kontrast funktionieren am besten." },
          { title: "Konvertieren", desc: "Unsere KI erkennt Kanten automatisch und wandelt Ihr Foto in eine saubere Umrisslinie um." },
          { title: "Herunterladen", desc: "Holen Sie sich Ihr hochauflösendes druckbares PDF oder Bild und fangen Sie an zu malen!" }
        ]
      },
      faq: {
        title: "Häufig gestellte Fragen",
        items: [
          { q: "Ist es kostenlos?", a: "Ja, unser Standard-Konvertierungstool ist zu 100% kostenlos." },
          { q: "Welche Bildformate werden unterstützt?", a: "Wir unterstützen JPG, PNG und WebP Bilder bis zu 10MB." },
          { q: "Behalten Sie meine Fotos?", a: "Nein, Ihre Fotos werden verarbeitet und sofort gelöscht." }
        ]
      },
      popularCategories: "Beliebte Konverter"
    }
  },
  ja: {
    title: "写真・ぬりえ変換ツール",
    subtitle: "写真を数秒で美しいぬりえに変換します。",
    uploadBtn: "写真をアップロード",
    uploadSubtitle: "ドラッグ＆ドロップまたはクリックしてアップロード",
    processing: "生成中...",
    before: "元の写真",
    after: "ぬりえ",
    download: "印刷用をダウンロード",
    features: {
      instant: "瞬時に変換",
      quality: "高品質なライン",
      secure: "プライバシー保護"
    },
    seo: {
      titleTemplate: "{niche} ぬりえ作成ツール - 写真をぬりえに変換",
      descTemplate: "あなたの写真からオリジナルの{niche}ぬりえを作成します。無料、即座、高品質。",
    },
    home: {
      howTo: {
        title: "写真をぬりえにする方法",
        steps: [
          { title: "アップロード", desc: "お気に入りの写真を選択してください。コントラストがはっきりした写真が最適です。" },
          { title: "変換", desc: "AIが自動的にエッジを検出し、きれいな線画に変換します。" },
          { title: "ダウンロード", desc: "高解像度の画像やPDFをダウンロードして、ぬりえを始めましょう！" }
        ]
      },
      faq: {
        title: "よくある質問",
        items: [
          { q: "無料ですか？", a: "はい、基本的な変換ツールは100%無料です。" },
          { q: "対応している画像形式は？", a: "JPG、PNG、WebP（最大10MB）に対応しています。" },
          { q: "写真は保存されますか？", a: "いいえ、写真は処理後に即座に削除されます。" }
        ]
      },
      popularCategories: "人気の変換ツール"
    }
  }
};

export const CATEGORIES = {
  pets: {
    title: "Pets",
    niches: ["dog", "cat", "bird", "hamster", "rabbit"] as const
  },
  people: {
    title: "People",
    niches: ["portrait", "family", "baby", "couple"] as const
  },
  nature: {
    title: "Nature",
    niches: ["landscape", "flower", "tree", "mountain"] as const
  }
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

export const NICHE_DATA: Record<string, NicheData> = {
  dog: {
    title: "Dog",
    description: "Convert your cute dog photos into printable coloring pages.",
    keywords: ["dog coloring page", "puppy coloring", "pet portrait"],
    relatedTerms: ["puppy", "canine", "golden retriever", "bulldog"],
    faqs: [
      {
        question: "Can I convert any dog photo?",
        answer: "Yes! Clear, well-lit photos work best for capturing your dog's details."
      },
      {
        question: "Is it free to use?",
        answer: "Yes, our basic tool is free to use for your personal pet photos."
      }
    ]
  },
  cat: {
    title: "Cat",
    description: "Turn your cat photos into intricate coloring designs.",
    keywords: ["cat coloring page", "kitten sketch", "feline art"],
    relatedTerms: ["kitten", "feline", "tabby", "calico"],
    faqs: [
      {
        question: "How do I print my cat coloring page?",
        answer: "After conversion, simply download the high-resolution image and print it on any standard printer."
      }
    ]
  },
  // Default fallback for others
  default: {
    title: "Custom",
    description: "Create custom coloring pages from any photo.",
    keywords: ["photo to coloring page", "diy coloring book"],
    relatedTerms: ["sketch", "outline", "drawing"],
    faqs: [
      {
        question: "What photos work best?",
        answer: "Photos with good contrast and clear subjects produce the best coloring pages."
      }
    ]
  }
};
