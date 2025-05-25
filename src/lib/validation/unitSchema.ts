import * as yup from "yup";

export const unitSchema = yup.object().shape({
  unitName: yup
    .string()
    .required("Unit Name is required")
    .min(3, "Unit Name must be at least 3 characters long"),

  description: yup
    .string()
    .required("Description is required"),

  numericalOrder: yup
    .number()
    .required("Numerical Order is required")
    .min(0, "Numerical Order must be greater than or equal to 0"),

});
