import { Table } from "antd";
import { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Brands } from "../features/brand/brandSlice";

const columns = [
  {
    title: "S/N",
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

const BrandList = () => {
  const dispatch = useDispatch();
  const { brands } = useSelector(({ brand }) => brand);
  const { user } = useSelector(({ auth }) => auth);

  useEffect(() => {
    dispatch(Brands(user.token));
  }, [dispatch, user.token]);

  const data1 = [];

  for (let i = 0; i < brands?.length; i++) {
    data1.push({
      key: i + 1,
      name: brands[i]?.title,
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
      <h1 className="mb-4 text-3xl font-semibold">Brand List</h1>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </>
  );
};

export default BrandList;
