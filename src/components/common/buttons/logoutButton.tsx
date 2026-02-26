"use client";

import { signOut } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { IoLogOutOutline } from "react-icons/io5";

export const LogoutButton = () => {
  const queryClient = useQueryClient();

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userID");
    queryClient.removeQueries({ queryKey: ["EnrollCourses"] });
    signOut({ callbackUrl: "/" });
  };

  return (
    <button className="flex items-center gap-2" onClick={handleLogout}>
      <div className="flex flex-col">
        <IoLogOutOutline className="self-stretch my-auto text-3xl" />
        Logout
      </div>
    </button>
  );
};

