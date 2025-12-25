import { CATEGORIES, LOCALES } from "@/config/pseo-data";
import { MetadataRoute } from "next";

const baseUrl = process.env.BASE_URL
    ? `https://${process.env.BASE_URL}`
    : "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
    const routes: MetadataRoute.Sitemap = [];

    // Home pages
    for (const locale of LOCALES) {
        routes.push({
            url: `${baseUrl}/${locale}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        });
    }

    // pSEO Tool pages
    for (const locale of LOCALES) {
        for (const [catKey, catData] of Object.entries(CATEGORIES)) {
            for (const niche of catData.niches) {
                routes.push({
                    url: `${baseUrl}/${locale}/tools/${catKey}/${niche}`,
                    lastModified: new Date(),
                    changeFrequency: "monthly",
                    priority: 0.8,
                });
            }
        }
    }

    return routes;
}
