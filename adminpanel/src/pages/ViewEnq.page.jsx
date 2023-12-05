import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { singleEnquiry, editEnquiry } from "../features/enquiry/enquirySlice";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";

const ViewEnq = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { enquires, message } = useSelector(({ enquiry }) => enquiry);
  const { user } = useSelector(({ auth }) => auth);

  useEffect(() => {
    dispatch(singleEnquiry({ id }));
  }, [dispatch, id]);

  const goBack = () => {
    navigate(-1);
  };

  const setEnqStatus = (e, i) => {
    dispatch(editEnquiry({ id: i, data: e, token: user?.token }));
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="mb-4 text-3xl font-semibold">Single Enquiry</h1>
        <button
          onClick={goBack}
          className="rounded-md py-2 px-3 border-none cursor-pointer flex items-center gap-2 transform hover:scale-110"
        >
          <BiArrowBack /> Go Back
        </button>
      </div>

      <div className="mt-5 flex gap-3 flex-col rounded-md bg-gray-100 py-4 px-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl">Name: </h2>
          <p>{enquires.name}</p>
        </div>

        <div className="flex items-center gap-3">
          <h2 className="text-xl">Mobile: </h2>
          <p>
            <a href={`tel: ${enquires.mobile}`}>{enquires.mobile}</a>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <h2 className="text-xl">Email: </h2>
          <p>
            <a href={`mailto: {enquires.email}`}>{enquires.email}</a>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <h2 className="text-xl">Comment: </h2>
          <p>{enquires.comment}</p>
        </div>

        <div className="flex items-center gap-3">
          <h2 className="text-xl">Status: </h2>
          <p>{enquires.status}</p>
        </div>

        <div className="flex items-center gap-3">
          <h2 className="text-xl">Change Status: </h2>
          <select
            name="status"
            className="border p-2 rounded-md"
            defaultValue={enquires?.status && enquires.status}
            onChange={e => setEnqStatus(e.target.value, enquires?._id)}
          >
            <option value="Submitted">Submitted</option>
            <option value="In Progress">In Progress</option>
            <option value="Contacted">Contacted</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default ViewEnq;
