export const Button = ({ text, mr = false, c, ...rest }) => {
  return (
    <button
      {...rest}
      className={`py-2 px-5 rounded-3xl bg-[#232f3e] text-xs font-semibold ${
        mr ? "" : " mt-8"
      } hover:opacity-90 ${c ? "bg-orange-400 text-black" : "text-white"}`}
    >
      {text}
    </button>
  );
};
