import { useEffect } from "react";
import { BreadCrumb, Meta } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrder } from "../feature/user/userSlice";
import { Color } from "../components/ui/Color";

const Order = () => {
  const dispatch = useDispatch();

  const {
    currentUser: { token },
  } = useSelector(({ auth }) => auth);
  const {
    userOrders: { userOrders },
  } = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(getUserOrder({ token }));
  }, [dispatch, token]);

  return (
    <>
      <Meta title="Cart" />

      <div className="w-full bg-[#f5f5f7]">
        <BreadCrumb text="My Orders" />

        <div className="max-w-7xl mx-auto mt-8 pb-8">
          <div className="grid grid-cols-12">
            <div className="col-span-3">
              <h1 className="font-semibold">Order Id</h1>
            </div>
            <div className="col-span-3">
              <h1 className="font-semibold">Total Amount</h1>
            </div>
            <div className="col-span-3">
              <h1 className="font-semibold">Total Amount After Discount</h1>
            </div>
            <div className="col-span-3">
              <h1 className="font-semibold">Status</h1>
            </div>
          </div>

          {userOrders &&
            userOrders?.map(order => (
              <div className="grid grid-cols-12 my-4 bg-white p-4 rounded-md" key={order._id}>
                <div className="col-span-3">
                  <p className="">{order?._id}</p>
                </div>
                <div className="col-span-3">
                  <p className="">{order?.totalPrice}</p>
                </div>
                <div className="col-span-3">
                  <p className="">{order?.totalPriceAfterDiscount}</p>
                </div>
                <div className="col-span-3">
                  <p className="">{order?.orderStatus}</p>
                </div>

                <div className="grid grid-cols-12 col-span-12 bg-gray-300 p-4 mt-4">
                  <div className="col-span-3">
                    <h1 className="font-semibold">Product Name</h1>
                  </div>
                  <div className="col-span-3">
                    <h1 className="font-semibold">Quantity</h1>
                  </div>
                  <div className="col-span-3">
                    <h1 className="font-semibold">Price</h1>
                  </div>
                  <div className="col-span-3">
                    <h1 className="font-semibold">Color</h1>
                  </div>

                  {order?.orderItems.map(item => (
                    <div
                      className="grid grid-cols-12 col-span-12 bg-gray-300 mt-2"
                      key={item?.product._id}
                    >
                      <div className="col-span-3">
                        <p className="">{item?.product.title}</p>
                      </div>
                      <div className="col-span-3">
                        <p className="">{item?.quantity}</p>
                      </div>
                      <div className="col-span-3">
                        <p className="">{item?.price}</p>
                      </div>
                      <div className="col-span-3">
                        <p className="">
                          <Color color={item?.color.title} />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Order;
