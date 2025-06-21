/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      BASE_URL_CORE: process.env.BASE_URL_CORE,
      GOOGLE_API_KEY_RE_CAPTCHA: process.env.GOOGLE_API_KEY_RE_CAPTCHA,
      BASE_URL_TRANSACTION: process.env.BASE_URL_TRANSACTION,
      SERVER_NAME: process.env.SERVER_NAME,
      SERVER_LOGO: process.env.SERVER_LOGO,
    },};

export default nextConfig;
