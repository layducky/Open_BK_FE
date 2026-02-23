'use client';
import { useQuery } from "@tanstack/react-query";
import { getAllEnrolledCourses, getEnrollStats } from "@/services/course/courseEnroll";
import { getFromSessionStorage } from "../getStorage";
export const useEnrolledCourses = () => {
  const learnerID = getFromSessionStorage("userID"); 

  return useQuery({
    queryKey: ["EnrollCourses", learnerID],
    queryFn: () => getAllEnrolledCourses(learnerID as string),
    staleTime: Infinity,
    enabled: !!learnerID,
  });
};

export const useEnrollStats = () => {
  const userID = getFromSessionStorage("userID");

  return useQuery({
    queryKey: ["EnrollStats", userID],
    queryFn: getEnrollStats,
    staleTime: Infinity,
    enabled: !!userID,
  });
};

