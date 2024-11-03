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
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 dark:bg-gray-700">
          <Dialog.Title className="mb-6 text-center text-xl font-semibold">
            로그인
          </Dialog.Title>
          <Dialog.Description className="mb-6 text-center text-gray-600">
            로그인이 필요한 서비스입니다.
          </Dialog.Description>
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="rounded-lg border px-4 py-2 hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white">
              취소
            </button>
            <button
              onClick={handleLogin}
              className="rounded-lg bg-[#FF7058] px-4 py-2 text-white hover:bg-[#FF7058]/90">
              로그인하기
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
