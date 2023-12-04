import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  createColors,
  editColors,
  singleColor,
} from "../features/color/colorSlice";
import { useEffect } from "react";

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { user } = useSelector(({ auth }) => auth);
  const { isError, isSuccess, colors, message } = useSelector(
    ({ color }) => color
  );

  useEffect(() => {
    if (id) {
      dispatch(singleColor({ id }));
    }
  }, [dispatch, id]);

  const formik = useFormik({
    initialValues: {
      title: id ? colors.title : "black",
    },
    enableReinitialize: true,
    onSubmit: async values => {
      if (id) {
        dispatch(editColors({ id, token: user.token, data: values }));

        if (isSuccess && (message === "updated" || "single color")) {
          toast.success("Color Updated");
          formik.resetForm();
          setTimeout(() => {
            navigate("/admin/list-color");
          }, 500);
        } else if (isError) {
          toast.error("Something went wrong");
        }
      } else {
        dispatch(createColors({ data: values, token: user.token }));

        if (isSuccess && message === "success") {
          toast.success("Color created successfully");
          formik.resetForm();
          setTimeout(() => {
            navigate("/admin/list-color");
          }, 500);
        } else if (isError) {
          toast.error(message);
        }
      }
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Color is required"),
    }),
  });

  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold">
        {id ? "Edit" : "Add"} Color
      </h1>

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

          <Button title={id ? "Edit Color" : "Add Color"} />
        </form>
      </div>
    </>
  );
};

export default AddColor;
