const Products = ({ bg = false, children }) => {
  return (
    <div
      className={`col-span-3 bg-white rounded-lg shadow-lg overflow-hidden px-4 py-7 ${
        bg && "add__bg"
      } space-y-2 flex flex-col`}
    >
      <p className={`text-xs ${bg ? "text-white" : "text-gray-500"}`}>
        Big Screen
      </p>
      <h1
        className={`text-xl font-semibold ${
          bg ? "text-white" : "text-gray-500"
        }`}
      >
        Apple Series 7
      </h1>
      <p className={`text-xs ${bg ? "text-white" : "text-gray-500"}`}>
        From $499 or $16.99/mo for 24 mo.*
      </p>
      <div className="flex-1 h-60 w-full">{children}</div>
    </div>
  );
};

export default Products;
