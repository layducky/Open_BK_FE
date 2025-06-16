'use client';
import EnrolledCoursesPage from "@/components/pages/enrolled-courses";
import { useEnrolledCourses } from "@/hooks/querys/useEnrollCourse";
import { useState, useEffect } from "react";
import { EnrolledCourseEntity } from "@/type/course.entity";
const EnrolledCourseLearner: React.FC = () => {
  const { data, isLoading, isError } = useEnrolledCourses();
  const [state, setState] = useState<{
    data: EnrolledCourseEntity | null;
    isLoading: boolean;
    isError: boolean;
  }>({
    data: null,
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    setState({ data: data ?? null, isLoading, isError });
  }, [data, isLoading, isError]);

  if (!state.data) {
    return null;
  }


  return (
    <EnrolledCoursesPage data={state.data} isLoading={state.isLoading} isError={state.isError} />
  );
};

export default EnrolledCourseLearner;

