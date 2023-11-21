import React from "react";

const CustomButton = ({ title }) => {
  return (
    <button className="mt-4 border-0 bg-green-600 px-4 text-white py-2 rounded-md font-semibold hover:bg-green-700">
      {title}
    </button>
  );
};

export default CustomButton;
