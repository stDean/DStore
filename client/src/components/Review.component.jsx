import { useState } from "react";
import Comments from "./ui/Comments";
import ReviewForm from "./ui/ReviewForm";
import Stars from "./ui/Stars";

const Review = ({ product, token }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between border-b pb-6">
        <div className="space-y-2">
          <p className="text-lg font-semibold">Customer Review</p>
          <div className="flex items-center gap-2">
            <Stars size={15} val={product?.totalRatings} />
            <p className="text-xs text-gray-500">
              Based on ({product?.ratings?.length}) review
            </p>
          </div>
        </div>

        {token && (
          <p
            className="cursor-pointer hover:underline-offset-2 hover:underline self-end"
            onClick={() => {
              setOpen(open => !open);
            }}
          >
            write a review
          </p>
        )}
      </div>

      {open && <ReviewForm />}

      {product?.ratings?.length !== 0 &&
        product.ratings?.map(rating => (
          <Comments
            key={rating?._id}
            comment={rating?.comment}
            val={rating?.star}
          />
        ))}
    </div>
  );
};

export default Review;
