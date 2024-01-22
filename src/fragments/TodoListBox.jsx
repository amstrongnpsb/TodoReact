import { useState } from "react";
import { ActionButtonBox } from "../fragments/ActionButtonBox";
import SearchButton from "../elements/buttons/SearchButton";
import LoadingSpin from "../elements/LoadingSpin";
import { AnimatePresence } from "framer-motion";
import Input from "../elements/inputs/Input";
import TextArea from "../elements/inputs/TextArea";
import FormComponent from "./FormComponent";
import NotificationAlert from "../elements/NotificationAlert";
import { useFormik } from "formik";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import {
  useDeleteTask,
  usePostTask,
  useFetchTasks,
} from "../services/customHooks/taskController";
import * as Yup from "yup";
import ModalBox from "../elements/ModalBox";
const TodoListBox = () => {
  const {
    data: tasks,
    isLoading: isLoadingTasks,
    error,
    refetch: refetchTasks,
  } = useFetchTasks();
  const [activeButton, setActiveButton] = useState([]);
  const [notificationAlert, setNotificationAlert] = useState([]);
  const [resetButton, setResetButton] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const formikCreateTask = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: () => {
      createTask(formikCreateTask.values);
      formikCreateTask.resetForm();
      setResetButton(!resetButton);
      setResetButton([]);
    },
  });
  const { mutate: createTask, isLoading: isLoadingCreateTask } = usePostTask({
    onSuccess: () => {
      setNotificationAlert({
        code: 201,
        message: "Success to Create New Task",
      });
      refetchTasks();
    },
    onError: () => {
      setNotificationAlert({
        code: 404,
        message: "Fail to Create New Task",
      });
    },
  });
  const handleInputForm = (e) => {
    const { name, value } = e.target;
    formikCreateTask.setFieldValue(name, value);
  };
  const handleDeleteTask = (id) => {
    deleteTask(id);
  };
  const { mutate: deleteTask } = useDeleteTask({
    onSuccess: () => {
      setNotificationAlert({
        code: 201,
        message: "Success Delete Task",
      });
      refetchTasks();
    },
    onError: () => {
      setNotificationAlert({
        code: 404,
        message: "Fail to Delete Task",
      });
    },
  });
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
            <span
              onClick={() => {
                handleDeleteTask(task.id);
              }}
              className="inline-flex gap-2 shadow-sm shadow-red-600 rounded-lg cursor-pointer hover:bg-red-100 p-2 w-fit"
            >
              Delete Task
              <MdDeleteOutline className="w-6 h-6" />
            </span>
          </td>
          <td className="w-40">
            <span
              onClick={renderEditModal}
              className="inline-flex gap-2 shadow-sm shadow-teal-600 rounded-lg cursor-pointer hover:bg-teal-100 p-2 "
            >
              Edit Task
              <FaRegEdit className="w-6 h-6" />
            </span>
          </td>
        </tr>
      ))
    );
  };
  const renderEditModal = () => {
    setShowModal(!showModal);
  };
  const getActiveButton = (activeButton) => {
    setActiveButton(activeButton);
  };
  return (
    <div className="w-[80%] mx-auto p-3">
      <NotificationAlert handlingNotification={notificationAlert} />
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
                handlingOnchange={handleInputForm}
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
                handlingOnchange={handleInputForm}
              />
            </FormComponent>
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
