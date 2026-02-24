import { apiClient, apiClientWithAuth } from "@/services/apiClient";

const url = `/course/collab/unit/`;
const publicUrl = `/course/public/`;

// Tạo mới một unit
const createUnit = async (unitData: any) => {
  try {
    const { courseID, unitName, description, numericalOrder } = unitData;
    const res = await apiClientWithAuth.post(`${url}${courseID}`, {
      numericalOrder,
      unitName,
      description,
    });
    if (res.status !== 201) {
      throw new Error(res.data?.message || "Failed to create unit");
    }
    return res.data;
  } catch (error) {
    return { error };
  }
};
const getAllUnits = async (courseID?: string) => {
  if (!courseID) return [];
  const res = await apiClientWithAuth.get(`${url}all/${courseID}`);
  if (res.status === 200) return res.data || [];
  const err = new Error((res as any)?.data?.message || "Failed to load units") as Error & { response?: any };
  err.response = res;
  throw err;
};

const getPublicUnits = async (courseID?: string) => {
  if (!courseID) return [];
  const res = await apiClient.get(`${publicUrl}${courseID}/units`);
  if (res.status === 200) return res.data || [];
  const err = new Error((res as any)?.data?.message || "Failed to load units") as Error & { response?: any };
  err.response = res;
  throw err;
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
//   numQuests: number
// ) => {
//   try {
//     const res = await apiClient.put(`${url}/${unitID}`, {
//       unitName,
//       description,
//       numericalOrder,
//       numQuests,
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
    const res = await apiClientWithAuth.delete(`${url}/${unitID}`);

    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(res.data?.message || "Failed to delete unit");
    }
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export {
  createUnit,
  getAllUnits,
  getPublicUnits,
  // getUnitById,
  // updateUnit,
  deleteUnit,
};
