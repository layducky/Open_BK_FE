"use client";

import { ButtonClick } from "../buttons/button";
import * as React from "react";
import ArrowRight from "../../../../public/svg/arrow_right.svg";
import { useEnrolledCourses } from "@/hooks/querys/useEnrollCourse";
import { formatPrice } from "@/lib/formatPrice";

export const PublicFootBar: React.FC<{ price: string; courseID?: string | null }> = ({ price, courseID }) => {
  const { data: enrolledList } = useEnrolledCourses();
  const isEnrolled = !!courseID && enrolledList?.some((c: { courseID: string }) => c.courseID === courseID);

  return (
    <div className="flex gap-5 justify-between items-center pt-4 mt-1 w-full min-w-0">
      {isEnrolled ? (
        <div className="flex justify-center items-center gap-2 p-1.5 bg-gray-300 text-gray-600 font-semibold text-md rounded-3xl border-2 border-gray-400 cursor-not-allowed pointer-events-none shrink-0">
          Enrolled
        </div>
      ) : (
        <ButtonClick courseID={courseID ?? null} className="shrink min-w-0 max-w-full overflow-hidden">
          <span className="truncate">Enroll now</span>
          <ArrowRight className="shrink-0" />
        </ButtonClick>
      )}
      <div className="self-stretch my-auto text-xl font-bold text-green-600 shrink-0">
        {formatPrice(price)}
      </div>
    </div>
  );
};
