import * as yup from "yup";
import {
  passwordValidation,
  confirmPasswordValidation,
  emailValidation,
  nameValidation,
} from "@/lib/validation/validationRules";

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current Password is required"),
  newPassword: passwordValidation.password,
  confirmNewPassword: confirmPasswordValidation("newPassword"),
});

export const changeProfileSchema = yup.object().shape({
  ...nameValidation,
  ...emailValidation,
  biography: yup.string(),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])\d{7}$/,
      "Invalid phone number"
    ),
});
