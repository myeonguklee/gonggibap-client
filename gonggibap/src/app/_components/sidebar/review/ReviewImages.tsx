// RestaurantImageGallery.tsx
import Image from 'next/image';

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
            className="rounded-lg object-cover"
          />
        </div>
      );
    case 2:
      return (
        <div className="flex h-48 gap-2">
          {imageUrls.map((url) => (
            <div key={url} className="relative h-full w-1/2">
              <Image
                src={url}
                alt="리뷰 이미지"
                fill
                className="rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
      );
    case 3:
      return (
        <div className="grid h-48 grid-cols-2 gap-2">
          <div className="relative h-full">
            <Image
              src={imageUrls[0]}
              alt="리뷰 이미지"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="grid h-full grid-rows-2 gap-2">
            <div className="relative">
              <Image
                src={imageUrls[1]}
                alt="리뷰 이미지"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="relative">
              <Image
                src={imageUrls[2]}
                alt="리뷰 이미지"
                fill
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="grid h-48 grid-cols-2 gap-2">
          {imageUrls.map((url) => (
            <div key={url} className="relative h-full">
              <Image
                src={url}
                alt="리뷰 이미지"
                fill
                className="rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
};
