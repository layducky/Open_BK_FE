import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQueryClient } from "@/app/providers";
import { UserEntity } from "@/domain/user.entity";
import { getUserInfo } from "@/services/user";
export const useUser = () => {
  return useQuery<UserEntity | null>({
    queryKey: ['getProfile'],
    queryFn: getUserInfo,
    staleTime: Infinity,
  });
};


export const prefetchUser = async () => {
  const [userID, setUserID] = useState<string | null>(null);
  useEffect(() => {
    const ID = sessionStorage.getItem("userID");
    setUserID(ID);
  }, []);
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['getProfile'],
    queryFn: () => getUserInfo(),
    staleTime: Infinity,
  });
};