/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['gonggibap.s3.ap-northeast-2.amazonaws.com'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src * 'unsafe-inline' 'unsafe-eval'; style-src * 'unsafe-inline';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
