import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Button, CustomInput } from "../components";
import { createBrands } from "../features/brand/brandSlice";

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(({ auth }) => auth);
  const { isSuccess, isError } = useSelector(({ brand }) => brand);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: async values => {
      dispatch(createBrands({ data: values, token: user.token }));
      if (isSuccess) {
        toast.success("Brand created successfully");
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/list-brand");
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
      <h1 className="mb-6 text-3xl font-semibold">Add Brand</h1>

      <div className="max-w-5xl mx-auto shadow-md p-6">
        <form action="" onSubmit={formik.handleSubmit}>
          <div>
            <CustomInput
              type="text"
              label="Brand"
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

          <Button title="Add Brand" />
        </form>
      </div>
    </>
  );
};

export default AddBrand;
