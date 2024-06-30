import React, { useEffect, useState } from "react";

//props - 1. props.rows to render
//2. props.searchValue
const Table = (props) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(props.rows);
  const [searchValue, setSearchValue] = useState(props.searchValue);

  useEffect(() => {
    setFiltered(props.rows);
    setSearchValue(props.searchValue);
  }, [props.rows, props.searchValue]);

  // Calculate total number of pages
  const totalPages = Math.ceil(props.rows.length / 10);

  // Calculate starting and ending index of current page
  const startIndex = (page - 1) * 10;
  const endIndex = Math.min(startIndex + 10, props.rows.length);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  //Search function
  const onSearch = (value) => {
    setSearch(value);
    if (value) {
      const filtered = props.rows.filter((l) =>
        l[searchValue].toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(filtered);
    } else {
      setFiltered(props.rows); // Reset to default value if search is empty
    }
  };

  return (
    <div className="min-h-[600px] flex flex-col justify-between">
      <input
        onChange={(e) => onSearch(e.currentTarget.value)}
        type="text"
        placeholder={props.searchBarValue}
        className="input input-bordered w-full max-w-xs mb-4"
        value={search}
      />
      <div className="overflow-x-auto rounded-2xl mb-5">
        <table className="table">
          <thead className="bg-base-100">
            <tr>
              {props.columns.map((column) => (
                <th key={column.id} scope="col">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-base-100 text-alpha font-medium">
            {filtered.slice(startIndex, endIndex).map((row, rowIndex) => (
              <tr key={startIndex + rowIndex} className="rounded-xl">
                {props.columns.map((column) => (
                  <td key={`${startIndex + rowIndex}-${column.id}`}>
                    {column.render ? column.render(row) : row[column.id]}
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
          disabled={page === 1}>
          {`<`}
        </button>
        <span>{`Page ${page} of ${totalPages}`}</span>
        <button
          className="btn bg-base-100 text-alpha hover:bg-alpha hover:text-prime ml-2"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}>
          {`>`}
        </button>
      </div>
    </div>
  );
};

export default Table;
