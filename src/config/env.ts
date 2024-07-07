const APP_NAME = process.env.APP_NAME || "nextjs";
const APP_PREFIX = process.env.APP_PREFIX || "nextjs";
const APP_SITE_URL = process.env.APP_SITE_URL || "example.com";

const COINGECKO_API_URL = process.env.COINGECKO_API_URL;
const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;

const env = {
  APP_NAME,
  APP_PREFIX,
  APP_SITE_URL,

  COINGECKO_API_URL,
  COINGECKO_API_KEY,
};

export default env;
