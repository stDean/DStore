import React from "react";
import { Price } from "./ui/Price";
import { Link } from "react-router-dom";
import { ImageSvg } from "./ui/ImageSvg";

const WishlistCard = ({ title, price, prevPrice, imgUrl, handleRemove }) => {
  return (
    <div className="col-span-2">
      <ImageSvg imgUrl={imgUrl} handleRemove={handleRemove} />

      <div className=" shadow-lg rounded-md p-3">
        <Link>
          <h1 className="text-sm font-semibold hover:underline">{title}</h1>
        </Link>

        <Price price={price} prevPrice={prevPrice} />
      </div>
    </div>
  );
};

export default WishlistCard;
