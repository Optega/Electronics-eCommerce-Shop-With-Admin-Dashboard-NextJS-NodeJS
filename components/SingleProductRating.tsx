// *********************
// Role of the component: Rating stars component that will display stars on the single product page
// Name of the component: SingleProductRating.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <SingleProductRating rating={rating} />
// Input parameters: { rating: number }
// Output: full colored star icons and outlined star icons depending on the ratingArray element("empty star" or "full star")
// *********************

import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const getTextByReviewsCount = (reviewsCount: number) => {
  const lastDigit = reviewsCount % 10;
  if (lastDigit === 1 && reviewsCount !== 11) {
    return "відгук";
  } else if (
    lastDigit >= 2 &&
    lastDigit <= 4 &&
    (reviewsCount < 10 || reviewsCount > 20)
  ) {
    return "відгуки";
  } else {
    return "відгуків";
  }
};

const SingleProductRating = ({
  rating,
  reviewsCount,
}: {
  rating: number;
  reviewsCount: number;
}) => {
  const ratingArray: Array<string> = [
    "empty star",
    "empty star",
    "empty star",
    "empty star",
    "empty star",
  ];

  // going through product rating and modifying rating state
  for (let i = 0; i < rating; i++) {
    ratingArray[i] = "full star";
  }
  return (
    <div className="flex text-2xl items-center max-[500px]:justify-center">
      {ratingArray &&
        ratingArray.map((singleRating) => {
          return (
            <>
              {singleRating === "full star" ? (
                <AiFillStar className="text-custom-yellow" />
              ) : (
                <AiOutlineStar className="text-custom-yellow" />
              )}
            </>
          );
        })}
      <span className="text-xl ml-1">{`(${reviewsCount} ${getTextByReviewsCount(
        reviewsCount
      )})`}</span>
    </div>
  );
};

export default SingleProductRating;
