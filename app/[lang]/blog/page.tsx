import Link from "next/link";
import { BLOG_POSTS } from "@/config/blog-data";
import { Locale } from "@/config/pseo-data";
import Image from "next/image";

interface BlogIndexProps {
    params: Promise<{ lang: string }>;
}

export default async function BlogIndex({ params }: BlogIndexProps) {
    const { lang } = await params;
    const posts = BLOG_POSTS[lang as Locale] || BLOG_POSTS.en;

    return (
        <div className="container mx-auto px-4 py-12 space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold">Blog & Tutorials</h1>
                <p className="text-xl text-muted-foreground">Tips, tricks, and guides for coloring enthusiasts.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <article key={post.slug} className="group cursor-pointer border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                        <Link href={`/${lang}/blog/${post.slug}`}>
                            <div className="relative h-48 w-full bg-muted">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex gap-2">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="text-xs font-medium px-2.5 py-0.5 rounded bg-primary/10 text-primary">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-muted-foreground line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
                                    <span>{post.author}</span>
                                    <span>{post.date}</span>
                                </div>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}
