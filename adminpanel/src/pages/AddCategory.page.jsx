import { useFormik } from "formik";
import { Button, CustomInput } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { createCategories } from "../features/category/categorySlice";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(({ auth }) => auth);
  const { isSuccess, isError } = useSelector(
    ({ productCategory }) => productCategory
  );

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: async values => {
      dispatch(createCategories({ data: values, token: user.token }));
      if (isSuccess) {
        toast.success("Category created successfully");
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/list-category");
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
      <h1 className="mb-6 text-3xl font-semibold">Add Category</h1>

      <div className="max-w-5xl mx-auto shadow-md p-6">
        <form action="" onSubmit={formik.handleSubmit}>
          <div>
            <CustomInput
              type="text"
              label="Category"
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

          <Button title="Add Category" />
        </form>
      </div>
    </>
  );
};

export default AddCategory;
