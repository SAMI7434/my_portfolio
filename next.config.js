/** @type {import('next').NextConfig} */
const nextConfig = {
  // React strict mode
  reactStrictMode: true,

  // Turbopack configuration
  turbopack: {
    root: __dirname,
  },

  // Standalone output for deployment
  output: 'standalone',

  // Suppress Three.js Clock deprecation warning
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.ignoreWarnings = [
        ...(config.ignoreWarnings || []),
        /THREE\.Clock/,
      ];
    }
    return config;
  },

  images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'i.ibb.co',
    },
    {
      protocol: 'https',
      hostname: 'd8j0ntlcm91z4.cloudfront.net',
    },
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',  // ← add this
    },
  ],
},
};

module.exports = nextConfig;