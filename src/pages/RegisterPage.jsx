import { Dialog } from "@/components/ui/dialog";
import Input from "@/elements/inputs/Input";
import UploadFile from "@/elements/inputs/UploadFile";
import FormComponent from "@/fragments/FormComponent";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";

const RegisterPage = () => {
  const formikRegister = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div>
      <div className="min-h-screen w-screen m-auto flex items-center justify-center font-SpaceGrotesk-reg">
        <div className="registerFormContainer w-3/12">
          <Dialog>
            <FormComponent
              titleName="Register Form"
              buttonName="Register"
              //   handlingSubmit={formikRegister.handleSubmit}
              //   pending={isLoadingRegister}
            >
              <Input
                label="Username"
                type="text"
                placeholder="Username"
                focus={true}
                name="username"
                // value={formikRegister.values.Username}
                // handlingOnchange={handleInputForm}
              />
              <Input
                label="Email"
                type="email"
                placeholder="Email"
                name="email"
                // value={formikRegister.values.email}
                // handlingOnchange={handleInputForm}
              />
              <Input
                label="First Name"
                type="text"
                placeholder="First Name"
                name="firstName"
                // value={formikRegister.values.firstName}
                // handlingOnchange={handleInputForm}
              />
              <UploadFile name="profilePicture" label="Profile Picture" />
              <Input
                label="Last Name"
                type="text"
                placeholder="Last Name"
                name="lastName"
                // value={formikRegister.values.lastName}
                // handlingOnchange={handleInputForm}
              />
              <Input
                label="Date of birth"
                type="date"
                placeholder="Date of birth"
                name="dateOfBirth"
                // value={formikRegister.values.dateOfBirth}
                // handlingOnchange={handleInputForm}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Password"
                name="password"
                // value={formikRegister.values.password}
                // handlingOnchange={handleInputForm}
              />
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                // value={formikRegister.values.confirmPassword}
                // handlingOnchange={handleInputForm}
              />
            </FormComponent>
            <div className="mx-auto w-fit mt-2">
              <p>
                Already have an account?{" "}
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
