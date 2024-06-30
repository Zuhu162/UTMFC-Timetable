"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import axios from "axios";
import Table from "@/components/Table";
import Link from "next/link";

const AllStudentsSearch = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const { session } = useContext(UserContext);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const storedAppStorage = JSON.parse(
          sessionStorage.getItem("web_fc_utm_my_ttms")
        );

        if (!storedAppStorage) {
          throw new Error("Cannot access local storage");
        }

        if (!storedAppStorage.adminSession_id) {
          throw new Error("No valid session found");
        }

        const adminSession_id = storedAppStorage.adminSession_id;
        console.log("Admin Session ID:", adminSession_id); // Debugging: Log the session ID
        console.log("Current Session:", session); // Debugging: Log the current session

        let offset = 0;
        let allStudents = [];

        while (true) {
          const params = {
            entity: "pelajar",
            session_id: adminSession_id,
            sesi: session.sesi,
            semester: session.semester,
            limit: 1000,
            offset,
          };

          const response = await axios.get(
            "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi",
            { params }
          );

          console.log("Response data:", response.data); // Debugging: Log the response data

          if (
            response.data &&
            Array.isArray(response.data) &&
            response.data.length > 1
          ) {
            allStudents = [...allStudents, ...response.data];
            offset += 1000; // Increment offset for next request
          } else {
            break; // Exit loop if no more data or error
          }
        }

        setStudents(allStudents); // Set all fetched students
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching students:", error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchStudents();
  }, [session]);

  const columns = [
    { id: "nama", label: "Name" },
    {
      id: "actions",
      label: "",
      minWidth: 100,
      render: (row) => (
        <div className="w-full flex justify-end">
          <Link
            href={{
              pathname: `/search-student-timetable/${row.no_matrik}`,
              query: { name: row.nama },
            }}>
            <button className="btn btn-md lg:btn-sm bg-alpha text-white">
              View Timetable
            </button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full container mx-auto">
      <div className="card bg-base-100 p-5">
        {loading ? (
          <div className="w-full flex flex-col items-center justify-center">
            <p>Fetching All Students </p>
            <span className="loading loading-spinner text-alpha" />
          </div>
        ) : (
          <Table
            columns={columns}
            rows={students}
            searchValue={"nama"}
            searchBarValue="Search student name"
          />
        )}
      </div>
    </div>
  );
};

export default AllStudentsSearch;
