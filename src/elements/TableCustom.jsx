import LoadingSpin from "./LoadingSpin";

const TableCustom = ({ headers, pending, error, body }) => {
  return (
    <div className="w-[80%] mx-auto p-3">
      <table className="table-auto text-center w-full rounded-xl shadow-md mt-5 ">
        <thead className="font-medium shadow-md">
          <tr>
            <th scope="col" className="px-6 py-4">
              #
            </th>
            {headers?.map((header, index) => (
              <th key={index} scope="col" className="px-6 py-4">
                {header}
              </th>
            ))}
            <th scope="col" colSpan={99} className="px-6 py-4">
              Action
            </th>
          </tr>
        </thead>
        {Boolean(pending) && (
          <tbody>
            <tr className="border-b-2 border-gray-100 text-2xl ">
              <td
                scope="row"
                colSpan={999}
                className="px-6 py-4 w-full text-center"
              >
                <LoadingSpin name="Loading ..." />
              </td>
            </tr>
          </tbody>
        )}
        {Boolean(error) && (
          <tbody>
            <tr className="border-b-2 border-gray-100 text-2xl ">
              <td
                scope="row"
                colSpan={999}
                className="px-6 py-4 w-full text-center"
              >
                {error.message}
              </td>
            </tr>
          </tbody>
        )}
        <tbody>{Boolean(body) && body}</tbody>
      </table>
    </div>
  );
};

export default TableCustom;
