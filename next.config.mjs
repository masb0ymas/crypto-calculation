/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    APP_NAME: process.env.APP_NAME,
    APP_PREFIX: process.env.APP_PREFIX,
    APP_SITE_URL: process.env.APP_SITE_URL,

    COINGECKO_API_URL: process.env.COINGECKO_API_URL,
    COINGECKO_API_KEY: process.env.COINGECKO_API_KEY,
  },
  output: "standalone",
};

export default nextConfig;
