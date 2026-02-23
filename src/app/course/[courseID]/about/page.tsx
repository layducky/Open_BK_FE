'use client'
import * as React from "react";
import { BulletItem } from "@/components/ui/bulletItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCourseData } from "@/hooks/querys/useCourseData";

export default function Page({
  params
}: Readonly<{
  params: Promise<{ courseID: string }>
}>) {
  const [courseID, setCourseID] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCourseID = async () => {
      const resolvedParams = await params;
      setCourseID(resolvedParams.courseID);
    };
    fetchCourseID();
  }, [params]);

  const { data: courseData } = useCourseData(courseID ?? '');

  const collaboratorName = courseData?.authorInfo?.name ?? 'Collaborator';
  const collaboratorAvatar = courseData?.authorInfo?.image ?? '';
  const totalLearners = courseData?.authorStats?.totalLearners ?? 0;
  const ownedCourses = courseData?.authorStats?.ownedCourses ?? 0;

  const stats = [
    { iconType: "video", text: `${totalLearners} Students` },
    { iconType: "video", text: `${ownedCourses} Courses` },
    { iconType: "video", text: "200 Reviews" },
    { iconType: "video", text: "4.6 Overall Ratings" }
  ];

  return (
    <div>
      <h2 className="text-2xl leading-none">
        <span className="font-bold">Collaborator: {collaboratorName}</span>
      </h2>
      <div className="flex flex-wrap gap-2.5 justify-between items-end mt-5 w-full text-sm tracking-wide leading-none max-md:max-w-full">
        <div className="flex overflow-hidden flex-wrap gap-5 items-center min-w-[240px]">
          <Avatar className="h-[100px] w-[100px]">
            <AvatarImage src={collaboratorAvatar} />
            <AvatarFallback>{collaboratorName}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center items-start self-stretch my-auto">
            {stats.map((stat, index) => (
              <BulletItem key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
