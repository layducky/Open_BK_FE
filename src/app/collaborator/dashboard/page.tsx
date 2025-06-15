'use client';
import DashboardPage from "@/components/pages/dashboard";
import { useState, useEffect } from "react";
import { PublicCourseEntity } from "@/type/course.entity";
import { useCollabCourses } from "@/hooks/useCollabCourse";
const DashboardCollaborator: React.FC = () => {
  const { data, isLoading, isError } = (useCollabCourses());

  const [state, setState] = useState<{
    data: PublicCourseEntity | null;
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

export default DashboardCollaborator;

