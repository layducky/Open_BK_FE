'use client';
import SettingsPage from "@/components/pages/setting";
import { useUser } from "@/hooks/useUser";
import { useState, useEffect } from "react";
import { UserEntity } from "@/domain/user.entity";
const SettingsCollaborator: React.FC = () => {
  const { data , isLoading, isError } = useUser();
  const [state, setState] = useState<{
    data: UserEntity | null;
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
    <SettingsPage data={state.data} isLoading={state.isLoading} isError={state.isError} />
  );
};

export default SettingsCollaborator;


