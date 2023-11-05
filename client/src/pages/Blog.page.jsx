import { BlogCard, BreadCrumb, Meta } from "../components";

const Blog = () => {
  return (
    <>
      <Meta title="Blog" />

      <div className="w-full bg-[#f5f5f7]">
        <BreadCrumb text="Blog" />

        <div className="max-w-7xl mx-auto mt-8 pb-8 flex items-start gap-5">
          <div className="bg-white rounded-lg shadow-lg p-4 space-y-6 w-72 ">
            <h1 className="font-semibold text-sm">Shop By Category</h1>
            <div className="space-y-2">
              <p className="text-xs">Phones</p>
              <p className="text-xs">Laptops</p>
              <p className="text-xs">Watches</p>
              <p className="text-xs">Tablets</p>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-5">
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
