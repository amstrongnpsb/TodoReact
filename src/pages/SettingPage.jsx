import { useAuth } from "@/services/Hooks/useAuth";
import BlockingBox from "../elements/BlockingBox";
import Navbar from "../fragments/Navbar";
const SettingPage = () => {
  useAuth();
  return (
    <div className="min-h-screen bg-slate-200 m-auto flex items-center justify-center">
      <BlockingBox />
      <Navbar />
    </div>
  );
};

export default SettingPage;
