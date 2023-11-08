const CategoryFilter = ({ w = false }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-4 space-y-6 ${
        w && "w-72"
      } self-start`}
    >
      <h1 className="font-semibold text-sm">Shop By Category</h1>
      <div className="space-y-2">
        <p className="text-xs">Phones</p>
        <p className="text-xs">Laptops</p>
        <p className="text-xs">Watches</p>
        <p className="text-xs">Tablets</p>
      </div>
    </div>
  );
};

export default CategoryFilter;
