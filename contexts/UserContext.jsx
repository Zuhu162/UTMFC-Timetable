"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";

// Create context
const UserContext = createContext();

// Create provider component
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [session, setSession] = useState({});
  const [courses, setCourses] = useState([]);
  const [sessionInfo, setSessionInfo] = useState({});
  const [storageLoaded, setStorageLoaded] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== "undefined") {
        const storedAppStorage = JSON.parse(
          sessionStorage.getItem("web_fc_utm_my_ttms") || "{}"
        );
        if (storedAppStorage && Object.keys(storedAppStorage).length > 0) {
          setUser(storedAppStorage);
          router.push("/");
        } else {
          router.push("/login");
        }
        setStorageLoaded(true);
      }
    };
    fetchData();

    const fetchSessionData = async () => {
      const result = await axios(
        `${process.env.NEXT_PUBLIC_API_URL}entity=sesisemester`
      );
      setSession(result.data[0]);
    };
    fetchSessionData();
  }, [router]);

  useEffect(() => {
    const getData = async () => {
      if (user && user.user_auth && user.user_auth.login_name) {
        const matric = user.user_auth.login_name;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}entity=pelajar_subjek&no_matrik=${matric}`
        );

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

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        session,
        setSession,
        sessionInfo,
        setSessionInfo,
        courses,
        setCourses,
        storageLoaded,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
