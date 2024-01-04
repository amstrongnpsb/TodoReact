import ActionButton from "../elements/buttons/ActionButton";
const ActionButtonBox = () => {
  return (
    <div className="flex p-2 gap-1 w-fit rounded-xl shadow-md ">
      <ActionButton index={0} />
      <ActionButton index={1} />
      <ActionButton index={2} />
    </div>
  );
};

export default ActionButtonBox;
