import { UserEntity } from "@/domain/user.entity";
import { apiClientWithAuth } from "@/services/apiClient";
import { getFromSessionStorage } from '../hooks/getStorage';
export const getUserInfo = async (): Promise<UserEntity | null> => {
  try {
    const userID = getFromSessionStorage("userID");

    if (!userID) {
      return null;
    }
    const { data } = await apiClientWithAuth.get<UserEntity>(`/user/${userID}`);
    return data ? new UserEntity(data) : null;
  } catch (error) {
    return null;
  }
};

export const updateProfile = async (data: UserEntity) => {
  const response = await apiClientWithAuth.patch("/user/info", data);
  return response.data;
};

export const updatePassword = async (password: string, newPassword: string) => {
  const response = await apiClientWithAuth.patch("/user/info/password", {
    password,
    newPassword,
  });
  return response.data;
};

// export const getEnrolledCourses = async (): Promise<{
//   Courses: PublicCourseEntity[];
// }> => {
//   const response = await apiClientWithAuth.get("/user/course");
//   return response.data;
// };

export default { getUserInfo, updatePassword };