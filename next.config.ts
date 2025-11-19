import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['backendlessappcontent.com', 'api.backendless.com'],
  },
}

export default nextConfig