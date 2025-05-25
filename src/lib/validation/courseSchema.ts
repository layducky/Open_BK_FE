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
    .required("Category is required"),

  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price must be greater than or equal to 0"),

  image: yup
    .mixed(),
});
