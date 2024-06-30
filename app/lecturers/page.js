"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import axios from "axios";
import Table from "@/components/Table";
import Link from "next/link";

const page = () => {
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const { session } = useContext(UserContext);

  const currentSession = session;

  useEffect(() => {
    const fetchLecturers = async () => {
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
        console.log("Current Session:", currentSession); // Debugging: Log the current session

        const params = {
          entity: "pensyarah",
          session_id: adminSession_id,
          sesi: currentSession.sesi,
          semester: currentSession.semester,
        };

        const response = await axios.get(
          "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi",
          { params }
        );

        if (response.data && Array.isArray(response.data)) {
          setLecturers(response.data);
          setLoading(false);
        } else {
          console.error("Unexpected response format:");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching lecturers:", error);
      }
    };

    fetchLecturers();
  }, [currentSession]);

  const columns = [
    { id: "nama", label: "Name" },
    // { id: "bil_subjek", label: "No. of Subjects" },
    {
      id: "actions",
      label: "",
      minWidth: 100,
      render: (row) => (
        <div className="w-full flex justify-end">
          <Link
            href={{
              pathname: `/lecturers/${row.no_pekerja}`,
              query: { name: row.nama },
            }}>
            <button className="btn btn-sm bg-alpha text-white p-2">
              View Timetable
            </button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="container w-3/4 mx-auto p-4 mt-10">
      <div className="card bg-base-100 p-5">
        {loading ? (
          <div className="w-full flex flex-col items-center justify-center">
            <p>Fetching All Lecturers </p>
            <span className="loading loading-spinner text-alpha" />
          </div>
        ) : (
          <Table
            columns={columns}
            rows={lecturers}
            searchValue={"nama"}
            searchBarValue="Search lecturer name"
          />
        )}
      </div>
    </div>
  );
};

export default page;
