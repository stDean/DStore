import React from "react";

export const Price = ({ price, prevPrice }) => {
  return (
    <p
      className={`border-b pt-3 pb-1 ${
        prevPrice ? "text-red-600" : "text-black"
      } text-sm font-semibold`}
    >
      ${price}{" "}
      <span className="line-through font-normal text-gray-500 text-xs">
        {prevPrice}
      </span>
    </p>
  );
};
