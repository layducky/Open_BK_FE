"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { registrationSchema } from "@/lib/validation/registrationSchema";
import { signUp } from "@/services/auth/auth";
import AuthFormLayout from "@/components/auth/AuthFormLayout";
import InputField from "@/components/common/InputField";
import { ButtonForm } from "@/components/common/buttons/button";
import { signIn } from "next-auth/react";

const fields = [
  { label: "First Name", id: "firstName", type: "text", placeholder: "i.e: Kevin" },
  { label: "Last Name", id: "lastName", type: "text", placeholder: "i.e: Cena" },
  { label: "Email", id: "email", type: "email", placeholder: "i.e: youremail@gmail.com" },
  { label: "Password", id: "password", type: "password", placeholder: "i.e: mypassword" },
  { label: "Confirm Password", id: "confirmPassword", type: "password", placeholder: "i.e: mypassword" },
];

export default function RegisterPage() {

  const { mutate, error } = useMutation({
    mutationFn: async (data: any) => {
      await signUp({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
      });
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/",
        redirect: true,
      });
      if (!result?.ok) {
        throw new Error("Invalid email or password");
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

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
              disabled={false}
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
            disabled={false}
          />
        ))}
      </div>

      {error && (
        <div className="px-5 py-3 text-red-500 bg-red-200 border-2 border-red-500 font-medium rounded-lg">
          <p>{error.message}</p>
        </div>
      )}

      <ButtonForm onClick={handleSubmit((data) => mutate(data))} className="w-full">
        Sign Up
      </ButtonForm>
    </AuthFormLayout>
  );
}
