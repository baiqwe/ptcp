import Link from "next/link";
import { DICTIONARY, Locale, CATEGORIES } from "@/config/pseo-data";
import { HeroUploader } from "@/components/pseo/hero-uploader";
import { ComparisonSlider } from "@/components/pseo/comparison-slider";
import { JsonLd } from "@/components/seo/json-ld";

interface HomeProps {
  params: Promise<{ lang: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;
  const dict = DICTIONARY[lang as Locale] || DICTIONARY.en;

  return (
    <div className="container mx-auto px-4 py-12 space-y-20">
      <JsonLd
        niche="General"
        title={dict.title}
        description={dict.subtitle}
        faqs={dict.home.faq.items.map(i => ({ question: i.q, answer: i.a }))}
        imageUrl="/dog-sketch.png"
      />

      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-balance">
          {dict.title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {dict.subtitle}
        </p>

        <HeroUploader niche="photo" />
      </section>

      {/* Feature Grid */}
      <section className="grid sm:grid-cols-3 gap-8 text-center">
        <div className="space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">⚡</div>
          <h3 className="font-bold text-xl">{dict.features.instant}</h3>
          <p className="text-muted-foreground">Upload and get your coloring page in seconds.</p>
        </div>
        <div className="space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">🎨</div>
          <h3 className="font-bold text-xl">{dict.features.quality}</h3>
          <p className="text-muted-foreground">Clean, crisp outlines optimized for printing and coloring.</p>
        </div>
        <div className="space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">🔒</div>
          <h3 className="font-bold text-xl">{dict.features.secure}</h3>
          <p className="text-muted-foreground">Your photos are processed automatically and not shared.</p>
        </div>
      </section>

      {/* Demo Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-card rounded-3xl p-8 border shadow-sm">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Unleash Creativity</h2>
          <p className="text-muted-foreground text-lg">
            Turn your memories into art. Whether it's a family portrait, a pet, or a landscape, our tool creates high-quality coloring pages ready for your artistic touch.
          </p>
        </div>
        <div className="w-full flex items-center justify-center relative">
          <ComparisonSlider
            beforeImage="/dog-photo.png"
            afterImage="/dog-sketch.png"
            beforeLabel={dict.before}
            afterLabel={dict.after}
          />
        </div>
      </section>

      {/* How To Section */}
      <section className="max-w-4xl mx-auto space-y-12">
        <h2 className="text-3xl font-bold text-center">{dict.home.howTo.title}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {dict.home.howTo.steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                {i + 1}
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Internal Linking Grid */}
      <section className="max-w-5xl mx-auto bg-muted/30 rounded-3xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-center mb-12">{dict.home.popularCategories}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {Object.entries(CATEGORIES).map(([catKey, catData]) => (
            <div key={catKey} className="space-y-4">
              <h3 className="font-bold text-xl text-primary capitalize">{catData.title}</h3>
              <ul className="space-y-2">
                {catData.niches.map(niche => (
                  <li key={niche}>
                    <Link
                      href={`/${lang}/tools/${catKey}/${niche}`}
                      className="text-muted-foreground hover:text-foreground hover:underline transition-colors capitalize block"
                    >
                      {niche} to Coloring Page
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-center">{dict.home.faq.title}</h2>
        <dl className="space-y-6">
          {dict.home.faq.items.map((item, i) => (
            <div key={i} className="border-b pb-4 last:border-0">
              <dt className="font-bold text-lg mb-2">{item.q}</dt>
              <dd className="text-muted-foreground">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
