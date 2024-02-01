const TextArea = ({
  label,
  placeholder,
  focus,
  name,
  handlingOnchange,
  value,
  required,
  errors,
}) => {
  return (
    <div className="mb-3">
      {Boolean(errors?.message && errors.status) && (
        <div className="text-red-500 text-[12px] font-bold">
          {errors.message}
        </div>
      )}
      <label htmlFor={name} className="font-semibold block">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows="4"
        cols="50"
        placeholder={placeholder}
        className="w-full p-2 rounded-lg shadow-md outline-none block"
        autoFocus={focus ? true : undefined}
        onChange={handlingOnchange}
        value={value}
      />
    </div>
  );
};

export default TextArea;
