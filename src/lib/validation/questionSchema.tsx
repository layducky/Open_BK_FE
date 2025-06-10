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

  correctAns: yup
    .string()
    .oneOf(["A", "B", "C", "D"], "Correct Ans must be one of A, B, C, or D")
    .required("Correct Ans is required"),

  ansA: yup
    .string()
    .required("Ans A is required"),

  ansB: yup
    .string()
    .required("Ans B is required"),

  ansC: yup
    .string()
    .required("Ans C is required"),

  ansD: yup
    .string()
    .required("Ans D is required"),
});

