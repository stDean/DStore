import { ButtonLink } from "./ui/ButtonLink";

const BlogCard = () => {
  return (
    <div className="col-span-3 rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-hidden">
        <img
          src="images/blog-1.jpg"
          alt=""
          className="w-full hover:scale-105 hover:duration-1000"
        />
      </div>
      <div className="px-4 py-6 bg-white">
        <p className="text-xs text-gray-400 font-light">11 JUNE 2022</p>
        <p className="font-semibold my-2 text-lg">This is the title</p>
        <p className="-mb-4 text-justify text-sm text-gray-400">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. is more text
          vel explicabo...
        </p>
        <ButtonLink to="/blog/:slug" text="READ MORE" />
      </div>
    </div>
  );
};

export default BlogCard;
