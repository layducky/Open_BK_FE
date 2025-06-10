import { apiClientWithAuth } from "@/services/apiClient";

const url = `${process.env.NEXT_PUBLIC_API_URL}/course/collab`;

const createCourse = async (courseData: any) => {
  try {
    const { authorID, courseName, image, category, description, price } = courseData;

    const { data } = await apiClientWithAuth.post(`${url}`, {
      authorID,
      courseName,
      image,
      category,
      description,
      price,
    });

    return data;
  } catch (error: any) {
    console.error("Create Course Error:", error);
    return error.response ? error.response.data : { message: "Network error" };
  }
};

const getAllOwnedCourses = async (authorID: string) => {
  try {
    const { data } = await apiClientWithAuth.get(`${url}`);
    return data;
  } catch (error: any) {
    console.error("Get All Owned Courses Error:", error);
    return error.response ? error.response.data : { message: "Network error" };
  }
};

const getAllLearners = async (courseID: string) => {
  try {
    const { data } = await apiClientWithAuth.get(`${url}/learners/${courseID}`);
    return data;
  } catch (error: any) {
    console.error("Get All Learners Error:", error);
    return error.response ? error.response.data : { message: "Network error" };
  }
};

const updateCourse = async (courseID: string, courseData: any) => {
  try {
    const { courseName, image, category, description, price } = courseData;

    const { data } = await apiClientWithAuth.put(`${url}/${courseID}`, {
      courseName,
      image,
      category,
      description,
      price,
    });

    return data;
  } catch (error: any) {
    console.error("Update Course Error:", error);
    return error.response ? error.response.data : { message: "Network error" };
  }
};

const deleteCourse = async (courseID: string) => {
  try {
    const { data } = await apiClientWithAuth.delete(`${url}/${courseID}`);
    return data;
  } catch (error: any) {
    console.error("Delete Course Error:", error);
    return error.response ? error.response.data : { message: "Network error" };
  }
};

const deleteLearnerFromCourse = async (learnerID: string, courseID: string) => {
  try {
    const { data } = await apiClientWithAuth.delete(
      `${url}/remove-learner/${courseID}/${learnerID}`
    );
    return data;
  } catch (error: any) {
    console.error("Delete Learner From Course Error:", error);
    return error.response ? error.response.data : { message: "Network error" };
  }
};

export {
  createCourse,
  getAllOwnedCourses,
  getAllLearners,
  updateCourse,
  deleteCourse,
  deleteLearnerFromCourse,
};
