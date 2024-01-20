import Input from "../elements/inputs/Input";
import FormComponent from "../fragments/FormComponent";
import { useRef, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);
  const emailRef = useRef({});
  const passwordRef = useRef({});
  const submitLogin = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const response = await axiosInstance.post(`/login`, {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      console.log(response);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      if (error.response) {
        setData({
          code: 400,
          message: `Error, ${error.response.status} | Endpoint Invalid`,
        });
        setSubmitLoading(false);
        console.log("Request failed with status code", error.response.status);
      } else if (error.request) {
        setData({
          code: 503,
          message: "HTTP Status Code 503 - Service Unavailable",
        });
        setSubmitLoading(false);
      } else {
        setData({
          code: 500,
          message: `Error, ${error.message}`,
        });
        setSubmitLoading(false);
      }
    }
    navigate("/todolist");
  };
  return (
    <div className="min-h-screen w-screen m-auto flex items-center justify-center font-SpaceGrotesk-reg">
      <div className="formLoginContainer w-3/12">
        <FormComponent
          formTitle="Login Form"
          buttonName="Login"
          handlingSubmit={submitLogin}
          pending={submitLoading}
        >
          <Input
            label="Email"
            type="email"
            placeholder="Email"
            focus={true}
            name="email"
            handlingOnchange={(e) => {
              emailRef.current.value = e.target.value;
            }}
          />
          <Input
            label="Password"
            type="text"
            placeholder="Password"
            name="password"
            handlingOnchange={(e) => {
              passwordRef.current.value = e.target.value;
            }}
          />
        </FormComponent>
      </div>
    </div>
  );
};

export default LoginPage;
