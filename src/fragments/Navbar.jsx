import AppIcon from "../assets/icons/reactIcon.svg";
import ListIcon from "../assets/icons/listIcon.svg";
import Navbarlink from "../elements/navlink/Index";
import SettingsIcon from "../assets/icons/settingsIcon.svg";
import AboutIcon from "../assets/icons/aboutIcon.svg";
import { useState, useEffect } from "react";
import HamburgerButton from "../elements/buttons/HamburgerButton";
import { motion } from "framer-motion";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    {
      name: "TodoList",
      url: "/todolist",
      icon: ListIcon,
    },
    {
      name: "Settings",
      url: "/settings",
      icon: SettingsIcon,
    },
    {
      name: "About",
      url: "/about",
      icon: AboutIcon,
    },
  ];
  useEffect(() => {
    const boxBlock = document.getElementsByClassName("boxBlock")[0];
    if (isOpen) {
      boxBlock.style.display = "block";
    } else {
      boxBlock.style.display = "none";
    }
  }, [isOpen]);

  document.addEventListener("click", (event) => {
    const boxBlock = document.getElementsByClassName("boxBlock")[0];
    if (event.target === boxBlock) {
      setIsOpen(!isOpen);
    }
  });
  return (
    <motion.div
      variants={{
        open: {
          width: "14rem",
          x: 0,
          paddingRight: "0.5rem",
          paddingLeft: "0.5rem",
        },
        closed: { width: "4rem", x: 0 },
      }}
      animate={isOpen ? "open" : "closed"}
      initial={{ x: -100 }}
      transition={{ duration: 0.3 }}
      className="z-50 h-[80%] fixed left-0 top-20 bg-white rounded-r-2xl flex flex-col items-center font-SpaceGrotesk-reg font-semibold py-4"
    >
      <div className="w-full flex flex-row gap-10 items-center">
        <motion.div
          variants={{
            open: { display: "block", x: 0 },
            closed: { display: "none", x: -100 },
          }}
          transition={{ duration: 0.3 }}
        >
          <a href="" className="logoWrapper flex flex-row items-center gap-1">
            <img src={AppIcon} className="w-10 h-10" alt="" />
            <p className="text-2xl">TodoApp</p>
          </a>
        </motion.div>

        <HamburgerButton handleClick={() => setIsOpen(!isOpen)} />
      </div>
      <motion.ul className="menu-items w-full mt-28">
        {navLinks.map((item, index) => (
          <motion.div
            init
            key={item.name}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.05,
              duration: 0.1,
              type: "spring",
              stiffness: 100,
            }}
            exit={{
              x: 100,
              transition: { duration: 0.1 },
            }}
          >
            <Navbarlink name={item.name} url={item.url} icon={item.icon} />
          </motion.div>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default Navbar;
