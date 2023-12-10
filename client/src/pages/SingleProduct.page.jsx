import { useEffect, useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { LiaShippingFastSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Accordion,
  BreadCrumb,
  Collection,
  Meta,
  QuantityBtn,
  Review,
} from "../components";
import { Button } from "../components/ui/Button";
import { Color } from "../components/ui/Color";
import Stars from "../components/ui/Stars";
import { singleProduct } from "../feature/products/productSlice";
import { addItemToCart, getUserCart } from "../feature/user/userSlice";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const copyToClipboard = text => {
    let textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const [alreadyAdded, setAlreadyAdded] = useState(false);

  const {
    currentUser: { token },
  } = useSelector(({ auth }) => auth);
  const {
    products: { products },
    product,
  } = useSelector(({ product }) => product);

  const { isSuccess, isError } = useSelector(({ user }) => user);
  const { userCart } = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(singleProduct({ id }));
    dispatch(getUserCart({ token }));
  }, [dispatch, id]);

  useEffect(() => {
    for (let i = 0; i < userCart.length; i++) {
      if (id === userCart[i].product._id) {
        setAlreadyAdded(true);
      }
    }
  }, [id, userCart]);

  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");

  const addToCart = () => {
    if (!color) {
      toast.error("please choose a color");
      return false;
    }

    dispatch(
      addItemToCart({
        cartData: {
          quantity,
          price: quantity * product?.price,
          color,
          product: product?._id,
        },
        token,
      })
    );

    if (isSuccess) {
      toast.success("product added to cart");
      window.location.reload(false);
    } else if (isError) {
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <Meta title="Single Product" />

      <div className="w-full bg-[#f5f5f7]">
        <BreadCrumb text="The Title of the product goes here" />

        <div className="max-w-7xl mx-auto mt-8 pb-8 space-y-6">
          <div className="bg-white rounded-lg p-4 flex gap-6">
            {/* images */}
            <div className=" flex-1 space-y-6">
              <div className="border rounded-lg flex items-center justify-center">
                <img
                  // src={
                  //   product?.images?.length !== 0
                  //     ? product?.images[0]?.url
                  //     : "/images/tab.jpg"
                  // }
                  src="/images/tab.jpg"
                  alt=""
                  width={400}
                />
              </div>

              <div className="flex gap-4">
                <div className="border rounded-lg">
                  <img src="/images/tab1.jpg" alt="" width={300} />
                </div>
                <div className="border rounded-lg">
                  <img src="/images/tab2.jpg" alt="" width={300} />
                </div>
                <div className="border rounded-lg">
                  <img src="/images/tab3.jpg" alt="" width={300} />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h1 className="font-semibold text-lg capitalize pb-1 border-b">
                {product?.title}
              </h1>

              <div className="py-2 border-b space-y-2">
                <p className="font-semibold">${product?.price}</p>

                <div className="flex items-center gap-1">
                  <Stars size={15} val={product?.totalRatings} />
                  <p className="text-xs text-gray-500">
                    ({product?.totalRatings} reviews)
                  </p>
                </div>

                <p className="text-xs text-gray-500">write a review</p>
              </div>

              <div className="pt-4 space-y-4 mb-6">
                <p className="font-semibold text-sm">
                  Type: <span className="text-xs text-gray-500">Headphone</span>
                </p>
                <p className="font-semibold text-sm">
                  Brand:{" "}
                  <span className="text-xs text-gray-500">
                    {product?.brand}
                  </span>
                </p>
                <p className="font-semibold text-sm">
                  Category:{" "}
                  <span className="text-xs text-gray-500">
                    {product?.category}
                  </span>
                </p>
                <p className="font-semibold text-sm">
                  Tag:{" "}
                  <span className="text-xs text-gray-500">{product?.tag}</span>
                </p>
                <p className="font-semibold text-sm">
                  Availability:{" "}
                  <span className="text-xs text-gray-500">
                    {product?.quantity} In Stock
                  </span>
                </p>
                {/* <p className="font-semibold text-sm">
                  SKU: <span className="text-xs text-gray-500">SKU1257R </span>
                </p> */}

                {/* <div className="space-y-1">
                  <p className="font-semibold text-sm">Size</p>
                  <div className="flex item-center gap-2">
                    <p className="text-xs flex justify-center items-center w-9 py-1 border">
                      M
                    </p>
                    <p className="text-xs flex justify-center items-center w-9 py-1 border-2 border-black ">
                      L
                    </p>
                    <p className="text-xs flex justify-center items-center w-9 py-1 border">
                      XL
                    </p>
                    <p className="text-xs flex justify-center items-center w-9 py-1 border">
                      XXL
                    </p>
                  </div>
                </div> */}

                <div className="space-y-1">
                  {!alreadyAdded && (
                    <>
                      <p className="font-semibold text-sm">Color(s)</p>
                      <div className="flex item-center gap-2">
                        {product?.color?.map(col => (
                          <Color
                            color={col?.title}
                            key={col?._id}
                            setClick={() => setColor(col?._id)}
                            active={color === col?._id}
                            width={color === col?._id}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="flex item-center gap-4">
                  {!alreadyAdded && (
                    <>
                      <p className="font-semibold text-sm mt-2">Quantity:</p>
                      <QuantityBtn val={quantity} setVal={setQuantity} />
                    </>
                  )}

                  <Button
                    text={alreadyAdded ? "GO TO CART" : "ADD TO CART"}
                    mr
                    onClick={alreadyAdded ? () => navigate("/cart") : addToCart}
                  />
                  <Button text="BUY IT NOT" c mr />
                </div>

                <div className="flex item-center gap-8">
                  <div className="flex gap-2 items-center">
                    <img
                      src="/images/wishlist.svg"
                      alt="wishlist"
                      className="invert"
                      width={15}
                    />
                    <p className="text-gray-500 text-xs">Add to wishlist</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <img src="/images/prodcompare.svg" alt="cross" width={15} />
                    <p className="text-gray-500 text-xs">Add to wishlist</p>
                  </div>
                </div>
              </div>

              <Accordion
                title="Shipping"
                Icon={LiaShippingFastSolid}
                text1="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, iusto."
                text2="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, iusto."
              />

              <div className="mt-6">
                <p className="font-semibold text-sm flex items-center">
                  <AiOutlineLink className="mr-2" />
                  Product Link:{" "}
                  <a
                    className="text-sm font-normal ml-2 text-blue-400"
                    onClick={() => copyToClipboard(window.location.href)}
                    href="javascript:void(0)"
                  >
                    Copy Product Link
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h1 className="text-lg font-semibold">Description</h1>

            <p className="text-xs text-gray-500 bg-white px-4 py-6 rounded-md">
              {product?.desc}
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <h1 className="text-lg font-semibold">Reviews</h1>

            <div className="text-xs text-gray-500 bg-white px-6 py-6 rounded-md">
              <Review />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h1 className="text-lg font-semibold">You May Also Like</h1>

            <div className="grid grid-cols-12 gap-4">
              {products
                ?.map(
                  item =>
                    item.tag === "special" &&
                    item._id !== id && <Collection key={item._id} item={item} />
                )
                .filter(v => v)
                .filter((_, i) => i <= 6)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
