import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CategoryFilter from "./CategoryFilter.component";
import { Random } from "./ui/Random";
import { Tags } from "./ui/Tags";

// const data = ["S", "M", "L", "XL", "XXL"];
// const tags = [
//   "Headphones",
//   "Laptops",
//   "Mobile Phones",
//   "Watches",
//   "Speakers",
//   "Tablets",
//   "Pods",
//   "Sony",
//   "Apple",
// ];

const random = [
  {
    imgPath: "/images/headphone.jpg",
    title: "Kids Headphones Bulk 10 Pack Multi Colored For",
    price: "$100.00",
  },
  {
    imgPath: "/images/headphone.jpg",
    title: "Kids Headphones Bulk 10 Pack Multi Colored For",
    price: "$100.00",
  },
];

const SideBar = () => {
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [tags, setTags] = useState([]);

  const {
    products: { products },
  } = useSelector(({ product }) => product);

  useEffect(() => {
    let brandPro = [];
    let cat = [];
    let tag = [];
    // let color = [];
    for (let i = 0; i < products?.length; i++) {
      const element = products[i];
      brandPro.push(element?.brand);
      cat.push(element?.category);
      tag.push(element?.tag);
    }
    setBrand(brandPro);
    setCategory(cat);
    setTags(tag);
  }, [products]);

  // console.log([...new Set(category)]);

  return (
    <div className="col-span-3 space-y-4 overflow-hidden">
      <CategoryFilter category={category} />

      <div className="bg-white rounded-lg shadow-lg p-4 space-y-6">
        <h1 className="font-semibold text-sm">Filter By</h1>

        <div className="space-y-5">
          {/* <div className="space-y-2">
            <h1 className="text-xs font-semibold">Availability</h1>
            <CheckText text="In Stock(20)" />
            <CheckText text="Out of Stock(2)" />
          </div> */}

          <div className="space-y-2">
            <h1 className="text-xs font-semibold">Price</h1>
            <div className="flex gap-2 justify-between">
              <div className="flex items-center">
                <p className="text-sm text-gray-500 mr-1">$ </p>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="From"
                  className="text-xs bg-gray-100 px-2 py-2 w-28 rounded-md outline-none"
                />
              </div>
              <div className="flex items-center">
                <p className="text-sm text-gray-500 mr-1">$ </p>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="From"
                  className="text-xs bg-gray-100 px-2 py-2 w-28 rounded-md outline-none"
                />
              </div>
            </div>
          </div>

          {/* <div className="space-y-2">
            <h1 className="text-xs font-semibold">Color</h1>

            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                <Color color="black" key={i} />
              ))}
            </div>
          </div> */}

          {/* <div className="space-y-2">
            <h1 className="text-xs font-semibold">Size</h1>

            {data.map(size => (
              <CheckText text={`${size} (10)`} key={size} />
            ))}
          </div> */}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 space-y-6">
        <h1 className="font-semibold text-sm">Product Tag</h1>

        <div className="flex flex-wrap gap-2">
          {[...new Set(tags)].map(tag => (
            <Tags tag={tag} key={tag} />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 space-y-6">
        <h1 className="font-semibold text-sm">Product Brand</h1>

        <div className="flex flex-wrap gap-2">
          {[...new Set(brand)].map(tag => (
            <Tags tag={tag} key={tag} />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 space-y-6">
        <h1 className="font-semibold text-sm">Random Products</h1>

        <div>
          {random.map(({ imgPath, title, price }, i) => (
            <Random key={i} title={title} price={price} imgPath={imgPath} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
