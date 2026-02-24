"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/context/ModalContext";
import { useUser } from "@/hooks/querys/useUser";
import Test from "/public/svg/test.svg";

interface TestLinkProps {
  testID: string;
  testName: string;
  courseID: string;
  isEnrolled: boolean;
}

export function TestLink({ testID, testName, courseID, isEnrolled }: TestLinkProps) {
  const router = useRouter();
  const { openModal } = useModal();
  const { data: userInfo } = useUser();
  const isLoggedIn = !!userInfo?.id;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) return;
    if (isEnrolled) {
      router.push(`/test/${testID}`);
    } else {
      openModal("NotEnrolledModal", { redirectTo: null });
    }
  };

  return (
    <div className="w-full md:w-[98%] border-t-2 border-dotted border-solid border-gray-300 py-4">
      <div className="flex gap-2.5 items-center mt-1.5">
        <Test />
        {isLoggedIn ? (
          <button
            type="button"
            onClick={handleClick}
            className="text-blue-600 underline text-left hover:text-blue-800"
          >
            {testName}
          </button>
        ) : (
          <span className="text-gray-500 cursor-not-allowed" title="Đăng nhập để xem bài test">
            {testName} <span className="text-sm">(Đăng nhập để xem)</span>
          </span>
        )}
      </div>
    </div>
  );
}
