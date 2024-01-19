import { motion } from "framer-motion";

const FormComponent = ({
  formTitle,
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
        <h1 className="text-xl font-semibold text-center mb-5">{formTitle}</h1>
        {children}
        <button className="bg-black block w-full font-semibold text-lg text-white px-3 py-2 rounded-lg mt-3 hover:opacity-70">
          {pending ? "Loading..." : buttonName}
        </button>
      </form>
    </motion.div>
  );
};

export default FormComponent;
