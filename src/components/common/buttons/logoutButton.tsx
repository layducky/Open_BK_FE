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
    <button
      className="flex items-center gap-1.5 text-sm md:text-base hover:opacity-80 transition-opacity"
      onClick={handleLogout}
    >
      <IoLogOutOutline className="text-xl md:text-2xl shrink-0" />
      <span className="hidden sm:inline">Logout</span>
    </button>
  );
};

