import { useState } from "react";
import Collection from "./Collection.component";
import { useSelector } from "react-redux";

const images = [
  {
    imgPath: "/images/gr4.svg",
    width: 12,
    layout: "col-span-2",
  },
  {
    imgPath: "/images/gr3.svg",
    width: 8,
    layout: "col-span-3",
  },
  {
    imgPath: "/images/gr2.svg",
    width: 5,
    layout: "col-span-5",
  },
  {
    imgPath: "/images/gr.svg",
    width: 12,
    layout: "col-span-10",
  },
];

const Store = () => {
  const [grid, setGrid] = useState("col-span-2");
  const [sort, setSort] = useState("title");

  const {
    products: { products },
  } = useSelector(({ product }) => product);

  return (
    <div className="col-span-9 flex flex-col gap-4">
      {/* Filter Nav */}
      <div className="bg-white shadow-sm rounded-lg text-xs py-1 px-5 flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <h1 className="font-semibold">Sort By: </h1>
          {/* add drop down */}
          <div className="">
            <select
              id="countries"
              defaultValue={sort}
              onChange={e => setSort(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2 mr-10"
            >
              <option value="title">Alphabetical (A - Z)</option>
              <option value="-title">Alphabetical (Z - A)</option>
              <option value="price">Price (Low - High)</option>
              <option value="-price">Price (High - Low)</option>
              <option value="createdAt">Old - New</option>
              <option value="-createdAt">New - Old</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <p className="text-gray-500">20 Products</p>

          <div className="flex gap-1">
            {images.map(({ imgPath, width, layout }) => (
              <div
                className={`bg-gray-200 w-6 h-6 flex justify-center item-center rounded-md ${
                  grid === layout ? "bg-[#232f3e] invert" : ""
                } cursor-pointer`}
                key={imgPath}
                onClick={() => {
                  setGrid(layout);
                }}
              >
                <img src={imgPath} alt="" width={width} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-10 gap-4">
        {products?.map(item => (
          <Collection key={item._id} layout={grid} item={item} />
        ))}
      </div>

      {/* Pagination */}
      <div className="bg-white shadow-sm rounded-lg text-xs py-2 px-5 flex items-center justify-between">
        <p className="text-gray-500">Showing 15 of 20</p>

        <div className="space-x-4 flex items-center">
          <p className="bg-[#232f3e] text-white rounded-full w-7 h-7 flex justify-center items-center">
            1
          </p>
          <p>2</p>
          {/* <img src="images/arrow.svg" alt="" className="invert" /> */}
        </div>
      </div>
    </div>
  );
};

export default Store;
