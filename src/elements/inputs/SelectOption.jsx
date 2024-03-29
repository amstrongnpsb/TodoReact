const SelectOption = ({ label, name, value, handlingOnchange }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="font-semibold block">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={handlingOnchange}
        className="outline-none cursor-pointer"
        id={name}
        autoComplete="off"
      >
        <option value="pending">Pending</option>
        <option value="on going">On Going</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
};

export default SelectOption;
