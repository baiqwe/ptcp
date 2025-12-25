import { DICTIONARY, Locale } from "@/config/pseo-data";
import { HeroUploader } from "@/components/pseo/hero-uploader";
import { ComparisonSlider } from "@/components/pseo/comparison-slider";

interface HomeProps {
  params: Promise<{ lang: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;
  const dict = DICTIONARY[lang as Locale] || DICTIONARY.en;

  return (
    <div className="container mx-auto px-4 py-12 space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-balance">
          {dict.title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {dict.uploadSubtitle}
        </p>

        <HeroUploader niche="photo" />
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
            beforeLabel="Photo"
            afterLabel="Coloring Page"
          />
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid sm:grid-cols-3 gap-8 text-center">
        <div className="space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">⚡</div>
          <h3 className="font-bold text-xl">Instant Conversion</h3>
          <p className="text-muted-foreground">Upload and get your coloring page in seconds.</p>
        </div>
        <div className="space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">🎨</div>
          <h3 className="font-bold text-xl">High Quality Lines</h3>
          <p className="text-muted-foreground">Clean, crisp outlines optimized for printing and coloring.</p>
        </div>
        <div className="space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">🔒</div>
          <h3 className="font-bold text-xl">Private & Secure</h3>
          <p className="text-muted-foreground">Your photos are processed automatically and not shared.</p>
        </div>
      </section>
    </div>
  );
}
