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
    name: "red",
    action: "available",
  });
}

const ColorList = () => {
  return (
    <>
      <h1 className="mb-4 text-3xl font-semibold">Color List</h1>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </>
  );
};

export default ColorList;
