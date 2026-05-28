export default function JsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Buildstack',
        url: 'https://buildstack.live',
        logo: 'https://buildstack.live/logo.png',
        sameAs: [
            'https://twitter.com/buildstack',
            'https://instagram.com/buildstack.live'
        ],
        description: 'Professional website development with transparent progress tracking.',
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91-7905388194',
            contactType: 'customer service',
            email: 'contactme@buildstack.live',
            areaServed: 'Worldwide',
            availableLanguage: 'English'
        },
        offers: {
            '@type': 'Offer',
            itemOffered: {
                '@type': 'Service',
                name: 'Website Development',
                description: 'Custom website design and development with real-time progress tracking.'
            }
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
