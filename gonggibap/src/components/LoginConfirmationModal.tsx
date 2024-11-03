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
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 rounded-xl p-6 max-w-md w-[90%] z-50">
          <Dialog.Title className="text-xl text-center font-semibold mb-6">
            로그인
          </Dialog.Title>
          <Dialog.Description className="text-gray-600 text-center mb-6">
            로그인이 필요한 서비스입니다.
          </Dialog.Description>
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">
              취소
            </button>
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-[#FF7058] text-white rounded-lg hover:bg-[#FF7058]/90">
              로그인하기
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
