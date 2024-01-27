import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import profilePictureDefault from "../assets/icons/profilePictureDefault.svg";

const UserCard = ({
  username,
  email,
  firstName,
  lastName,
  birth,
  profilePicture,
  phoneNumber,
}) => {
  return (
    <div className="userCard font-SpaceGrotesk-reg">
      <div className="profilePicture h-32 w-32 mx-auto rounded-full">
        <img
          src={profilePicture ? profilePicture : profilePictureDefault}
          alt="profile_picture"
          className="w-full"
        />
      </div>

      <p className="text-xl font-bold text-center capitalize">
        {`${firstName} ${lastName ? lastName : ""}`}
      </p>
      <div className="userInfo w-full mt-2 mx-auto shadow-md p-3 rounded-lg flex flex-row justify-evenly flex-wrap">
        <div className="flex h-fit text-sm font-semibold gap-2">
          <MdEmail className="w-6 h-6" />
          {email ? email : "No email"}
        </div>
        <div className="flex text-sm font-semibold gap-2">
          <FaPhoneSquareAlt className="w-6 h-6" />
          {phoneNumber ? phoneNumber : "No phone number"}
        </div>
        <div className="w-full mt-2 flex flex-wrap">
          <div className="flex flex-row gap-2 w-full">
            <p className="text-base font-semibold">Username:</p>
            <p className="text-base font-semibold">{username}</p>
          </div>
          <div className="flex flex-row gap-2 w-full capitalize">
            <p className="text-base font-semibold">First Name:</p>
            <p className="text-base font-semibold">{firstName}</p>
          </div>
          <div className="flex flex-row gap-2 w-full">
            <p className="text-base font-semibold">Birth:</p>
            <p className="text-base font-semibold">{birth}</p>
          </div>
          <div className="flex flex-row gap-2 w-full capitalize">
            <p className="text-base font-semibold">Last Name:</p>
            <p className="text-base font-semibold">{lastName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;