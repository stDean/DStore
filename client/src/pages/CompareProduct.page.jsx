import React from "react";
import { BreadCrumb, CompareCard, Meta } from "../components";

const CompareProduct = () => {
  return (
    <>
      <Meta title="Blog" />
      <div className="w-full bg-[#f5f5f7]">
        <BreadCrumb text="Compare Products" />

        <div className="max-w-7xl mx-auto mt-8 pb-8 grid grid-cols-12 gap-4">
          <CompareCard
            title="Sony Portable Bluetooth Speaker"
            newPrice="270"
            prevPrice="$350"
          />
          <CompareCard
            title="Sony Portable Bluetooth Speaker"
            newPrice="270"
            prevPrice="$350"
          />
          <CompareCard title="Sony Portable Bluetooth Speaker" newPrice="370" />
        </div>
      </div>
    </>
  );
};

export default CompareProduct;
