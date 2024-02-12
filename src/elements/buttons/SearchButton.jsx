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
        layout
        ref={componentRef}
        variants={{
          open: {
            width: "260px",
            justifyContent: "end",
          },
          closed: {
            width: "60px",
            justifyContent: "end",
          },
        }}
        animate={isShow ? "open" : "closed"}
        transition={{ duration: 0.2 }}
        className="p-4 rounded-xl shadow-md cursor-pointer flex flex-row items-center gap-2"
        onClick={() => setIsShow(true)}
      >
        <motion.input
          name="search"
          id="search"
          type="text"
          className="outline-none"
          placeholder="Search Task"
          variants={{
            open: {
              opacity: 1,
              x: 0,
              display: "block",
              transition: { delay: 0.3 },
            },
            closed: { display: "none", opacity: 0 },
          }}
        />
        <div className="w-fit">
          <IoSearch className="w-6 h-6" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchButton;
