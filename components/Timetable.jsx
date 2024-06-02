"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [session, setSession] = useState({});
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchSessionData = async () => {
      const result = await axios(
        "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=sesisemester"
      );
      setSession(result.data[0]);
    };
    fetchSessionData();

    const fetchCourses = async () => {
      const result = await axios(
        `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=jadual_subjek&sesi=2023/2024&semester=2&kod_subjek=SCSJ4383&seksyen=1`
      );
      setCourses(result.data);
    };
    fetchCourses();
  }, []);

  console.log(courses);

  const numRows = 11; // Number of rows
  const numCols = 9; // Number of columns

  const daysOfWeek = [
    "Day",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const startTime = 9; // Start time in hours

  const divs = [];

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const isFirstRow = row === 0;
      const isFirstCol = col === 0;
      const isLastCol = col === numCols - 1;

      let content = "";
      if (isFirstRow && col > 0) {
        content = daysOfWeek[col];
      } else if (isFirstCol && row > 0) {
        content = `${startTime + row - 1}:00`;
      }

      const className = `w-40 h-16 border-[1px] border-base-100 p-2 ${
        isFirstRow || isFirstCol || isLastCol ? "bg-alpha" : "bg-prime"
      }`;

      divs.push(
        <div key={`${row}-${col}`} className={className}>
          {content}
        </div>
      );
    }
  }

  return (
    <div className="bg-base-100 p-6 rounded-lg">
      <div className="text-alpha font-semibold mb-5 ">
        <p>Current Session: {session.sesi}</p>
        <p>Current Semester: {session.semester}</p>
      </div>

      <div className="grid grid-cols-9 p-2 w-full text-base-100">{divs}</div>
    </div>
  );
};

export default Page;
