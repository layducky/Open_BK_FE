"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "@/components/common/InputField";
import { ButtonForm } from "@/components/common/buttons/button";
import { signIn } from "next-auth/react";
import AuthFormLayout from "@/components/auth/AuthFormLayout";

const loginSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});
type LoginFormInputs = yup.InferType<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    const callbackUrl = window.location.origin + "/";

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: callbackUrl,
        redirect: true,
      });

      if (!result?.ok) {
        setError("Invalid email or password");
      }
        
    } catch (error) {
        console.error("NextAuth signIn failed with exception:", error);
        setError("A system error occurred during login. Please try again.");
    }
  };

  return (
    <AuthFormLayout
      title="Are you ready to join?"
      redirectMessage="Don't have an account?"
      redirectHref="/auth/register"
      redirectText="Sign Up"
    >
      <div className="flex flex-col md:gap-5">
        <InputField
          label="Email"
          id="email"
          register={register}
          error={errors.email}
          placeholder="i.e: youremail@gmail.com"
          disabled={false}
        />
        <InputField
          label="Password"
          id="password"
          type="password"
          register={register}
          error={errors.password}
          placeholder="i.e: mypassword"
          disabled={false}
        />
      </div>

      {error && (
        <div className="px-5 py-3 text-red-500 bg-red-200 border-2 border-red-500 font-medium rounded-lg">
          <p>{error}</p>
        </div>
      )}

      <ButtonForm onClick={handleSubmit(onSubmit)} className="w-full">
        Log in
      </ButtonForm>
    </AuthFormLayout>
  );
}
