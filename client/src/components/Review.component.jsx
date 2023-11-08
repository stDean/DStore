import { useState } from "react";
import Comments from "./ui/Comments";
import ReviewForm from "./ui/ReviewForm";
import Stars from "./ui/Stars";

const Review = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between border-b pb-6">
        <div className="space-y-2">
          <p className="text-lg font-semibold">Customer Review</p>
          <div className="flex items-center gap-2">
            <Stars size={15} />
            <p className="text-xs text-gray-500">Based on review</p>
          </div>
        </div>

        <p
          className="cursor-pointer hover:underline-offset-2 hover:underline self-end"
          onClick={() => {
            setOpen(open => !open);
          }}
        >
          write a review
        </p>
      </div>

      {open && <ReviewForm />}

      <Comments
        comment="This is the main comment"
        commentBy="dean"
        commentDate="Jan 20, 2024"
      />

      <Comments
        comment="This is the main comment"
        commentBy="dean"
        commentDate="Jan 20, 2024"
      />
    </div>
  );
};

export default Review;
