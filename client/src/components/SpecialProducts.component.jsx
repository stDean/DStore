import ReactStars from "react-rating-stars-component";
import { Button } from "./ui/Button";
import { Link } from "react-router-dom";

const SpecialProducts = () => {
  return (
    <div className="col-span-4 flex bg-white shadow-lg rounded-md overflow-hidden p-4 group">
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute top-0 left-0 bg-[#febd69] rounded-xl py-1 px-2 text-xs group-hover:hidden font-semibold">
          -10%
        </div>
        <img
          src="images/wishlist.svg"
          alt=""
          width={15}
          className="absolute top-0 right-3 z-10 invert"
        />
        <img src="images/tab.jpg" alt="" />

        {/* add swiper here */}
        <div className="flex overflow-hidden gap-2">
          <img src="images/tab1.jpg" alt="" width={70} className="border" />
          <img src="images/tab3.jpg" alt="" width={70} className="border" />
        </div>

        <div className="absolute flex flex-col top-6 group-hover:right-3 space-y-2 -right-20 duration-500">
          <Link>
            <img src="images/prodcompare.svg" alt="" width={15} />
          </Link>
          <Link>
            <img src="images/view.svg" alt="" width={15} />
          </Link>
        </div>
      </div>
      <div className="flex-1 mb-8 space-y-3">
        <p className="text-sm text-[#bf4800] font-semibold">Sony</p>
        <h1 className="font-semibold">Samsung Galaxy Tab A SM-T295, 4G</h1>
        <ReactStars
          count={5}
          value="3"
          edit={false}
          activeColor="#ffd700"
          size={20}
        />
        <p className="font-semibold text-[#bf4800]">
          $16.00{" "}
          <span className="line-through text-gray-400 font-light">$25.00</span>
        </p>
        <p className="text-sm text-gray-400">
          <span className="font-semibold text-black mr-2">256</span> Days{" "}
          <span className="text-white rounded-full bg-[#fc353c] p-1 text-xs ml-2">
            05
          </span>{" "}
          :{" "}
          <span className="text-white rounded-full bg-[#fc353c] p-1 text-xs">
            25
          </span>{" "}
          :{" "}
          <span className="text-white rounded-full bg-[#fc353c] p-1 text-xs">
            20
          </span>
        </p>
        <div className="flex flex-col gap-0">
          <p className="text-xs text-gray-400 mb-1">Products: 200</p>
          <div class="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
            <div
              class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
              style={{ width: "45%" }}
            ></div>
          </div>
        </div>
        <Button text="ADD TO CART" />
      </div>
    </div>
  );
};

export default SpecialProducts;
