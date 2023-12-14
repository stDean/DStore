import { useEffect, useState } from "react";
import { BreadCrumb, CartCard, Meta } from "../components";
import { ButtonLink } from "../components/ui/ButtonLink";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../feature/user/userSlice";

const checkOutHeader = ["Products", "Quantity", "Price", "Remove"];

const Cart = () => {
  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);
  const {
    currentUser: { token },
  } = useSelector(({ auth }) => auth);
  const { userCart, message } = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(getUserCart({ token }));
  }, [dispatch, message, token]);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < userCart.length; i++) {
      sum += Math.floor(Number(userCart[i].quantity * userCart[i].price));
    }
    setTotal(sum);
    dispatch(getUserCart({ token }));
  }, [dispatch, userCart, token]);

  if (userCart.length === 0) {
    return <div className="text-center text-xl my-4">Your cart is empty!!</div>;
  }

  return (
    <>
      <Meta title="Cart" />

      <div className="w-full bg-[#f5f5f7]">
        <BreadCrumb text="Your Shopping Cart" />

        <div className="max-w-7xl mx-auto mt-8 pb-8">
          <div className="w-full flex justify-around items-center border-b mb-4 border-gray-300">
            {checkOutHeader.map((i, idx) => (
              <div
                key={`${i} - ${idx}`}
                className="first:w-1/2 font-semibold pb-4"
              >
                {i}
              </div>
            ))}
          </div>

          <div className="pb-6">
            {userCart?.map(cart => (
              <CartCard key={cart._id} cart={cart} token={token} />
            ))}
          </div>

          <div className="border-t flex justify-between mb-10 border-gray-300">
            <div>
              <ButtonLink to="/store" text="CONTINUE SHOPPING" />
            </div>

            <div className="self-end space-y-3 mt-16">
              <p className="text-gray-500 font-semibold">
                Subtotal:{" "}
                <span className="font-bold ml-4 text-3xl">${total}</span>
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
