import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
const UploadFile = ({ name, label }) => {
  const [file, setFile] = useState(null);
  const [isHover, setIsHover] = useState(false);
  const fileInputRef = useRef();
  const handleUpload = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    setIsHover(false);
  };
  return (
    <div className="mb-3">
      <label htmlFor={name} className="font-semibold block">
        {label}
      </label>
      {!file && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="shadow-md bg-slate-100 rounded-lg p-5 cursor-pointer"
          onClick={() => handleUpload()}
        >
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <div className="flex justify-center flex-col items-center font-semibold gap-5">
            <p className="text-gray-700">Upload File Here</p>
            <FaUpload className="w-7 h-7 text-gray-700" />
          </div>
        </motion.div>
      )}

      {file && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="fileUploadContainer shadow-md bg-slate-100 rounded-lg mx-auto w-fit relative"
        >
          <img
            className="w-[112px] h-[112px] rounded-xl z-50 hover:opacity-10 cursor-pointer"
            src={file && URL.createObjectURL(file)}
            alt="Uploaded File"
          />

          <motion.div
            className="deleteUploadedButton absolute w-full h-full top-0 left-0 bg-slate-100 rounded-lg cursor-pointer flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHover ? 1 : 0 }}
            onClick={() => setFile(null)}
          >
            <RiDeleteBin2Line className="w-[60%] h-[60%] text-slate-700 mx-auto " />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default UploadFile;
