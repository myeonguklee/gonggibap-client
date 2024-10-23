import type { Metadata } from "next";
import localFont from "next/font/local";
import { Provider } from "@/app/_components/Provider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "공기밥",
  description: "맛집 추천 서비스",
  openGraph: {
    title: "공기밥",
    description: "공무원 업무추진비로 검증된 맛집을 찾아보세요",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/images/ogImage.png`,
        width: 1200,
        height: 630,
        alt: "공기밥 - 공무원 맛집 추천",
      },
    ],
    type: "website",
    locale: "ko_KR",
    url: process.env.NEXT_PUBLIC_CLIENT_URL,
    siteName: "공기밥",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 다크모드 전환시 깜빡임 방지를 위해 suppressHydrationWarning 추가
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
