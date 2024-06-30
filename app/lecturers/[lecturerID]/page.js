"use client";

import GenerateTimeTable from "@/components/GenerateTimeTable";
import { UserContext } from "@/contexts/UserContext";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const LecturerPage = ({ params }) => {
  const [lecturer, setLecturer] = useState([]);
  const { sessionInfo } = useContext(UserContext);
  const [latestCourses, setLatestCourses] = useState([]);
  const searchParams = useSearchParams();
  const lecturerName = searchParams.get("name");

  console.log(lecturerName);
  useEffect(() => {
    const fetchLecturer = async () => {
      try {
        const response = await axios.get(
          `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=pensyarah_subjek&no_pekerja=${params.lecturerID}`
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
  }, [params.lecturerID, sessionInfo, lecturerName]);

  return (
    <div className="w-3/4 flex flex-col items-center">
      {latestCourses.length > 0 ? (
        <div className="w-3/4 card bg-base-100 p-3 flex flex-col items-center shadow-xl mb-10">
          <p className="font-semibold">
            Lecturer Name: <span className="text-alpha ">{lecturerName}</span>
          </p>
        </div>
      ) : (
        <p>No courses found for the current session and semester.</p>
      )}
      <GenerateTimeTable variant="search" courses={latestCourses} />
    </div>
  );
};

export default LecturerPage;
