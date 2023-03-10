/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['cdn.wallpaperhub.app'],
},
}

module.exports = nextConfig
