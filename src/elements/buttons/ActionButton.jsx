import { motion } from "framer-motion";
import { useState } from "react";
import { MdAssignmentAdd } from "react-icons/md";
import { GrTask } from "react-icons/gr";
import { GrProjects } from "react-icons/gr";
const ActionButton = ({ index }) => {
  const [isShow, setIsShow] = useState(false);
  const buttonList = [
    {
      label: "add new task",
      icon: <MdAssignmentAdd className="w-6 h-6" />,
    },
    {
      label: "completed task",
      icon: <GrTask className="w-6 h-6" />,
    },
    {
      label: "list group",
      icon: <GrProjects className="w-6 h-6" />,
    },
  ];
  return (
    <motion.div
      onMouseEnter={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
      initial={false}
      animate={isShow ? "open" : "closed"}
      className="buttonWrapper hover:bg-slate-100 rounded-lg p-2 cursor-pointer"
    >
      {buttonList[index].icon}
      <motion.p
        variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
        className="text-sm font-semibold bg-gray-900 text-white px-2 py-1 absolute rounded-lg mt-5 capitalize"
      >
        {buttonList[index].label}
      </motion.p>
    </motion.div>
  );
};

export default ActionButton;
