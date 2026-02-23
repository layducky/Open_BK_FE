"use client";
import { useQuery } from "@tanstack/react-query";
import { PublicCourseEntity } from "@/type/course.entity";
import { getCourseById, getCourseCategories, CourseCategoryOption } from "@/services/course";

export const useCourseData = (courseID: string) => {
  return useQuery<PublicCourseEntity | undefined>({
    queryKey: ["getCourseById", courseID],
    queryFn: () => getCourseById(courseID as string),
    staleTime: Infinity,
  });
};

export const useCourseCategories = () => {
  return useQuery<CourseCategoryOption[]>({
    queryKey: ["getCourseCategories"],
    queryFn: getCourseCategories,
    staleTime: 1000 * 60 * 10, // 10 minutes
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

