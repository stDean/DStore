import React from "react";

const CheckoutCart = () => {
  return (
    <div className="mb-4 flex items-center gap-10 last:border-b last:pb-8">
      <div className="w-20 border rounded-md relative">
        <img src="/images/tab.jpg" alt="" className="overflow-hidden" />

        <div className="rounded-full bg-gray-500 absolute -top-2 -right-1 text-white flex items-center justify-center text-xs w-5 h-5">
          1
        </div>
      </div>

      <div className="text-sm space-y-1 flex justify-between items-center w-full gap-10">
        <div className="space-y-2">
          <p className="font-semibold">The title of the product.</p>
          <p className="text-xs text-gray-400">S / Black</p>
        </div>

        <div>
          <p className="font-semibold text-base">$100.00</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCart;
