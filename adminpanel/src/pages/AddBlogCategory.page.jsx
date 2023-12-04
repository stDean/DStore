import { useDispatch, useSelector } from "react-redux";
import { Button, CustomInput } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  createBlogCategories,
  editBlogCategories,
  singleBlogCategory,
} from "../features/blogCat/blogCategorySlice";
import { useEffect } from "react";

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { user } = useSelector(({ auth }) => auth);
  const { isSuccess, isError, blogCategories, message } = useSelector(
    ({ blogCategory }) => blogCategory
  );

  useEffect(() => {
    if (id) {
      dispatch(singleBlogCategory({ id }));
    }
  }, [dispatch, id]);

  const formik = useFormik({
    initialValues: {
      title: id ? blogCategories.title : "",
    },
    enableReinitialize: true,
    onSubmit: async values => {
      if (id) {
        dispatch(editBlogCategories({ id, token: user.token, data: values }));

        if (isSuccess && (message === "updated" || "single blog cat")) {
          toast.success("Blog Category Updated");
          formik.resetForm();
          setTimeout(() => {
            navigate("/admin/blog-category-list");
          }, 500);
        } else if (isError) {
          toast.error("Something went wrong");
        }
      } else {
        dispatch(createBlogCategories({ data: values, token: user.token }));

        if (isSuccess && message === "success") {
          toast.success("Blog Category created successfully");
          formik.resetForm();
          setTimeout(() => {
            navigate("/admin/blog-category-list");
          }, 500);
        } else if (isError) {
          toast.error(message);
        }
      }
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
    }),
  });

  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold">
        {id ? "Edit" : "Add"} Blog Category
      </h1>

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

          <Button title={id ? "Edit Blog Category" : "Add Blog Category"} />
        </form>
      </div>
    </>
  );
};

export default AddBlogCategory;
