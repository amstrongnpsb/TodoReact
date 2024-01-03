import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import SettingsPage from "./pages/SettingPage";
import TodoListPage from "./pages/TodoListPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoListPage />} />
          <Route path="/todolist" element={<TodoListPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* 404 Router */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
