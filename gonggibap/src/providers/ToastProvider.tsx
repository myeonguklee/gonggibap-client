import { useTheme } from 'next-themes';
import { ToastContainer, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ToastProvider() {
  const { theme } = useTheme();

  const toastConfig: ToastContainerProps = {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: theme as 'light' | 'dark' | undefined,
  };

  return <ToastContainer {...toastConfig} />;
}
