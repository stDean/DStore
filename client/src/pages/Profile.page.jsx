import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { BreadCrumb, Input, Meta } from "../components";
import { Button } from "../components/ui/Button";
import { updateProfile } from "../feature/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const {
    isSuccess,
    isError,
    message,
    currentUser: { user, token },
  } = useSelector(({ auth }) => auth);

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      mobile: user?.mobile,
    },
    enableReinitialize: true,
    onSubmit: async values => {
      dispatch(
        updateProfile({
          token,
          data: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            mobile: values.mobile,
          },
        })
      );

      if (isSuccess) {
        toast.success("Profile Updated");
        formik.resetForm();
      } else if (isError) {
        toast.error(message);
      }
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email is required"),
      mobile: Yup.string().required("Mobile number is required"),
    }),
  });


  return (
    <>
      <Meta title="Profile" />

      <div className="w-full bg-[#f5f5f7]">
        <BreadCrumb text="My Profile" />

        <div className="mt-20 pb-32">
          <div className="mx-auto max-w-md bg-white rounded-lg shadow-lg">
            <div className="p-6 space-y-4">
              <h1 className="text-lg text-center font-semibold">
                Update Profile
              </h1>

              <div>
                <form
                  action=""
                  className="space-y-4"
                  onSubmit={formik.handleSubmit}
                >
                  <div>
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formik.values.firstName}
                      onChange={formik.handleChange("firstName")}
                    />
                  </div>

                  <div>
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formik.values.lastName}
                      onChange={formik.handleChange("lastName")}
                    />
                  </div>

                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange("email")}
                    />
                  </div>

                  <div>
                    <Input
                      type="text"
                      name="mobile"
                      placeholder="Mobile Number"
                      value={formik.values.mobile}
                      onChange={formik.handleChange("mobile")}
                    />
                  </div>

                  <Button text="UPDATE PROFILE" mr />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
