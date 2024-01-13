import ActionButton from "../elements/buttons/ActionButton";
import { Index as ActionIcons } from "../assets/icons/actionIcons/Index";
import { useState } from "react";
export const ActionButtonBox = (props) => {
  const buttonLists = ActionIcons();
  const [isActive, setIsActive] = useState([false, false, false]);
  const handleActiveButton = (index) => {
    const updatedIsActive = isActive.map((value, i) => {
      if (i === index) {
        return !value;
      }
    });
    props.sendToParent(updatedIsActive);
    setIsActive(updatedIsActive);
  };
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
