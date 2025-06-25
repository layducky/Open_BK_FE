import Star from "/public/svg/star.svg";
import Link from "next/link";
import { Course } from "@/type/course.entity";
import { PublicFootBar } from "./publicFootBar";
import { EnrolledFootBar } from "./enrolledFootBar";
import { CollabFootBar } from "./collabFootBar";

export const CourseCard: React.FC<{ course: Course | null, type?: string }> = ({ course, type }) => {
  return (
    <Link href={`/course/${course?.courseID}/overview`}>
      <div
        className="flex overflow-hidden flex-col self-stretch px-5 pt-6 pb-8 my-auto rounded-2xl border border-solid border-zinc-600 
    min-w-[200px] w-[300px]"
      >
        <img
          loading="lazy"
          src={course?.imageUrl}
          alt={`Image of ${course?.courseName}`}
          className="object-contain w-full aspect-[1.42]"
        />
        <div className="flex flex-col self-center mt-5 w-full max-w-[270px]">
          <div className="flex overflow-hidden gap-10 justify-between items-start w-full text-center whitespace-nowrap">
            <div className="overflow-hidden gap-2 self-stretch px-3.5 py-2 text-sm text-black bg-zinc-200 rounded-[50px]">
              {course?.category}
            </div>
            <div className="flex overflow-hidden gap-2.5 justify-center items-center py-2 rounded-[50px] text-zinc-600">
              <div
                id="star"
                className="flex overflow-hidden gap-1 items-center self-stretch my-auto"
              >
                <Star />
              </div>
            </div>
          </div>
          <h3 className="mt-4 text-lg font-semibold tracking-wider text-black">
            {course?.courseName}
          </h3>
          <div className="flex gap-1 items-center mt-4 w-full text-base text-black whitespace-nowrap">
            <div className="flex gap-1.5 items-center self-stretch my-auto">

              <div className="author flex flex-row items-center gap-2">
                <img
                  className="aspect-square w-7 rounded-full"
                  src={course?.authorInfo?.imageUrl}
                />
                <span className="text-sm">{course?.authorInfo?.name}</span>
              </div>

            </div>
          </div>

          {type === "PREVIEW-COURSE" && <PublicFootBar price={course?.price ?? "0"} />}
          {type === "ENROLLED-COURSE" && <EnrolledFootBar />}
          {type === "COLLAB-COURSE" && <CollabFootBar courseID={course?.courseID || null} price={course?.price ?? "0"} />}
        </div>
      </div>
    </Link>
  );
};
;
