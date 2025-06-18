'use client'
import * as React from "react";
import { BulletItem } from "@/components/ui/bulletItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/querys/useUser";

export default function Page({
  params
  }: Readonly<{
    params: Promise<{ courseID: string }>
  }>) {
  // const [courseID, setCourseID] = React.useState<string | null>(null);

  // React.useEffect(() => {
  //     // Giải nén giá trị từ params (là một Promise)
  //     const fetchCourseID = async () => {
  //         const resolvedParams = await params;
  //         setCourseID(resolvedParams.courseID);
  //     };

  //     fetchCourseID();
  // }, [params]);

    // const {data: courseData} = useUser( as string);

    const collaboratorData = {
        name: "Someone",
        avatar: "",
        stats: [
          {
            iconType: "video",
            text: "500 Students"
          },
          {
            iconType: "video",
            text: "3 Courses"
          },
          {
            iconType: "video",
            text: "200 Reviews"
          },
          {
            iconType: "video",
            text: "4.6 Overall Ratings"
          }
        ]
    };

    return (
      <div>
        <h2 className="text-2xl leading-none">
          <span className="font-bold">Collaborator: {collaboratorData.name}</span>
        </h2>
        <div className="flex flex-wrap gap-2.5 justify-between items-end mt-5 w-full text-sm tracking-wide leading-none max-md:max-w-full">
          <div className="flex overflow-hidden flex-wrap gap-5 items-center min-w-[240px]">
            <Avatar className="h-[100px] w-[100px]">
              <AvatarImage src={collaboratorData.avatar}></AvatarImage>
              <AvatarFallback>{collaboratorData.name}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center items-start self-stretch my-auto">
              {collaboratorData.stats.map((stat, index) => (
                <BulletItem key={index} {...stat}
                />
              ))}

            </div>
          </div>
        </div>
      </div>
    );
}