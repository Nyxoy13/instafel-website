/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                port: '',
                pathname: '/**',
              }
        ]
    },
    experimental: {
        missingSuspenseWithCSRBailout: false
    }
};

export default nextConfig;
