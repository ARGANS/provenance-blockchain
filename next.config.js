/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
      PROJECT_ROOT: __dirname
  },
  images: {
    domains: [
      'media-exp1.licdn.com',
      'avatars.githubusercontent.com',
      't.co',
      'pbs.twimg.com',
      'platform-lookaside.fbsbx.com',
      'graph.facebook.com',
      'encrypted-tbn0.gstatic.com',
    ],
  },    
}

module.exports = nextConfig
