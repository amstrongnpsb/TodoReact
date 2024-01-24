import UserListContainer from "@/fragments/UserListContainer";
import UserOnlineContainer from "@/fragments/UserOnlineContainer";

const UserLayout = () => {
  return (
    <div className="userLayout min-h-full w-[90%] py-10  flex flex-row justify-between gap-5">
      <UserListContainer />
      <UserOnlineContainer />
    </div>
  );
};

export default UserLayout;
