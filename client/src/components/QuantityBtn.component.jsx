import { useState } from "react";

const QuantityBtn = () => {
  const [val, setVal] = useState(1);
  return (
    <div
      className="border border-gray-400 h-10 rounded flex items-center overflow-hidden relative"
      style={{ width: "70px" }}
    >
      <div className=" border-r px-2 flex flex-col items-center border-gray-400">
        <p
          className="text-sm cursor-pointer font-semibold active:scale-90"
          onClick={() => setVal(val => val + 1)}
        >
          +
        </p>
        <p
          className="text-sm cursor-pointer font-semibold active:scale-90"
          style={{
            marginTop: "-2px",
          }}
          onClick={() => setVal(val => val - 1)}
        >
          -
        </p>
      </div>
      <div
        className="bg-gray-400 w-6 absolute left-0 top-1/2"
        style={{ height: "1px" }}
      />
      <div className="flex-1 text-center w-full px-1">
        <input
          type="text"
          name="quantity"
          id=""
          value={val}
          className="outline-none text-center w-full bg-transparent"
          onChange={e => setVal(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default QuantityBtn;
