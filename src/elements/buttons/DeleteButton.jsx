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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MdDeleteOutline } from "react-icons/md";

const DeleteButton = ({ handleClick, name, buttonName }) => {
  return (
    <AlertDialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <AlertDialogTrigger asChild>
              <div className="deleteButtonWrapper hover:bg-red-200 p-2 flex items-center rounded-lg gap-2 shadow-md">
                <MdDeleteOutline className="w-6 h-6 " />
                {Boolean(buttonName) && (
                  <span className="text-sm font-semibold whitespace-nowrap">
                    {name}
                  </span>
                )}
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </div>
            </AlertDialogTrigger>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the data.
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
  );
};

export default DeleteButton;
