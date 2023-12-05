import { Table } from "antd";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Blogs, deleteBlogs } from "../features/blog/blogSlice";
import { toast } from "react-toastify";
import { Modal } from "../components";

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
    message,
  } = useSelector(({ blog }) => blog);

  const [blogId, setBlogId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector(({ auth }) => auth);

  const showModal = e => {
    setIsModalOpen(true);
    setBlogId(e);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteData = () => {
    dispatch(deleteBlogs({ id: blogId, token: user.token }));
    toast.success("Deleted Successfully");
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(Blogs());
  }, [dispatch, message]);

  const data1 = [];

  for (let i = 0; i < blogs?.length; i++) {
    data1.push({
      key: i + 1,
      name: blogs[i]?.title,
      category: blogs[i]?.category,
      action: (
        <div className="flex gap-3 justify-center">
          <Link
            to={`/admin/blog/${blogs[i]._id}`}
            className="text-[18px] text-green-500/60 hover:text-green-500"
          >
            <BiEdit />
          </Link>
          <div
            className="text-red-500/60 hover:text-red-500 text-[18px] cursor-pointer"
            onClick={() => {
              showModal(blogs[i]._id);
            }}
          >
            <AiFillDelete />
          </div>
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

      {isModalOpen && (
        <Modal
          title="Are you sure you want to delete this brand"
          handleOk={deleteData}
          handleCancel={handleCancel}
          isModalOpen={isModalOpen}
        />
      )}
    </>
  );
};

export default BlogList;
