'use client';
import DashboardPage from "@/components/pages/dashboard";
import { useEnrolledCourses } from "@/hooks/useEnrollCourse";
import { useState, useEffect } from "react";
import { EnrolledCourseEntity } from "@/domain/course.entity";
const DashboardLearner: React.FC = () => {
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
    <DashboardPage data={state.data} isLoading={state.isLoading} isError={state.isError} />
  );
};

export default DashboardLearner;
