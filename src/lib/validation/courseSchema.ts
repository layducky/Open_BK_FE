import * as yup from "yup";

export const courseSchema = yup.object().shape({
  courseName: yup
    .string()
    .required("Course Name is required")
    .min(3, "Course Name must be at least 3 characters long"),

  description: yup
    .string()
    .required("Description is required"),

  category: yup
    .string()
    .required("Category is required")
    .oneOf(["MATH", "ENGLISH", "CODE", "ART", "NONE"], "Category must be selected from the list"),

  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price must be 0 or greater (no negative values)")
    .typeError("Price must be a number"),

  image: yup
    .mixed(),
});
