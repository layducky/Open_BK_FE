import { apiClient, apiClientWithAuth } from "@/services/apiClient";

const url = `${process.env.NEXT_PUBLIC_API_URL}/course/content/unit/`;

// Tạo mới một unit
const createUnit = async ( unitData: any ) => {
  try {
    const { courseID, unitName, description, numericalOrder } = unitData;
    const res = await apiClientWithAuth.post(`${url}${courseID}`, {
      numericalOrder,
      unitName,
      description,
    });
    return res.data;

  } catch (error) {
    return { message: "Network error" };
  }
};

const getAllUnits = async ( courseID: string) => {
  try {
    const res = await apiClient.get(`${url}all/${courseID}`);

    return res.data;

  } catch (error) {
    return { message: "Network error" };
  }
};

// const getUnitById = async (unitID?: string) => {
//   if (!unitID) return {};

//   try {
//     const res = await apiClient.get(`${url}/${unitID}`);

//     if (res.status === 200) {
//       return res.data;
//     } else {
//       return res.data;
//     }
//   } catch (error) {
//     return { message: "Network error" };
//   }
// };

// const updateUnit = async (
//   unitID: string,
//   unitName: string,
//   description: string,
//   numericalOrder: number,
//   numberOfQuestions: number
// ) => {
//   try {
//     const res = await apiClient.put(`${url}/${unitID}`, {
//       unitName,
//       description,
//       numericalOrder,
//       numberOfQuestions,
//     });

//     if (res.status === 200) {
//       return res.data;
//     } else {
//       return res.data;
//     }
//   } catch (error) {
//     return { message: "Network error" };
//   }
// };

const deleteUnit = async (unitID: string) => {
  try {
    const res = await apiClient.delete(`${url}/${unitID}`);

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
  createUnit,
  getAllUnits,
  // getUnitById,
  // updateUnit,
  deleteUnit,
};
