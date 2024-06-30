"use client";

import Table from "@/components/Table";
import { UserContext } from "@/contexts/UserContext";
import React, { useContext, useEffect, useState } from "react";

const columns = [
  { id: "kod_kursus", label: "Course Code", minWidth: 170 },
  { id: "kod_subjek", label: "Subject Code", minWidth: 100 },
  { id: "nama_subjek", label: "Subject Name", minWidth: 170, align: "left" },
  { id: "seksyen", label: "Section", align: "center" },
  { id: "semester", label: "Semester", minWidth: 170, align: "center" },
  { id: "sesi", label: "Session", minWidth: 170, align: "center" },
  { id: "tahun_kursus", label: "Course Year", minWidth: 170, align: "center" },
];

const Page = (props) => {
  const [courses, setCourses] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      if (user && user.user_auth && user.user_auth.login_name) {
        const matric = user.user_auth.login_name;
        const response = await fetch(
          `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=pelajar_subjek&no_matrik=${matric}`
        );

        const result = await response.json();

        console.log(result);
        setCourses(result);
      }
    };

    getData();
  }, [user]); // Depend on user

  return (
    <div className="container w-full p-2">
      <div className="bg-base-100 p-2 md:p-10 min-h-[600px]">
        <Table
          columns={columns}
          rows={courses}
          searchValue={"nama_subjek"}
          searchBarValue="Search course by name"
        />
      </div>
    </div>
  );
};

export default Page;
