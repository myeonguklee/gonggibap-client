'use client';

import { useState } from 'react';

import { RiKakaoTalkFill } from 'react-icons/ri';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = (): void => {
    setIsLoading(true);
    window.location.href = `${process.env.NEXT_PUBLIC_LOGIN_URL}/oauth2/authorization/kakao`;
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md px-6">
        <div className="mb-5 text-center text-4xl font-bold">카카오 로그인</div>
        <div className="mb-10 text-center text-base text-gray-500 md:text-lg">
          카카오 계정으로 쉽고 빠르게 로그인하세요
        </div>
        <button
          onClick={handleGitHubLogin}
          disabled={isLoading}
          className="flex w-full items-center justify-center rounded-md bg-yellow-300 py-3 font-semibold text-black transition-colors hover:bg-yellow-200">
          <RiKakaoTalkFill size={30} className="mr-3" />
          {isLoading ? '로그인 중' : <>카카오로 시작하기</>}
        </button>
      </div>
    </div>
  );
}
