import { motion } from "framer-motion";
import LoadingSpin from "../elements/LoadingSpin";
import { DialogClose } from "@/components/ui/dialog";

const FormComponent = ({
  titleName,
  buttonName,
  children,
  handlingSubmit,
  pending,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.3 }}
      className="mt-3 shadow-lg rounded-xl p-4 w-full"
    >
      <form action="#" onSubmit={handlingSubmit}>
        <h1 className="text-xl font-semibold text-center mb-5">{titleName}</h1>
        {children}
        <DialogClose asChild>
          {pending ? (
            <LoadingSpin name="Processing..." />
          ) : (
            <button
              type="submit"
              className="bg-black block w-full font-semibold text-lg text-white px-3 py-2 rounded-lg mt-3 hover:opacity-70"
            >
              {buttonName}
            </button>
          )}
        </DialogClose>
      </form>
    </motion.div>
  );
};

export default FormComponent;
