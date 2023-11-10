import React from "react";
import QuantityBtn from "./QuantityBtn.component";
import { BsTrash } from "react-icons/bs";

const CartCard = () => {
  return (
    <div className="mb-5 flex w-full justify-around items-center">
      <div className="flex w-1/2 items-center">
        <img src="/images/tab.jpg" alt="" width={150} className="rounded-md" />

        <div className="text-sm text-graay-400 space-y-3 ml-4 text-gray-500">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure quia
            quis aliquam voluptatibus suscipit hic iste officia!
          </p>

          <p>Size: M</p>
          <p>Color: Black</p>
        </div>
      </div>

      <QuantityBtn />

      <div className="w-10 font-semibold">
        <p>$100</p>
      </div>

      <div className="bg-[#3b4149] rounded-full p-2 cursor-pointer hover:opacity-90">
        <BsTrash className="invert" />
      </div>
    </div>
  );
};

export default CartCard;
