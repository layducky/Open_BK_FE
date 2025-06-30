"use client";

import React, { ReactNode } from "react";
import GoogleLoginButton from "./GoogleLoginButton";

export default function AuthFormLayout({
  title,
  children,
  redirectMessage,
  redirectHref,
  redirectText,
}: {
  title: string;
  children: ReactNode;
  redirectMessage: string;
  redirectHref: string;
  redirectText: string;
}) {

  return (
    <main className="flex bg-gray-100 items-start p-1 md:items-center justify-center h-screen w-full">
      <div className="w-full md:w-[80vh] border bg-white border-stone-400 px-3 md:px-12 py-7 rounded-2xl flex flex-col gap-8">
        <h1 className="text-black text-3xl font-semibold">{title}</h1>
        <form className="flex flex-col gap-10">{children}</form>
        <GoogleLoginButton />
        <div className="self-center text-stone-500 select-none">
          {redirectMessage}{" "}
          <a
            href={redirectHref}
            className="text-dodger-blue-600 duration-150 underline hover:text-saffron-400"
          >
            {redirectText}
          </a>
        </div>
      </div>
    </main>
  );
}
