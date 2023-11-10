import { Link } from "react-router-dom";
import { CheckoutCart } from "../components";
import { MdKeyboardBackspace } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";

const Checkout = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 border-r border-gray-500 ml-36 pt-20 pb-16 pr-20">
        <h1 className="text-3xl font-semibold">DStores</h1>

        <div className="mt-2 flex items-center gap-2 text-sm">
          <p className="flex items-center gap-2 font-semibold">
            cart <BsArrowRight />
          </p>
          <p className="flex items-center gap-2">
            information <BsArrowRight />
          </p>
          <p className="flex items-center gap-2">
            shipping <BsArrowRight />
          </p>
          <p className="flex items-center gap-2">payment</p>
        </div>

        <div className="mt-8">
          <h2 className="text-lg mb-2 font-semibold">Contact Information</h2>
          <p className="text-sm">Dean (dean_96@hotmail.com)</p>
          <p className="text-sm">Logout</p>
        </div>

        <form action="">
          <p className="text-lg mb-2 mt-6">Shipping Information</p>

          <div className="grid grid-cols-12 gap-4">
            <div className="w-full border border-gray-500 px-3 py-2 group rounded-md col-span-12">
              <select
                name="savedAddresses"
                id=""
                className="border-none outline-none w-full placeholder:text-sm"
              >
                <option value="opt1">Option 1</option>
                <option value="opt2">Option 2</option>
                <option value="opt3">Option 3</option>
                <option value="opt4">Option 4</option>
              </select>
            </div>

            <div className="w-full border border-gray-500 px-3 py-2 group rounded-md col-span-12">
              <input
                type="text"
                id="country"
                name="country"
                className="border-none outline-none w-full placeholder:text-sm"
                placeholder="Countries / Regions"
              />
            </div>

            <div className="w-full border border-gray-500 px-3 py-2 group rounded-md col-span-6">
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="border-none outline-none w-full placeholder:text-sm"
                placeholder="First Name"
              />
            </div>

            <div className="w-full border border-gray-500 px-3 py-2 group rounded-md col-span-6">
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="border-none outline-none w-full placeholder:text-sm"
                placeholder="Last Name"
              />
            </div>

            <div className="w-full border border-gray-500 px-3 py-2 group rounded-md col-span-12">
              <input
                type="text"
                id="address"
                name="address"
                className="border-none outline-none w-full placeholder:text-sm"
                placeholder="New Address"
              />
            </div>

            <div className="w-full border border-gray-500 px-3 py-2 group rounded-md col-span-4">
              <input
                type="text"
                id="city"
                name="city"
                className="border-none outline-none w-full placeholder:text-sm"
                placeholder="City"
              />
            </div>

            <div className="w-full border border-gray-500 px-3 py-2 group rounded-md col-span-4">
              <select
                name="state"
                id=""
                className="border-none outline-none w-full placeholder:text-sm"
              >
                <option value="opt1">Option 1</option>
                <option value="opt2">Option 2</option>
                <option value="opt3">Option 3</option>
                <option value="opt4">Option 4</option>
              </select>
            </div>

            <div className="w-full border border-gray-500 px-3 py-2 group rounded-md col-span-4">
              <input
                type="text"
                id="zip"
                name="zip"
                className="border-none outline-none w-full placeholder:text-sm"
                placeholder="ZIP code"
              />
            </div>
          </div>

          <div className="mt-5 flex justify-between items-center">
            <Link
              className="flex items-center gap-2 border rounded-lg hover:opacity-75 px-4 py-2"
              to="/cart"
            >
              <MdKeyboardBackspace /> back to cart
            </Link>
            <button className="px-4 py-2 rounded-md text-white bg-red-500 border-none">
              Continue To Shipping
            </button>
          </div>
        </form>
      </div>
      <div className="flex-1 w-full bg-gray-50 pl-10 pt-20 pb-16 pr-36">
        <div>
          <CheckoutCart />
          <CheckoutCart />
          <CheckoutCart />
        </div>

        <div className="space-y-2 border-b pb-8 pt-2">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p className="font-semibold ">$200</p>
          </div>

          <div className="flex justify-between">
            <p>Shipping</p>
            <p className="font-semibold ">$20</p>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <p className="font-semibold">Total</p>
          <p className="font-semibold text-3xl">
            <span className="text-sm text-gray-400 font-normal mr-3">USD</span>
            $220
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
