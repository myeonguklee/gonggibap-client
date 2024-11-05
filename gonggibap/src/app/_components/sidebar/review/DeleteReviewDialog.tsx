import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface DeleteReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isDeleting: boolean;
  onDelete: () => void;
}

export const DeleteReviewDialog = ({
  open,
  onOpenChange,
  isDeleting,
  onDelete,
}: DeleteReviewDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 dark:bg-gray-700">
          <Dialog.Title className="mb-4 text-center text-xl font-medium">
            리뷰 삭제
          </Dialog.Title>
          <Dialog.Description className="mb-6 text-center text-gray-600 dark:text-gray-300">
            정말로 이 리뷰를 삭제하시겠습니까?
          </Dialog.Description>

          <div className="flex flex-col gap-2">
            <button
              onClick={onDelete}
              disabled={isDeleting}
              className="w-full rounded-lg bg-[#FF7058] px-4 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50">
              삭제하기
            </button>
            <button
              onClick={() => onOpenChange(false)}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium dark:border-gray-600 dark:bg-gray-700">
              취소
            </button>
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close">
              <X className="size-4" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
