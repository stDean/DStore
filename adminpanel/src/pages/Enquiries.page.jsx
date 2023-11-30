import { Table } from "antd";
import { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Enquires } from "../features/enquiry/enquirySlice";

const columns = [
  {
    title: "S/N",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Status",
    dataIndex: "status",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();
  const { enquires } = useSelector(({ enquiry }) => enquiry);

  useEffect(() => {
    dispatch(Enquires());
  }, [dispatch]);

  const data1 = [];

  for (let i = 0; i < enquires?.length; i++) {
    data1.push({
      key: i + 1,
      name: enquires[i]?.name,
      email: enquires[i]?.email,
      mobile: enquires[i]?.mobile,
      status: (
        <>
          <select name="status" className="border p-2 rounded-md w-full">
            <option value="">Set Status</option>
          </select>
        </>
      ),
      action: (
        <div className="flex gap-3 justify-center">
          <Link
            to="/"
            className="text-[18px] text-green-500/60 hover:text-green-500"
          >
            <BiEdit />
          </Link>
          <Link
            className="text-red-500/60 hover:text-red-500 text-[18px]"
            to="/"
          >
            <AiFillDelete />
          </Link>
        </div>
      ),
    });
  }

  return (
    <>
      <h1 className="mb-4 text-3xl font-semibold">Enquiries</h1>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </>
  );
};

export default Enquiries;
