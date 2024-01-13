import ActionButton from "../elements/buttons/ActionButton";
import { Index as ActionIcons } from "../assets/icons/actionIcons/Index";
const ActionButtonBox = () => {
  const buttonLists = ActionIcons();

  return (
    <div className="flex p-2 gap-1 w-fit rounded-xl shadow-md ">
      {buttonLists.map((buttonList, index) => (
        <ActionButton key={index} data={buttonList} />
      ))}
    </div>
  );
};

export default ActionButtonBox;
