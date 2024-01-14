import { useState } from "react";
import { ActionButtonBox } from "../fragments/ActionButtonBox";
import SearchButton from "../elements/buttons/SearchButton";
import LoadingSpin from "../elements/LoadingSpin";
import { AnimatePresence, motion } from "framer-motion";
import Input from "../elements/inputs/Input";
import TextArea from "../elements/inputs/TextArea";
import { useFetch } from "../services/customHooks/useFetch";
const TodoListBox = () => {
  const { data, isLoading } = useFetch("http://localhost:8000/todolist");
  const [activeButton, setActiveButton] = useState([]);
  const getActiveButton = (activeButton) => {
    setActiveButton(activeButton);
  };
  return (
    <div className="w-[80%] mx-auto p-3">
      <div className="flex flex-row w-full justify-between items-center">
        <ActionButtonBox actionActiveButton={getActiveButton} />
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
