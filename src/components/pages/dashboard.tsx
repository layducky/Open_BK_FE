"use client";
import { useState, useEffect } from "react";
import Pagination from "@/components/common/pagination";
import { EnrolledCourseEntity } from "@/type/course.entity";
import { RenderEnrollCourses } from "../ui/renderEnrollCourses";
import { useUser } from "@/hooks/querys/useUser";
import { useEnrollStats } from "@/hooks/querys/useEnrollCourse";

const ITEMS_PER_PAGE = 3;

interface DashboardPageProps {
  data: any;
  isLoading: boolean;
  isError: boolean;
}

const statCardClasses =
  "bg-white drop-shadow-md duration-300 p-6 rounded-2xl hover:-translate-y-2 w-full flex flex-row gap-4 min-w-fit";

const getIconForLabel = (label: string) => {
  switch (label) {
    case "Enrolled Students":
      return "https://res.cloudinary.com/dv2izp0a3/image/upload/v1771844656/Student_bd1vnz.png";
    case "Enrolled Courses":
    case "Active Courses":
      return "https://res.cloudinary.com/dv2izp0a3/image/upload/v1771844714/course-icon_cvukxb.png";
    case "Courses Created":
    case "Completed Courses":
      return "https://res.cloudinary.com/dv2izp0a3/image/upload/v1771842619/course-created-icon_bduqhg.png";
    default:
      return "https://res.cloudinary.com/dv2izp0a3/image/upload/v1771844714/course-icon_cvukxb.png";
  }
};

const DashboardPage: React.FC<DashboardPageProps> = ({
  data,
  isLoading,
  isError,
}) => {
  const { data: user } = useUser();
  const { data: stats } = useEnrollStats();

  const [currentPage, setCurrentPage] = useState(1);
  const [courses, setCourses] = useState<EnrolledCourseEntity[]>([]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setCourses(data);
    } else {
      setCourses([]);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading courses</div>;
  }

  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const role = user?.role;
  const enrolledCourses = stats?.enrolledCourses ?? courses.length ?? 0;
  const totalLearners = stats?.totalLearners ?? 0;
  const ownedCourses = stats?.ownedCourses ?? 0;

  const cards =
    role === "COLLAB"
      ? [
          { label: "Enrolled Students", value: totalLearners },
          { label: "Enrolled Courses", value: enrolledCourses },
          { label: "Courses Created", value: ownedCourses },
        ]
      : [
          { label: "Enrolled Courses", value: enrolledCourses },
          { label: "Active Courses", value: enrolledCourses },
          { label: "Completed Courses", value: 0 },
        ];

  return (
    <div className="flex flex-col gap-6 h-fit">
      <div className="dashboard_count flex flex-col gap-5">
        <h3 className="font-semibold text-lg">Dashboard</h3>
        <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1 max-xl:grid-cols-2">
          {cards.map((item, index) => (
            <div key={index} className={statCardClasses}>
              <div className="rounded-full w-[6vw] max-w-[70px] min-w-fit aspect-square flex items-center justify-center">
                <img
                  className="rounded-full w-14 h-14 object-cover border-[4px] border-white"
                  src={getIconForLabel(item.label)}
                  alt="Icon"
                />
              </div>
              <div className="flex flex-col gap-1 self-center">
                <p className="text-2xl font-semibold">{item.value}</p>
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
          <RenderEnrollCourses courses={courses} start={startIndex} end={endIndex} />
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
