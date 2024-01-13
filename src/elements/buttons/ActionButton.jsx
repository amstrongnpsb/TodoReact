import { motion } from "framer-motion";
import { useState, useRef } from "react";
const ActionButton = ({ data }) => {
  const [isHover, setisHover] = useState(false);
  const componentRef = useRef(null);
  const handleHover = () => {
    setisHover(!isHover);
  };
  return (
    <motion.div
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      ref={componentRef}
      initial={false}
      animate={isHover ? "open" : "closed"}
      className={`${data.class} buttonWrapper rounded-lg p-2 cursor-pointer`}
    >
      {data.icon}
      <motion.p
        variants={childVariants}
        className="text-sm font-semibold bg-gray-900 text-white px-2 py-1 absolute rounded-lg mt-5 capitalize"
      >
        {data.label}
      </motion.p>
    </motion.div>
  );
};

export default ActionButton;
const childVariants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};
