import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
const SearchButton = () => {
  const [isShow, setIsShow] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setIsShow(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <AnimatePresence>
      <motion.div
        ref={componentRef}
        animate={isShow ? "open" : "closed"}
        transition={{ duration: 0.5 }}
        className="p-2 rounded-xl shadow-md cursor-pointer flex flex-row items-center justify-center gap-2"
        onClick={() => setIsShow(true)}
      >
        <motion.input
          type="text"
          className="w-52 outline-none p-2"
          placeholder="Search Task"
          variants={{
            open: { display: "block", opacity: 1, x: 0 },
            closed: { display: "none", opacity: 0, x: 200 },
          }}
        />
        <IoSearch className="w-6 h-6" />
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchButton;
