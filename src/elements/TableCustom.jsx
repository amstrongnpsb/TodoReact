const TableCustom = () => {
  return (
    <div className="w-[80%] mx-auto p-3">
      <table className="table-auto text-center w-full rounded-xl shadow-md mt-5 ">
        <thead className="font-medium shadow-md">
          <tr>
            <th scope="col" className="px-6 py-4">
              #
            </th>
            <th scope="col" className="px-6 py-4">
              Title
            </th>
            <th scope="col" className="px-6 py-4">
              Description
            </th>
            <th scope="col" className="px-6 py-4">
              Status
            </th>
            <th scope="col" className="px-6 py-4">
              Created By
            </th>
            <th scope="col" className="px-6 py-4">
              Created At
            </th>
            <th scope="col" colSpan={2} className="px-6 py-4">
              Action
            </th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default TableCustom;
