import { Link } from "react-router-dom";
import SpacedText from "./ui/SpacedText";
import { ImageSvg } from "./ui/ImageSvg";
import { Price } from "./ui/Price";

const CompareCard = ({ title, prevPrice, newPrice }) => {
  return (
    <div className="col-span-2">
      <ImageSvg />

      <div className=" shadow-lg rounded-md p-3">
        <Link>
          <h1 className="text-sm font-semibold hover:underline">{title}</h1>
        </Link>

        <Price price={newPrice} prevPrice={prevPrice} />

        <SpacedText title="Brand" subTitle="Sony" />
        <SpacedText title="Type" subTitle="Speaker" />
        <SpacedText title="SKU" subTitle="SKU004" />
        <SpacedText title="Availability" subTitle="InStock" />
        <SpacedText title="Color" color={["black", "blue", "red"]} />
        <SpacedText title="Size" size={["S", "L", "XL"]} />
      </div>
    </div>
  );
};

export default CompareCard;
