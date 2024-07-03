"use client";
import React, { useState } from "react";
import QuickSearch from "./components/QuickSearch";
import AllStudentsSearch from "./components/AllStudentsSearch";

const Page = () => {
  const [searchCategory, setSearchCategory] = useState("matric");

  return (
    <div className="w-full xl:w-3/4 min-h-[80vh] mt-10 flex flex-col justify-start items-center">
      <div className="w-full mb-5 form-control card bg-base-100 p-4">
        <label className="label cursor-pointer">
          <span className="label-text">Quick Search By Matric</span>
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-alpha"
            defaultChecked
            value="matric"
            onChange={(e) => setSearchCategory(e.target.value)}
          />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">Search By Name</span>
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-alpha"
            value="name"
            onChange={(e) => setSearchCategory(e.target.value)}
          />
        </label>
      </div>
      {searchCategory === "matric" ? <QuickSearch /> : <AllStudentsSearch />}
    </div>
  );
};

export default Page;
