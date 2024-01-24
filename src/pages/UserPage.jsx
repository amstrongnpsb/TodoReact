import { useFetchUsers } from "@/services/customHooks/userController";
import BlockingBox from "../elements/BlockingBox";
import Navbar from "../fragments/Navbar";
import UserLayout from "@/layouts/UserLayout";
const UserPage = () => {
  const {
    data: users,
    isLoading: isLoadingUsers,
    error,
    refetch: refetchUsers,
  } = useFetchUsers();
  return (
    <div className="max-h-screen h-screen w-screen m-auto flex items-center justify-center font-SpaceGrotesk-reg">
      <BlockingBox />
      <Navbar />
      <UserLayout />
    </div>
  );
};

export default UserPage;
