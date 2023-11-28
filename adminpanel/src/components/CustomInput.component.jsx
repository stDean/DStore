const CustomInput = ({ i_class, label, i_id, type, ...rest }) => {
  return (
    <div className="flex flex-col mb-4 relative">
      <input
        type={type}
        className="border p-3 mt-1 peer focus:pt-4 rounded-md"
        id={i_id}
        {...rest}
      />

      <label
        htmlFor={i_id}
        className="text-sm absolute top-[18px] left-3 peer-focus:top-0 peer-focus:text-xs text-gray-500 peer-focus:pt-2"
      >
        {label}
      </label>
    </div>
  );
};

export default CustomInput;
