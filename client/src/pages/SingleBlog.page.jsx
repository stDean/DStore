import { BreadCrumb, CategoryFilter, Meta } from "../components";
import { BsFacebook, BsInstagram, BsSnapchat } from "react-icons/bs";
import { Link } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
// import { Button } from "../components/ui/Button";

const SingleBlog = () => {
  return (
    <>
      <Meta title="Blog | Add the title" />

      <div className="w-full bg-[#f5f5f7]">
        <BreadCrumb text="The Blog Title Goes Here." />

        <div className="max-w-7xl mx-auto mt-8 pb-8 space-y-6">
          <div className="flex gap-5">
            <CategoryFilter w />

            <div className="flex-1">
              <h1 className="text-xl font-semibold">
                The Blog Title Goes Here.
              </h1>

              <div className="w-full mt-3 rounded-md overflow-hidden">
                <img src="/images/blog-1.jpg" alt="" className="w-full" />
              </div>

              <p className="text-sm text-gray-500 mt-3">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Incidunt accusantium nostrum eligendi placeat modi dignissimos
                hic, quod fugiat quis quia nisi quo obcaecati odio! Ea natus
                quidem neque dolore aut deserunt iusto tempora quia omnis ab
                tenetur, laborum expedita magni ipsam optio, suscipit dolorum
                voluptatem debitis possimus! Minus corporis sapiente magni, eum
                repellat, adipisci asperiores, quos omnis magnam quia beatae!
                Non ex nostrum error ipsum, obcaecati assumenda ea ullam nobis
                inventore iure. Ratione in tempora asperiores excepturi corrupti
                tenetur debitis amet eligendi ex distinctio, possimus eum
                voluptatem numquam deleniti nostrum, dicta nobis. At unde
                commodi eius. Assumenda rem eveniet ipsa?
              </p>

              <div className="text-xs text-gray-500 flex item-center gap-6 mt-5">
                <p>11 June 2023</p>
                <p>Dean</p>
              </div>

              {/* Back and Comment Form */}
              <div className="flex justify-between items-center w-full my-8">
                <p className="flex items-center gap-1 border rounded-xl text-xs text-gray-500 p-2 opacity-80 hover:opacity-100">
                  <MdKeyboardBackspace />
                  <Link to="/blogs">Back to blog</Link>
                </p>

                <div className="flex items-center gap-5">
                  <BsFacebook />
                  <BsInstagram />
                  <BsSnapchat />
                </div>
              </div>

              {/* Comment Form */}
              {/* <div className="w-full bg-white rounded-lg px-6 py-4">
                <h1 className="capitalize text-lg font-semibold text-gray-500">
                  Leave a comment
                </h1>

                <div className="grid grid-cols-12 gap-5 mt-4 mb-2">
                  <div className="col-span-6">
                    <Input type="text" name="firstName" placeholder="Name*" />
                  </div>
                  <div className="col-span-6">
                    <Input type="email" name="email" placeholder="Email*" />
                  </div>
                  <div className="col-span-12">
                    <textarea
                      name="comment"
                      id=""
                      rows="3"
                      placeholder="Comment*"
                      className="w-full bg-gray-100 text-xs p-2 outline-none rounded-md"
                    ></textarea>
                  </div>

                  <div className="col-span-2">
                    <Button text="Post A Comment" mr />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
