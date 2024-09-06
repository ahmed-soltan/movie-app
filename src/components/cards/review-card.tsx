import { baseImageUrl } from "@/shared/flags";
import { Review } from "@/types";
import { formatDistance } from "date-fns";
import unknown from "../../assets/unknown.jpeg";
import { useState } from "react";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const [chars, setChars] = useState(500);

  const increaseLength = () => {
    setChars(review.content.split(" ").join("").length);
  };

  const decreaseLength = () => {
    setChars(200);
  };

  return (
    <div className="flex items-start gap-2">
      <img
        src={
          review.author_details.avatar_path
            ? `${baseImageUrl}${review.author_details.avatar_path}`
            : unknown
        }
        alt=""
        className="w-10 h-10 rounded-full"
        loading="lazy"
      />
      <div className="flex flex-col items-start gap-2">
        <div>
          <span className="text-base text-[#999] font-semibold">
            {review.author}
          </span>
          <span className="text-xs text-[#888] flex gap-2">
            {formatDistance(new Date(review.created_at), new Date(), {
              addSuffix: true,
            })}
          </span>
        </div>
        <p className="text-sm text-[#777]">
          {review.content.slice(0, chars)}{" "}
          {chars < review.content.split(" ").join("").length && (
            <span
              className="text-[#8656c9] hover:underline cursor-pointer"
              onClick={increaseLength}
            >
              ...Read More
            </span>
          )}
          {chars === review.content.split(" ").join("").length && (
            <span
              className="text-[#8656c9] hover:underline cursor-pointer"
              onClick={decreaseLength}
            >
              ...Read Less
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
