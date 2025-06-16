'use client';
import { useQuery } from "@tanstack/react-query";
import { getAllOwnedCourses } from "@/services/course/courseCollab";
import { getFromSessionStorage } from "../getStorage";

export const useCollabCourses = () => {
  const authorID = getFromSessionStorage("userID"); 

  return useQuery({
    queryKey: ["CollabCourses", authorID], 
    queryFn: () => getAllOwnedCourses(authorID as string),
    staleTime: Infinity,
    enabled: !!authorID,
  });
};
