/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['gonggibap.s3.ap-northeast-2.amazonaws.com'],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'gonggibap.s3.ap-northeast-2.amazonaws.com',
    //     port: '',
    //     pathname: '/**',
    //   },
    // ],
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // formats: ['image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "script-src * 'unsafe-inline' 'unsafe-eval'; style-src * 'unsafe-inline';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
