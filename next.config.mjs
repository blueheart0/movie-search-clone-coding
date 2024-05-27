/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yts.mx",
        // port: '',
        // pathname: '/account123/**',
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "3000",
        // port: '',
        // pathname: '/account123/**',
      },
    ],
  },
};

export default nextConfig;
