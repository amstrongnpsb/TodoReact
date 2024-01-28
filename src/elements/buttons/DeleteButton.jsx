import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

const DeleteButton = ({ handleClick, name, buttonName, tooltip }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className=" w-fit"
    >
      <AlertDialog onOpenChange={() => setIsHover(false)}>
        <AlertDialogTrigger asChild>
          <div className="relative w-fit">
            {Boolean(isHover && tooltip) && (
              <div className="toolTip absolute w-[100px] top-12 bg-black text-white p-1 rounded-lg font-semibold text-sm">
                {name}
              </div>
            )}
            <button className="hover:bg-red-200 p-2 flex items-center rounded-lg gap-2 shadow-md">
              <MdDeleteOutline className="w-6 h-6 " />
              {Boolean(buttonName) && (
                <span className="text-sm font-semibold">{name}</span>
              )}
            </button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClick}
              className="bg-red-900 text-white"
            >
              Delete !
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteButton;
