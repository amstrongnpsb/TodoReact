import ActionButton from "../elements/buttons/ActionButton";
import { Index as ActionIcons } from "../assets/icons/actionIcons/Index";
import { useEffect, useState } from "react";
export const ActionButtonBox = ({ actionActiveButton, resetButton }) => {
  const buttonLists = ActionIcons();
  const [isActive, setIsActive] = useState([false, false, false]);
  useEffect(() => {
    if (resetButton) {
      setIsActive([false, false, false]);
      actionActiveButton([]);
    }
  }, [resetButton]);
  const handleActiveButton = (index) => {
    const updatedIsActive = isActive.map((value, i) => {
      if (i === index) {
        return !value;
      }
    });
    actionActiveButton(updatedIsActive);
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
