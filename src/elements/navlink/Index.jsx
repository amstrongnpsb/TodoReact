import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";

const Index = ({ name, url, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === url;
  return (
    <motion.div
      whileHover={{ backgroundColor: "#f5f5f5" }}
      style={{ backgroundColor: isActive ? "#e5e5e5" : "transparent" }}
    >
      <NavLink to={url}>
        <motion.div
          variants={{
            open: { marginLeft: "1rem" },
            closed: { justifyContent: "center" },
          }}
          className="menuLink h-10 flex flex-row items-center gap-3"
        >
          <img src={icon} className="w-6 h-6" alt="" />
          <motion.p
            variants={{
              open: { display: "block" },
              closed: { display: "none" },
            }}
          >
            {name}
          </motion.p>
        </motion.div>
      </NavLink>
    </motion.div>
  );
};

export default Index;
