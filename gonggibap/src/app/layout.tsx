import type { Metadata } from 'next';


import localFont from 'next/font/local';

import { RootProvider } from '@/providers';

import { GoogleAnalytics } from '@/app/_components/GoogleAnalytics';



import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gonggibap.co.kr/'),
  title: '공기밥',
  description: '맛집 추천 서비스',
  openGraph: {
    title: '공기밥',
    description: '공무원 업무추진비로 검증된 맛집을 찾아보세요',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/images/ogImage.png`,
        width: 1200,
        height: 630,
        alt: '공기밥 - 공무원 맛집 추천',
      },
    ],
    type: 'website',
    locale: 'ko_KR',
    url: process.env.NEXT_PUBLIC_CLIENT_URL,
    siteName: '공기밥',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 다크모드 전환시 깜빡임 방지를 위해 suppressHydrationWarning 추가
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:5188011,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['WebSite', 'WebApplication'],
              name: '공기밥',
              description: '공무원 업무추진비로 검증된 맛집 추천 서비스',
              url: 'https://gonggibap.co.kr',
              applicationCategory: 'FoodEstablishmentReservation',
              operatingSystem: 'ALL',
              offers: {
                '@type': 'Offer',
                availability: 'https://schema.org/OnlineOnly',
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <RootProvider>
          {children}
          <GoogleAnalytics />
        </RootProvider>
      </body>
    </html>
  );
}
