/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'upload.wikimedia.org',
            // port: '',
            // pathname: '/account123/**',
          },
          {
            protocol: 'https',
            hostname: 'images.squarespace-cdn.com',
          }
        ],
    },
};

module.exports = nextConfig;
