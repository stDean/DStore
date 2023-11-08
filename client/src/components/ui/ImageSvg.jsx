import React from "react";

export const ImageSvg = () => {
  return (
    <div className="w-full bg-white rounded-md flex items-center justify-center p-6 mb-1 relative overflow-hidden">
      <img src="images/speaker.jpg" alt="" width={150} />

      {/* add the remove button */}
      <img
        src="images/cross.svg"
        alt=""
        className="absolute top-3 cursor-pointer right-3 w-3"
      />
    </div>
  );
};
