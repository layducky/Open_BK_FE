"use client";
import { Suspense } from "react";
import { roleString } from "@/lib/roleUtils";
import { useUser } from "@/hooks/querys/useUser";
import { PublicCourseEntity } from "@/type/course.entity";

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

const CourseStats = ({courseData}: {courseData: PublicCourseEntity}) => {
  const students = courseData?.learnersCount ?? 0;
  const sampleData = {
      rating: 4.5,
      reviews: 123456,
      lastUpdated: courseData?.updatedAt,
      language: "English"
  }
  return (
    <div className="flex flex-col gap-4"> 
      <div className="flex flex-col mt-2.5 w-full">
        <div className="flex flex-col md:flex-row w-full gap-2 md:gap-8 md:items-center justify-between pr-8">
          <div className="flex gap-2">
            <img
              className="aspect-square w-7 rounded-full"
              src={courseData?.authorInfo?.image}
            />
            <p className="font-bold">{courseData?.authorInfo?.name}</p>
          </div>
          <div className="text-gray-500">
            {students.toLocaleString()} students
          </div>
          <div className="flex overflow-hidden z-0 gap-1.5 md:items-center self-stretch px-2.5 my-auto">
              <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/4d2e3c9ca02843ada293db57d2cfd6d0/561dd6bf5c536831a59626d26535ac5f00eb09d736ee3a10d2d09939a048eb14?apiKey=4d2e3c9ca02843ada293db57d2cfd6d0&"
                  alt=""
                  className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
              />
              {/* <div className="self-stretch my-auto text-base text-center text-black capitalize">
                  {rating}
              </div> */}
              {/* <div className="self-stretch my-auto text-sm tracking-wide leading-none text-black">
                  ({reviews} reviews)
              </div> */}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2 md:gap-12 md:items-center w-full">
        <div className="flex flex-row gap-2.5"> 
          <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/4d2e3c9ca02843ada293db57d2cfd6d0/e1eaa0ad71ee14910b23b983f9f7c25fc8ee3c3a092dad25acc76e9b6de5dffa?apiKey=4d2e3c9ca02843ada293db57d2cfd6d0&"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
          <div>
              Last updated {sampleData.lastUpdated}
          </div>
        </div>
        <div className="flex gap-2.5 items-center">
          <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/4d2e3c9ca02843ada293db57d2cfd6d0/8d79b4fc4e4a4e93a0b5a083a7d78008bc5b03defdc9ce320b250fbc60af8983?apiKey=4d2e3c9ca02843ada293db57d2cfd6d0&"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
          <div>{sampleData.language}</div>
        </div>
      </div>
    </div>
  );
}
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

          <div className="flex flex-col gap-2 p-4">
            <div className="flex flex-col items-center">
              <div>
                <h1 className="mt-4 text-4xl font-semibold text-black max-md:max-w-full">
                  {courseData?.courseName}
                </h1>
              </div>
              <div className="md:min-h-[10vh]">
                <p> {courseData?.description} </p>
              </div>
            </div>
            <CourseStats courseData={courseData}/>
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
