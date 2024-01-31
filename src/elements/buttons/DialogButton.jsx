import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BiSolidUserDetail } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
export const EditDialogButton = ({
  children,
  handleClick,
  name,
  buttonName,
}) => {
  return (
    <Dialog className="font-SpaceGrotesk-reg">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <DialogTrigger asChild>
              <div
                className="editButtonWrapper hover:bg-sky-200 p-2 rounded-lg gap-2 shadow-md flex flex-row items-center"
                onClick={handleClick}
              >
                <FaRegEdit className="w-6 h-6 mx-auto" />
                {Boolean(buttonName) && (
                  <span className="text-sm font-semibold whitespace-nowrap">
                    {name}
                  </span>
                )}
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </div>
            </DialogTrigger>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
export const ShowDialogButton = ({
  children,
  handleClick,
  name,
  buttonName,
}) => {
  return (
    <Dialog className="font-SpaceGrotesk-reg">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <DialogTrigger asChild>
              <div
                className="showButtonWrapper hover:bg-teal-200 p-2 rounded-lg gap-2 shadow-md flex flex-row items-center"
                onClick={handleClick}
              >
                <BiSolidUserDetail className="w-6 h-6 mx-auto" />
                {Boolean(buttonName) && (
                  <span className="text-sm font-semibold whitespace-nowrap">
                    {name}
                  </span>
                )}
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </div>
            </DialogTrigger>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
