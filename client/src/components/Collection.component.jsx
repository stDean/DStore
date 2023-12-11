import { Link, useNavigate } from "react-router-dom";
import Stars from "./ui/Stars";
import { useSelector, useDispatch } from "react-redux";
import { addWishList } from "../feature/products/productSlice";
import { toast } from "react-toastify";

const Collection = ({ layout, item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { brand, category, desc, price, totalRatings, images, _id } = item;

  const { currentUser } = useSelector(({ auth }) => auth);
  const { isSuccess, message, isError } = useSelector(({ product }) => product);

  const token = currentUser?.token;

  const addToWishlist = id => {
    dispatch(addWishList({ productId: id, token: token }));
    if (isSuccess) {
      toast.success(message);
    } else if (isError) {
      toast.error(message);
    }
  };

  return (
    <div
      className={`${
        layout ? layout : "col-span-2"
      } group p-4 relative bg-white rounded-lg shadow-lg overflow-hidden ${
        layout === "col-span-10" ? "flex gap-3 w-full" : ""
      }`}
    >
      <div onClick={() => addToWishlist(_id)}>
        <img
          src="/images/wishlist.svg"
          alt=""
          width={15}
          className="absolute top-3 right-3 z-10 invert cursor-pointer"
        />
      </div>

      <div
        className={`flex item-center ${
          layout === "col-span-10" || layout === "col-span-5"
            ? "flex-row w-full"
            : "flex-col"
        }`}
      >
        <div
          className={`bg-green-200 group/edit h-full shrink-0 ${
            layout === "col-span-10"
              ? "w-1/5"
              : layout === "col-span-5"
              ? "w-1/3"
              : "w-full"
          }`}
        >
          <img
            src={images[0]?.url}
            alt=""
            className="group-hover/edit:hidden w-full h-full"
          />
          <img
            src="/images/tab1.jpg"
            alt=""
            className="hidden group-hover/edit:block w-full h-full"
          />
        </div>

        <div
          className={`mt-3 ${
            layout === "col-span-10" ? "space-y-1 ml-3" : "space-y-3 ml-3"
          }`}
        >
          <p className="text-xs font-semibold" style={{ color: "#bf4800" }}>
            {brand}
          </p>
          <Link
            to="/store/:id"
            className={`font-semibold ${
              layout === "col-span-10" ? "text-sm" : "text-xs"
            }`}
          >
            {category}
          </Link>
          <Stars size={20} val={totalRatings} />

          {layout === "col-span-10" && (
            <p className="text-xs pb-4 text-gray-500">{desc}</p>
          )}

          <p className="text-sm font-semibold text-blue-300">${price}</p>
        </div>
      </div>

      <div className="absolute flex flex-col top-10 group-hover:right-3 space-y-3 -right-20 duration-500">
        <Link>
          <img src="/images/prodcompare.svg" alt="" width={15} />
        </Link>
        <div>
          <img
            src="/images/view.svg"
            alt=""
            width={15}
            onClick={() => navigate(`/store/${_id}`)}
            className="cursor-pointer"
          />
        </div>
        <Link>
          <img src="/images/add-cart.svg" alt="" width={15} />
        </Link>
      </div>
    </div>
  );
};

export default Collection;
