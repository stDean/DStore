import ReactStars from "react-rating-stars-component";
// import { Link } from "react-router-dom";
import {
  Accordion,
  BreadCrumb,
  Collection,
  Meta,
  QuantityBtn,
  Review,
} from "../components";
import { Color } from "../components/ui/Color";
import { Button } from "../components/ui/Button";
import { LiaShippingFastSolid } from "react-icons/lia";
import { AiOutlineLink } from "react-icons/ai";

const SingleProduct = () => {
  const copyToClipboard = text => {
    let textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
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
                <img src="/images/tab.jpg" alt="" width={400} />
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
                Kids Headphones Bulk 10 pack multicolored for students
              </h1>

              <div className="py-2 border-b space-y-2">
                <p className="font-semibold">$100.00</p>

                <div className="flex items-center gap-1">
                  <ReactStars
                    count={5}
                    value="3"
                    edit={false}
                    activeColor="#ffd700"
                    size={15}
                  />
                  <p className="text-xs text-gray-500">(2 reviews)</p>
                </div>

                <p className="text-xs text-gray-500">write a review</p>
              </div>

              <div className="pt-4 space-y-4 mb-6">
                <p className="font-semibold text-sm">
                  Type: <span className="text-xs text-gray-500">Headphone</span>
                </p>
                <p className="font-semibold text-sm">
                  Brand: <span className="text-xs text-gray-500">Sony</span>
                </p>
                <p className="font-semibold text-sm">
                  Categories:{" "}
                  <span className="text-xs text-gray-500">
                    Headphone, sony, computers&laptops, our store, mini speaker
                  </span>
                </p>
                <p className="font-semibold text-sm">
                  Tags:{" "}
                  <span className="text-xs text-gray-500">
                    Headphone Mobile Speaker{" "}
                  </span>
                </p>
                <p className="font-semibold text-sm">
                  Availability:{" "}
                  <span className="text-xs text-gray-500">200 In Stock</span>
                </p>
                <p className="font-semibold text-sm">
                  SKU: <span className="text-xs text-gray-500">SKU1257R </span>
                </p>

                <div className="space-y-1">
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
                </div>

                <div className="space-y-1">
                  <p className="font-semibold text-sm">Size</p>
                  <div className="flex item-center gap-2">
                    <Color color="blue" active width />
                    <Color color="red" />
                  </div>
                </div>

                <div className="flex item-center gap-4">
                  <p className="font-semibold text-sm mt-2">Quantity:</p>

                  <QuantityBtn />

                  <Button text="ADD TO CART" mr />
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
                    onClick={() =>
                      copyToClipboard(
                        "https://react-icons.github.io/react-icons/search?q=paypal"
                      )
                    }
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              consequatur dolorum ipsam, laborum mollitia neque modi quasi,
              consequuntur quisquam, cum sed sit asperiores molestiae
              perspiciatis nam. In, ipsa sit? Labore beatae fuga ex consectetur
              atque inventore vitae magni tempore, repellat ea quam, debitis
              cumque, voluptatum repellendus minus dolorum consequatur iure!
              Inventore aliquid ex recusandae totam reprehenderit fugiat, beatae
              suscipit ut impedit! In totam dolorem eius cupiditate iusto animi
              alias sit nihil, tempora, odit voluptatem! Possimus consequuntur,
              numquam vel voluptate porro fugiat, explicabo ipsam illum
              similique voluptatem beatae sapiente id sint in, ullam quibusdam
              impedit. Nam animi amet magnam vero fugit? Nam ea, consequuntur
              nemo hic illo vel eum, deleniti dolorem, recusandae explicabo in.
              Velit, repellendus atque doloremque architecto dolorum minus
              inventore eum tempore illo ex dolore magnam reiciendis pariatur
              dolorem nesciunt voluptatem quas, iste aliquid illum qui ab esse.
              Quibusdam odio delectus ipsa neque repellendus reprehenderit
              soluta incidunt, quo labore autem sed ratione eum aperiam
              similique fugiat! Cumque cum, suscipit enim dolor nulla obcaecati!
              Nostrum exercitationem voluptatem molestiae unde omnis ab
              cupiditate sequi doloribus alias, beatae cumque dicta libero
              deleniti maiores delectus tempora itaque commodi error laborum
              quibusdam. Id dolor eligendi cupiditate nesciunt quasi perferendis
              quidem necessitatibus rerum assumenda odit.
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
              <Collection />
              <Collection />
              <Collection />
              <Collection />
              <Collection />
              <Collection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
