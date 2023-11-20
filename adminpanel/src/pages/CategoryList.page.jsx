import { useState, useEffect } from "react";
import { Table } from "antd";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
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
    name: "Apple",
    action: "available",
  });
}

const CategoryList = () => {
  return (
    <>
      <h1 className="mb-4 text-3xl font-semibold">Category List</h1>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </>
  );
};

export default CategoryList;
