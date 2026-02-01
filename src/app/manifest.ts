import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Buildstack | Digital Development Agency',
        short_name: 'Buildstack',
        description: 'Professional website development with transparent progress tracking.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#BEF264',
        icons: [
            {
                src: '/logo.png',
                sizes: 'any',
                type: 'image/png',
            },
        ],
    };
}
