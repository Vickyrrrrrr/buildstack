import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://www.buildstack.live';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/dashboard/', '/admin/'],
            },
            {
                // Explicitly allow Twitterbot and social crawlers to fetch the OG image
                userAgent: 'Twitterbot',
                allow: '/',
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
