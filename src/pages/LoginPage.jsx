import { Axios } from "axios";
import Input from "../elements/inputs/Input";
import FormComponent from "../fragments/FormComponent";
import { useRef, useState } from "react";

const LoginPage = () => {
  const [data, setData] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const emailRef = useRef({});
  const passwordRef = useRef({});
  const submitLogin = (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    const baseUrl = "https:127.0.0.1/api";
    Axios.post(`${baseUrl}/login`, {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    })
      .then(function (response) {
        setTimeout(() => {
          setData(response.data);
          setSubmitLoading(false);
        }, 500);
      })
      .catch(function (error) {
        // handle error
        if (error.response) {
          // The request was made and the server responded with a status code
          setData({
            code: 400,
            message: `Error, ${error.response.status} | Endpoint Invalid`,
          });
          setSubmitLoading(false);
          console.log("Request failed with status code", error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          setData({
            code: 503,
            message: "HTTP Status Code 503 - Service Unavailable",
          });
          setSubmitLoading(false);
        } else {
          // Something happened in setting up the request that triggered an Error
          setData({
            code: 500,
            message: `Error, ${error.message}`,
          });
          setSubmitLoading(false);
        }
      });
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
            label="Username"
            type="text"
            placeholder="Username"
            focus={true}
            name="username"
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
