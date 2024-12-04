const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',

        hostname: 'udcpwzniohyjpadzbtbg.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
