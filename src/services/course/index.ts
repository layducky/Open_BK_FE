import { apiClient } from "@/services/apiClient";

const url = `/course/public`;

export interface CourseFilters {
  search?: string;
  category?: string;
  priceType?: string;
}

const getAllCourses = async (filters?: CourseFilters) => {
  try {
    const res = await apiClient.get(`${url}`, {
      params: filters,
    });
    if (res.status === 200) {
      return res.data;
    } else {
      return res.data;
    }
  } catch (error) {
    return { message: "Network error" };
  }
};

const getCourseById = async (courseID?: string) => {
  if (!courseID) return {};

  try {
    const res = await apiClient.get(
      `${url}/${courseID}`
    );

    if (res.status === 200) {
      return res.data;
    } else {
      return res.data;
    }
  } catch (error) {
    return { message: "Network error" };
  }
};

const updateCourse = async (
  id: number,
  courseName: string,
  description: string
) => {
  try {
    const res = await apiClient.put(
      `${url}/${id}`,
      {
        courseName,
        description,
      }
    );

    if (res.status === 200) {
      return res.data;
    } else {
      return res.data;
    }
  } catch (error) {
    return { message: "Network error" };
  }
};

const deleteCourse = async (id: number) => {
  try {
    const res = await apiClient.delete(
      `${url}/${id}`
    );

    if (res.status === 200) {
      return res.data;
    } else {
      return res.data;
    }
  } catch (error) {
    return { message: "Network error" };
  }
};

export {
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
