import { motion } from "framer-motion";

const HamburgerButton = ({ handleClick }) => {
  return (
    <div
      className="hamburger-lines cursor-pointer mx-auto w-12 h-12 rounded-xl flex flex-col gap-2 justify-center items-center"
      onClick={handleClick}
    >
      <motion.span
        variants={{
          open: { rotate: 45, y: 2, width: "2rem" },
          closed: { rotate: 0 },
        }}
        className="line line1 w-6 h-1 rounded-full bg-black"
      ></motion.span>
      <motion.span
        variants={{ open: { display: "none" }, closed: { display: "block" } }}
        className="line line2 w-4 h-1 rounded-full bg-black"
      ></motion.span>
      <motion.span
        variants={{
          open: { rotate: -45, y: -10, width: " 2rem" },
          closed: { rotate: 0 },
        }}
        className="line line3 w-6 h-1 rounded-full bg-black"
      ></motion.span>
    </div>
  );
};

export default HamburgerButton;
