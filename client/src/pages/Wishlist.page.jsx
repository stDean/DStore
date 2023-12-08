import React from "react";
import { BreadCrumb, Meta, WishlistCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addWishList, getUserWishList } from "../feature/products/productSlice";
import { toast } from "react-toastify";

const Wishlist = () => {
  const dispatch = useDispatch();

  const {
    currentUser: { token },
  } = useSelector(({ auth }) => auth);
  const { isSuccess, isError, userWishList } = useSelector(
    ({ product }) => product
  );

  useEffect(() => {
    dispatch(getUserWishList({ token }));
  }, [dispatch, token]);

  const removeFromWishList = id => {
    dispatch(addWishList({ productId: id, token }));
    if (isSuccess) {
      toast.success("Product removed from wishlist");
    } else if (isError) {
      toast.error("Something went wrong");
    }

    setTimeout(() => {
      dispatch(getUserWishList({ token }));
    }, 200);
  };

  return (
    <>
      <Meta title="Wishlist" />

      <div className="w-full bg-[#f5f5f7]">
        <BreadCrumb text="Wishlist" />

        <div className="max-w-7xl mx-auto mt-8 pb-8 grid grid-cols-12 gap-4">
          {userWishList.length !== 0 ? (
            userWishList?.map(item => (
              <WishlistCard
                title={item?.title}
                price={item?.price}
                key={item?._id}
                imgUrl={item?.images[0]?.url}
                handleRemove={() => removeFromWishList(item?._id)}
              />
            ))
          ) : (
            <p className="text-center text-xl col-span-12">
              No Product in the Wishlist
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
