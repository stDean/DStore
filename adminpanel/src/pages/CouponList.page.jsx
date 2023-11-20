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
    title: "Discount",
    dataIndex: "discount",
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
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
    name: "red",
    discount: 20,
    expiry: "20/10/2023",
    action: "available",
  });
}

const CouponList = () => {
  return (
    <>
      <h1 className="mb-4 text-3xl font-semibold">Coupon List</h1>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </>
  );
};

export default CouponList;
