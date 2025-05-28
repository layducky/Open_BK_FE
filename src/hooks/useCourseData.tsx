"use client";
import { useQuery } from "@tanstack/react-query";
import { getQueryClient } from "@/app/providers";
import { PublicCourseEntity } from "@/domain/course.entity";
import { UnitEntity } from "@/domain/unit.entity";
import { getCourseById } from "@/services/course";
// import { getUnitById } from "@/services/course/unit";


export const useCourseData = (courseID: string) => {
  return useQuery<PublicCourseEntity | undefined>({
    queryKey: ["getCourseById", courseID],
    queryFn: () => getCourseById(courseID as string),
    staleTime: Infinity,
  });
};

// export const useUnitData = (unitID: string) => {
//   return useQuery<UnitEntity | undefined>({
//     queryKey: ["getUnitById", unitID],
//     queryFn: () => getUnitById(unitID as string),
//     staleTime: Infinity,
//   });
// }
// export const prefetchCourses = async () => {
//   const queryClient = getQueryClient();
//   await queryClient.prefetchQuery({
//     queryKey: ['getAllCourses'],
//     queryFn: getAllCourses,
//     staleTime: Infinity,
//   });
// };

