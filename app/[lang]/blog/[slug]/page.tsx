import { BLOG_POSTS } from "@/config/blog-data";
import { Locale } from "@/config/pseo-data";
import Image from "next/image";
import { notFound } from "next/navigation";

interface BlogPostProps {
    params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
    const params: { lang: string; slug: string }[] = [];

    Object.entries(BLOG_POSTS).forEach(([locale, posts]) => {
        posts.forEach(post => {
            params.push({ lang: locale, slug: post.slug });
        });
    });

    return params;
}

export default async function BlogPost({ params }: BlogPostProps) {
    const { lang, slug } = await params;
    const posts = BLOG_POSTS[lang as Locale] || BLOG_POSTS.en;
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="container mx-auto px-4 py-12 max-w-4xl space-y-8">
            <div className="space-y-4 text-center">
                <div className="flex gap-2 justify-center">
                    {post.tags.map(tag => (
                        <span key={tag} className="text-sm font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                            {tag}
                        </span>
                    ))}
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
                    {post.title}
                </h1>
                <div className="flex items-center justify-center gap-4 text-muted-foreground">
                    <span>By {post.author}</span>
                    <span>•</span>
                    <time>{post.date}</time>
                </div>
            </div>

            <div className="relative aspect-video w-full rounded-3xl overflow-hidden border shadow-sm">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                />
            </div>

            <div
                className="prose prose-lg dark:prose-invert mx-auto"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA to Tool */}
            <div className="not-prose bg-primary/5 rounded-2xl p-8 text-center space-y-6 my-12 border border-primary/20">
                <h3 className="text-2xl font-bold">Ready to create your own coloring pages?</h3>
                <p className="text-lg text-muted-foreground">Turn your photos into art efficiently with our AI tool.</p>
                <a href={`/${lang}`} className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
                    Try it for Free
                </a>
            </div>
        </article>
    );
}
