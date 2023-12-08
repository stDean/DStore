import { BlogCard, BreadCrumb, CategoryFilter, Meta } from "../components";
import { useSelector } from "react-redux";

const Blog = () => {
  const {
    blogs: { blogs },
  } = useSelector(({ blog }) => blog);

  return (
    <>
      <Meta title="Blog" />

      <div className="w-full bg-[#f5f5f7]">
        <BreadCrumb text="Blog" />

        <div className="max-w-7xl mx-auto mt-8 pb-8 flex items-start gap-5">
          <CategoryFilter w />

          <div className="grid grid-cols-6 gap-5">
            {blogs?.map(item => (
              <BlogCard key={item._id} item={item} big />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
