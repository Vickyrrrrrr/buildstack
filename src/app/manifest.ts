import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Buildstack EDA Lab — Semiconductor EDA Automation',
        short_name: 'Buildstack',
        description: 'Buildstack EDA Lab builds agentic EDA tools for the semiconductor industry. AgentIC converts design intent into DRC-clean GDSII.',
        start_url: '/',
        display: 'standalone',
        background_color: '#05070a',
        theme_color: '#38bdf8',
        icons: [
            {
                src: '/logo.png',
                sizes: 'any',
                type: 'image/png',
            },
        ],
    };
}
