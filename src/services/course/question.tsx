
import { apiClientWithAuth } from "@/services/apiClient";

const url = `${process.env.NEXT_PUBLIC_API_URL}/course/content/question/`;

const createQuestion = async (questionData: any) => {
  try {
    const {
      unitID,
      numericalOrder,
      content,
      explanation,
      correctAnswer,
      answerA,
      answerB,
      answerC,
      answerD,
    } = questionData;

    const res = await apiClientWithAuth.post(`${url}${unitID}`, {
      numericalOrder,
      content,
      explanation,
      correctAnswer,
      answerA,
      answerB,
      answerC,
      answerD,
    });

    return res.data;
  } catch (error: any) {
    console.error("Error creating question:", error.message || error);
    return { message: "Network error" };
  }
};

const getAllQuestions = async (unitID: string) => {
  try {
    const res = await apiClientWithAuth.get(`${url}all/${unitID}`);
    return res.data;
  } catch (error: any) {
    console.error("Error fetching all questions:", error.message || error);
    return { message: "Network error" };
  }
};


const getQuestionById = async (questionID: string) => {
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
  correctAnswer: string,
  answerA: string,
  answerB: string,
  answerC: string,
  answerD: string
) => {
  try {
    const res = await apiClientWithAuth.put(`${url}${questionID}`, {
      content,
      explanation,
      correctAnswer,
      answerA,
      answerB,
      answerC,
      answerD,
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
