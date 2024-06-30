"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import GenerateTimeTable from "@/components/GenerateTimeTable";

const Page = () => {
  const [matric, setMatric] = useState("");
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  const getData = async () => {
    try {
      const response = await fetch(
        `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=pelajar_subjek&no_matrik=${matric}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result.length === 0) {
        setError("User not found");
      } else {
        setCourses(result);
        setError("");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError("Error fetching data. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start">
      <div className="flex mt-10 mb-10">
        <input
          type="text"
          placeholder="Type Matric Number"
          className="input input-bordered w-full max-w-xs"
          value={matric}
          onChange={(e) => setMatric(e.currentTarget.value)}
        />
        <button className="btn text-base-100 bg-alpha" onClick={getData}>
          Quick Search
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {courses.length > 0 ? (
        <GenerateTimeTable courses={courses} variant="search" />
      ) : (
        !error && <div></div>
      )}
    </div>
  );
};

export default Page;
