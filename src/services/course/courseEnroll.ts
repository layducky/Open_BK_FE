import { apiClientWithAuth } from "@/services/apiClient";

const url = `/course/enroll`;

const enrollCourse = async (learnerID: string, courseID: string) => {
  try {
    const { data  } = await apiClientWithAuth.post(`${url}/${courseID}`, {});

    return data;
  } catch (error: any) {
    return error;
  }
};

const getAllEnrolledCourses = async (learnerID: string) => {
  try {
    const res = await apiClientWithAuth.get(`${url}`);

    if (res.status === 200) {
      return res.data;
    } else {
      return res.data;
    }
  } catch (error) {
    throw error; 
  }
};

const getEnrolledCourseById = async (courseID: number) => {
  try {
    const res = await apiClientWithAuth.get(
      `${url}/${courseID}`
    );

    if (res.status === 200) {
      return res.data;
    } else {
      console.error("Failed to fetch course by ID", res.data);
      return res.data;
    }
  } catch (error) {
    console.error("Get course by ID error", error);
    return { message: "Network error" };
  }
};

// const updateEnrolledCourse = async (
//   courseName: string,
//   description: string
// ) => {
//   try {
//     const res = await apiClientWithAuth.put(
//       `${url}/${id}`,
//       {
//         courseName,
//         description,
//       }
//     );

//     if (res.status === 200) {
//       console.log("Course updated successfully", res.data);
//       return res.data;
//     } else {
//       console.error("Failed to update course", res.data);
//       return res.data;
//     }
//   } catch (error) {
//     console.error("Update course error", error);
//     return { message: "Network error" };
//   }
// };

const deleteEnrolledCourse = async (learnerID: string, courseID: string) => {
  try {
    const res = await apiClientWithAuth.delete(
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

export {
  enrollCourse,
  getAllEnrolledCourses,
  getEnrolledCourseById,
  // updateEnrolledCourse,
  deleteEnrolledCourse
};
