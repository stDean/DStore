import { useEffect, useState } from "react";
import QuantityBtn from "./QuantityBtn.component";
import { BsTrash } from "react-icons/bs";
import { Color } from "./ui/Color";
import { useDispatch, useSelector } from "react-redux";
import { removeUserCart, updateQuantity } from "../feature/user/userSlice";
import { toast } from "react-toastify";

const CartCard = ({ cart, token }) => {
  const dispatch = useDispatch();
  const { color, price, quantity, product, _id } = cart;
  const [userQuantity, setUserQuantity] = useState(quantity);

  const { isError, isSuccess, updateCart } = useSelector(({ user }) => user);

  const removeItem = () => {
    dispatch(removeUserCart({ token, cartId: _id }));
    if (isSuccess) {
      toast.success("Cart Item Removed");
    } else if (isError) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    dispatch(updateQuantity({ token, cartId: _id, quantity: userQuantity }));
  }, [dispatch, userQuantity, _id, token]);

  return (
    <div className="mb-5 flex w-full justify-around items-center">
      <div className="flex w-1/2 items-center">
        <img src="/images/tab.jpg" alt="" width={150} className="rounded-md" />

        <div className="text-sm text-graay-400 space-y-3 ml-4 text-gray-500">
          <p>{product.title}</p>

          <p className="flex gap-2 items-center">
            Color: <Color color={color.title} />
          </p>
        </div>
      </div>

      <QuantityBtn val={userQuantity} setVal={setUserQuantity} />

      <div className="w-10 font-semibold">
        <p>${price}</p>
      </div>

      <div
        className="bg-[#3b4149] rounded-full p-2 cursor-pointer hover:opacity-90"
        onClick={removeItem}
      >
        <BsTrash className="invert" />
      </div>
    </div>
  );
};

export default CartCard;
