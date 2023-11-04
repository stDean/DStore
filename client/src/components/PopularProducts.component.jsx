import React from "react";
import { ImgText } from "./ui/ImgText";

const data = [
  {
    text: "Smart Watch",
    imgPath: "fasion-watch.webp",
    active: true,
  },
  {
    text: "Speaker",
    imgPath: "speaker.jpg",
  },
  {
    text: "Laptops",
    imgPath: "laptop.jpg",
  },
];

const PopularProducts = ({ bg = false }) => {
  return (
    <div
      className={`col-span-2 rounded-lg shadow-lg overflow-hidden bg-white pt-3 px-2 ${
        bg && "background_img"
      }`}
    >
      {!bg ? (
        data.map(({ text, imgPath, active }) => (
          <ImgText key={text} text={text} imgPath={imgPath} active={active} />
        ))
      ) : (
        <div className="text-white py-6 px-3 flex flex-col items-start gap-2">
          <p className="text-xs">16% OFF</p>
          <h1 className="font-semibold text-xl">Home Speakers</h1>
          <p className="text-xs">
            From $399 or $16/mo. <br />
            <span>For 24 mo.*</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default PopularProducts;
