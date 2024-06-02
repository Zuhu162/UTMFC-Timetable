import React, { useState } from "react";

const Table = (props) => {
  const [page, setPage] = useState(1);

  // Calculate total number of pages
  const totalPages = Math.ceil(props.rows.length / 10);

  // Calculate starting and ending index of current page
  const startIndex = (page - 1) * 10;
  const endIndex = Math.min(startIndex + 10, props.rows.length);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="min-h-[600px] flex flex-col justify-between">
      <div className="overflow-x-auto rounded-2xl mb-5">
        <table className="table">
          <thead className="bg-alpha text-prime">
            <tr>
              {props.columns.map((column) => (
                <th key={column.id} scope="col">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-prime text-alpha font-medium	">
            {props.rows.slice(startIndex, endIndex).map((row, rowIndex) => (
              <tr key={startIndex + rowIndex} className="rounded-xl">
                {props.columns.map((column) => (
                  <td key={`${startIndex + rowIndex}-${column.id}`}>
                    {row[column.id]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button
          className="btn bg-base-100 text-alpha hover:bg-alpha hover:text-prime mr-2"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          {`<`}
        </button>
        <span>{`Page ${page} of ${totalPages}`}</span>
        <button
          className="btn bg-base-100 text-alpha hover:bg-alpha hover:text-prime ml-2"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          {`>`}
        </button>
      </div>
    </div>
  );
};

export default Table;
