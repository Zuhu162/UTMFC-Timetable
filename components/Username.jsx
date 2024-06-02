"use client";
import { UserContext } from "@/contexts/UserContext";
import React, { useContext, useEffect, useState } from "react";

const Username = ({ Component, pageProps }) => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="w-full flex justify-center">
      {user.user_auth ? (
        <p className="text-base-100 font-semibold">
          {user.user_auth.full_name}
        </p>
      ) : (
        <p className="text-base-100 font-semibold">
          No user information available
        </p>
      )}
    </div>
  );
};

export default Username;
