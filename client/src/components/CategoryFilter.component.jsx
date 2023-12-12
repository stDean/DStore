const CategoryFilter = ({ w = false, category }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-4 space-y-6 ${
        w && "w-72"
      } self-start`}
    >
      <h1 className="font-semibold text-sm">Shop By Category</h1>
      <div className="space-y-2">
        {[...new Set(category)].map(i => (
          <p className="text-xs" key={i}>
            {i}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
