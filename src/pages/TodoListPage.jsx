import TodoListLayout from "../layouts/TodoListLayout";
import Navbar from "../fragments/Navbar";
import TodoListBox from "../fragments/TodoListBox";
const TodoListPage = () => {
  return (
    <div className="min-h-screen bg-slate-200 m-auto flex items-center justify-center">
      <Navbar />
      <TodoListLayout>
        <TodoListBox />
      </TodoListLayout>
    </div>
  );
};

export default TodoListPage;
