"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Pagination from "@/components/common/pagination";
import { PublicCourseEntity } from "@/domain/course.entity";
import { RenderPublicCourses } from "../ui/renderPublicCourses";
import { CreateCourseBtn } from "../common/buttons/CourseBtn";
const tabs = [
  { id: "all", label: "All" },
//   { id: "activeCourses", label: "Active Courses" },
//   { id: "completedCourses", label: "Completed Courses" },
];

const ITEMS_PER_PAGE = 21;

const CollabCoursesPage: React.FC<{
  data: any;
  isLoading: boolean;
  isError: boolean;
}> = ({ data, isLoading, isError }) => {
  const [selectedTabId, setSelectedTabId] = useState<string>(tabs[0].id);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [courses, setCourses] = useState<PublicCourseEntity[]>([]);

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

  const allCourses: Record<string, PublicCourseEntity[]> = {
    all: courses,
    // activeCourses: courses.filter((course) => course.status === "ACTIVE"),
    // completedCourses: courses.filter((course) => course.status === "COMPLETED"),
  };
  const coursesForSelectedTab = allCourses[selectedTabId] || [];
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  // const coursesToShow = coursesForSelectedTab.slice(startIndex, endIndex);
  const totalPages = Math.ceil(coursesForSelectedTab.length / ITEMS_PER_PAGE);

  const handleTabClick = (tabId: string) => {
    setSelectedTabId(tabId);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full p-8 drop-shadow h-fit min-h-full bg-white rounded-2xl flex flex-col gap-6 min-w-full">
      <div className="flex">
        <div className="w-5/6">
          <h3 className="font-semibold text-lg">My Courses</h3>
        </div>
        <div className="w-1/6">
          <CreateCourseBtn />
        </div>
      </div>
      <div className="flex flex-col h-fit w-full">
        <div className="flex flex-row w-full flex-wrap relative gap-3">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`flex flex-row w-fit flex-wrap px-7 py-2 text-base cursor-pointer hover:bg-gray-500/10 rounded-t-md duration-300 ease-in-out transition-all transform relative ${
                selectedTabId === tab.id ? "font-semibold" : "font-medium"
              }`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
              {selectedTabId === tab.id && (
                <motion.div
                  layoutId="active"
                  className="absolute bottom-0 left-0 bg-dodger-blue-500 h-[3px] w-full"
                  transition={{ duration: 0.6 }}
                />
              )}
            </div>
          ))}
          <div className="w-full h-full border-b-[3px] border-[#C7C6CA] absolute left-0 top-0 -z-10"></div>
        </div>
      </div>
      <div className="flex justify-center items-center tab_content w-full h-fit flex flex-col">
        <div className="flex justify-center items-center grid grid-cols-3 gap-8 max-md:grid-cols-1 max-xl:grid-cols-2">
          <RenderPublicCourses courses={courses} start={0} end={3} viewType="COLLAB-COURSE" />
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

export default CollabCoursesPage;
