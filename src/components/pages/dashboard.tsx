"use client";
import { useState, useEffect } from "react";
import Pagination from "@/components/common/pagination";
import { CourseCard }from "@/components/common/cards/courseCard";
import { EnrolledCourseEntity } from "@/type/course.entity";
import { RenderEnrollCourses } from "../ui/renderEnrollCourses";

const ITEMS_PER_PAGE = 21;
const DashboardPage: React.FC<{
  data: any;
  isLoading: boolean;
  isError: boolean;
}> = ({ data, isLoading, isError }) => {
  

  const [currentPage, setCurrentPage] = useState(1);
  const [courses, setCourses] = useState<EnrolledCourseEntity[]>([]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setCourses(data);
    }
    else {
      setCourses([]);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading courses</div>;
  }

  // const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  // const endIndex = startIndex + ITEMS_PER_PAGE;
  // const coursesToShow = courses.slice(startIndex, endIndex);
  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // const dashboardCounts = (role: string) => {
  //   switch (role) {
  //     case "LEARNER":
  //       return [
  //         { label: "Enrolled Courses" },
  //         { label: "Active Courses" },
  //         { label: "Completed Courses" },
  //       ];
  //     case "COLLAB":
  //       return [
  //         { label: "Enrolled Student" },
  //         { label: "Overall rating" },
  //         { label: "Course Created" },
  //       ];
  //     default:
  //       return [];
  //   }
  // };

  return (
    <div className="flex flex-col gap-6 h-fit">
      <div className="dashboard_count flex flex-col gap-5">
        <h3 className="font-semibold text-lg">Dashboard</h3>
        <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1 max-xl:grid-cols-2">
          {[
            { label: "Enrolled Courses" },
            { label: "Active Courses" },
            { label: "Completed Courses" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white drop-shadow-md duration-300 p-6 rounded-2xl hover:-translate-y-2 w-full flex flex-row gap-4 min-w-fit"
            >
              <div className="rounded-full bg-dodger-blue-500 w-[6vw] max-w-[70px] min-w-fit aspect-square"></div>
              <div className="flex flex-col gap-1 self-center">
                <p className="text-2xl font-semibold">30</p>
                <p className="text-base font-normal">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="dashboard_count flex flex-col gap-5">
        <h3 className="font-semibold text-lg capitalize">
          In progress Courses
        </h3>
        <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1 max-xl:grid-cols-2">
          <RenderEnrollCourses courses={courses} start={0} end={3} />
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
