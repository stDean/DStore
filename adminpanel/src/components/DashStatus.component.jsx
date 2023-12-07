import { IoMdMore } from "react-icons/io";
// import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";

const DashStatus = ({ title, val, smallText }) => {
  return (
    <div className="col-span-6 bg-gray-100 rounded-md shadow-lg p-4 flex items-center justify-between">
      <div>
        <p className="text-sm mb-5">{title}</p>
        <h1 className="text-3xl font-semibold">{val}</h1>
      </div>

      <div className="flex flex-col items-end">
        <IoMdMore
          size={20}
          className="self-end -mr-2 text-gray-500 hover:cursor-pointer"
        />
        {/* <p
          className={`mt-7 ${
            percent > 30 ? "text-green-500" : "text-red-500"
          } font-semibold flex items-center gap-1`}
        >
          {percent > 30 ? <BsArrowUpRight /> : <BsArrowDownRight />}
          <span>{percent}%</span>
        </p> */}
        <p className="text-sm text-gray-500">{smallText}</p>
      </div>
    </div>
  );
};

export default DashStatus;
