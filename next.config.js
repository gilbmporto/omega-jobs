/** @type {import('next').NextConfig} */
// We do this down below to make it possible to run mongoose in dev mode
const nextConfig = {
  webpack: (config) => {
    config.experiments = config.experiments || {}
    config.experiments.topLevelAwait = true
    return config
  },
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
}

module.exports = nextConfig
