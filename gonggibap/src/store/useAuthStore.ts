import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  isLogin: boolean;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    // 기본값 세팅
    (set) => ({
      accessToken: null,
      isLogin: false,
      // 토큰 저장, 로그인 상태 true로 변경
      setAccessToken: (token: string) =>
        set({
          accessToken: token,
          isLogin: true,
        }),
      // 토근 삭제, 로그인 상태 false로 변경
      logout: () =>
        set({
          accessToken: null,
          isLogin: false,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      // store의 전체 상태 중 저장하고싶은 부분만 저장
      partialize: (state) => ({
        accessToken: state.accessToken,
        isLogin: state.isLogin,
      }),
    }
  )
);
