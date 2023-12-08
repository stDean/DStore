import { ButtonLink } from "./ui/ButtonLink";

const BlogCard = ({ item, big = false }) => {
  const { title, desc, createdAt, images, _id } = item;

  return (
    <div className="col-span-3 rounded-lg shadow-lg overflow-hidden h-full">
      <div className="overflow-hidden">
        <img
          src={images.length !== 0 ? images[0].url : "/images/blog-1.jpg"}
          alt=""
          className={`w-full${
            big ? " h-[350px]" : "h-[200px]"
          } hover:scale-105 hover:duration-1000`}
        />
      </div>
      <div className="px-4 py-6 bg-white">
        <p className="text-xs text-gray-400 font-light">
          {new Date(createdAt).toDateString()}
        </p>
        <p className="font-semibold my-2 text-lg">{title}</p>
        <p className="-mb-4 text-justify text-sm text-gray-400 truncate">
          {desc}
        </p>
        <ButtonLink to={`/blog/${_id}`} text="READ MORE" />
      </div>
    </div>
  );
};

export default BlogCard;
