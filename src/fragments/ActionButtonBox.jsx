import ActionButton from "../elements/buttons/ActionButton";
import { Index as ActionIcons } from "../assets/icons/actionIcons/Index";
import { useState } from "react";
const ActionButtonBox = () => {
  const buttonLists = ActionIcons();
  const [isActive, setIsActive] = useState([false, false, false]);
  const handleActiveButton = (index) => {
    const updatedIsActive = isActive.map((value, i) => {
      if (i === index) {
        return !value; // Toggle the value at the clicked index
      }
    });
    setIsActive(updatedIsActive);
    console.log(updatedIsActive);
  };
  console.log(isActive);
  return (
    <div className="flex p-2 gap-1 w-fit rounded-xl shadow-md ">
      {buttonLists.map((buttonList, index) => (
        <ActionButton
          key={index}
          data={buttonList}
          handleClicked={() => {
            handleActiveButton(index);
          }}
          isActive={isActive[index]}
        />
      ))}
    </div>
  );
};

export default ActionButtonBox;
