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
        ], // <– ajout du domaine Supabase
    },
};

export default nextConfig;
