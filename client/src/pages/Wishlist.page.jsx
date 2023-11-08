import React from "react";
import { BreadCrumb, Meta, WishlistCard } from "../components";

const Wishlist = () => {
  return (
    <>
      <Meta title="Wishlist" />

      <div className="w-full bg-[#f5f5f7]">
        <BreadCrumb text="Wishlist" />

        <div className="max-w-7xl mx-auto mt-8 pb-8 grid grid-cols-12 gap-4">
          <WishlistCard title="Sony Portable Bluetooth Speaker" price="300" />
        </div>
      </div>
    </>
  );
};

export default Wishlist;
