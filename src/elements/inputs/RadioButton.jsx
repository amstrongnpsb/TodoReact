const RadioButton = ({ option, title, handlingOnchange, required, name }) => {
  return (
    <div className="mb-3">
      <p className="font-semibold">
        {title} {required && <span style={{ color: "red" }}>*</span>}
      </p>
      <div className="flex flex-row gap-2">
        {option.map((item, index) => (
          <div key={index} className="flex gap-1 items-center">
            <input
              type="radio"
              name={name}
              id={item.value}
              value={item.value}
              onChange={handlingOnchange}
              className="appearance-none h-3 w-3 border rounded-full border-gray-300 checked:bg-red-600 checked:border-transparent  focus:outline-none"
            />
            <label htmlFor={item.value} className="cursor-pointer ">
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioButton;
