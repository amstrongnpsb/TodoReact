import { useEffect, useState } from "react";
import { ActionButtonBox } from "../fragments/ActionButtonBox";
import Axios from "axios";
import SearchButton from "../elements/buttons/SearchButton";
import LoadingSpin from "../elements/LoadingSpin";
import { AnimatePresence, motion } from "framer-motion";
import Input from "../elements/inputs/Input";
import TextArea from "../elements/inputs/TextArea";
const TodoListBox = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeButton, setActiveButton] = useState([false, false, false]);
  useEffect(() => {
    Axios.get("http://localhost:8000/todolist")
      .then(function (response) {
        setTimeout(() => {
          setData(response.data);
          setIsLoading(false);
        }, 1000);
      })
      .catch(function (error) {
        // handle error
        if (error.response) {
          // The request was made and the server responded with a status code
          setData({
            code: 400,
            message: `Error, ${error.response.status}`,
          });
          setIsLoading(false);
          console.log("Request failed with status code", error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          setData({
            code: 503,
            message: "HTTP Status Code 503 - Service Unavailable",
          });
          setIsLoading(false);
        } else {
          // Something happened in setting up the request that triggered an Error
          setData({
            code: 500,
            message: `Error, ${error.message}`,
          });
          setIsLoading(false);
        }
      });
  }, []);
  const sendToParent = (activeButton) => {
    setActiveButton(activeButton);
  };
  return (
    <div className="w-[80%] mx-auto p-3">
      <div className="flex flex-row w-full justify-between items-center">
        <ActionButtonBox sendToParent={sendToParent} />
        <SearchButton />
      </div>
      <AnimatePresence>
        {activeButton[0] && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
            className="mt-3 shadow-lg rounded-xl p-4 w-fit"
          >
            <form action="#">
              <h1 className="text-xl font-semibold text-center mb-5">
                New Task Form
              </h1>
              <Input
                label="Title"
                type="text"
                placeholder="Title"
                focus={true}
                name="title"
              />
              <TextArea
                label="Description"
                placeholder="Description"
                focus={false}
                name="description"
              />
              <button className="bg-black block w-full font-semibold text-lg text-white px-3 py-2 rounded-lg mt-3 hover:opacity-70">
                Submit
              </button>
            </form>
          </motion.div>
        )}
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
                {data.message}
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
