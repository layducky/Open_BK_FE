import { useQuery } from "@tanstack/react-query";
import { getQueryClient } from "@/app/providers";

import { PublicCourseEntity } from "@/type/course.entity";
import { UnitEntity } from "@/type/unit.entity";
import { QuestionEntity } from "@/type/question.entity";

import { getAllCourses } from "@/services/course";
import { getAllUnits } from "@/services/course/unit";
import { getAllQuestions } from "@/services/course/question";
import { getUserTest } from "@/services/course/test";
import { UserTestEntity } from "@/type/test.entity";

export const useCourses = () => {
  return useQuery<PublicCourseEntity[] | undefined>({
    queryKey: ["getAllCourses"],
    queryFn: getAllCourses,
    staleTime: Infinity,
  });
};

export const useUnits = (courseID: string) => {
  return useQuery<UnitEntity[]>({
    queryKey: ["getAllUnits", courseID],
    queryFn: () => getAllUnits(courseID as string),
    staleTime: Infinity,
  });
}

export const useQuestions = (unitID: string) => {
  return useQuery<QuestionEntity[]>({
    queryKey: ["getAllQuestions", unitID],
    queryFn: () => getAllQuestions(unitID as string),
    staleTime: Infinity,
  });
}

export const useUserTest = (testID: string) => {
  return useQuery<UserTestEntity>({
    queryKey: ["getUserTest", testID],
    queryFn: () => getUserTest(testID as string),
    staleTime: Infinity,
  });
}

export const prefetchCourses = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['getAllCourses'],
    queryFn: getAllCourses,
    staleTime: Infinity,
  });
};
