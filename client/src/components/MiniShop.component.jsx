import React from "react";

const MiniShop = ({ imgPath, title, subtitle }) => {
  return (
    <div
      className="col-span-2 row-span-1 border-r border-b grid__item flex items-center justify-around"
      style={{ color: "#ededed" }}
    >
      <div>
        <p className="font-semibold text-sm mb-1 text-black">{title}</p>
        <p className="text-xs text-black">{subtitle}</p>
      </div>
      <img src={imgPath} alt="" />
    </div>
  );
};

export default MiniShop;
