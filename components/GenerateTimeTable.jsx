"use client";

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";

//props.variant = search
//props.courses

const GenerateTimeTable = (props) => {
  const { sessionInfo, courses } = useContext(UserContext);
  const [latestSem, setLatestSem] = useState({});
  const [latestCourses, setLatestCourses] = useState([]);
  const [latestCourseTimings, setLatestCourseTimings] = useState([]);
  const [courseTimetable, setCourseTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionInfo) {
      setLatestSem(sessionInfo.latest);
    }
  }, [sessionInfo]);

  useEffect(() => {
    if (props.variant === "search" && props.courses) {
      const filtered = props.courses.filter(
        (course) =>
          course.sesi === latestSem.sesi &&
          course.semester === latestSem.semester
      );
      setLatestCourses(filtered);
    } else if (latestSem && courses.length > 0) {
      const filtered = courses.filter(
        (course) =>
          course.sesi === latestSem.sesi &&
          course.semester === latestSem.semester
      );
      setLatestCourses(filtered);
    }
  }, [latestSem, courses, props.courses]);

  useEffect(() => {
    if (latestCourses.length > 0) {
      const fetchData = async () => {
        const promises = latestCourses.map(async (course) => {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}entity=jadual_subjek&sesi=${latestSem.sesi}&semester=${latestSem.semester}&kod_subjek=${course.kod_subjek}&seksyen=${course.seksyen}`
          );
          const result = await response.json();
          return result;
        });

        const results = await Promise.all(promises);
        setLatestCourseTimings(results);
        setLoading(false); // Data fetching completed, stop loading
      };
      fetchData();
    }
  }, [latestCourses, latestSem]);

  useEffect(() => {
    if (latestCourseTimings.length > 0) {
      const newTimetable = {};
      latestCourseTimings.forEach((courseTimings) => {
        courseTimings.forEach((ct) => {
          const courseKey = `${ct.kod_subjek}-${ct.hari}`;
          if (!newTimetable[courseKey]) {
            newTimetable[courseKey] = {
              courseCode: ct.kod_subjek,
              section: ct.seksyen,
              day: ct.hari,
              timings: [],
            };
          }
          newTimetable[courseKey].timings.push({
            time: ct.masa,
            room:
              ct.ruang.nama_ruang_singkatan === ""
                ? "N/A"
                : ct.ruang.nama_ruang_singkatan,

            roomCode: ct.ruang.kod_ruang,
          });
        });
      });
      setCourseTimetable(Object.values(newTimetable));
    }
  }, [latestCourseTimings]);

  console.log(courseTimetable);

  return (
    <>
      {loading ? (
        <div className="w-full flex flex-col items-center justify-center">
          <p>Generating Timetable</p>
          <span className="loading loading-spinner text-alpha" />
        </div>
      ) : latestCourses.length === 0 ? (
        <div className="w-full p-3 flex justify-center text-center">
          No courses found for the current session and semester.
        </div>
      ) : (
        <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-2">
          {courseTimetable
            .sort((a, b) => a.day - b.day)
            .map((course) => (
              <div
                key={`${course.courseCode}-${course.day}`}
                className="card w-full bg-base-100 p-10">
                <div className="flex flex-col gap-1">
                  <p className="text-center font-semibold text-alpha">
                    {course.courseCode}
                  </p>
                  <hr className="mb-2 text-prime" />
                  <p>
                    <span className="font-semibold">Section: </span>
                    {course.section}
                  </p>
                  <p>
                    <span className="font-semibold">Day: </span>
                    {getDayName(course.day)}
                  </p>
                  <p>
                    <span className="font-semibold">Timing: </span>
                    {formatTimings(course.timings)}
                  </p>
                  <p>
                    <span className="font-semibold">Room: </span>
                    {course.timings[0].room}
                  </p>
                  <p>
                    <span className="font-semibold">Room Code: </span>
                    {course.timings[0].roomCode}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

const getDayName = (dayNumber) => {
  switch (dayNumber) {
    case 1:
      return "Sunday";
    case 2:
      return "Monday";
    case 3:
      return "Tuesday";
    case 4:
      return "Wednesday";
    case 5:
      return "Thursday";
    case 6:
      return "Friday";
    case 7:
      return "Saturday";
    default:
      return "Unknown";
  }
};

const formatTimings = (timings) => {
  const sortedTimings = timings.sort((a, b) => a.time - b.time);
  const start = sortedTimings[0].time - 1;
  const end = sortedTimings[sortedTimings.length - 1].time;
  return `${formatTime(start)} - ${formatTime(end)}`;
};

const formatTime = (time) => {
  const totalHours = Math.floor(time);
  const hour = totalHours + 7; // Adding 7 to make 1 represent 8AM
  const minute = time % 1 === 0 ? "00" : "30"; // Handling half hours
  const period = hour < 12 ? "AM" : "PM";
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minute} ${period}`;
};

export default GenerateTimeTable;
