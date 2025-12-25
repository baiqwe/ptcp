import { Locale } from "./pseo-data";

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string; // Simplified for now (could be markdown)
    date: string;
    author: string;
    image: string;
    tags: string[];
}

export const BLOG_POSTS: Record<Locale, BlogPost[]> = {
    en: [
        {
            slug: "how-to-sell-coloring-pages-on-etsy",
            title: "How to Sell Coloring Pages on Etsy: A Complete Guide",
            excerpt: "Learn how to monetize your creativity by selling digital coloring pages on Etsy. Tips on SEO, pricing, and packaging.",
            date: "2024-01-15",
            author: "Sarah Design",
            image: "/dog-sketch.png",
            tags: ["Etsy", "Passive Income", "Guide"],
            content: `
                <h2>Why Sell Coloring Pages?</h2>
                <p>Coloring pages are a booming market on Etsy...</p>
                <h2>Step 1: Create High Quality Designs</h2>
                <p>Use our Photo to Coloring Page converter to create unique designs...</p>
            `,
        },
        {
            slug: "benefits-of-coloring-for-adults",
            title: "7 Surprising Benefits of Coloring for Adults",
            excerpt: "Discover why adult coloring books are trending. Reduce stress and improve focus with this simple activity.",
            date: "2024-01-10",
            author: "Dr. Art",
            image: "/dog-sketch.png",
            tags: ["Wellness", "Mental Health"],
            content: `...`,
        }
    ],
    es: [
        {
            slug: "como-vender-paginas-para-colorear-en-etsy",
            title: "Cómo Vender Páginas para Colorear en Etsy: Guía Completa",
            excerpt: "Aprenda a monetizar su creatividad vendiendo páginas para colorear digitales en Etsy.",
            date: "2024-01-15",
            author: "Sarah Design",
            image: "/dog-sketch.png",
            tags: ["Etsy", "Ingresos Pasivos"],
            content: `...`,
        }
    ],
    de: [],
    ja: []
};
