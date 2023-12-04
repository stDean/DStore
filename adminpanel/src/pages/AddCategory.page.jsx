import { useFormik } from "formik";
import { Button, CustomInput } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  createCategories,
  editProdCats,
  singleProdCat,
} from "../features/category/categorySlice";
import { useEffect } from "react";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { user } = useSelector(({ auth }) => auth);
  const {
    isSuccess,
    isError,
    productCategories: categories,
    message,
  } = useSelector(({ productCategory }) => productCategory);

  useEffect(() => {
    if (id) {
      dispatch(singleProdCat({ id }));
    }
  }, [dispatch, id]);

  const formik = useFormik({
    initialValues: {
      title: id ? categories.title : "",
    },
    enableReinitialize: true,
    onSubmit: async values => {
      if (id) {
        dispatch(editProdCats({ id, token: user.token, data: values }));

        if (isSuccess && (message === "updated" || "single prod cat")) {
          toast.success("Brand Updated");
          formik.resetForm();
          setTimeout(() => {
            navigate("/admin/list-category");
          }, 500);
        } else if (isError) {
          toast.error("Something went wrong");
        }
      } else {
        dispatch(createCategories({ data: values, token: user.token }));

        if (isSuccess && message === "success") {
          toast.success("Category created successfully");
          formik.resetForm();
          setTimeout(() => {
            navigate("/admin/list-category");
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
        {id ? "Edit" : "Add"} Category
      </h1>

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

          <Button title={id ? "Edit Category" : "Add Category"} />
        </form>
      </div>
    </>
  );
};

export default AddCategory;
