"use client";

import GenerateTimeTable from "@/components/GenerateTimeTable";
import { UserContext } from "@/contexts/UserContext";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
  return (
    <div className="w-full flex justify-center">
      <GenerateTimeTable />
    </div>
  );
};

export default Page;
