// "use client";
// import Accordion from "@/components/Accordion";
// import { UserContext } from "@/contexts/UserContext";
// import Link from "next/link";
// import React, { useContext, useEffect, useState } from "react";

// const Page = () => {
//   const [courses, setCourses] = useState([]);
//   const [filteredCourses, setFilteredCourses] = useState({});
//   const { user } = useContext(UserContext);
//   //   const { sessionInfo, setSessionInfo } = useContext(UserContext);
//   const [sessionInfo, setSessionInfo] = useState([]);

//   useEffect(() => {
//     const getData = async () => {
//       if (user && user.user_auth && user.user_auth.login_name) {
//         const matric = user.user_auth.login_name;
//         const response = await fetch(
//           `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=pelajar_subjek&no_matrik=${matric}`
//         );

//         const result = await response.json();

//         setCourses(result);
//         if (result.length > 0) {
//           setSessionInfo({
//             latest: { sesi: result[0].sesi, semester: result[0].semester },
//             first: {
//               sesi: result[result.length - 1].sesi,
//               semester: result[result.length - 1].semester,
//             },
//           });
//         }
//       }
//     };

//     getData();
//   }, [user]); // Depend on user

//   useEffect(() => {
//     const generateSessions = (first, latest) => {
//       const sessions = [];
//       const [startYear1, startYear2] = first.sesi.split("/").map(Number);
//       const [endYear1, endYear2] = latest.sesi.split("/").map(Number);

//       for (
//         let year1 = startYear1, year2 = startYear2;
//         year1 <= endYear1 && year2 <= endYear2;

//       ) {
//         for (let semester = 1; semester <= 2; semester++) {
//           if (
//             (year1 > startYear1 ||
//               (year1 === startYear1 && semester >= first.semester)) &&
//             (year1 < endYear1 ||
//               (year1 === endYear1 && semester <= latest.semester))
//           ) {
//             sessions.push({ sesi: `${year1}/${year2}`, semester });
//           }
//         }
//         year1++;
//         year2++;
//       }
//       sessions.reverse();
//       return sessions;
//     };

//     if (sessionInfo.first && sessionInfo.latest) {
//       const sessions = generateSessions(sessionInfo.first, sessionInfo.latest);

//       const groupedCourses = {};
//       if (courses.length > 0 && sessions.length > 0) {
//         sessions.forEach(({ sesi, semester }) => {
//           const key = `${sesi} Semester ${semester}`;
//           groupedCourses[key] = courses.filter(
//             (course) => course.sesi === sesi && course.semester === semester
//           );
//         });
//       }
//       setFilteredCourses(groupedCourses);
//     }
//   }, [courses]); // Depend on courses and sessionInfo

//   console.log("Grouped courses:", filteredCourses); // Debugging log

//   return (
//     <div className="w-full xl:w-3/4 flex flex-col items-center">
//       <div className="w-full">
//         <Link href="/registered-courses">
//           <button className="btn bg-alpha text-base-100 hover:bg-primeDark mb-5">
//             View Course Table
//           </button>
//         </Link>
//       </div>
//       <div className="bg-base-100 shadow-xl rounded-xl w-full p-4 md:px-5 md:py-10 flex flex-col items-center justify-center">
//         {Object.keys(filteredCourses).map((key) => (
//           <Accordion key={key} value={key} courses={filteredCourses[key]} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Page;

"use client";
import Accordion from "@/components/Accordion";
import { UserContext } from "@/contexts/UserContext";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState({});
  const { user } = useContext(UserContext);
  const [sessionInfo, setSessionInfo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      if (user && user.user_auth && user.user_auth.login_name) {
        const matric = user.user_auth.login_name;

        // Update the fetch call to use the proxy
        const response = await fetch(
          `/api/proxy?entity=pelajar_subjek&no_matrik=${matric}`
        );

        if (!response.ok) {
          console.error("Failed to fetch courses");
          return;
        }

        const result = await response.json();

        setCourses(result);
        if (result.length > 0) {
          setSessionInfo({
            latest: { sesi: result[0].sesi, semester: result[0].semester },
            first: {
              sesi: result[result.length - 1].sesi,
              semester: result[result.length - 1].semester,
            },
          });
        }
      }
    };

    getData();
  }, [user]);

  useEffect(() => {
    const generateSessions = (first, latest) => {
      const sessions = [];
      const [startYear1, startYear2] = first.sesi.split("/").map(Number);
      const [endYear1, endYear2] = latest.sesi.split("/").map(Number);

      for (
        let year1 = startYear1, year2 = startYear2;
        year1 <= endYear1 && year2 <= endYear2;

      ) {
        for (let semester = 1; semester <= 2; semester++) {
          if (
            (year1 > startYear1 ||
              (year1 === startYear1 && semester >= first.semester)) &&
            (year1 < endYear1 ||
              (year1 === endYear1 && semester <= latest.semester))
          ) {
            sessions.push({ sesi: `${year1}/${year2}`, semester });
          }
        }
        year1++;
        year2++;
      }
      sessions.reverse();
      return sessions;
    };

    if (sessionInfo.first && sessionInfo.latest) {
      const sessions = generateSessions(sessionInfo.first, sessionInfo.latest);

      const groupedCourses = {};
      if (courses.length > 0 && sessions.length > 0) {
        sessions.forEach(({ sesi, semester }) => {
          const key = `${sesi} Semester ${semester}`;
          groupedCourses[key] = courses.filter(
            (course) => course.sesi === sesi && course.semester === semester
          );
        });
      }
      setFilteredCourses(groupedCourses);
    }
  }, [courses]);

  return (
    <div className="w-full xl:w-3/4 flex flex-col items-center">
      <div className="w-full">
        <Link href="/registered-courses">
          <button className="btn bg-alpha text-base-100 hover:bg-primeDark mb-5">
            View Course Table
          </button>
        </Link>
      </div>
      <div className="bg-base-100 shadow-xl rounded-xl w-full p-4 md:px-5 md:py-10 flex flex-col items-center justify-center">
        {Object.keys(filteredCourses).map((key) => (
          <Accordion key={key} value={key} courses={filteredCourses[key]} />
        ))}
      </div>
    </div>
  );
};

export default Page;
