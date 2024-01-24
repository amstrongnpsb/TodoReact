import { Toaster } from "./components/ui/toaster";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SettingsPage from "./pages/SettingPage";
import TodoListPage from "./pages/TodoListPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoListPage />} />
          <Route path="/todolist" element={<TodoListPage />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* 404 Router */}
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
