import BlockingBox from "../elements/BlockingBox";
import Navbar from "../fragments/Navbar";
import UserLayout from "@/layouts/UserLayout";
const UserPage = () => {
  return (
    <div className="max-h-screen h-screen w-screen m-auto flex items-center justify-center font-SpaceGrotesk-reg">
      <BlockingBox />
      <Navbar />
      <UserLayout />
    </div>
  );
};

export default UserPage;
