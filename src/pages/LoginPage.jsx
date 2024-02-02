import Input from "../elements/inputs/Input";
import FormComponent from "../fragments/FormComponent";
import { NavLink, useNavigate } from "react-router-dom";
import { Dialog } from "@/components/ui/dialog";
import { useFormik } from "formik";
import { useLogin } from "@/services/Hooks/authController";
import { toast } from "@/components/ui/use-toast";
import { MdOutlineMoodBad } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import * as Yup from "yup";
import { useEffect } from "react";
const LoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/todolist");
    }
  }, []);
  const statusHandler = {
    onSuccess: (message) => {
      toast({
        variant: "success",
        title: (
          <span className="text-sm font-bold flex flex-row items-center justify-center gap-2">
            Login Success
            <GrStatusGood className="w-6 h-6" />
          </span>
        ),
        description: message ? message : "",
      });
      navigate("/todolist");
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
  const formikLogin = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async () => {
      login(formikLogin.values);
      formikLogin.resetForm();
    },
  });
  const handleInputForm = (e) => {
    formikLogin.setFieldValue(e.target.name, e.target.value);
  };
  const { mutate: login, isPending: isLoadingLogin } = useLogin(statusHandler);
  return (
    <div className="min-h-screen w-screen m-auto flex items-center justify-center font-SpaceGrotesk-reg">
      <div className="loginFormContainer w-3/12">
        <Dialog>
          <FormComponent
            titleName="Login Form"
            buttonName="Login"
            handlingSubmit={formikLogin.handleSubmit}
            pending={isLoadingLogin}
          >
            <Input
              label="Email"
              type="email"
              placeholder="Email"
              focus={true}
              name="email"
              value={formikLogin.values.email}
              handlingOnchange={handleInputForm}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Password"
              name="password"
              value={formikLogin.values.password}
              handlingOnchange={handleInputForm}
            />
          </FormComponent>
          <div className="mx-auto w-fit mt-2">
            <p>
              Don&apos;t have an account?
              <span className="ml-1 text-blue-700 font-semibold">
                <NavLink to="/register">Register</NavLink>
              </span>
            </p>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default LoginPage;
