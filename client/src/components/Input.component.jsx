import React from "react";

const Input = ({ ...restProp }) => {
  return (
    <input
      {...restProp}
      className="w-full bg-gray-100 text-xs p-2 outline-none rounded-md"
    />
  );
};

export default Input;
