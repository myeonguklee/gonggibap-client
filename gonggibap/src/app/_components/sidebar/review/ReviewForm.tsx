import Image from 'next/image';
import { useState, useEffect } from 'react';

import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Review } from '@/types/review';

import { useAuthStore } from '@/store/useAuthStore';

import { useCreateReview, useUpdateReview } from '@/apis/review';

type ReviewFormProps = {
  restaurantId: number;
  onClickWriteReview: () => void;
  mode?: 'create' | 'edit';
  review?: Review;
};

interface ReviewFormData {
  content: string;
  point: number;
  images: File[];
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  restaurantId,
  onClickWriteReview,
  mode = 'create',
  review,
}) => {
  const { isLogin } = useAuthStore();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>({
    defaultValues: {
      content: '',
      point: 0,
      images: [],
    },
  });

  const { mutate: createReview, isPending: isCreating } = useCreateReview({
    onSuccess: onClickWriteReview,
  });

  const { mutate: updateReview, isPending: isUpdating } = useUpdateReview({
    onSuccess: onClickWriteReview,
  });

  const isPending = isCreating || isUpdating;
  const point = watch('point');
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);

  // Initialize form with existing review data when editing
  useEffect(() => {
    if (mode === 'edit' && review) {
      reset({
        content: review.content,
        point: review.point,
        images: [],
      });
      setExistingImageUrls(review.imageUrls || []);
    }
  }, [mode, review, reset]);

  const handleStarClick = (star: number) => {
    setValue('point', star);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      const totalImages = uploadedImages.length + existingImageUrls.length;
      const remainingSlots = 4 - totalImages;

      if (newImages.length > remainingSlots) {
        toast.warning(`최대 ${remainingSlots}장 업로드할 수 있습니다`);
      }

      const imagesToAdd = newImages.slice(0, remainingSlots);
      const updatedImages = [...uploadedImages, ...imagesToAdd];
      setUploadedImages(updatedImages);
      setValue('images', updatedImages);
    }
    event.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    setValue('images', newImages);
  };

  const handleRemoveExistingImage = (index: number) => {
    const newImages = existingImageUrls.filter((_, i) => i !== index);
    setExistingImageUrls(newImages);
  };

  const onSubmit = handleSubmit((data) => {
    if (data.point === 0) {
      toast.error('별점을 선택해주세요');
      return;
    }

    // 기존 이미지 URL들을 File 객체로 변환하여 새로운 이미지들과 합침
    const processExistingImages = existingImageUrls.map(async (url) => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        // URL의 마지막 부분을 파일명으로 사용
        const fileName = url.split('/').pop() || 'image.jpg';
        return new File([blob], fileName, { type: blob.type });
      } catch (error) {
        console.error('Error converting URL to File:', error);
        return null;
      }
    });

    Promise.all(processExistingImages).then((existingFiles) => {
      // null이 아닌 파일들만 필터링
      const validExistingFiles = existingFiles.filter(
        (file): file is File => file !== null,
      );
      // 기존 이미지와 새 이미지를 합침
      const allImages = [...validExistingFiles, ...uploadedImages];

      if (mode === 'edit' && review) {
        updateReview({
          reviewId: review.reviewId,
          restaurantId,
          content: data.content,
          point: data.point,
          images: allImages,
        });
      } else {
        createReview({
          restaurantId,
          content: data.content,
          point: data.point,
          images: uploadedImages,
        });
      }
    });
  });

  return (
    <div className="relative">
      <div className="flex flex-col gap-4">
        <h2 className="sr-only">
          {mode === 'edit' ? '리뷰 수정' : '리뷰 작성'}
        </h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {/* Rating selection */}
          <fieldset>
            <legend className="hidden">별점</legend>
            <div className="gap-2 flex-center">
              {Array.from({ length: 5 }, (_, index) => index + 1).map(
                (star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    className={`text-4xl hover:text-gray-400
                    ${point >= star ? 'text-yellow-400' : 'text-gray-300'} `}
                    aria-label={`${star}점`}>
                    ★
                  </button>
                ),
              )}
            </div>
            {errors.point && (
              <strong role="alert" className="text-xs text-red-500">
                별점을 선택해주세요.
              </strong>
            )}
          </fieldset>

          {/* Image upload */}
          <fieldset>
            <legend className="hidden">사진 첨부</legend>
            <div className="flex gap-2">
              {/* Existing Images */}
              {existingImageUrls.map((imageUrl, index) => (
                <div key={`existing-${index}`} className="relative">
                  <div className="size-20">
                    <Image
                      src={imageUrl}
                      alt={`기존 이미지 ${index + 1}`}
                      className="rounded object-cover"
                      fill
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(index)}
                    className="absolute -right-1 -top-1 rounded bg-white p-1 dark:bg-gray-800 md:dark:bg-gray-700"
                    aria-label={`기존 이미지 ${index + 1} 삭제`}>
                    <X className="size-4" />
                  </button>
                </div>
              ))}

              {/* New Uploaded Images */}
              {uploadedImages.map((image, index) => (
                <div key={`new-${index}`} className="relative">
                  <div className="size-20">
                    <Image
                      src={URL.createObjectURL(image)}
                      alt={`업로드 이미지 ${index + 1}`}
                      className="rounded object-cover"
                      fill
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -right-1 -top-1 rounded bg-white p-1 dark:bg-gray-800 md:dark:bg-gray-700"
                    aria-label={`이미지 ${index + 1} 삭제`}>
                    <X className="size-4" />
                  </button>
                </div>
              ))}

              {uploadedImages.length + existingImageUrls.length < 4 && (
                <label className="h-20 w-full cursor-pointer rounded bg-gray-100 flex-col-center hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-900 md:dark:bg-gray-800">
                  <span className="size-full text-xs flex-center">
                    사진 추가
                  </span>
                  <input
                    type="file"
                    accept="image/*,.jpg,.jpeg,.png,.gif,.heic,.heif,.webp"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    aria-label="사진 업로드"
                  />
                </label>
              )}
            </div>
            <small className="text-xs text-gray-400">
              {`현재 ${uploadedImages.length + existingImageUrls.length}/4장 업로드됨`}
            </small>
          </fieldset>

          {/* Review content */}
          <fieldset>
            <legend className="hidden">리뷰 작성</legend>
            <textarea
              {...register('content', {
                required: '리뷰를 작성해주세요',
                minLength: {
                  value: 5,
                  message: '리뷰는 최소 5자 이상 작성해주세요',
                },
              })}
              placeholder="음식과 서비스는 어떠셨나요? (최소 5자 이상)"
              className="h-32 w-full resize-none rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-700 md:dark:bg-gray-800"
            />
            {errors.content && (
              <strong role="alert" className="text-xs text-red-500">
                {errors.content.message}
              </strong>
            )}
          </fieldset>

          <div className="flex gap-3">
            <button
              type="button"
              className="flex-1 rounded-lg bg-gray-200 px-4 py-2 text-gray-400 hover:bg-gray-100"
              onClick={onClickWriteReview}>
              취소
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="flex-1 rounded-lg bg-[#FF7058] px-4 py-2 text-white hover:bg-[#ff7158da] disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-900 md:dark:bg-gray-800">
              {isPending
                ? mode === 'edit'
                  ? '수정 중...'
                  : '등록 중...'
                : mode === 'edit'
                  ? '리뷰 수정'
                  : '리뷰 등록'}
            </button>
          </div>
        </form>
      </div>
      {/* Login Overlay */}
      {!isLogin && (
        <div className="absolute inset-0 rounded-lg bg-black/50 backdrop-blur-sm flex-center">
          <div className="text-center">
            <p className="mb-4 text-white">
              리뷰를 작성하려면 로그인이 필요합니다
            </p>
            <div className="gap-6 flex-center">
              <button
                onClick={onClickWriteReview}
                className="min-w-32 rounded-lg bg-gray-400 px-6 py-2 text-white hover:bg-gray-500">
                취소
              </button>
              <a
                href="/login"
                className="inline-block rounded-lg bg-[#FF7058] px-6 py-2 font-bold text-white hover:bg-[#ff7158da]">
                로그인하기
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
