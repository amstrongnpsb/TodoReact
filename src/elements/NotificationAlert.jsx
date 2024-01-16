import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GrStatusGood } from "react-icons/gr";
import { MdOutlineMoodBad } from "react-icons/md";

const NotificationAlert = ({ handlingNotification }) => {
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    if (isShow) {
      setTimeout(() => {
        setIsShow(false);
      }, 5000);
    }
  }, [isShow]);
  useEffect(() => {
    if (handlingNotification.length != []) {
      setIsShow(true);
    }
  }, [handlingNotification]);
  return (
    <>
      <AnimatePresence>
        {isShow && (
          <motion.div
            whileHover={{
              opacity: 0.8,
              transition: { duration: 0.3 },
            }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.4 }}
            className={`notificationAlert ${
              handlingNotification.code == 201 ? "bg-teal-200" : "bg-red-200"
            }  fixed top-15 right-5 mx-auto rounded-xl w-fit p-3 shadow-md flex justify-center items-center flex-row gap-2 cursor-pointer`}
            onClick={() => setIsShow(false)}
          >
            <p className="text-sm font-bold">{handlingNotification.message}</p>
            {handlingNotification.code == 201 ? (
              <GrStatusGood className="w-6 h-6" />
            ) : (
              <MdOutlineMoodBad className="w-6 h-6" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NotificationAlert;
