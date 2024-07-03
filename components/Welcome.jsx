"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

const Welcome = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const { session, setSession } = useContext(UserContext);

  return (
    <div className="w-full bg-base-100 shadow-xl h-[300px] flex justify-center items-center rounded-2xl text-alpha p-10 font-semibold">
      <div className="w-full max-w-md gap-2 text-center">
        {user.user_auth ? (
          <div>
            <div className="mb-5">
              <p>Welcome {user.user_auth.full_name}</p>
              <p>Matric: {user.user_auth.login_name}</p>
            </div>
            <hr />
            <div className="mt-5">
              <p>Session: {session.sesi}</p>
              <p>Semester: {session.semester}</p>
              <p>
                Start/End Date: {session.tarikh_mula} / {session.tarikh_tamat}
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            <span className="loading loading-spinner text-alpha" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
