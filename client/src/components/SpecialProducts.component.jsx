import { Link, useNavigate } from "react-router-dom";
import Stars from "./ui/Stars";
import { useSelector, useDispatch } from "react-redux";
import { addWishList } from "../feature/products/productSlice";
import { toast } from "react-toastify";
import { Button } from "./ui/Button";
import { addItemToCart } from "../feature/user/userSlice";

const SpecialProducts = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, brand, price, quantity, totalRatings, images, sold, _id } =
    item;

  const {
    currentUser: { token, user },
  } = useSelector(({ auth }) => auth);
  const { isSuccess, message, isError } = useSelector(({ product }) => product);

  const addToWishlist = id => {
    dispatch(addWishList({ productId: id, token: token }));
    if (isSuccess) {
      toast.success(message);
    } else if (isError) {
      toast.error(message);
    }
  };

  return (
    <div className="col-span-4 flex bg-white shadow-lg rounded-md overflow-hidden p-4 group">
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute top-0 left-0 bg-[#febd69] rounded-xl py-1 px-2 text-xs group-hover:hidden font-semibold">
          -10%
        </div>
        <img
          src="/images/wishlist.svg"
          alt=""
          width={15}
          className="absolute top-0 right-3 z-10 invert cursor-pointer"
          onClick={() => addToWishlist(_id)}
        />
        <img
          src={images.length !== 0 ? images[0].url : "/images/tab.jpg"}
          alt=""
        />

        {/* add swiper here */}
        <div className="flex overflow-hidden gap-2">
          <img src="/images/tab1.jpg" alt="" width={70} className="border" />
          <img src="/images/tab3.jpg" alt="" width={70} className="border" />
        </div>

        <div className="absolute flex flex-col top-6 group-hover:right-3 space-y-2 -right-20 duration-500">
          <Link>
            <img
              src="/images/prodcompare.svg"
              alt=""
              width={15}
              className="cursor-pointer"
            />
          </Link>
          <div>
            <img
              onClick={() => navigate(`/store/${_id}`)}
              src="/images/view.svg"
              alt=""
              width={15}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="flex-1 mb-8 space-y-3">
        <p className="text-sm text-[#bf4800] font-semibold">{brand}</p>
        <h1 className="font-semibold">{title}</h1>

        <Stars size={20} val={totalRatings} />
        <p className="font-semibold text-[#bf4800]">
          ${price}{" "}
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
          <p className="text-xs text-gray-400 mb-1">Products: {quantity}</p>
          <div class="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
            <div
              class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
              style={{ width: `calc(${sold / quantity} * 100%)` }}
            ></div>
          </div>
        </div>
        <Button text="VIEW PRODUCT" onClick={() => navigate(`/store/${_id}`)} />
      </div>
    </div>
  );
};

export default SpecialProducts;
