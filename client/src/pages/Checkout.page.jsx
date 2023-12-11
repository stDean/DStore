import { Link } from "react-router-dom";
import { CheckoutCart } from "../components";
import { MdKeyboardBackspace } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { processUserOrder } from "../feature/user/userSlice";

const Checkout = () => {
  const dispatch = useDispatch();

  const { userCart, userOrder, isSuccess, isError } = useSelector(
    ({ user }) => user
  );
  const {
    currentUser: { token },
  } = useSelector(({ auth }) => auth);
  const [total, setTotal] = useState(0);
  const shipping = 20;

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < userCart.length; i++) {
      sum += Math.floor(Number(userCart[i].quantity * userCart[i].price));
    }
    setTotal(sum);
  }, [userCart]);

  const [cartProduct, setCartProduct] = useState([]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
    onSubmit: async values => {
      dispatch(
        processUserOrder({
          token,
          data: {
            shippingInfo: {
              firstName: values.firstName,
              lastName: values.lastName,
              address: values.address,
              city: values.city,
              state: values.state,
              zipCode: values.zipCode,
            },
            orderItems: cartProduct,
            totalPrice: total,
            totalPriceAfterDiscount: total,
            paymentInfo: {
              razorPayOrderId: "6542cc0838a52934e6af3fc1",
              razorPayPaymentId: "656f257a9491fae78847e570",
            },
          },
        })
      );

      if (userOrder && isSuccess) {
        toast.success("Order Created Successfully");
        formik.resetForm();
      } else if (isError) {
        toast.error("something went wrong");
      }
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zipCode: Yup.number().required("Zip Code is required"),
    }),
  });

  useEffect(() => {
    let item = [];
    for (let i = 0; i < userCart.length; i++) {
      item.push({
        product: userCart[i].product._id,
        quantity: userCart[i].quantity,
        color: userCart[i].color._id,
        price: userCart[i].price,
      });
    }

    setCartProduct(item);
  }, [userCart]);

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

        <form action="" onSubmit={formik.handleSubmit}>
          <p className="text-lg mb-2 mt-6">Shipping Information</p>

          <div className="grid grid-cols-12 gap-4">
            {/* <div className="w-full border border-gray-500 px-3 py-2 group rounded-md col-span-12">
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
            </div> */}

            <div
              className={`w-full border border-gray-500 px-3 py-2 group rounded-md col-span-6 ${
                formik.errors.zipCode ? "border border-red-500" : ""
              }`}
            >
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="border-none outline-none w-full placeholder:text-sm"
                placeholder="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
            </div>

            <div
              className={`w-full border border-gray-500 px-3 py-2 group rounded-md col-span-6 ${
                formik.errors.zipCode ? "border border-red-500" : ""
              }`}
            >
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="border-none outline-none w-full placeholder:text-sm"
                placeholder="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
            </div>

            <div
              className={`w-full border border-gray-500 px-3 py-2 group rounded-md col-span-12 ${
                formik.errors.zipCode ? "border border-red-500" : ""
              }`}
            >
              <input
                type="text"
                id="address"
                name="address"
                className="border-none outline-none w-full placeholder:text-sm"
                placeholder="New Address"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
            </div>

            <div
              className={`w-full border border-gray-500 px-3 py-2 group rounded-md col-span-4 ${
                formik.errors.zipCode ? "border border-red-500" : ""
              }`}
            >
              <input
                type="text"
                id="city"
                name="city"
                className="border-none outline-none w-full placeholder:text-sm"
                placeholder="City"
                value={formik.values.city}
                onChange={formik.handleChange}
              />
            </div>

            <div
              className={`w-full border border-gray-500 px-3 py-2 group rounded-md col-span-4 ${
                formik.errors.zipCode ? "border border-red-500" : ""
              }`}
            >
              <input
                type="text"
                id="state"
                name="state"
                className="border-none outline-none w-full placeholder:text-sm"
                placeholder="State"
                value={formik.values.state}
                onChange={formik.handleChange}
              />
            </div>

            <div
              className={`w-full border border-gray-500 px-3 py-2 group rounded-md col-span-4 ${
                formik.errors.zipCode ? "border border-red-500" : ""
              }`}
            >
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                className={`border-none outline-none w-full placeholder:text-sm`}
                placeholder="ZIP code"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="mt-10 flex justify-between items-center">
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
          {userCart?.map(cart => (
            <CheckoutCart key={cart._id} cart={cart} />
          ))}
        </div>

        <div className="space-y-2 border-b pb-8 pt-2">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p className="font-semibold ">${total}</p>
          </div>

          <div className="flex justify-between">
            <p>Shipping</p>
            <p className="font-semibold ">${shipping}</p>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <p className="font-semibold">Total</p>
          <p className="font-semibold text-3xl">
            <span className="text-sm text-gray-400 font-normal mr-3">USD</span>$
            {total + shipping}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
