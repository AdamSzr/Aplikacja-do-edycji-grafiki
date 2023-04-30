/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/image-editor',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
