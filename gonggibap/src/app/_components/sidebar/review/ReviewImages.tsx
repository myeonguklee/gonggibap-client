// RestaurantImageGallery.tsx
import Image from "next/image";

type ReviewImagesProps = {
  imageUrls: string[];
};

export const ReviewImages = ({ imageUrls }: ReviewImagesProps) => {
  if (imageUrls.length === 0) return null;

  switch (imageUrls.length) {
    case 1:
      return (
        <div className="relative h-48">
          <Image
            src={imageUrls[0]}
            alt="리뷰 이미지"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      );
    case 2:
      return (
        <div className="flex gap-2 h-48">
          {imageUrls.map((url) => (
            <div key={url} className="relative w-1/2 h-full">
              <Image
                src={url}
                alt="리뷰 이미지"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      );
    case 3:
      return (
        <div className="grid grid-cols-2 gap-2 h-48">
          <div className="relative h-full">
            <Image
              src={imageUrls[0]}
              alt="리뷰 이미지"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-rows-2 gap-2 h-full">
            <div className="relative">
              <Image
                src={imageUrls[1]}
                alt="리뷰 이미지"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="relative">
              <Image
                src={imageUrls[2]}
                alt="리뷰 이미지"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="grid grid-cols-2 gap-2 h-48">
          {imageUrls.map((url) => (
            <div key={url} className="relative h-full">
              <Image
                src={url}
                alt="리뷰 이미지"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
};