import React from "react";
import { ButtonLink } from "./ui/ButtonLink";

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
        {button && <ButtonLink text="BUY NOW" />}
      </div>
    </div>
  );
};

export default Banner;
