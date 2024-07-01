"use client";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import GenerateTimeTable from "@/components/GenerateTimeTable";
import axios from "axios";
import { UserContext } from "@/contexts/UserContext";

const Page = ({ params }) => {
  const [student, setStudent] = useState([]);
  const [latestCourses, setLatestCourses] = useState([]);
  const { sessionInfo } = useContext(UserContext);

  const searchParams = useSearchParams();
  const studentName = searchParams.get("name");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=pelajar_subjek&no_matrik=${params.studentID}`
        );

        console.log(response.data);
        if (response.data) {
          setStudent(response.data);
          console.log("Student data:", response.data); // Log the response data here
          // Filter courses after setting student data
          const latest = response.data
            .filter((course) => course.sesi === sessionInfo.latest.sesi)
            .filter(
              (course) => course.semester === sessionInfo.latest.semester
            );
          setLatestCourses(latest);
          console.log("Latest courses:", latest); // Log the filtered courses
        }
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudent();
  }, [params.studentID, studentName, sessionInfo]);

  return (
    <div className="w-full flex flex-col justify-center items-center mt-10">
      {latestCourses.length > 0 ? (
        <div className="w-3/4 card bg-base-100 p-3 flex flex-col items-center shadow-xl mb-10">
          <p className="font-semibold">
            Student Name: <span className="text-alpha">{studentName}</span>
          </p>
        </div>
      ) : (
        <p>No courses found for the current session and semester.</p>
      )}
      <GenerateTimeTable variant="search" courses={latestCourses} />
    </div>
  );
};

export default Page;
