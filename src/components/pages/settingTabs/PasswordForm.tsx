"use client";
import { ButtonForm } from "@/components/common/buttons/button";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@/services/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { changePasswordSchema } from "@/lib/validation/settingsSchema";
import { AxiosError } from "axios";

const inputStyle =
  "text-black text-base w-full px-5 py-2 rounded-lg border dark:border-stone-400 caret-dodger-blue-500 focus:outline-dodger-blue-500";

export const PasswordForm: React.FC = () => {
  const mutation = useMutation({
    mutationKey: ["updatePassword"],
    mutationFn: (data: any) => {
      return updatePassword(data.password, data.confirmNewPassword);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  return (
    <form
      className={`flex flex-col gap-6`}
      onSubmit={handleSubmit((formData) => {
        mutation.mutate(formData);
      })}
    >
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="old-pass" className="font-semibold text-base">
          Current Password
        </label>
        <input
          {...register("currentPassword")}
          id="old-pass"
          type="password"
          className={`${inputStyle} ${
            errors.currentPassword
              ? " border-2 border-red-500 focus:outline-red-500"
              : ""
          }`}
          placeholder="Current Password"
        />
        <span className="text-red-500 text-sm absolute -bottom-5">
          {errors.currentPassword?.message}
        </span>
      </div>
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="new-pass" className="font-semibold text-base">
          New Password
        </label>
        <input
          {...register("newPassword")}
          id="pass"
          type="password"
          className={`${inputStyle} ${
            errors.newPassword
              ? " border-2 border-red-500 focus:outline-red-500"
              : ""
          }`}
          placeholder="New Password"
        />
        <span className="text-red-500 text-sm absolute -bottom-5">
          {errors.newPassword?.message}
        </span>
      </div>
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="retype" className="font-semibold text-base">
          Re-Typed New Password
        </label>
        <input
          {...register("confirmNewPassword")}
          id="pass"
          type="password"
          className={`${inputStyle} ${
            errors.confirmNewPassword
              ? " border-2 border-red-500 focus:outline-red-500"
              : ""
          }`}
          placeholder="Re-Typed New Password"
        />
        <span className="text-red-500 text-sm absolute -bottom-5">
          {errors.confirmNewPassword?.message}
        </span>
      </div>
      {mutation.error && mutation.error instanceof AxiosError && (
        <div className="px-5 py-3 text-red-500 bg-red-200 border-2 border-red-500 font-medium rounded-lg">
          <p>
            {mutation.error?.response?.data.ERROR ||
              mutation.error?.response?.data.message}
          </p>
        </div>
      )}
      <ButtonForm align="self-left mt-8">Update Info</ButtonForm>
    </form>
  );
};
