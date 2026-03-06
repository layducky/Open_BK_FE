import { apiClient } from "@/services/apiClient";
import { NotFoundError } from "@/lib/errors";

const url = `/course/public`;

export interface CourseFilters {
  search?: string;
  category?: string;
  priceType?: string;
  page?: number;
  limit?: number;
}

export interface CoursesPageResponse {
  courses: import("@/type/course.entity").PublicCourseEntity[];
  total: number;
}

/** Trả về toàn bộ courses (dùng cho search dropdown). Không truyền page/limit. */
const getAllCourses = async (filters?: Omit<CourseFilters, "page" | "limit">) => {
  try {
    const res = await apiClient.get(`${url}`, { params: filters });
    if (res.status === 200) return res.data;
    return res.data;
  } catch (error) {
    return { message: "Network error" };
  }
};

/** Lấy 1 trang courses - chỉ fetch đúng số cần thiết. */
const getCoursesPage = async (filters: CourseFilters & { page: number; limit: number }): Promise<CoursesPageResponse> => {
  try {
    const res = await apiClient.get(`${url}`, { params: filters });
    if (res.status === 200) {
      const data = res.data;
      if (data && typeof data === "object" && "courses" in data && "total" in data) {
        return { courses: data.courses, total: data.total };
      }
      return { courses: Array.isArray(data) ? data : [], total: 0 };
    }
    return { courses: [], total: 0 };
  } catch (error) {
    return { courses: [], total: 0 };
  }
};

export interface CourseCategoryOption {
  value: string;
  label: string;
}

const getCourseCategories = async (): Promise<CourseCategoryOption[]> => {
  try {
    const res = await apiClient.get(`${url}/categories`);
    if (res.status === 200 && Array.isArray(res.data)) {
      return res.data;
    }
    return [];
  } catch (error) {
    return [];
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
  } catch (error: any) {
    if (error?.response?.status === 404) {
      throw new NotFoundError("Course not found");
    }
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
  getCoursesPage,
  getCourseCategories,
  getCourseById,
  updateCourse,
  deleteCourse,
};
