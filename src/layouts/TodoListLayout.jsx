import TodoListBox from "../fragments/TodoListBox";
import ActionButtonBox from "../fragments/ActionButtonBox";
const TodoListLayout = () => {
  return (
    <div className="min-h-screen bg-white w-[90%] mr-0 p-3">
      <ActionButtonBox />
      <div>
        <TodoListBox />
      </div>
    </div>
  );
};

export default TodoListLayout;
