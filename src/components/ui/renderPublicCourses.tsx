import { PublicCourseEntity } from "@/domain/course.entity";
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
        <div className="w-full">
          <img
            className="w-full"
            src="https://nihotour.gov.ng/wp-content/plugins/tutor/assets/images/emptystate.svg"
            alt="no course data"
          />
        </div>
      )}
    </>
  );
};
