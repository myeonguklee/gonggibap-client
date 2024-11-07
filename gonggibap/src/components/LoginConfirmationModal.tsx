import { useRouter } from 'next/navigation';

import * as Dialog from '@radix-ui/react-dialog';

interface LoginConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginConfirmationModal = ({
  isOpen,
  onClose,
}: LoginConfirmationModalProps) => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 dark:bg-gray-700">
          <Dialog.Title className="mb-4 text-center text-xl font-semibold">
            로그인
          </Dialog.Title>
          <Dialog.Description className="mb-6 text-center text-gray-600 dark:text-gray-300">
            로그인이 필요한 서비스입니다.
          </Dialog.Description>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleLogin}
              className="w-full rounded-lg bg-[#FF7058] px-4 py-3 font-bold text-white">
              로그인하기
            </button>
            <button
              onClick={onClose}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium dark:border-gray-600 dark:bg-gray-700">
              취소
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
