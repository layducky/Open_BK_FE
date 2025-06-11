import { useQuery } from "@tanstack/react-query";
import { getQueryClient } from "@/app/providers";
import { PublicCourseEntity } from "@/domain/course.entity";
import { UnitEntity } from "@/domain/unit.entity";
import { QuestionEntity } from "@/domain/question.entity";
import { getAllCourses } from "@/services/course";
import { getAllUnits } from "@/services/course/unit";
import { getAllQuestions } from "@/services/course/question";

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
    staleTime: 0,
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
