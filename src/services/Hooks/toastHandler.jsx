import { GrStatusGood } from "react-icons/gr";
import { MdOutlineMoodBad } from "react-icons/md";
export const toastHandler = (refetch) => ({
  onSuccess: ({ message, navigate, toast }) => {
    toast({
      variant: "success",
      title: (
        <span className="text-sm font-bold flex flex-row items-center justify-center gap-2">
          Success
          <GrStatusGood className="w-6 h-6" />
        </span>
      ),
      description: message ? message : "",
    });

    refetch && refetch();
    navigate && navigate();
  },
  onError: ({ message, navigate, toast }) => {
    toast({
      variant: "error",
      title: (
        <div className="text-sm font-bold flex flex-row items-center justify-center gap-2">
          Failed
          <MdOutlineMoodBad className="w-6 h-6" />
        </div>
      ),
      description: message ? message : "",
    });
    navigate && navigate();
  },
});
