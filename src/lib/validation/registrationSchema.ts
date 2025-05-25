import * as yup from "yup";
import {
  nameValidation,
  emailValidation,
  passwordValidation,
  confirmPasswordValidation,
} from "@/lib/validation/validationRules";

export const registrationSchema = yup.object().shape({
  ...nameValidation,
  ...emailValidation,
  ...passwordValidation,
  confirmPassword: confirmPasswordValidation("password"), // Confirm mật khẩu trùng với password
});
