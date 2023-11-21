import { useState, useEffect } from "react";
import { Table } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "S/N",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const data1 = [];

for (let i = 0; i < 40; i++) {
  data1.push({
    key: i,
    title: `Edward King ${i}`,
    brand: "Apple",
    category: "Tablets",
    color: "space gray",
    price: 1400,
    action: (
      <div className="flex gap-3 justify-center">
        <Link to="/" className="text-[18px] text-green-500/60 hover:text-green-500">
          <BiEdit />
        </Link>
        <Link className="text-red-500/60 hover:text-red-500 text-[18px]" to="/">
          <AiFillDelete />
        </Link>
      </div>
    ),
  });
}

const ProductList = () => {
  return (
    <>
      <h1 className="mb-4 text-3xl font-semibold">Product List</h1>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </>
  );
};

export default ProductList;
