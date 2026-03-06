"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/context/ModalContext";
import { useSession } from "next-auth/react";
import Test from "../../../public/svg/test.svg";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useMinimumLoading } from "@/hooks/useMinimumLoading";

interface TestLinkProps {
  testID: string;
  testName: string;
  courseID: string;
  isEnrolled: boolean;
  noBorder?: boolean;
}

export function TestLink({ testID, testName, courseID, isEnrolled, noBorder }: TestLinkProps) {
  const router = useRouter();
  const { openModal } = useModal();
  const { data: session, status } = useSession();
  const isLoggedIn = !!session?.user?.id;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) return;
    if (isEnrolled) {
      router.push(`/test/${testID}`);
    } else {
      openModal("NotEnrolledModal", { redirectTo: null });
    }
  };

  const showDisabled = !isLoggedIn || !isEnrolled;
  const showLoading = useMinimumLoading(status === "loading");

  return (
    <div className={`flex-1 min-w-0 ${!noBorder ? "w-full md:w-[98%] border-t-2 border-dotted border-solid border-gray-300 py-4" : ""}`}>
      <div className="flex gap-2.5 items-center mt-1.5">
        <Test />
        {showLoading ? (
          <span className="flex items-center gap-2 text-gray-500">
            <LoadingSpinner size="sm" className="shrink-0" />
            {testName}
          </span>
        ) : showDisabled ? (
          <span
            role={isLoggedIn ? "button" : undefined}
            onClick={isLoggedIn ? handleClick : undefined}
            className="text-gray-500 cursor-not-allowed select-none"
            title="Enroll in the course to view"
          >
            {testName} <span className="text-sm">(Enroll in the course to view)</span>
          </span>
        ) : (
          <button
            type="button"
            onClick={handleClick}
            className="text-blue-600 underline text-left hover:text-blue-800"
          >
            {testName}
          </button>
        )}
      </div>
    </div>
  );
}
