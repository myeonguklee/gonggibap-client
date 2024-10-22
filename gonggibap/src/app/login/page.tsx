"use client";

import { useState } from "react";
import { RiKakaoTalkFill } from "react-icons/ri";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = (): void => {
    setIsLoading(true);
    window.location.href = `${process.env.NEXT_LOGIN_URL}/oauth2/authorization/kakao`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md px-6">
        <div className="text-4xl font-bold text-center mb-5">카카오 로그인</div>
        <div className="text-center text-gray-500 mb-10 text-lg">
          카카오 계정으로 쉽고 빠르게 로그인하세요
        </div>
        <button
          onClick={handleGitHubLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center font-semibold py-3 bg-yellow-300 text-black rounded-md hover:bg-yellow-200 transition-colors"
        >
          <RiKakaoTalkFill size={30} className="mr-3" />
          {isLoading ? "로그인 중" : <>카카오로 시작하기</>}
        </button>
      </div>
    </div>
  );
}
