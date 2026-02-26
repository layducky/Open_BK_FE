'use client';
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getAllEnrolledCourses, getEnrollStats } from "@/services/course/courseEnroll";
import { getFromSessionStorage } from "../getStorage";

export const useEnrolledCourses = () => {
  const { data: session, status } = useSession();
  const learnerID = session?.user?.id ?? getFromSessionStorage("userID");

  return useQuery({
    queryKey: ["EnrollCourses", learnerID ?? "none"],
    queryFn: () => getAllEnrolledCourses(learnerID as string),
    staleTime: 60 * 1000,
    enabled: !!learnerID && status !== "loading",
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

