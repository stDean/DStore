import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const Collection = () => {
  return (
    <Link className="col-span-2 group p-4 relative bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        src="images/wishlist.svg"
        alt=""
        width={15}
        className="absolute top-3 right-3 z-10 invert"
      />

      <div className="flex flex-col item-center">
        <div className="w-full bg-green-200 group/edit">
          <img
            src="images/tab.jpg"
            alt=""
            className="group-hover/edit:hidden"
          />
          <img
            src="images/tab1.jpg"
            alt=""
            className="hidden group-hover/edit:block"
          />
        </div>

        <div className="space-y-3 mt-3">
          <p className="text-xs font-semibold" style={{ color: "#bf4800" }}>
            Havilis
          </p>
          <h1 className="font-semibold text-xs">
            Milanese Loop Watch Band For 42mm/44mm Apple...
          </h1>
          <ReactStars
            count={5}
            value="3"
            edit={false}
            activeColor="#ffd700"
            size={24}
          />
          <p className="text-sm font-semibold text-blue-300">$100.00</p>
        </div>
      </div>

      <div className="absolute flex flex-col top-10 group-hover:right-3 space-y-3 -right-20 duration-500">
        <Link>
          <img src="images/prodcompare.svg" alt="" width={15} />
        </Link>
        <Link>
          <img src="images/view.svg" alt="" width={15} />
        </Link>
        <Link>
          <img src="images/add-cart.svg" alt="" width={15} />
        </Link>
      </div>
    </Link>
  );
};

export default Collection;
