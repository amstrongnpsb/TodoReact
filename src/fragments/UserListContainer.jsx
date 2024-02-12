import TableCustom from "@/elements/TableCustom";
import UserCard from "@/elements/UserCard";
import DeleteButton from "@/elements/buttons/DeleteButton";
import {
  EditDialogButton,
  ShowDialogButton,
} from "@/elements/buttons/DialogButton";
import { toastHandler } from "@/services/Hooks/toastHandler";
import { useDeleteUser, useFetchUsers } from "@/services/Hooks/userController";

const UserListContainer = () => {
  const userHeaders = ["Username", "Email", "FullName"];
  const {
    data: users,
    isLoading: isLoadingUsers,
    error,
    refetch: refetchUsers,
  } = useFetchUsers();
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
            key={user.id}
            id={user.id}
            name="Edit User"
            tooltip={true}
          />
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
