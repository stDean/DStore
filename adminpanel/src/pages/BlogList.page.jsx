import { useState, useEffect } from "react";
import { Table } from "antd";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "S/N",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
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
    name: `Edward King ${i}`,
    category: "Mobile Phone",
    action: "add",
  });
}

const BlogList = () => {
  return (
    <>
      <h1 className="mb-4 text-3xl font-semibold">Blog Lists</h1>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </>
  );
};

export default BlogList;
