import React from "react";

const TableLoadingSkeleton = () => {
  return (
    <div className="w-full min-h-[600px] flex flex-col justify-start animate-pulse">
      <div className="input input-bordered w-full max-w-xs mb-4 bg-gray-300 h-12"></div>
      <div className="overflow-x-auto rounded-2xl mb-5">
        <table className="table">
          <thead className="bg-base-100">
            <tr>
              {[...Array(5)].map((_, index) => (
                <th key={index} className="bg-gray-300 h-8 rounded-md"></th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-base-100 text-alpha font-medium">
            {[...Array(10)].map((_, rowIndex) => (
              <tr key={rowIndex} className="rounded-xl">
                {[...Array(5)].map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className="bg-gray-300 h-10 rounded-md"></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        <div className="btn bg-gray-300 h-8 w-20 rounded-md mr-2"></div>
        <span className="bg-gray-300 h-8 w-32 rounded-md"></span>
        <div className="btn bg-gray-300 h-8 w-20 rounded-md ml-2"></div>
      </div>
    </div>
  );
};

export default TableLoadingSkeleton;
