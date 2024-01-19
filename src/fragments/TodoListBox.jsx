import { useRef, useState } from "react";
import { ActionButtonBox } from "../fragments/ActionButtonBox";
import SearchButton from "../elements/buttons/SearchButton";
import LoadingSpin from "../elements/LoadingSpin";
import { AnimatePresence } from "framer-motion";
import Input from "../elements/inputs/Input";
import TextArea from "../elements/inputs/TextArea";
import { useFetch } from "../services/customHooks/useFetch";
import FormComponent from "./FormComponent";
import axios from "axios";
import NotificationAlert from "../elements/NotificationAlert";
const TodoListBox = () => {
  const { data, isLoading, reFetchData } = useFetch(
    "http://localhost:8000/todolists"
  );
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
    axios
      .post("http://localhost:8000/todolists", task)
      .then(() => {
        //if success refetching to get updated data
        reFetchData("http://localhost:8000/todolists");
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
              Date
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
        {Boolean(!data.length) && (
          <tbody>
            <tr className="border-b-2 border-gray-100 text-2xl ">
              <td
                scope="row"
                colSpan={4}
                className="px-6 py-4 w-full text-center"
              >
                {data.message ? data.message : "No Data Found"}
              </td>
            </tr>
          </tbody>
        )}
        {Boolean(data.length) && (
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="border-b-2 border-gray-100">
                <td scope="row" className="px-6 py-4">
                  {index + 1}
                </td>
                <td scope="row" className="px-6 py-4">
                  {item.title}
                </td>
                <td scope="row" className="px-6 py-4">
                  {item.description}
                </td>
                <td scope="row" className="px-6 py-4">
                  {item.date}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default TodoListBox;
