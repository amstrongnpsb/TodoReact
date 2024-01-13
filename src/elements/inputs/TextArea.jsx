const TextArea = ({ label, placeholder, focus, name }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="font-semibold block">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows="4"
        cols="50"
        placeholder={placeholder}
        className="w- p-2 rounded-lg shadow-md outline-none block"
        autoFocus={focus ? true : undefined}
      />
    </div>
  );
};

export default TextArea;
