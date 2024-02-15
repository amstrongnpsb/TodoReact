import { useEnv } from "@/services/Hooks/useEnv";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
const UploadFile = ({
  name,
  label,
  value,
  handlingOnchange,
  errors,
  existingImg,
}) => {
  const [file, setFile] = useState("");
  const [existingFile, setExistingFile] = useState(null);
  const [isHover, setIsHover] = useState(false);
  useEffect(() => {
    if (existingImg != undefined) {
      setExistingFile(existingImg);
    }
  }, [existingImg]);
  useEffect(() => {
    if (value != "") {
      setFile(value);
    }
  }, [value]);
  useEffect(() => {
    if (file == undefined) {
      setFile("");
    }
  }, [file]);
  const fileInputRef = useRef();
  const baseUrl = useEnv();
  const handleUpload = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    handlingOnchange(uploadedFile);
    setFile(uploadedFile);
    setExistingFile(null);
    setIsHover(false);
  };
  const handleDelete = () => {
    setFile("");
    setExistingFile(null);
    handlingOnchange(file);
  };
  return (
    <div className="mb-3">
      {Boolean(errors?.message && errors.status) && (
        <div className="text-red-500 text-[12px] font-bold">
          {errors.message}
        </div>
      )}
      <label htmlFor={name} className="font-semibold block">
        {label}
      </label>
      {file == "" && existingFile == null && (
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
            value={file}
            name={name}
            id={name}
          />
          <div className="flex justify-center flex-col items-center font-semibold gap-5">
            <p className="text-gray-700">Upload File Here</p>
            <FaUpload className="w-7 h-7 text-gray-700" />
          </div>
        </motion.div>
      )}

      {(file != "" || existingFile !== null) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="fileUploadContainer shadow-md bg-slate-100 rounded-lg mx-auto w-fit relative"
        >
          {existingFile !== null && file == "" && (
            <img
              className="w-[112px] h-[112px] rounded-xl z-50 hover:opacity-10 cursor-pointer"
              src={existingFile && baseUrl + "/" + existingFile}
              alt="uploaded_file_exists"
            />
          )}
          {file != "" && (
            <img
              className={`w-[112px] h-[112px] rounded-xl z-50 hover:opacity-10 cursor-pointer `}
              src={file && URL.createObjectURL(file)}
              alt="uploaded_file"
            />
          )}

          <motion.div
            className="deleteUploadedButton absolute w-full h-full top-0 left-0 bg-slate-100 rounded-lg cursor-pointer flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHover ? 1 : 0 }}
            onClick={() => handleDelete()}
          >
            <RiDeleteBin2Line className="w-[60%] h-[60%] text-slate-700 mx-auto " />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default UploadFile;
