import { EnrolledCourseEntity } from "@/type/course.entity";
import { CourseCard } from "../common/cards/courseCard";
import React from "react";

export const RenderEnrollCourses: React.FC<{
  courses: EnrolledCourseEntity[] | undefined;
  start: number;
  end: number;
}> = ({ courses, start, end }) => {
  return (
    <>
      {courses && courses.length > 0 ? (
        courses.slice(start, end).map((course) => (
          <CourseCard key={course.courseID} course={course} type="ENROLLED-COURSE" />
        ))
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <p className="text-xl text-gray-400 font-bold">Oh no, it's empty here!</p>
          <img
            className="max-w-[12vh] max-h-[12vh] md:max-w-[24vh] md:max-h-[24vh]"
            src="https://res.cloudinary.com/dv2izp0a3/image/upload/v1750227722/empty-box_xv3l4d.png"
            alt="no course data"
          />
        </div>
      )}
    </>
  );
};
