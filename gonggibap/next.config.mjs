/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['gonggibap.s3.ap-northeast-2.amazonaws.com'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            // Hotjar가 CSS와 리소스에 접근할 수 있도록 CSP 설정
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self' https://*.hotjar.com https://*.hotjar.io https://gonggibap.s3.ap-northeast-2.amazonaws.com",
              "style-src 'self' 'unsafe-inline' https://*.hotjar.com",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.hotjar.com https://*.hotjar.io",
              "connect-src 'self' https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com",
              "font-src 'self' https://*.hotjar.com",
              "img-src 'self' https://*.hotjar.com https://gonggibap.s3.ap-northeast-2.amazonaws.com data:",
              "worker-src 'self' blob:",
            ].join('; '),
          },
          {
            // CORS 설정
            key: 'Access-Control-Allow-Origin',
            value: 'https://*.hotjar.com',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
