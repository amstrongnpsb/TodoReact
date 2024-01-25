import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { BiSolidUserDetail } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
export const EditDialogButton = ({ children, handleClick, name }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="hover:bg-slate-200 p-2 flex items-center"
          title={name}
          onClick={handleClick}
        >
          <FaRegEdit className="w-6 h-6 mx-auto " />
        </button>
      </DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
export const ShowDialogButton = ({ children, handleClick }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="hover:bg-slate-200 p-2 flex items-center"
          onClick={handleClick}
          title="View Details"
        >
          <BiSolidUserDetail className="w-7 h-7 mx-auto " />
        </button>
      </DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
