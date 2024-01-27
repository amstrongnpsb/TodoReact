import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { BiSolidUserDetail } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
export const EditDialogButton = ({
  children,
  handleClick,
  name,
  tooltip,
  buttonName,
}) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className=" w-fit"
    >
      <Dialog
        className="font-SpaceGrotesk-reg"
        onOpenChange={() => setIsHover(false)}
      >
        <DialogTrigger asChild>
          <div className="relative w-fit">
            {Boolean(isHover && tooltip) && (
              <div className="toolTip absolute w-[100px] top-12 bg-black text-white p-1 rounded-lg ">
                {name}
              </div>
            )}
            <button
              className="hover:bg-slate-200 p-2 flex items-center rounded-lg gap-2"
              onClick={handleClick}
            >
              <FaRegEdit className="w-6 h-6 mx-auto " />
              {Boolean(buttonName) && (
                <span className="text-sm font-semibold">{name}</span>
              )}
            </button>
          </div>
        </DialogTrigger>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
};
export const ShowDialogButton = ({ children, handleClick }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="hover:bg-slate-200 p-2 flex items-center"
          onClick={handleClick}
        >
          <BiSolidUserDetail className="w-7 h-7 mx-auto " />
        </button>
      </DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
