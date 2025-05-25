import * as yup from "yup";

export const questionSchema = yup.object().shape({
  numericalOrder: yup
    .number()
    .required("Numerical Order is required")
    .min(0, "Numerical Order must be greater than or equal to 0"),

  content: yup
    .string()
    .required("Content is required")
    .min(5, "Content must be at least 5 characters long"),

  explanation: yup
    .string()
    .required("Explanation is required"),

  correctAnswer: yup
    .string()
    .oneOf(["A", "B", "C", "D"], "Correct Answer must be one of A, B, C, or D")
    .required("Correct Answer is required"),

  answerA: yup
    .string()
    .required("Answer A is required"),

  answerB: yup
    .string()
    .required("Answer B is required"),

  answerC: yup
    .string()
    .required("Answer C is required"),

  answerD: yup
    .string()
    .required("Answer D is required"),
});

