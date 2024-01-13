import { MdAssignmentAdd } from "react-icons/md";
import { GrTask } from "react-icons/gr";
import { GrProjects } from "react-icons/gr";
export const Index = () => {
  return [
    {
      class: "newTask",
      label: "add new task",
      icon: <MdAssignmentAdd className="w-6 h-6" />,
    },
    {
      class: "completeTask",
      label: "completed task",
      icon: <GrTask className="w-6 h-6" />,
    },
    {
      class: "listGroup",
      label: "list group",
      icon: <GrProjects className="w-6 h-6" />,
    },
  ];
};
