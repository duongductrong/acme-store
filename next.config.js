const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./src/i18n.ts"
)

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    appDocumentPreloading: true,
    serverActions: true,
  },
}

module.exports = withNextIntl(nextConfig)
