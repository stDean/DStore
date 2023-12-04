import { Table } from "antd";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  blogCategory,
  deleteBlogCategories,
} from "../features/blogCat/blogCategorySlice";
import { Modal } from "../components";
import { toast } from "react-toastify";

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

const BlogCategoryList = () => {
  const dispatch = useDispatch();
  const { blogCategories, message } = useSelector(
    ({ blogCategory }) => blogCategory
  );
  const { user } = useSelector(({ auth }) => auth);

  const [blogCat, setBlogCat] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = e => {
    setIsModalOpen(true);
    setBlogCat(e);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteData = () => {
    dispatch(deleteBlogCategories({ id: blogCat, token: user.token }));
    toast.success("Deleted Successfully");
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(blogCategory());
  }, [dispatch, message]);

  const data1 = [];

  for (let i = 0; i < blogCategories?.length; i++) {
    data1.push({
      key: i + 1,
      name: blogCategories[i]?.title,
      category: "Mobile Phone",
      action: (
        <div className="flex gap-3 justify-center">
          <Link
            to={`/admin/blog-category/${blogCategories[i]._id}`}
            className="text-[18px] text-green-500/60 hover:text-green-500"
          >
            <BiEdit />
          </Link>
          <div
            className="text-red-500/60 hover:text-red-500 text-[18px] cursor-pointer"
            onClick={() => {
              showModal(blogCategories[i]._id);
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
      <h1 className="mb-4 text-3xl font-semibold">Blog Category Lists</h1>
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

export default BlogCategoryList;
