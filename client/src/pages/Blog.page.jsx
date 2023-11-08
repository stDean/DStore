import { BlogCard, BreadCrumb, CategoryFilter, Meta } from "../components";

const Blog = () => {
  return (
    <>
      <Meta title="Blog" />

      <div className="w-full bg-[#f5f5f7]">
        <BreadCrumb text="Blog" />

        <div className="max-w-7xl mx-auto mt-8 pb-8 flex items-start gap-5">
          <CategoryFilter w />

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
