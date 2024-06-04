"use client";
import React, { useState } from "react";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

const page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const authUrl = "http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?";

  const login = async (event) => {
    event.preventDefault();

    const myAuth = {
      entity: "authentication",
      login: username,
      password: password,
    };

    try {
      const response = await axios.get(authUrl, {
        params: myAuth,
      });

      const auth = response.data;
      const appStorage = {
        user_auth: auth[0],
        epoch_last: Date.now(),
        data: {},
      };

      sessionStorage.setItem("web_fc_utm_my_ttms", JSON.stringify(appStorage));

      const storedAppStorage = JSON.parse(
        sessionStorage.getItem("web_fc_utm_my_ttms")
      );

      if (!storedAppStorage.user_auth) {
        setError("Invalid ID or Password");
        throw new Error("Invalid ID or Password");
      } else {
        router.push("/");
        router.refresh("");
      }
    } catch (error) {
      console.error("Invalid ID or Password", error);
      alert("Invalid ID or Password");
    }
  };

  return (
    <div className="w-full h-screen p-2 flex justify-center items-center">
      <div className="card card-compact bg-base-100 shadow-xl w-full sm:w-2/3 md:w-1/2 xl:w-1/4 h-[500px] py-10 flex items-center">
        <Image
          src="/utm-logo.png"
          width={250}
          height={250}
          alt="UTM Logo"
          className="mb-5"
        ></Image>
        <p className="text-maroon font-bold mb-[40px]">
          Timetable and Space Management System
        </p>
        <label className="w-3/4 justify-center input flex items-center gap-2 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            onChange={(e) => setUsername(e.currentTarget.value)}
            type="text"
            className="grow border-b-2 border-grey "
            placeholder="Username"
          />
        </label>

        <label className="w-3/4 justify-center input flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
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
          className="w-1/3 btn bg-maroon text-base-100 hover:bg-red-950"
          onClick={login}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default page;
