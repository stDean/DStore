import { useDispatch, useSelector } from "react-redux";
import { Button, CustomInput } from "../components";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { createBlogCategories } from "../features/blogCat/blogCategorySlice";

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(({ auth }) => auth);
  const { isSuccess, isError } = useSelector(
    ({ blogCategory }) => blogCategory
  );

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: async values => {
      dispatch(createBlogCategories({ data: values, token: user.token }));
      if (isSuccess) {
        toast.success("Blog Category created successfully");
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/blog-category-list");
        }, 3000);
      } else if (isError) {
        toast.error("Something went wrong");
      }
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
    }),
  });

  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold">Add Blog Category</h1>

      <div className="max-w-5xl mx-auto shadow-md p-6">
        <form action="" onSubmit={formik.handleSubmit}>
          <div>
            <CustomInput
              type="text"
              label="Blog Category"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            <p
              className={`text-red-500 text-xs mb-3 ${
                formik.errors.title ? "block" : "hidden"
              }`}
            >
              {formik.touched.title && formik.errors.title}
            </p>
          </div>

          <Button title="Add Blog Category" />
        </form>
      </div>
    </>
  );
};

export default AddBlogCategory;
