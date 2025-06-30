"use client";

import { signOut } from "next-auth/react";
import { IoLogOutOutline } from "react-icons/io5";

export const LogoutButton = () => {
  return (
    <button className="flex items-center gap-2" onClick={() => signOut({ callbackUrl: "/" })}>
      <div className="flex flex-col">
        <IoLogOutOutline className="self-stretch my-auto text-3xl" />
        Logout
      </div>
    </button>
  );
};
