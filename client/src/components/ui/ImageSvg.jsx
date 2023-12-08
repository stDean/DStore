import React from "react";

export const ImageSvg = ({ imgUrl, handleRemove }) => {
  return (
    <div className="w-full bg-white rounded-md flex items-center justify-center p-6 mb-1 relative overflow-hidden">
      <img src={imgUrl ? imgUrl : "/images/speaker.jpg"} alt="" width={150} />

      {/* add the remove button */}
      <div onClick={handleRemove}>
        <img
          src="/images/cross.svg"
          alt=""
          className="absolute top-3 cursor-pointer right-3 w-3"
        />
      </div>
    </div>
  );
};
