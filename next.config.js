/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'img.youtube.com',
            port: '',
            pathname: '/vi/**',
          },
          {
            protocol: 'https',
            hostname: '*.supabase.co',
            port: '',
            pathname: '/storage/v1/object/**',
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            pathname: '/**',
          },
          
        ],
      },

}

module.exports = nextConfig
