import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateReview } from "@/apis/review";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { X } from "lucide-react";

type ReviewFormProps = {
  restaurantId: number;
  onClickWriteReview: () => void;
};

interface ReviewFormData {
  content: string;
  point: number;
  images: File[];
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  restaurantId,
  onClickWriteReview,
}) => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>({
    defaultValues: {
      content: "",
      point: 0,
      images: [],
    },
  });

  const createReviewMutation = useCreateReview();
  const point = watch("point");
  const queryClient = useQueryClient();

  const handleStarClick = (star: number) => {
    setValue("point", star);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      const remainingSlots = 3 - uploadedImages.length;

      if (newImages.length > remainingSlots) {
        toast.warning(`최대 ${remainingSlots}장 업로드할 수 있습니다`);
      }

      // 남은 슬롯만큼만 이미지를 추가
      const imagesToAdd = newImages.slice(0, remainingSlots);
      const updatedImages = [...uploadedImages, ...imagesToAdd];
      setUploadedImages(updatedImages);
      setValue("images", updatedImages);
    }
    // 같은 파일을 다시 선택할 수 있도록 input 값을 초기화
    event.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    setValue("images", newImages);
  };

  const onSubmit = handleSubmit((data) => {
    if (data.point === 0) {
      toast.error("별점을 선택해주세요");
      return;
    }

    createReviewMutation.mutate(
      {
        restaurantId,
        content: data.content,
        point: data.point,
        images: uploadedImages,
      },
      {
        onSuccess: () => {
          toast.success("리뷰가 등록되었습니다");
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.REVIEW.DETAIL(restaurantId)],
          });
          onClickWriteReview(); // 성공 시 폼 닫기
        },
        onError: (error) => {
          toast.error("리뷰 등록에 실패했습니다");
          console.error(error);
        },
      }
    );
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex-between-center">
        <h2 className="text-xl font-bold">리뷰 작성</h2>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {/* Rating selection */}
        <fieldset>
          <legend className="block text-sm font-medium">별점</legend>
          <div className="flex gap-2">
            {Array.from({ length: 5 }, (_, index) => index + 1).map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                className={`p-1 w-8 h-8`}
                aria-label={`${star}점`}
              >
                <span
                  className={`text-3xl hover:text-gray-400
                    ${point >= star ? "text-yellow-400" : "text-gray-300"} `}
                >
                  ★
                </span>
              </button>
            ))}
          </div>
          {errors.point && (
            <strong role="alert" className="text-red-500 text-xs">
              별점을 선택해주세요.
            </strong>
          )}
        </fieldset>

        {/* Image upload */}
        <fieldset>
          <legend className="block text-sm font-medium">사진 첨부</legend>
          <div className="flex gap-2">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`업로드 이미지 ${index + 1}`}
                  className="w-20 h-20 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -top-1 -right-1 bg-white dark:bg-gray-800 md:dark:bg-gray-700 rounded p-1"
                  aria-label={`이미지 ${index + 1} 삭제`}
                >
                  <X className="w-4 h-4" />

                </button>
              </div>
            ))}

            {uploadedImages.length < 3 && (
              <label className="w-20 h-20 flex-col-center bg-gray-100 dark:bg-gray-700 md:dark:bg-gray-800 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900">
                <span className="text-xs">사진 추가</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  aria-label="사진 업로드"
                />
              </label>
            )}
          </div>
          <small className="text-xs text-gray-400">
            {`현재 ${uploadedImages.length}/3장 업로드됨`}
          </small>
        </fieldset>

        {/* Review content */}
        <fieldset>
          <legend className="block text-sm font-medium">리뷰 작성</legend>
          <textarea
            {...register("content", {
              required: "리뷰를 작성해주세요",
              minLength: {
                value: 10,
                message: "리뷰는 최소 10자 이상 작성해주세요",
              },
            })}
            placeholder="음식과 서비스는 어떠셨나요? (최소 10자 이상)"
            className="w-full h-32 px-3 py-2 bg-gray-100 md:dark:bg-gray-800 dark:bg-gray-700 rounded-lg resize-none"
          />
          {errors.content && (
            <strong role="alert" className="text-red-500 text-xs">
              {errors.content.message}
            </strong>
          )}
        </fieldset>

        <div className="flex gap-3">
          <button
            type="button"
            className="flex-1 py-2 px-4 bg-gray-200 text-gray-400 rounded-lg hover:bg-gray-100"
            onClick={onClickWriteReview}
          >
            취소
          </button>

          <button
            type="submit"
            disabled={createReviewMutation.isPending}
            className="flex-1 py-2 px-4 bg-[#FF7058] md:dark:bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-[#ff7158da] dark:hover:bg-gray-900 disabled:opacity-50"
          >
            {createReviewMutation.isPending ? "등록 중..." : "리뷰 등록"}
          </button>
        </div>
      </form>
    </div>
  );
};
