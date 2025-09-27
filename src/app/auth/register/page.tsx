"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "@/lib/validation/registrationSchema"; // Import schema của bạn
import { signUp } from "@/services/auth/auth"; // Import hàm đăng ký
import AuthFormLayout from "@/components/auth/AuthFormLayout";
import InputField from "@/components/common/InputField";
import { ButtonForm } from "@/components/common/buttons/button";
import { signIn } from "next-auth/react";

// Định nghĩa kiểu dữ liệu nhập vào từ schema
type RegistrationFormInputs = yup.InferType<typeof registrationSchema>; 

const fields = [
  { label: "First Name", id: "firstName", type: "text", placeholder: "i.e: Kevin" },
  { label: "Last Name", id: "lastName", type: "text", placeholder: "i.e: Cena" },
  { label: "Email", id: "email", type: "email", placeholder: "i.e: youremail@gmail.com" },
  { label: "Password", id: "password", type: "password", placeholder: "i.e: mypassword" },
  { label: "Confirm Password", id: "confirmPassword", type: "password", placeholder: "i.e: mypassword" },
];

export default function RegisterPage() {
  // Sử dụng useState để quản lý lỗi chung (thay thế cho error từ useMutation)
  const [error, setError] = useState<string | null>(null); 
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormInputs>({ // Sử dụng kiểu dữ liệu đã định nghĩa
    resolver: yupResolver(registrationSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: RegistrationFormInputs) => {
    setError(null);
    setIsLoading(true);

    const callbackUrl = window.location.origin + "/";

    try {
      const res = await signUp({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
      });

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: callbackUrl,
        redirect: true,
      });

      if (result?.error) {
        setError("Registration successful, but automatic login failed. Please try logging in manually.");
      } else if (result?.ok) {
        window.location.href = result.url || callbackUrl;
      }
      
    } catch (apiError) {
      const errorMessage = apiError instanceof Error ? apiError.message : "Registration failed. Please check your details and try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormLayout
      title="Create Your Account"
      redirectMessage="Already have an account?"
      redirectHref="/auth/login"
      redirectText="Login"
    >
        <div className="flex flex-col gap-2 md:gap-5">
          <div className="flex w-full gap-2 flex-wrap sm:flex-nowrap">
            {fields.slice(0, 2).map((field) => (
              <InputField
                key={field.id}
                label={field.label}
                id={field.id}
                type={field.type}
                register={register}
                error={errors[field.id as keyof typeof errors]}
                placeholder={field.placeholder}
                disabled={isLoading} 
              />
            ))}
          </div>
          {fields.slice(2).map((field) => (
            <InputField
              key={field.id}
              label={field.label}
              id={field.id}
              type={field.type}
              register={register}
              error={errors[field.id as keyof typeof errors]}
              placeholder={field.placeholder}
              disabled={isLoading} 
            />
          ))}
        </div>

        {error && (
          <div className="px-5 py-3 text-red-500 bg-red-200 border-2 border-red-500 font-medium rounded-lg">
            <p>{error}</p>
          </div>
        )}

        <ButtonForm onClick={handleSubmit(onSubmit)} className="w-full" disabled={isLoading}>
          {isLoading ? "Signing Up..." : "Sign Up"}
        </ButtonForm>
    </AuthFormLayout>
  );
}