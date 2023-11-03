import React from "react";

const Banner = ({
  title,
  headText,
  amtText,
  moText,
  imgPath,
  button,
  small,
  ...rest
}) => {
  return (
    <div {...rest}>
      <img src={imgPath} alt="" className="rounded-md" />
      <div
        className={`content absolute top-14 left-10 ${small && "top-6 left-4"}`}
      >
        <p className={`content_p text-sm ${small && ""}`}>{title}</p>
        <h1
          className={`text-3xl font-semibold leading-8 my-4 ${
            small && "text-xl leading-3"
          }`}
        >
          {headText}
        </h1>
        <p className={`text-sm ${small && "text-xs"}`}>
          {amtText} <br /> {moText}
        </p>
        {button && (
          <button className="py-2 px-5 rounded-3xl bg-[#232f3e] text-xs text-white mt-8">
            BUY NOW
          </button>
        )}
      </div>
    </div>
  );
};

export default Banner;
