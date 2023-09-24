const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./src/i18n.ts"
)

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDocumentPreloading: true,
    serverActions: true,
  },
  images: { domains: ["demo.vercel.store"] },
}

module.exports = withNextIntl(nextConfig)
