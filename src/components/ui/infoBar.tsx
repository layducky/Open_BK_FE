"use client";
import { Suspense } from "react";
import { roleString } from "@/lib/roleUtils";
import { useUser } from "@/hooks/querys/useUser";
import { PublicCourseEntity } from "@/type/course.entity";
import { formatDateTime } from "@/lib/dateUtils";

export const UserInforBar = () => {
  const { data: user } = useUser();

  const backgroundColor =
    user?.role === "LEARNER" ? "bg-pink-300" : user?.role === "ADMIN" ? "bg-gray-300" :  "bg-yellow-200";

  return (
    <div
      className={`dashboard-top w-[80vw] ${backgroundColor} h-[15vw] rounded-2xl flex flex-col-reverse px-10 pb-8 min-h-fit`}
    >
      <div className="flex flex-row gap-5">
        <img
          className="rounded-full bg-black w-28 aspect-square object-cover border-[6px] border-white"
          src={user?.image} alt="Avatar"
        />
        <Suspense fallback={<p>Loading...</p>}>
          <div className="flex flex-col gap-1 self-center">
            <span className="font-semibold text-xl">
              {user?.name ?? "Name"}
            </span>
            <span>{roleString(user?.role)}</span>
          </div>
        </Suspense>
      </div>
    </div>
  );
};

const CourseStats = ({ courseData }: { courseData: PublicCourseEntity }) => {
  const students = courseData?.learnersCount ?? 0;
  const sampleData = {
    lastUpdated: (courseData?.contentUpdatedAt ?? courseData?.updatedAt) != null ? formatDateTime(courseData.contentUpdatedAt ?? courseData.updatedAt) : "-",
    language: "English",
  };

  return (
    <div className="flex flex-col gap-4 w-full text-left">
      {/* 3 cột: 2 cột đầu giữ nội dung cũ, cột 3 là rating trong vòng tròn */}
      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 md:gap-6 pr-4">
        {/* Cột 1: Author + Last updated */}
        <div className="flex flex-col gap-3 items-start text-left">
          <div className="flex gap-2 items-center">
            <img
              className="aspect-square w-7 rounded-full object-cover"
              src={courseData?.authorInfo?.image}
              alt=""
            />
            <p className="font-bold text-left">{courseData?.authorInfo?.name}</p>
          </div>
          <div className="flex flex-row gap-2.5 items-center text-left">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/4d2e3c9ca02843ada293db57d2cfd6d0/e1eaa0ad71ee14910b23b983f9f7c25fc8ee3c3a092dad25acc76e9b6de5dffa?apiKey=4d2e3c9ca02843ada293db57d2cfd6d0&"
              alt=""
              className="object-contain shrink-0 w-6 aspect-square"
            />
            <span className="text-left">Last updated {sampleData.lastUpdated}</span>
          </div>
        </div>

        {/* Cột 2: Students + Language */}
        <div className="flex flex-col gap-3 items-start text-left">
          <div className="flex gap-2 items-center text-left">
            <img
              loading="lazy"
              src="https://res.cloudinary.com/dv2izp0a3/image/upload/v1771844656/Student_bd1vnz.png"
              alt=""
              className="object-contain shrink-0 w-6 aspect-square"
            />
            {students.toLocaleString()} students enrolled
          </div>
          <div className="flex gap-2.5 items-center text-left">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/4d2e3c9ca02843ada293db57d2cfd6d0/8d79b4fc4e4a4e93a0b5a083a7d78008bc5b03defdc9ce320b250fbc60af8983?apiKey=4d2e3c9ca02843ada293db57d2cfd6d0&"
              alt=""
              className="object-contain shrink-0 w-6 aspect-square"
            />
            <span className="text-left">{sampleData.language}</span>
          </div>
        </div>

        {/* Cột 3: Rating 5.0/5.0 + icon trong vòng tròn, border rộng, nền trắng */}
        <div className="flex flex-col items-start md:items-end text-left">
          <div className="rounded-full p-[6px] border-[3px] border-gray-300 bg-white flex items-center justify-center gap-1.5 min-w-[100px]">
            <span className="font-semibold text-black">5.0/5.0</span>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/4d2e3c9ca02843ada293db57d2cfd6d0/561dd6bf5c536831a59626d26535ac5f00eb09d736ee3a10d2d09939a048eb14?apiKey=4d2e3c9ca02843ada293db57d2cfd6d0&"
              alt="Rating"
              className="object-contain w-5 aspect-square"
            />
          </div>
        </div>
      </div>

      {/* Category dưới đáy CourseStats, ngoài div 3 cột */}
      {courseData?.category && (
        <div className="pt-1">
          <span className="inline-block px-3 py-1.5 text-sm font-medium rounded-[50px] bg-zinc-200 text-black">
            {courseData.category}
          </span>
        </div>
      )}
    </div>
  );
};
export const CourseInfoBar: React.FC<{ courseData: PublicCourseEntity}> = ({ courseData }) => {
  return(
    <div className="bg-indigo-50 md:max-w-full rounded-lg border">
      <div className="flex mt-2.5 grid grid-cols-1 md:grid-cols-10 p-4">
        <div className="cols-span-1 md:col-span-7">          
          <div className="col-span-3 md:hidden">
            <div className='shadow-lg bg-white rounded-lg border py-4'>
              <img
                  loading="lazy"
                  src={courseData?.image}
                  alt="Course preview"
                  className="object-contain w-full rounded-md aspect-[1.38]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 p-4 text-left items-start">
            <div className="flex flex-col items-start w-full">
              <h1 className="mt-4 text-4xl font-semibold text-black max-md:max-w-full text-left">
                {courseData?.courseName}
              </h1>
              <div className="md:min-h-[10vh] w-full text-left">
                <p className="text-left">{courseData?.description}</p>
              </div>
            </div>
            <CourseStats courseData={courseData} />
          </div>
          
        </div>

        <div className="col-span-3 hidden md:block">
          <div className='shadow-lg bg-white rounded-lg border py-4'>
            <img
                loading="lazy"
                src={courseData?.image}
                alt="Course preview"
                className="object-contain w-full rounded-md aspect-[1.38]"
            />
          </div>
        </div>
      </div>
    </div>
    
  )
}
