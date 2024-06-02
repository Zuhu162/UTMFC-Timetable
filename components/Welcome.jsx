"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

const Welcome = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const { session, setSession } = useContext(UserContext);

  return (
    <div className="bg-base-100 shadow-xl w-full md:w-3/4 h-[300px] flex justify-center items-center rounded-2xl text-alpha p-10 font-semibold">
      <div className="w-full max-w-md gap-2 text-center">
        {user.user_auth ? (
          <div className="mb-5">Welcome {user.user_auth.full_name}</div>
        ) : (
          <div>No user information available</div>
        )}
        <div>Session: {session.sesi}</div>
        <div>Semester: {session.semester}</div>
        <div>
          Start/End Date: {session.tarikh_mula} / {session.tarikh_tamat}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
