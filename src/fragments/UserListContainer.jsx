import TableCustom from "@/elements/TableCustom";
import UserCard from "@/elements/UserCard";
import DeleteButton from "@/elements/buttons/DeleteButton";
import {
  EditDialogButton,
  ShowDialogButton,
} from "@/elements/buttons/DialogButton";
import { toastHandler } from "@/services/Hooks/toastHandler";
import {
  useDeleteUser,
  useEditUser,
  useFetchUsers,
} from "@/services/Hooks/userController";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormComponent from "./FormComponent";
import Input from "@/elements/inputs/Input";
import RadioButton from "@/elements/inputs/RadioButton";
import UploadFile from "@/elements/inputs/UploadFile";

const UserListContainer = () => {
  const userHeaders = ["Username", "Email", "FullName"];
  const {
    data: users,
    isLoading: isLoadingUsers,
    error,
    refetch: refetchUsers,
  } = useFetchUsers();
  const formikEditUser = useFormik({
    initialValues: {
      id: "",
      username: "",
      first_name: "",
      last_name: "",
      date_of_birth: "",
      email: "",
      profile_picture: "",
      gender: "",
      phone_number: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      first_name: Yup.string().required("First Name is required"),
      email: Yup.string().required("Email is required"),
      date_of_birth: Yup.string().required("Date of Birth is required"),
      profile_picture: Yup.mixed()
        .test(
          "fileType",
          "Only images (jpeg, png, jpg, gif) are allowed",
          (value) => {
            if (!value) {
              return true; // Empty value is allowed
            }
            return (
              value &&
              /^(image\/jpeg|image\/png|image\/jpg|image\/gif)$/.test(
                value.type
              )
            );
          }
        )
        .notRequired(),
    }),
    onSubmit: () => {
      const formData = new FormData();
      Object.entries(formikEditUser.values).forEach(([key, value]) => {
        if (key === "profile_picture") {
          if (value) {
            formData.append("profile_picture", value, value.name);
          } else {
            formData.append("profile_picture", "");
          }
        } else if (value !== null && value !== undefined && value !== "") {
          formData.append(key, value);
        }
      });

      editUser(formData);
      formikEditUser.resetForm();
    },
  });
  const onEditClick = (user) => {
    formikEditUser.setFieldValue("id", user.id);
    formikEditUser.setFieldValue("username", user.username);
    formikEditUser.setFieldValue("first_name", user.first_name);
    formikEditUser.setFieldValue("last_name", user.last_name);
    formikEditUser.setFieldValue("date_of_birth", user.date_of_birth);
    formikEditUser.setFieldValue("email", user.email);
    formikEditUser.setFieldValue("password", user.password);
    formikEditUser.setFieldValue(
      "profile_picture",
      formikEditUser.values.profile_picture
    );
    formikEditUser.setFieldValue("gender", user.gender);
    formikEditUser.setFieldValue("phone_number", user.phone_number);
  };
  const handleInputForm = {
    input: (e) => {
      formikEditUser.setFieldValue(e.target.name, e.target.value);
    },
    file: (file) => {
      formikEditUser.setFieldValue("profile_picture", file);
    },
  };
  const { mutate: editUser, isPending: isLoadingEditUser } = useEditUser(
    toastHandler(refetchUsers)
  );
  const handleDeleteUser = (id) => {
    deleteUser(id);
  };
  const { mutate: deleteUser } = useDeleteUser(toastHandler(refetchUsers));
  const renderBody = () => {
    return users?.data.data.map((user, index) => (
      <tr key={user.id} className="border-b-2 border-gray-100">
        <td scope="row">{index + 1}</td>
        <td scope="row">{user.username}</td>
        <td scope="row">{user.email}</td>
        <td scope="row" className="capitalize">
          {user.first_name} {user.last_name}
        </td>
        <td className="w-10 px-2 py-2">
          <ShowDialogButton name="Detail User" tooltip={true}>
            <UserCard
              username={user.username}
              email={user.email}
              firstName={user.first_name}
              lastName={user.last_name}
              birth={user.date_of_birth}
              profilePicture={user.profile_picture}
              phoneNumber={user.phone_number}
              gender={user.gender}
            />
          </ShowDialogButton>
        </td>
        <td className="w-10 px-2 py-2">
          <EditDialogButton
            name="Edit User"
            handleClick={() => onEditClick(user)}
          >
            <FormComponent
              titleName="Edit User Form"
              buttonName="Edit"
              handlingSubmit={formikEditUser.handleSubmit}
              pending={isLoadingEditUser}
            >
              <Input
                label="Username"
                type="text"
                placeholder="Username"
                focus={true}
                name="username"
                required={true}
                errors={{
                  message: formikEditUser.errors.username,
                  status: formikEditUser.touched.username,
                }}
                value={formikEditUser.values.username}
                handlingOnchange={handleInputForm.input}
              />
              <Input
                label="Email"
                type="email"
                placeholder="Email"
                name="email"
                required={true}
                errors={{
                  message: formikEditUser.errors.email,
                  status: formikEditUser.touched.email,
                }}
                value={formikEditUser.values.email}
                handlingOnchange={handleInputForm.input}
              />
              <Input
                label="Phone Number"
                type="phone_number"
                placeholder="Phone Number"
                name="phone_number"
                value={formikEditUser.values.phone_number}
                handlingOnchange={handleInputForm.input}
              />
              <Input
                label="First Name"
                type="text"
                placeholder="First Name"
                name="first_name"
                required={true}
                errors={{
                  message: formikEditUser.errors.first_name,
                  status: formikEditUser.touched.first_name,
                }}
                value={formikEditUser.values.first_name}
                handlingOnchange={handleInputForm.input}
              />
              <Input
                label="Last Name"
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={formikEditUser.values.last_name}
                handlingOnchange={handleInputForm.input}
              />
              <UploadFile
                name="profile_picture"
                label="Profile Picture"
                value={formikEditUser.values.profile_picture}
                errors={{
                  message: formikEditUser.errors.profile_picture,
                  status: formikEditUser.touched.profile_picture,
                }}
                handlingOnchange={handleInputForm.file}
                existingImg={user.profile_picture}
              />
              <RadioButton
                option={[
                  {
                    label: "Male",
                    value: "male",
                  },
                  {
                    label: "Female",
                    value: "female",
                  },
                ]}
                title="Gender"
                name="gender"
                value={formikEditUser.values.gender}
                handlingOnchange={handleInputForm.input}
              />
              <Input
                label="Date of birth"
                type="date"
                placeholder="Date of birth"
                name="date_of_birth"
                required={true}
                errors={{
                  message: formikEditUser.errors.date_of_birth,
                  status: formikEditUser.touched.date_of_birth,
                }}
                value={formikEditUser.values.date_of_birth}
                handlingOnchange={handleInputForm.input}
              />
            </FormComponent>
          </EditDialogButton>
        </td>
        <td className="w-10 px-2 py-2">
          <DeleteButton
            handleClick={() => handleDeleteUser(user.id)}
            name="Delete User"
          />
        </td>
      </tr>
    ));
  };
  return (
    <div className="userListBox min-h-full w-full rounded-xl shadow-xl py-2">
      <h1 className="text-center font-bold text-2xl">User List</h1>
      <TableCustom
        headers={userHeaders}
        body={renderBody()}
        pending={isLoadingUsers}
        error={error}
      />
    </div>
  );
};

export default UserListContainer;
