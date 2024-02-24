import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LoadingSpin from "@/elements/LoadingSpin";
import { useFetchOnlineUsers } from "@/services/Hooks/userController";
import { HiRefresh } from "react-icons/hi";

const UserOnlineContainer = () => {
  const {
    data: onlineUsers,
    isLoading: isLoadingOnlineUsers,
    isRefetching: isLoadingRefetchOnlineUsers,
    refetch: refetchOnlineUsers,
  } = useFetchOnlineUsers();

  const generateOnlineStatusRemark = (lastSeen) => {
    const lastSeenTime = new Date(lastSeen);
    const currentTime = new Date();
    const timeDifference = currentTime - lastSeenTime;
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              className={`onlineStatus rounded-full ${
                timeDifference > 10 * 60 * 1000
                  ? "bg-yellow-400"
                  : "bg-green-600"
              } w-3 h-3`}
            >
              <TooltipContent>
                <div className="statusInfo w-fit">
                  {timeDifference > 10 * 60 * 1000 ? "Idle" : "Online"}
                </div>
              </TooltipContent>
            </div>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    );
  };
  const renderingOnlineUserCards = () => {
    return onlineUsers?.data.data.map((onlineUser) => (
      <div
        className="userOnlineCard shadow-md px-2 py-3 rounded-sm flex flex-row justify-between items-center gap-1"
        key={onlineUser.id}
      >
        <div>{onlineUser.username}</div>
        {generateOnlineStatusRemark(onlineUser.last_activity)}
      </div>
    ));
  };
  return (
    <div className="userOnlineListBox max-h-screen w-[250px] rounded-xl overflow-auto shadow-xl py-2 flex flex-col gap-1 px-2">
      <div className="flex flex-row justify-between items-center mb-3">
        <h1 className="text-center font-bold text-base">Online Users</h1>
        <div
          className={`cursor-pointer rounded-full w-fit h-fit p-1 shadow-md border border-black ${
            isLoadingRefetchOnlineUsers && "animate-spin"
          } `}
          onClick={() => refetchOnlineUsers()}
        >
          <HiRefresh />
        </div>
      </div>

      {(isLoadingOnlineUsers || isLoadingRefetchOnlineUsers) && (
        <LoadingSpin
          name={"Loading..."}
          isLoading={isLoadingOnlineUsers}
          width={5}
          height={5}
        />
      )}
      {renderingOnlineUserCards()}
    </div>
  );
};

export default UserOnlineContainer;
