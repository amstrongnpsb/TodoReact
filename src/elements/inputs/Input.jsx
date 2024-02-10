import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
const Input = ({
  label,
  type,
  placeholder,
  focus,
  name,
  handlingOnchange,
  value,
  required,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="mb-3">
      {Boolean(errors?.message && errors.status) && (
        <div className="text-red-500 text-[12px] font-bold">
          {errors.message}
        </div>
      )}
      <label htmlFor={name} className="font-semibold block">
        {label}
        {required && <span style={{ color: "red" }}>*</span>}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : type}
          className="w-full p-2 rounded-lg shadow-md outline-none block pr-12"
          id={name}
          name={name}
          placeholder={placeholder}
          autoFocus={focus ? true : undefined}
          onChange={handlingOnchange}
          value={value}
          autoComplete="off"
        />
        {name === "password" && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="showIcon cursor-pointer" onClick={togglePassword}>
              {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
