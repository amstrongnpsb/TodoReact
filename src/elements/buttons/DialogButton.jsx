import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FaRegEdit } from "react-icons/fa";

const DialogButton = ({ children, handleClick }) => {
  return (
    <div onClick={handleClick}>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-zinc-900">
            Edit Task
            <FaRegEdit className="w-6 h-6 ml-3" />
          </Button>
        </DialogTrigger>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogButton;
