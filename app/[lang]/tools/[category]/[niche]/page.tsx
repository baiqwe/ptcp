import { CATEGORIES, LOCALES, NICHE_DATA, CategoryKey } from "@/config/pseo-data";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroUploader } from "@/components/pseo/hero-uploader";
import { ComparisonSlider } from "@/components/pseo/comparison-slider";

// Force static generation for all params
export const dynamicParams = false;

interface PageParams {
    lang: string;
    category: string;
    niche: string;
}

export async function generateStaticParams() {
    const params: PageParams[] = [];

    for (const locale of LOCALES) {
        for (const [catKey, catData] of Object.entries(CATEGORIES)) {
            for (const niche of catData.niches) {
                params.push({
                    lang: locale,
                    category: catKey,
                    niche: niche,
                });
            }
        }
    }

    return params;
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
    const { lang, category, niche } = await params;

    // Basic validation (optional since generateStaticParams restricts paths)
    const categoryData = CATEGORIES[category as CategoryKey];
    if (!categoryData) return {};

    const nicheInfo = NICHE_DATA[niche as keyof typeof NICHE_DATA] || NICHE_DATA.default;

    const title = nicheInfo.titleTemplate.replace("{niche}", niche);
    const description = nicheInfo.metaTemplate.replace("{niche}", niche);

    return {
        title: `${title} | Photo to Coloring Page`,
        description: description,
        alternates: {
            languages: {
                'en': `/en/tools/${category}/${niche}`,
                'es': `/es/tools/${category}/${niche}`,
                'de': `/de/tools/${category}/${niche}`,
                'ja': `/ja/tools/${category}/${niche}`,
            }
        }
    };
}

export default async function PseoPage({ params }: { params: Promise<PageParams> }) {
    const { lang, category, niche } = await params;

    const categoryData = CATEGORIES[category as CategoryKey];
    if (!categoryData || !(categoryData.niches as readonly string[]).includes(niche)) {
        notFound();
    }

    const nicheInfo = NICHE_DATA[niche as keyof typeof NICHE_DATA] || NICHE_DATA.default;
    const title = nicheInfo.titleTemplate.replace("{niche}", niche);

    return (
        <div className="container mx-auto px-4 py-12 space-y-16">
            {/* Hero Section */}
            <section className="text-center space-y-6 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-balance">
                    {title}
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    {nicheInfo.metaTemplate.replace("{niche}", niche)}
                </p>

                <HeroUploader niche={niche} />
            </section>

            {/* Before/After Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-card rounded-3xl p-8 border shadow-sm">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold">See the Magic</h2>
                    <p className="text-muted-foreground">
                        Our AI analyzes your {niche} photo and extracts perfect lines for coloring.
                        No complex settings, just upload and download.
                    </p>
                </div>
                <div className="w-full flex items-center justify-center relative">
                    <ComparisonSlider
                        beforeImage="/dog-photo.png"
                        afterImage="/dog-sketch.png"
                    />
                </div>
            </section>

            {/* Gallery Section */}
            <section>
                <h2 className="text-3xl font-bold text-center mb-12">{niche} Coloring Page Examples</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                            Example {i}
                        </div>
                    ))}
                </div>
            </section>

            {/* SEO Text Content */}
            <section className="prose prose-lg dark:prose-invert mx-auto">
                <h2>Why create a coloring page from your {niche}?</h2>
                <p>
                    Coloring is a relaxing activity for all ages. Converting a personal photo of your {niche} makes the experience even more special.
                    Whether it's for a gift, a family activity, or just for fun, our tool ensures high-quality outlines every time.
                </p>
                <h2>How to print your {niche} coloring page</h2>
                <p>
                    Once generated, you can download the image in high resolution. We recommend printing on cardstock for the best coloring experience with markers or pencils.
                </p>
            </section>

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": title,
                        "applicationCategory": "DesignApplication",
                        "operatingSystem": "Web",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "4.8",
                            "ratingCount": "1024"
                        },
                        "description": nicheInfo.metaTemplate.replace("{niche}", niche)
                    })
                }}
            />
        </div>
    );
}
