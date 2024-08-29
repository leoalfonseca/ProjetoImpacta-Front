/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    styledComponents: true,
  },
  env: {
    MODE: process.env.MODE,
    ENVIRONMENT: process.env.ENVIRONMENT,
    API_URL: process.env.API_URL,
    SECRET_KEY: process.env.SECRET_KEY,
  },
};
