/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["zh-hans", 'en'],
    defaultLocale: "zh-hans",
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
