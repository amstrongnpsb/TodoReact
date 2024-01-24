import TableCustom from "@/elements/TableCustom";

const UserListContainer = () => {
  return (
    <div className="userListBox min-h-full w-full rounded-xl shadow-xl py-2">
      <h1 className="text-center font-bold text-2xl">User List</h1>
      <TableCustom />
    </div>
  );
};

export default UserListContainer;
