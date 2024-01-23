import { useEffect, useState } from "react";
import { ActionButtonBox } from "../fragments/ActionButtonBox";
import SearchButton from "../elements/buttons/SearchButton";
import LoadingSpin from "../elements/LoadingSpin";
import { AnimatePresence } from "framer-motion";
import Input from "../elements/inputs/Input";
import TextArea from "../elements/inputs/TextArea";
import FormComponent from "./FormComponent";
import { useFormik } from "formik";
import {
  useDeleteTask,
  usePostTask,
  useFetchTasks,
  useEditTask,
} from "../services/customHooks/taskController";
import * as Yup from "yup";
import DeleteButton from "@/elements/buttons/DeleteButton";
import DialogButton from "@/elements/buttons/DialogButton";
import SelectOption from "@/elements/inputs/SelectOption";
import { Dialog } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { MdOutlineMoodBad } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
const TodoListBox = () => {
  const { toast } = useToast();

  const statusHandler = {
    onSuccess: (message) => {
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
      refetchTasks();
    },
    onError: (message) => {
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
    },
  };
  const {
    data: tasks,
    isLoading: isLoadingTasks,
    error,
    refetch: refetchTasks,
  } = useFetchTasks();
  useEffect(() => {
    if (error) {
      toast({
        variant: "error",
        title: (
          <div className="text-sm font-bold flex flex-row items-center justify-center gap-2">
            Failed
            <MdOutlineMoodBad className="w-6 h-6" />
          </div>
        ),
        description: "Fail to fetching tasks",
      });
    }
  }, [error]);
  const [activeButton, setActiveButton] = useState([]);
  const [resetButton, setResetButton] = useState([]);

  const formikCreateTask = useFormik({
    initialValues: { title: "", description: "" },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async () => {
      createTask(formikCreateTask.values);
      formikCreateTask.resetForm();
      setResetButton(!resetButton);
      setResetButton([]);
    },
  });
  const formikEditTask = useFormik({
    initialValues: { title: "", description: "", status: "", id: "" },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      status: Yup.string().required("Title is required"),
      id: Yup.string().required("Description is required"),
    }),
    onSubmit: async () => {
      editTask(formikEditTask.values);
      formikCreateTask.resetForm();
      setResetButton(!resetButton);
      setResetButton([]);
    },
  });
  const { mutate: createTask, isLoading: isLoadingCreateTask } =
    usePostTask(statusHandler);
  const { mutate: editTask, isLoading: isLoadingEditTask } =
    useEditTask(statusHandler);
  const onEditClick = (e, task) => {
    if (e.target.getAttribute("data-state")) {
      formikEditTask.setFieldValue("id", task.id);
      formikEditTask.setFieldValue("title", task.title);
      formikEditTask.setFieldValue("description", task.description);
      formikEditTask.setFieldValue("status", task.status);
    }
  };
  const handleCreateForm = (e) => {
    formikCreateTask.setFieldValue(e.target.name, e.target.value);
  };
  const handleEditForm = (e) => {
    formikEditTask.setFieldValue(e.target.name, e.target.value);
  };
  const handleDeleteTask = (id) => {
    deleteTask(id);
  };
  const { mutate: deleteTask } = useDeleteTask(statusHandler);
  const renderTasks = () => {
    return tasks?.data.data.length === 0 ? (
      <tr className="border-b-2 border-gray-100 text-2xl ">
        <td scope="row" colSpan={999} className="px-6 py-4 text-center">
          No Task Found
        </td>
      </tr>
    ) : (
      tasks?.data.data.map((task, index) => (
        <tr key={task.id} className="border-b-2 border-gray-100">
          <td scope="row" className="px-6 py-4">
            {index + 1}
          </td>
          <td scope="row" className="px-6 py-4">
            {task.title}
          </td>
          <td scope="row" className="px-6 py-4">
            {task.description}
          </td>
          <td className={`px-6 py-4 `}>
            <span
              className={`${
                task.status === "done"
                  ? "bg-green-400"
                  : task.status === "pending"
                  ? "bg-yellow-400"
                  : task.status === "on going"
                  ? "bg-sky-400"
                  : ""
              } p-2 rounded-lg font-semibold capitalize`}
            >
              {task.status}
            </span>
          </td>
          <td scope="row" className="px-6 py-4">
            {task.created_by}
          </td>
          <td scope="row" className="px-6 py-4">
            {task.created_at}
          </td>
          <td className="w-40">
            <DeleteButton
              name="Delete Task"
              handleCLick={() => handleDeleteTask(task.id)}
            />
          </td>
          <td className="w-40">
            <DialogButton
              name="Edit Task"
              handleClick={(e) => onEditClick(e, task)}
            >
              <FormComponent
                titleName={"Edit Task Form"}
                buttonName={"Edit Task"}
                handlingSubmit={formikEditTask.handleSubmit}
                pending={isLoadingEditTask}
              >
                {formikEditTask.touched.title && formikEditTask.errors.title ? (
                  <div className="text-red-500">
                    {formikEditTask.errors.title}
                  </div>
                ) : null}
                <Input
                  label="Title"
                  type="text"
                  placeholder="Title"
                  value={formikEditTask.values.title}
                  focus={true}
                  name="title"
                  handlingOnchange={handleEditForm}
                />
                <SelectOption
                  label="Status"
                  name="status"
                  handlingOnchange={handleEditForm}
                  value={formikEditTask.values.status}
                />
                {formikEditTask.touched.description &&
                formikEditTask.errors.description ? (
                  <div className="text-red-500">
                    {formikEditTask.errors.description}
                  </div>
                ) : null}
                <TextArea
                  label="Description"
                  placeholder="Description"
                  value={formikEditTask.values.description}
                  focus={false}
                  name="description"
                  handlingOnchange={handleEditForm}
                />
              </FormComponent>
            </DialogButton>
          </td>
        </tr>
      ))
    );
  };
  const getActiveButton = (activeButton) => {
    setActiveButton(activeButton);
  };
  return (
    <div className="w-[80%] mx-auto p-3">
      <div className="flex flex-row w-full justify-between items-center">
        <ActionButtonBox
          actionActiveButton={getActiveButton}
          resetButton={resetButton}
        />
        <SearchButton />
      </div>
      <AnimatePresence>
        <div className="w-96">
          {activeButton[0] && (
            <Dialog>
              <FormComponent
                titleName={"New Task Form"}
                buttonName={"Create Task"}
                handlingSubmit={formikCreateTask.handleSubmit}
                pending={isLoadingCreateTask}
              >
                {formikCreateTask.touched.title &&
                formikCreateTask.errors.title ? (
                  <div className="text-red-500">
                    {formikCreateTask.errors.title}
                  </div>
                ) : null}
                <Input
                  label="Title"
                  type="text"
                  placeholder="Title"
                  value={formikCreateTask.values.title}
                  focus={true}
                  name="title"
                  handlingOnchange={handleCreateForm}
                />
                {formikCreateTask.touched.description &&
                formikCreateTask.errors.description ? (
                  <div className="text-red-500">
                    {formikCreateTask.errors.description}
                  </div>
                ) : null}
                <TextArea
                  label="Description"
                  placeholder="Description"
                  value={formikCreateTask.values.description}
                  focus={false}
                  name="description"
                  handlingOnchange={handleCreateForm}
                />
              </FormComponent>
            </Dialog>
          )}
        </div>
      </AnimatePresence>
      <table className="table-auto text-center w-full rounded-xl shadow-md mt-5 ">
        <thead className="font-medium shadow-md">
          <tr>
            <th scope="col" className="px-6 py-4">
              #
            </th>
            <th scope="col" className="px-6 py-4">
              Title
            </th>
            <th scope="col" className="px-6 py-4">
              Description
            </th>
            <th scope="col" className="px-6 py-4">
              Status
            </th>
            <th scope="col" className="px-6 py-4">
              Created By
            </th>
            <th scope="col" className="px-6 py-4">
              Created At
            </th>
            <th scope="col" colSpan={2} className="px-6 py-4">
              Action
            </th>
          </tr>
        </thead>
        {Boolean(isLoadingTasks) && (
          <tbody>
            <tr className="border-b-2 border-gray-100 text-2xl ">
              <td
                scope="row"
                colSpan={999}
                className="px-6 py-4 w-full text-center"
              >
                <LoadingSpin name="Loading Tasks..." />
              </td>
            </tr>
          </tbody>
        )}
        {Boolean(error) && (
          <tbody>
            <tr className="border-b-2 border-gray-100 text-2xl ">
              <td
                scope="row"
                colSpan={999}
                className="px-6 py-4 w-full text-center"
              >
                {error.message}
              </td>
            </tr>
          </tbody>
        )}
        <tbody>{renderTasks()}</tbody>
      </table>
    </div>
  );
};

export default TodoListBox;
