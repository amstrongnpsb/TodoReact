import { useRef, useState } from "react";
import { ActionButtonBox } from "../fragments/ActionButtonBox";
import SearchButton from "../elements/buttons/SearchButton";
import LoadingSpin from "../elements/LoadingSpin";
import { AnimatePresence } from "framer-motion";
import Input from "../elements/inputs/Input";
import TextArea from "../elements/inputs/TextArea";
import FormComponent from "./FormComponent";
import NotificationAlert from "../elements/NotificationAlert";
import { axiosInstance } from "../lib/axios";
import { useFetchTasks } from "../services/customHooks/useFetchTask";
import { usePostTask } from "../services/customHooks/usePostTask";
const TodoListBox = () => {
  const { data: tasks, isLoading, error } = useFetchTasks();
  const [activeButton, setActiveButton] = useState([]);
  const [notificationAlert, setNotificationAlert] = useState([]);
  const [resetButton, setResetButton] = useState([]);
  const titleRef = useRef({});
  const descriptionRef = useRef({});
  const submitData = (e) => {
    e.preventDefault();
    const currentTime = new Date().toISOString().split("T")[0].toString();
    const task = {
      id: Date.now(),
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      date: currentTime,
    };

    axiosInstance
      .post("/tasks", task)
      .then(() => {
        //if success refetching to get updated data
        // reFetchData("/tasks");
        setNotificationAlert({
          code: 201,
          message: "Success to Create New Task",
        });
        setResetButton(true);
      })
      .catch(() => {
        setNotificationAlert({
          code: 404,
          message: "Fail to Create New Task",
        });
        setResetButton(true);
      });
    setResetButton([]);
  };
  const renderTasks = () => {
    return tasks.map((task, index) => {
      return (
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
          <td scope="row" className="px-6 py-4">
            {task.created_by}
          </td>
          <td scope="row" className="px-6 py-4">
            {task.created_at}
          </td>
        </tr>
      );
    });
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
              handlingSubmit={submitData}
            >
              <Input
                label="Title"
                type="text"
                placeholder="Title"
                focus={true}
                name="title"
                handlingOnchange={(e) => {
                  titleRef.current.value = e.target.value;
                }}
              />
              <TextArea
                label="Description"
                placeholder="Description"
                focus={false}
                name="description"
                handlingOnchange={(e) => {
                  descriptionRef.current.value = e.target.value;
                }}
              />
            </FormComponent>
          )}
        </div>
      </AnimatePresence>
      <table className="table-auto text-left w-full rounded-xl shadow-md mt-5">
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
              Created By
            </th>
            <th scope="col" className="px-6 py-4">
              Created At
            </th>
          </tr>
        </thead>
        {Boolean(isLoading) && (
          <tbody>
            <tr className="border-b-2 border-gray-100 text-2xl ">
              <td
                scope="row"
                colSpan={4}
                className="px-6 py-4 w-full text-center"
              >
                <LoadingSpin />
              </td>
            </tr>
          </tbody>
        )}
        {Boolean(error) && (
          <tbody>
            <tr className="border-b-2 border-gray-100 text-2xl ">
              <td
                scope="row"
                colSpan={4}
                className="px-6 py-4 w-full text-center"
              >
                {error.message}
              </td>
            </tr>
          </tbody>
        )}
        {tasks && <tbody>{renderTasks()}</tbody>}
      </table>
    </div>
  );
};

export default TodoListBox;
