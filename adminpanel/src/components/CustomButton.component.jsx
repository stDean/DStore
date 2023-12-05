import React from "react";

const CustomButton = ({ title, ...rest }) => {
  return (
    <button
      className="mt-4 border-0 bg-green-600 px-4 text-white py-2 rounded-md font-semibold hover:bg-green-700 cursor-pointer"
      {...rest}
    >
      {title}
    </button>
  );
};

export default CustomButton;
