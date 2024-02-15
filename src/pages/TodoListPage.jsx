import TodoListLayout from "../layouts/TodoListLayout";
import Navbar from "../fragments/Navbar";
import BlockingBox from "../elements/BlockingBox";
import { useAuth } from "@/services/Hooks/useAuth";

const TodoListPage = () => {
  useAuth();
  return (
    <div className="todoListPage min-h-screen w-screen m-auto flex items-center justify-center font-SpaceGrotesk-reg ">
      <BlockingBox />
      <Navbar />
      <TodoListLayout />
    </div>
  );
};

export default TodoListPage;
