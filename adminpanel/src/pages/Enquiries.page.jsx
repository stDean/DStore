import { Table } from "antd";
import { useEffect, useState } from "react";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Enquires,
  deleteEnquiry,
  editEnquiry,
} from "../features/enquiry/enquirySlice";
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
  const { enquires, message } = useSelector(({ enquiry }) => enquiry);
  const { user } = useSelector(({ auth }) => auth);

  const [enquiryId, setEnquiryId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = e => {
    setIsModalOpen(true);
    setEnquiryId(e);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteData = () => {
    dispatch(deleteEnquiry({ id: enquiryId, token: user.token }));
    toast.success("Deleted Successfully");
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(Enquires());
  }, [dispatch, message]);

  const setEnqStatus = (e, i) => {
    dispatch(editEnquiry({ id: i, data: e, token: user?.token }));
  };

  const data1 = [];

  for (let i = 0; i < enquires?.length; i++) {
    data1.push({
      key: i + 1,
      name: enquires[i]?.name,
      email: enquires[i]?.email,
      mobile: enquires[i]?.mobile,
      status: (
        <>
          <select
            name="status"
            className="border p-2 rounded-md"
            defaultValue={enquires[i].status ? enquires[i].status : "Submitted"}
            onChange={e => setEnqStatus(e.target.value, enquires[i]?._id)}
          >
            <option value="Submitted">Submitted</option>
            <option value="In Progress">In Progress</option>
            <option value="Contacted">Contacted</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),
      action: (
        <div className="flex gap-3 justify-center">
          <Link
            to={`/admin/enquiries/${enquires[i]?._id}`}
            className="text-[18px] text-green-500/60 hover:text-green-500"
          >
            <AiOutlineEye />
          </Link>
          <div
            className="text-red-500/60 hover:text-red-500 text-[18px] cursor-pointer"
            onClick={() => {
              showModal(enquires[i]?._id);
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
      <h1 className="mb-4 text-3xl font-semibold">Enquiries</h1>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>

      {isModalOpen && (
        <Modal
          title="Are you sure you want to delete this enquiry?"
          handleOk={deleteData}
          handleCancel={handleCancel}
          isModalOpen={isModalOpen}
        />
      )}
    </>
  );
};

export default Enquiries;
