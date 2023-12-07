import React from "react";
import { BreadCrumb, CartCard, Meta } from "../components";
import { ButtonLink } from "../components/ui/ButtonLink";

const checkOutHeader = ["Products", "Quantity", "Price", "Remove"];

const Cart = () => {
  return (
    <>
      <Meta title="Cart" />

      <div className="w-full bg-[#f5f5f7]">
        <BreadCrumb text="Your Shopping Cart" />

        <div className="max-w-7xl mx-auto mt-8 pb-8">
          <div className="w-full flex justify-around items-center border-b mb-4 border-gray-300">
            {checkOutHeader.map(i => (
              <div key={i} className="first:w-1/2 font-semibold pb-4">
                {i}
              </div>
            ))}
          </div>

          <div className="pb-6">
            <CartCard />
            <CartCard />
          </div>

          <div className="border-t flex justify-between mb-10 border-gray-300">
            <div>
              <ButtonLink to="/store" text="CONTINUE SHOPPING" />
            </div>

            <div className="self-end space-y-3 mt-16">
              <p className="text-gray-500 font-semibold">
                Subtotal: <span className="font-bold ml-4 text-3xl">$200.00</span>
              </p>
              <p className="text-gray-500 text-sm">
                Tax and shipping are calculated at checkout.
              </p>
              <ButtonLink to="/checkout" text="CHECK OUT" mr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
