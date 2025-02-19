"use client";
import React, { useState } from "react";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DarkModeToggle from "@/components/DarkModeToggle";

const Page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const login = async (event) => {
    event.preventDefault();

    const myAuth = {
      entity: "authentication",
      login: username,
      password: password,
    };

    try {
      // Call the proxy API
      const response = await axios.get("/api/proxy", {
        params: myAuth,
      });

      const auth = response.data;

      // Check if session_id is present in the authentication response
      if (!auth[0]?.session_id) {
        setError("Invalid ID or Password");
        throw new Error("Invalid ID or Password");
      }

      // Store the session_id in sessionStorage or localStorage
      const session_id = auth[0].session_id;

      // Fetch adminSessionID using the proxy as well
      const adminResponse = await axios.get("/api/proxy", {
        params: {
          entity: "auth-admin",
          session_id: session_id,
        },
      });
      const adminSession_id = adminResponse.data[0].session_id;

      const appStorage = {
        user_auth: auth[0],
        epoch_last: Date.now(),
        session_id: session_id,
        adminSession_id: adminSession_id,
        data: {},
      };

      sessionStorage.setItem("web_fc_utm_my_ttms", JSON.stringify(appStorage));

      console.log(appStorage.session_id);
      console.log(appStorage.adminSession_id);

      // Redirect to the desired route upon successful login
      router.push("/");

      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error("Invalid ID or Password", error);
      alert("Invalid ID or Password");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <DarkModeToggle />
      <div className="card card-compact bg-base-100 shadow-xl w-full sm:w-2/3 md:w-1/2 2xl:w-1/4 h-[500px] py-10 flex items-center">
        <Image
          src="/utm-logo.png"
          width={250}
          height={250}
          alt="UTM Logo"
          className="mb-5"></Image>
        <p className="text-maroon font-bold mb-[40px]">
          Timetable and Space Management System
        </p>
        <form onSubmit={login}>
          <div className="w-full flex flex-col items-center justify-center">
            <label className="w-full justify-center input flex items-center gap-2 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                onChange={(e) => setUsername(e.currentTarget.value)}
                type="text"
                className="grow border-b-2 border-grey "
                placeholder="Matric"
              />
            </label>
            <label className="w-full justify-center input flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                onChange={(e) => setPassword(e.currentTarget.value)}
                type="password"
                className="grow border-b-2 border-grey "
                placeholder="Password"
              />
            </label>
            <button
              type="submit"
              className="w-1/3 btn bg-alpha text-base-100 hover:bg-red-950">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
