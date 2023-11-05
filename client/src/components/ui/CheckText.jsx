export const CheckText = ({ text }) => {
  return (
    <label htmlFor={text} className="flex items-center gap-2">
      <input type="checkbox" name="" id={text} className="cursor-pointer" />
      <p className="text-xs text-gray-500 cursor-pointer">{text}</p>
    </label>
  );
};
