import { Link } from "react-router-dom";

export const ButtonLink = ({ text, mr = false, ...rest }) => {
  return (
    <Link
      {...rest}
      className={`py-2 px-5 rounded-3xl bg-[#232f3e] text-xs text-white ${
        mr ? "" : " mt-8"
      } hover:opacity-90`}
    >
      {text}
    </Link>
  );
};
