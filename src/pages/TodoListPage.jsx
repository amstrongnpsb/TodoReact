import TodoListLayout from "../layouts/TodoListLayout";
import Navbar from "../fragments/Navbar";
import BlockingBox from "../elements/BlockingBox";

const TodoListPage = () => {
  return (
    <div className="min-h-screen bg-slate-200 m-auto flex items-center justify-center font-SpaceGrotesk-reg">
      <BlockingBox />
      <Navbar />
      <TodoListLayout />
    </div>
  );
};

export default TodoListPage;
