
import { apiClientWithAuth } from "@/services/apiClient";

const url = `/course/collab/question/`;

const createQuestion = async (questionData: any) => {
  try {
    const {
      unitID,
      numericalOrder,
      content,
      explanation,
      correctAns,
      ansA,
      ansB,
      ansC,
      ansD,
    } = questionData;

    const res = await apiClientWithAuth.post(`${url}${unitID}`, {
      numericalOrder,
      content,
      explanation,
      correctAns,
      ansA,
      ansB,
      ansC,
      ansD,
    });

    return res.data;
  } catch (error: any) {
    console.error("Error creating question:", error.message || error);
    return { message: "Network error" };
  }
};

const getAllQuestions = async (unitID: string) => {
  if (!unitID) {
    return [];
  }

  try {
    const res = await apiClientWithAuth.get(`${url}all/${unitID}`);
    return res.data;
  } catch (error: any) {
    console.error("Error fetching all questions:", error.message || error);
    return { message: "Network error" };
  }
};


const getQuestionById = async (questionID: string) => {
  if (!questionID) {
    return {};
  }
  try {
    const res = await apiClientWithAuth.get(`${url}${questionID}`);
    return res.data;
  } catch (error: any) {
    console.error("Error fetching question by ID:", error.message || error);
    return { message: "Network error" };
  }
};

const updateQuestion = async (
  questionID: string,
  content: string,
  explanation: string,
  correctAns: string,
  ansA: string,
  ansB: string,
  ansC: string,
  ansD: string
) => {
  try {
    const res = await apiClientWithAuth.put(`${url}${questionID}`, {
      content,
      explanation,
      correctAns,
      ansA,
      ansB,
      ansC,
      ansD,
    });

    return res.data;
  } catch (error: any) {
    console.error("Error updating question:", error.message || error);
    return { message: "Network error" };
  }
};

const deleteQuestion = async (questionID: string) => {
  try {
    const res = await apiClientWithAuth.delete(`${url}${questionID}`);
    return res.data;
  } catch (error: any) {
    return { message: "Network error" };
  }
};

export {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
