import { Table } from "antd";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Colors, deleteColors } from "../features/color/colorSlice";
import { Modal } from "../components";
import { toast } from "react-toastify";

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

const ColorList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ auth }) => auth);
  const { colors, message } = useSelector(({ color }) => color);

  const [colorId, setColorId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = e => {
    setIsModalOpen(true);
    setColorId(e);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteData = () => {
    dispatch(deleteColors({ id: colorId, token: user.token }));
    toast.success("Deleted Successfully");
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(Colors());
  }, [dispatch, message]);

  const data1 = [];

  for (let i = 0; i < colors?.length; i++) {
    data1.push({
      key: i + 1,
      name: colors[i].title,
      action: (
        <div className="flex gap-3 justify-center">
          <Link
             to={`/admin/color/${colors[i]._id}`}
            className="text-[18px] text-green-500/60 hover:text-green-500"
          >
            <BiEdit />
          </Link>
          <div
            className="text-red-500/60 hover:text-red-500 text-[18px] cursor-pointer"
            onClick={() => {
              showModal(colors[i]._id);
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
      <h1 className="mb-4 text-3xl font-semibold">Color List</h1>
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

export default ColorList;
