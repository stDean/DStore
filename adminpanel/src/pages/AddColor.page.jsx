import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { createColors } from "../features/color/colorSlice";

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(({ auth }) => auth);
  const { isError, isSuccess } = useSelector(({ color }) => color);

  const formik = useFormik({
    initialValues: {
      title: "black",
    },
    onSubmit: async values => {
      dispatch(createColors({ data: values, token: user.token }));
      if (isSuccess) {
        toast.success("Color created successfully");
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/list-color");
        }, 3000);
      } else if (isError) {
        toast.error("Something went wrong");
      }
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Color is required"),
    }),
  });

  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold">Add Color</h1>

      <div className="max-w-5xl mx-auto shadow-md p-6">
        <form
          action=""
          className="flex flex-col"
          onSubmit={formik.handleSubmit}
        >
          <label htmlFor="color" className="flex flex-col">
            <span className="text-sm">Choose a color</span>
            <input
              type="color"
              name="title"
              id="color"
              className="w-full"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
          </label>

          <Button title="Add Color" />
        </form>
      </div>
    </>
  );
};

export default AddColor;
