import Welcome from "@/components/Welcome";
import React from "react";

const Page = () => {
  return (
    <div className="text-alpha flex bg-base-100 w-3/4 h-auto flex-col items-center justify-center gap-2 md:p-24">
      <p className="font-semibold">Add/Edit Course</p>
      <select className="select w-full max-w-xs">
        <option disabled selected>
          Subject Code
        </option>
        <option>SECJ1013</option>
        <option>SECJ2023</option>
        <option>SECV3011</option>
        <option>SECJ3033</option>
        <option>UHLB2022</option>
      </select>
      <select className="select w-full max-w-xs">
        <option disabled selected>
          Section
        </option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </div>
  );
};

export default Page;
