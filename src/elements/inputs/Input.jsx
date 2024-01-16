const Input = ({ label, type, placeholder, focus, name, handlingOnchange }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="font-semibold block">
        {label}
      </label>
      <input
        type={type}
        className="w-full p-2 rounded-lg shadow-md outline-none block"
        id={name}
        name={name}
        placeholder={placeholder}
        autoFocus={focus ? true : undefined}
        onChange={handlingOnchange}
      />
    </div>
  );
};

export default Input;
