const Input = ({ label, type, placeholder, focus, name }) => {
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
      />
    </div>
  );
};

export default Input;
