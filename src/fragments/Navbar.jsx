import AppIcon from "../assets/icons/reactIcon.svg";
import ListIcon from "../assets/icons/listIcon.svg";
import Navbarlink from "../elements/navlink/Index";
import SettingsIcon from "../assets/icons/settingsIcon.svg";
import UsersIcon from "../assets/icons/userIcon.svg";
import LogoutIcon from "../assets/icons/logoutIcon.svg";
import { useState, useEffect } from "react";
import HamburgerButton from "../elements/buttons/HamburgerButton";
import { motion } from "framer-motion";
import LoadingSpin from "@/elements/LoadingSpin";
import { useLogout } from "@/services/Hooks/authController";
import { toastHandler } from "@/services/Hooks/toastHandler";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    {
      name: "TodoList",
      url: "/todolist",
      icon: ListIcon,
    },
    {
      name: "Users",
      url: "/users",
      icon: UsersIcon,
    },
    {
      name: "Settings",
      url: "/settings",
      icon: SettingsIcon,
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
  const { mutate, isLoading } = useLogout(toastHandler());
  const handleLogout = () => {
    mutate();
  };
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
      className="navbar z-50 h-[80%] fixed left-0 top-20 shadow-lg bg-white rounded-r-2xl flex flex-col justify-between items-center font-SpaceGrotesk-reg font-semibold py-4"
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
      <motion.ul className="menu-items w-full">
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
      {isLoading ? (
        <LoadingSpin name="Logging Out..." />
      ) : (
        <motion.button
          variants={{
            open: { alignSelf: "start" },
            closed: { alignSelf: "center" },
          }}
          className="w-full"
          onClick={handleLogout}
        >
          <Navbarlink name="Logout" icon={LogoutIcon} />
        </motion.button>
      )}
    </motion.div>
  );
};

export default Navbar;
