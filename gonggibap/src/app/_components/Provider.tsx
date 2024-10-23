"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer, ToastContainerProps } from "react-toastify";
import { ThemeProvider, useTheme } from "next-themes";
import "react-toastify/dist/ReactToastify.css";

// toastMessage 다크모드 적용을 위한 컴포넌트 분리
function ToastWrapper() {
  const { theme } = useTheme();

  const toastConfig: ToastContainerProps = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: theme as "light" | "dark" | undefined,
  };

  return <ToastContainer {...toastConfig} />;
}

export const Provider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  // tanstack-query
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        {children}
        <ToastWrapper />
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </ThemeProvider>
  );
};
