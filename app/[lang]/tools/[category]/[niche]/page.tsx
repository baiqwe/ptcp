import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, CategoryKey, DICTIONARY, LOCALES, Locale, NICHE_DATA } from "@/config/pseo-data";
import { HeroUploader } from "@/components/pseo/hero-uploader";
import { ComparisonSlider } from "@/components/pseo/comparison-slider";
import { DownloadButton } from "@/components/pseo/download-button";
import { JsonLd } from "@/components/seo/json-ld";

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
    const { lang, niche, category } = await params;

    const dict = DICTIONARY[lang as Locale] || DICTIONARY.en;
    const nicheInfo = NICHE_DATA[niche] || NICHE_DATA.default;

    const title = dict.seo.titleTemplate.replace("{niche}", nicheInfo.title.replace("{niche}", niche));
    const description = dict.seo.descTemplate
        .replace("{niche}", nicheInfo.title.replace("{niche}", niche))
        .replace("{useCase}", "art projects");

    const baseUrl = process.env.BASE_URL ? `https://${process.env.BASE_URL}` : "https://site.com";

    const languages: Record<string, string> = {};
    LOCALES.forEach(locale => {
        languages[locale] = `${baseUrl}/${locale}/tools/${category}/${niche}`;
    });

    return {
        title,
        description,
        alternates: {
            canonical: `${baseUrl}/${lang}/tools/${category}/${niche}`,
            languages
        },
        openGraph: {
            title,
            description,
            images: [`/og/tools/${niche}.png`]
        }
    };
}

export default async function PseoPage({ params }: { params: Promise<PageParams> }) {
    const { lang, category, niche } = await params;

    const categoryData = CATEGORIES[category as CategoryKey];
    if (!categoryData || !(categoryData.niches as readonly string[]).includes(niche)) {
        notFound();
    }

    const dict = DICTIONARY[lang as Locale] || DICTIONARY.en;
    const nicheInfo = NICHE_DATA[niche] || NICHE_DATA.default;

    const displayNicheTitle = nicheInfo.title === "Custom" ? niche : nicheInfo.title;

    return (
        <div className="container mx-auto px-4 py-12 space-y-16">
            <JsonLd
                niche={displayNicheTitle}
                title={`${displayNicheTitle} Coloring Page Generator`}
                description={nicheInfo.description}
                faqs={nicheInfo.faqs}
                imageUrl="/dog-sketch.png"
            />

            {/* Hero Section */}
            <section className="text-center space-y-6 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-balance capitalize">
                    {displayNicheTitle} {dict.title.split(' ').slice(1).join(' ')}
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    {nicheInfo.description}
                </p>

                <HeroUploader niche={niche} />
            </section>

            {/* Before/After Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-card rounded-3xl p-8 border shadow-sm">
                <div className="space-y-6 text-center md:text-left">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">{dict.features.instant}</h2>
                        <p className="text-muted-foreground text-lg">
                            See the magic happen. Drag the slider to compare original photo and the coloring page result.
                        </p>
                    </div>

                    <DownloadButton
                        imageUrl="/dog-sketch.png"
                        filename={`coloring-page-${niche}-printable.png`}
                        label={dict.download}
                    />
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

            {/* Content & FAQ Section */}
            <section className="prose prose-lg dark:prose-invert mx-auto max-w-3xl">
                <h2>Why create a coloring page from your {niche}?</h2>
                <p>
                    Coloring is a relaxing activity for all ages. Converting a personal photo of your {displayNicheTitle} makes the experience even more special.
                    Whether it's for a gift, a family activity, or just for fun, our tool ensures high-quality outlines every time.
                </p>

                {nicheInfo.faqs && nicheInfo.faqs.length > 0 && (
                    <div className="mt-8">
                        <h2>Frequently Asked Questions</h2>
                        <dl className="space-y-6">
                            {nicheInfo.faqs.map((faq, i) => (
                                <div key={i} className="border-b pb-4 last:border-0">
                                    <dt className="font-bold text-lg mb-2">{faq.question}</dt>
                                    <dd className="text-muted-foreground">{faq.answer}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                )}
            </section>
        </div>
    );
}
