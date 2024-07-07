"use client";

import GenerateTimeTable from "@/components/GenerateTimeTable";
import { UserContext } from "@/contexts/UserContext";
import React, { useContext } from "react";

const Page = () => {
  const { sessionInfo } = useContext(UserContext);

  return (
    <div className="w-full xl:w-3/4 flex flex-col justify-center items-center">
      <p className="font-semibold text-alpha text-lg mb-5 mt-5">
        Showing timetable for current academic session:{" "}
        <span className="underline">
          {sessionInfo.latest.sesi} - {sessionInfo.latest.semester}
        </span>
      </p>
      <GenerateTimeTable />
    </div>
  );
};

export default Page;
