import React from "react";
import Stars from "./Stars";
import { Button } from "./Button";

const ReviewForm = () => {
  return (
    <div className="py-4 border-b w-full">
      <form action="" className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="email">
            Rating
            <Stars size={15} />
          </label>
        </div>

        <div className="flex flex-col">
          <p>Comment(1500)</p>
          <textarea
            name="comment"
            id="comment"
            cols="30"
            rows="5"
            placeholder="write comment here"
            className="border rounded-md outline-none border-black p-3 w-full mt-1"
          ></textarea>
        </div>

        <div className="flex justify-end">
          <Button text="SUBMIT REVIEW" mr />
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
