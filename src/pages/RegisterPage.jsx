import { Dialog } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import Input from "@/elements/inputs/Input";
import UploadFile from "@/elements/inputs/UploadFile";
import FormComponent from "@/fragments/FormComponent";
import { useRegister } from "@/services/Hooks/authController";
import { useFormik } from "formik";
import { GrStatusGood } from "react-icons/gr";
import { MdOutlineMoodBad } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const RegisterPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const statusHandler = {
    onSuccess: (message) => {
      toast({
        variant: "success",
        title: (
          <span className="text-sm font-bold flex flex-row items-center justify-center gap-2">
            Your Account Created
            <GrStatusGood className="w-6 h-6" />
          </span>
        ),
        description: message ? message : "",
      });
      navigate("/login");
    },
    onError: (message) => {
      toast({
        variant: "error",
        title: (
          <div className="text-sm font-bold flex flex-row items-center justify-center gap-2">
            Failed
            <MdOutlineMoodBad className="w-6 h-6" />
          </div>
        ),
        description: message ? message : "",
      });
    },
  };
  const formikRegister = useFormik({
    initialValues: {
      username: "",
      first_name: "",
      last_name: "",
      date_of_birth: "",
      email: "",
      password: "",
      profile_picture: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      first_name: Yup.string().required("First Name is required"),
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
      date_of_birth: Yup.string().required("Date of Birth is required"),
      profile_picture: Yup.mixed().test(
        "fileType",
        "Only images (jpeg, png, jpg, gif) are allowed",
        (value) => {
          if (!value) {
            return true; // Empty value is allowed
          }
          return (
            value &&
            /^(image\/jpeg|image\/png|image\/jpg|image\/gif)$/.test(value.type)
          );
        }
      ),
    }),
    onSubmit: () => {
      const formData = new FormData();

      Object.entries(formikRegister.values).forEach(([key, value]) => {
        if (key === "profile_picture") {
          formData.append("profile_picture", value, value.name);
        } else {
          formData.append(key, value);
        }
      });

      register(formData);
    },
  });
  const { mutate: register, isLoading: isLoadingRegister } =
    useRegister(statusHandler);
  const handleInputForm = {
    input: (e) => {
      formikRegister.setFieldValue(e.target.name, e.target.value);
    },
    file: (file) => {
      formikRegister.setFieldValue("profile_picture", file);
    },
  };
  console.log(formikRegister.errors, formikRegister.touched);
  return (
    <div>
      <div className="min-h-screen w-screen m-auto flex items-center justify-center font-SpaceGrotesk-reg">
        <div className="registerFormContainer w-3/12">
          <Dialog>
            <FormComponent
              titleName="Register Form"
              buttonName="Register"
              handlingSubmit={formikRegister.handleSubmit}
              pending={isLoadingRegister}
            >
              <Input
                label="Username"
                type="text"
                placeholder="Username"
                focus={true}
                name="username"
                required={true}
                errors={{
                  message: formikRegister.errors.username,
                  status: formikRegister.touched.username,
                }}
                value={formikRegister.values.username}
                handlingOnchange={handleInputForm.input}
              />
              <Input
                label="Email"
                type="email"
                placeholder="Email"
                name="email"
                required={true}
                errors={{
                  message: formikRegister.errors.email,
                  status: formikRegister.touched.email,
                }}
                value={formikRegister.values.email}
                handlingOnchange={handleInputForm.input}
              />
              <Input
                label="First Name"
                type="text"
                placeholder="First Name"
                name="first_name"
                required={true}
                errors={{
                  message: formikRegister.errors.first_name,
                  status: formikRegister.touched.first_name,
                }}
                value={formikRegister.values.first_name}
                handlingOnchange={handleInputForm.input}
              />
              <Input
                label="Last Name"
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={formikRegister.values.last_name}
                handlingOnchange={handleInputForm.input}
              />
              <UploadFile
                name="profile_picture"
                label="Profile Picture"
                value={formikRegister.values.profile_picture}
                errors={{
                  message: formikRegister.errors.profile_picture,
                  status: formikRegister.touched.profile_picture,
                }}
                handlingOnchange={handleInputForm.file}
              />
              <Input
                label="Date of birth"
                type="date"
                placeholder="Date of birth"
                name="date_of_birth"
                required={true}
                errors={{
                  message: formikRegister.errors.date_of_birth,
                  status: formikRegister.touched.date_of_birth,
                }}
                value={formikRegister.values.date_of_birth}
                handlingOnchange={handleInputForm.input}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Password"
                name="password"
                required={true}
                errors={{
                  message: formikRegister.errors.password,
                  status: formikRegister.touched.password,
                }}
                value={formikRegister.values.password}
                handlingOnchange={handleInputForm.input}
              />
            </FormComponent>
            <div className="mx-auto w-fit mt-2">
              <p>
                Already have an account?
                <span className="ml-1 text-blue-700 font-semibold">
                  <NavLink to="/login">Login</NavLink>
                </span>
              </p>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
