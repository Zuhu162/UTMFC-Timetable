"use client";

import GenerateTimeTable from "@/components/GenerateTimeTable";
import { UserContext } from "@/contexts/UserContext";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const Page = ({ params }) => {
  const [lecturer, setLecturer] = useState([]);
  const { sessionInfo } = useContext(UserContext);
  const [latestCourses, setLatestCourses] = useState([]);
  const searchParams = useSearchParams();
  const lecturerName = searchParams.get("name");

  useEffect(() => {
    const fetchLecturer = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}entity=pensyarah_subjek&no_pekerja=${params.lecturerID}`
        );
        if (response.data) {
          setLecturer(response.data);
          console.log("Lecturer data:", response.data); // Log the response data here
          // Filter courses after setting lecturer data
          const latest = response.data
            .filter((course) => course.sesi === sessionInfo.latest.sesi)
            .filter(
              (course) => course.semester === sessionInfo.latest.semester
            );
          setLatestCourses(latest);
          console.log("Latest courses:", latest); // Log the filtered courses
        }
      } catch (error) {
        console.error("Error fetching lecturer details:", error);
      }
    };

    fetchLecturer();
  }, [params.lecturerID, lecturerName]);

  return (
    <div className="w-full xl:w-3/4 flex flex-col items-center">
      {latestCourses.length > 0 ? (
        <div className="w-full card bg-base-100 p-4 flex flex-col items-center shadow-xl mb-10">
          <p className="font-semibold">
            Lecturer Name: <span className="text-alpha ">{lecturerName}</span>
          </p>
        </div>
      ) : (
        <div className="w-full card bg-base-100 p-4 flex flex-col items-center shadow-xl mb-10">
          <p>Error fetching data</p>
        </div>
      )}
      <GenerateTimeTable variant="search" courses={latestCourses} />
    </div>
  );
};

export default Page;
