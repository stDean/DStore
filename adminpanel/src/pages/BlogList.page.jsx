import { Table } from "antd";
import { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Blogs } from "../features/blog/blogSlice";

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

const BlogList = () => {
  const dispatch = useDispatch();
  const {
    blogs: { blogs },
  } = useSelector(({ blog }) => blog);

  useEffect(() => {
    dispatch(Blogs());
  }, [dispatch]);

  const data1 = [];

  for (let i = 0; i < blogs?.length; i++) {
    data1.push({
      key: i + 1,
      name: blogs[i]?.title,
      category: blogs[i]?.category,
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
      <h1 className="mb-4 text-3xl font-semibold">Blog Lists</h1>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </>
  );
};

export default BlogList;
