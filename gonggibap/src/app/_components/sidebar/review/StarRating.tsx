import { MdOutlineStar } from "react-icons/md";

export const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <MdOutlineStar
          key={star}
          className={star <= rating ? "text-[#FF7058]" : "text-gray-300"}
          size={18}
        />
      ))}
    </div>
  );
};
