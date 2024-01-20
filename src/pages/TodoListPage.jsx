import TodoListLayout from "../layouts/TodoListLayout";
import Navbar from "../fragments/Navbar";
import BlockingBox from "../elements/BlockingBox";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TodoListPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="min-h-screen w-screen m-auto flex items-center justify-center font-SpaceGrotesk-reg">
      <BlockingBox />
      <Navbar />
      <TodoListLayout />
    </div>
  );
};

export default TodoListPage;
