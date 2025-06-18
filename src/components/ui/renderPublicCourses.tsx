import { PublicCourseEntity } from "@/type/course.entity";
import { CourseCard } from "../common/cards/courseCard";
import React from "react";

export const RenderPublicCourses: React.FC<{
  courses: PublicCourseEntity[] | undefined;
  start: number;
  end: number;
  viewType: string;
}> = ({ courses, start, end, viewType }) => {
  return (
    <>
      {courses && courses.length > 0 ? (
        courses.slice(start, end).map((course) => (
          <CourseCard key={course.courseID} course={course} type={viewType} />
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
