/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yts.mx",
        // port: '',
        // pathname: '/account123/**',
      },
    ],
  },
};

export default nextConfig;
