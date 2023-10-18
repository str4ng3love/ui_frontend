/** @type {import('next').NextConfig} */
const nextConfig = {
 output: 'standalone',
  images: {
    remotePatterns: [{
      hostname:'images.spr.so',
      pathname: "/**",
      protocol: 'https',
      port:''
    },
      {
        protocol: 'https',
        hostname: "images.evetech.net",
        pathname: "/**",
        port:''
      },
    ],
  },
};

module.exports = nextConfig;
