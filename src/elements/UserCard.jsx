import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import profilePictureDefault from "../assets/icons/profilePictureDefault.svg";
import { useEnv } from "@/services/Hooks/useEnv";
import { PiGenderMaleBold, PiGenderFemaleBold } from "react-icons/pi";
import { useEffect, useState } from "react";

const UserCard = ({
  username,
  email,
  firstName,
  lastName,
  birth,
  profilePicture,
  phoneNumber,
  gender,
}) => {
  const [image, setImage] = useState(profilePictureDefault);
  useEffect(() => {
    setImage(profilePicture);
  }, [profilePicture]);
  const baseUrl = useEnv();
  return (
    <div className="userCard font-SpaceGrotesk-reg">
      <div className="profilePicture h-32 w-32 mx-auto shadow-md rounded-full border-gray-100 border-2 p-1">
        <img
          src={profilePicture ? baseUrl + "/" + image : profilePictureDefault}
          alt="profile_picture"
          className="rounded-full"
        />
      </div>

      <div className="flex flex-row w-full justify-center items-center gap-2 mt-2">
        <p className="text-xl font-bold text-center capitalize">
          {`${firstName} ${lastName ? lastName : ""}`}
        </p>
        {gender === "male" && (
          <PiGenderMaleBold className="w-5 h-5 text-sky-500" />
        )}
        {gender === "female" && (
          <PiGenderFemaleBold className="w-5 h-5 text-pink-500" />
        )}
      </div>
      <div className="userInfo w-full mt-2 mx-auto p-3 rounded-lg flex flex-row justify-evenly flex-wrap">
        <div className="flex h-fit text-sm font-semibold gap-2">
          <MdEmail className="w-6 h-6" />
          {email ? email : "No email"}
        </div>
        <div className="flex text-sm font-semibold gap-2">
          <FaPhoneSquareAlt className="w-6 h-6" />
          {phoneNumber ? phoneNumber : "No phone number"}
        </div>
        <div className="w-full mt-2 flex flex-wrap ">
          <div className="flex flex-row gap-2 w-full shadow-md p-3 rounded-lg">
            <p className="text-base font-semibold capitalize">Username:</p>
            <p className="text-base font-semibold">{username}</p>
          </div>
          <div className="flex flex-row gap-2 w-full shadow-md p-3 rounded-lg">
            <p className="text-base font-semibold capitalize">First Name:</p>
            <p className="text-base font-semibold">{firstName}</p>
          </div>
          <div className="flex flex-row gap-2 w-full  shadow-md p-3 rounded-lg">
            <p className="text-base font-semibold capitalize">Last Name:</p>
            <p className="text-base font-semibold">{lastName}</p>
          </div>
          <div className="flex flex-row gap-2 w-full shadow-md p-3 rounded-lg">
            <p className="text-base font-semibold capitalize">Birth:</p>
            <p className="text-base font-semibold">{birth}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
