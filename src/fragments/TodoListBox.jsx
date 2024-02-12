import { useState } from "react";
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
} from "../services/Hooks/taskController";
import * as Yup from "yup";
import DeleteButton from "@/elements/buttons/DeleteButton";
import { EditDialogButton } from "@/elements/buttons/DialogButton";
import SelectOption from "@/elements/inputs/SelectOption";
import { Dialog } from "@/components/ui/dialog";
import { toastHandler } from "@/services/Hooks/toastHandler";
const TodoListBox = () => {
  const {
    data: tasks,
    isLoading: isLoadingTasks,
    error,
    refetch: refetchTasks,
  } = useFetchTasks();
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
      formikEditTask.resetForm();
      setResetButton(!resetButton);
      setResetButton([]);
    },
  });
  const { mutate: createTask, isPending: isLoadingCreateTask } = usePostTask(
    toastHandler(refetchTasks)
  );
  const { mutate: editTask, isPending: isLoadingEditTask } = useEditTask(
    toastHandler(refetchTasks)
  );
  const onEditClick = (task) => {
    formikEditTask.setFieldValue("id", task.id);
    formikEditTask.setFieldValue("title", task.title);
    formikEditTask.setFieldValue("description", task.description);
    formikEditTask.setFieldValue("status", task.status);
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
  const { mutate: deleteTask } = useDeleteTask(toastHandler(refetchTasks));
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
          <td scope="row">{index + 1}</td>
          <td scope="row">{task.title}</td>
          <td scope="row">{task.description}</td>
          <td>
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
          <td scope="row">{task.created_by}</td>
          <td scope="row">{task.created_at}</td>
          <td className="w-10 px-2 py-2">
            <DeleteButton
              name="Delete Task"
              handleClick={() => handleDeleteTask(task.id)}
            />
          </td>
          <td className="w-10 px-2 py-2">
            <EditDialogButton
              name="Edit Task"
              handleClick={() => onEditClick(task)}
            >
              <FormComponent
                titleName={"Edit Task Form"}
                buttonName={"Edit Task"}
                handlingSubmit={formikEditTask.handleSubmit}
                pending={isLoadingEditTask}
              >
                <Input
                  label="Title"
                  type="text"
                  placeholder="Title"
                  value={formikEditTask.values.title}
                  focus={true}
                  name="title"
                  errors={{
                    message: formikCreateTask.errors.title,
                    status: formikCreateTask.touched.title,
                  }}
                  handlingOnchange={handleEditForm}
                />
                <SelectOption
                  label="Status"
                  name="status"
                  handlingOnchange={handleEditForm}
                  value={formikEditTask.values.status}
                />
                <TextArea
                  label="Description"
                  placeholder="Description"
                  value={formikEditTask.values.description}
                  errors={{
                    message: formikCreateTask.errors.description,
                    status: formikCreateTask.touched.description,
                  }}
                  name="description"
                  handlingOnchange={handleEditForm}
                />
              </FormComponent>
            </EditDialogButton>
          </td>
        </tr>
      ))
    );
  };
  const getActiveButton = (activeButton) => {
    setActiveButton(activeButton);
  };
  return (
    <div className="todoListBox w-[80%] mx-auto p-3">
      <div className="flex flex-row w-full justify-between items-center">
        <ActionButtonBox
          actionActiveButton={getActiveButton}
          resetButton={resetButton}
        />
        <SearchButton />
      </div>
      <AnimatePresence>
        <div className="formContainer w-96">
          {activeButton[0] && (
            <Dialog>
              <FormComponent
                titleName={"New Task Form"}
                buttonName={"Create Task"}
                handlingSubmit={formikCreateTask.handleSubmit}
                pending={isLoadingCreateTask}
              >
                <Input
                  label="Title"
                  type="text"
                  placeholder="Title"
                  value={formikCreateTask.values.title}
                  focus={true}
                  required={true}
                  errors={{
                    message: formikCreateTask.errors.title,
                    status: formikCreateTask.touched.title,
                  }}
                  name="title"
                  handlingOnchange={handleCreateForm}
                />
                <TextArea
                  label="Description"
                  placeholder="Description"
                  value={formikCreateTask.values.description}
                  focus={false}
                  required={true}
                  errors={{
                    message: formikCreateTask.errors.description,
                    status: formikCreateTask.touched.description,
                  }}
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
