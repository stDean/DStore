import React from "react";
import Stars from "./Stars";

const Comments = ({ comment, commentBy, commentDate }) => {
  return (
    <div className="py-6 flex items-center justify-between border-b last:border-none">
      <div className="">
        <p className="text-sm font-semibold text-black pb-2">
          {commentBy}
          <span className="text-gray-500 text-xs"> on </span> {commentDate}
        </p>
        <Stars size={15} />
        <p className="text-sm pt-2">{comment}</p>
      </div>

      <p className="self-end cursor-pointer hover:underline-offset-2 hover:underline">
        report as inappropriate
      </p>
    </div>
  );
};

export default Comments;
