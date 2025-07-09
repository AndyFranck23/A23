/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pvpalatdcrcnodrwtyxm.supabase.co',
                port: '',                     // port vide si HTTPS standard
                pathname: '/storage/v1/object/public/images/**', // <– chemin et sous-chemins
            },
            {
                protocol: 'https',
                hostname: '**.media-amazon.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images-na.ssl-images-amazon.com',
                pathname: '/**',
            },
        ], // <– ajout du domaine Supabase
    },
};

export default nextConfig;
