import { Link } from "react-router-dom";
import Stars from "./ui/Stars";

const Collection = ({ layout }) => {
  return (
    <div
      className={`${
        layout ? layout : "col-span-2"
      } group p-4 relative bg-white rounded-lg shadow-lg overflow-hidden ${
        layout === "col-span-10" ? "flex" : ""
      }`}
    >
      <img
        src="/images/wishlist.svg"
        alt=""
        width={15}
        className="absolute top-3 right-3 z-10 invert"
      />

      <div
        className={`flex item-center ${
          layout === "col-span-10" || layout === "col-span-5"
            ? "flex-row"
            : "flex-col"
        }`}
      >
        <div
          className={`bg-green-200 group/edit ${
            layout === "col-span-10"
              ? "w-1/3"
              : layout === "col-span-5"
              ? "w-1/2"
              : "w-full"
          }`}
        >
          <img
            src="/images/tab.jpg"
            alt=""
            className="group-hover/edit:hidden"
          />
          <img
            src="/images/tab1.jpg"
            alt=""
            className="hidden group-hover/edit:block"
          />
        </div>

        <div
          className={`mt-3 ${
            layout === "col-span-10" ? "space-y-1" : "space-y-3"
          }`}
        >
          <p className="text-xs font-semibold" style={{ color: "#bf4800" }}>
            Havilis
          </p>
          <Link
            to="/store/:id"
            className={`font-semibold ${
              layout === "col-span-10" ? "text-sm" : "text-xs"
            }`}
          >
            Milanese Loop Watch Band For 42mm/44mm Apple
          </Link>
          <Stars size={20} />

          {layout === "col-span-10" && (
            <p className="text-xs pb-4 text-gray-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              quia incidunt itaque laudantium aliquid reprehenderit! Ex
              perferendis, aperiam itaque suscipit inventore qui nam quod, id a
              odio ullam nisi aliquid!
            </p>
          )}

          <p className="text-sm font-semibold text-blue-300">$100.00</p>
        </div>
      </div>

      <div className="absolute flex flex-col top-10 group-hover:right-3 space-y-3 -right-20 duration-500">
        <Link>
          <img src="/images/prodcompare.svg" alt="" width={15} />
        </Link>
        <Link>
          <img src="/images/view.svg" alt="" width={15} />
        </Link>
        <Link>
          <img src="/images/add-cart.svg" alt="" width={15} />
        </Link>
      </div>
    </div>
  );
};

export default Collection;
