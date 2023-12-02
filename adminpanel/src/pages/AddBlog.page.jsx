import { useFormik } from "formik";
import { useEffect } from "react";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Button, CustomInput } from "../components";
import { createBlog } from "../features/blog/blogSlice";
import { deleteImage, imageUpload } from "../features/upload/uploadSlice";
import { IoClose } from "react-icons/io5";
import { blogCategory } from "../features/blogCat/blogCategorySlice";

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(({ auth }) => auth);
  const { isSuccess, isError } = useSelector(({ blog }) => blog);
  const { blogCategories: categories } = useSelector(
    ({ blogCategory }) => blogCategory
  );
  const { images } = useSelector(({ image }) => image);

  useEffect(() => {
    dispatch(blogCategory());
  }, [dispatch]);

  let img;
  if (!images.msg) {
    img = images.map(img => ({
      url: img.url,
      public_id: img.public_id,
    }));
  }

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      desc: "",
    },
    onSubmit: async values => {
      dispatch(createBlog({ token: user.token, data: values }));
      if (isSuccess) {
        toast.success("Blog created successfully");
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/blog-list");
        }, 3000);
      } else if (isError) {
        toast.error("Something went wrong");
      }
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      desc: Yup.string().required("Description is required"),
      category: Yup.string().required("Blog category is required"),
    }),
  });
  formik.values.images = img;

  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold">Add Blog</h1>

      <div className="max-w-5xl mx-auto shadow-md p-6">
        <form action="" onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="bg-white border p-10 text-center">
            <Dropzone
              onDrop={acceptedFiles => {
                dispatch(
                  imageUpload({ token: user.token, data: acceptedFiles })
                );
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className="cursor-pointer">
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>

          {!images.msg && (
            <div className="showImages flex">
              {images.map(img => (
                <div key={img.asset_id} className="relative">
                  <button
                    type="button"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      dispatch(
                        deleteImage({
                          id: img.public_id.split("/")[2],
                          token: user.token,
                        })
                      )
                    }
                  >
                    <IoClose />
                  </button>
                  <img src={img.url} alt="" width={200} height={200} />
                </div>
              ))}
            </div>
          )}

          <div>
            <CustomInput
              type="text"
              label="Enter Blog Title"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            <p
              className={`text-red-500 text-xs mb-3 ${
                formik.errors.title ? "block" : "hidden"
              }`}
            >
              {formik.touched.title && formik.errors.title}
            </p>
          </div>

          <div>
            <select
              name="category"
              id="category"
              className="w-full p-3 rounded-md outline-none border"
              value={formik.values.category}
              onChange={formik.handleChange}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option value={category.title} key={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
            <p
              className={`text-red-500 text-xs mb-3 ${
                formik.errors.category ? "block" : "hidden"
              }`}
            >
              {formik.touched.category && formik.errors.category}
            </p>
          </div>

          <div>
            <ReactQuill
              theme="snow"
              name="desc"
              value={formik.values.desc}
              onChange={formik.handleChange("desc")}
              className="text-black"
            />
            <p
              className={`text-red-500 text-xs mb-3 ${
                formik.errors.desc ? "block" : "hidden"
              }`}
            >
              {formik.touched.desc && formik.errors.desc}
            </p>
          </div>

          <Button title="Add Blog" />
        </form>
      </div>
    </>
  );
};

export default AddBlog;