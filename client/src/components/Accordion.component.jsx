import { useState } from "react";

const Accordion = ({ title, Icon, text1, text2 }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b p-4">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setOpen(open => !open)}
      >
        <Icon />
        <p className="ml-2 text-sm font-semibold">{title}</p>
        <img
          src={open ? "/images/up.svg" : "/images/arrow.svg"}
          alt=""
          width={12}
          className={`ml-auto ${open ? "" : "invert"}`}
        />
      </div>

      {open && (
        <div className="pt-2 text-gray-500 text-sm">
          <p>{text1}</p>
          <p>{text2}</p>
        </div>
      )}
    </div>
  );
};

export default Accordion;
