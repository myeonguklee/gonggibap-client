import { useState } from "react";

export const ReviewForm = () => {
  const [selectedStars, setSelectedStars] = useState<number>(0);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const handleStarClick = (star: number) => {
    setSelectedStars(star);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 3); // 최대 3장까지 업로드 가능
      setUploadedImages(newImages);
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex-between-center">
        <h2 className="text-xl font-bold">리뷰 작성하기</h2>
      </div>

      <form className="space-y-6">
        {/* Rating selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">별점</label>
          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, index) => index + 1).map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                className={`p-1 w-8 h-8 rounded ${
                  selectedStars >= star ? "bg-yellow-400" : "bg-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
          {/* <p className="text-red-500 text-xs">별점을 선택해주세요.</p> */}
        </div>

        {/* Image upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">사진 첨부</label>
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
                  className="absolute -top-2 -right-2 bg-gray-800 rounded-full p-1 text-white"
                >
                  ✕
                </button>
              </div>
            ))}

            {uploadedImages.length < 3 && (
              <label className="w-20 h-20 flex-col-center bg-gray-700 rounded cursor-pointer hover:bg-gray-600">
                <span className="text-xs text-white">사진 추가</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <p className="text-xs text-gray-400">최대 3장까지 업로드 가능</p>
        </div>

        {/* Review content */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">리뷰 작성</label>
          <textarea
            placeholder="음식과 서비스는 어떠셨나요? (최소 10자 이상)"
            className="w-full h-32 px-3 py-2 bg-gray-700 text-white rounded-lg resize-none"
          />
          {/* <p className="text-red-500 text-xs">리뷰는 최소 10자 이상 작성해주세요.</p> */}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            리뷰 등록
          </button>
          <button
            type="button"
            className="flex-1 py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};
