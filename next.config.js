/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["zh-hans", 'en'],
    defaultLocale: "zh-hans",
  },
  experimental: {
    serverActions: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
