// import { ButtonForm } from "@/components/common/buttons/button";
// import { useMutation } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { updateProfile } from "@/services/user";
// import { changeProfileSchema } from "@/lib/validation/settingsSchema";
// import { AxiosError } from "axios";
// import { useEffect } from "react";
// import { UserEntity } from "@/domain/user.entity";
// import { useUser } from "@/hooks/useUser";

// const inputStyle =
//   "text-black text-base w-full px-5 py-2 rounded-lg border dark:border-stone-400 caret-dodger-blue-500 focus:outline-dodger-blue-500";

export const ProfileFrom: React.FC = () => {
//   const { data: user } = useUser();

//   const updateProfileMutation = useMutation({
//     mutationKey: ["updateProfile"],
//     mutationFn: updateProfile,
//   });

//   const {
//     register,
//     setValue,
//     handleSubmit,
//     formState: { dirtyFields, errors },
//   } = useForm<UserEntity>({
//     defaultValues: { ...user },
//     resolver: yupResolver(changeProfileSchema),
//     mode: "all",
//     reValidateMode: "onBlur",
//   });

//   useEffect(() => {
//     if (user) {
//       const { name ,email, phoneNumber, biography } = user;
//       setValue("name", name);
//       setValue("email", email);
//       setValue("phoneNumber", phoneNumber);
//       setValue("biography", biography);
//     }
//   }, [user, setValue]);

  return (
    <></>
//     <form
//       className="grid grid-cols-2 max-md:grid-cols-1 gap-x-8 gap-y-6"
//       onSubmit={handleSubmit((formData) => updateProfileMutation.mutate(formData))}
//     >
//       {[
//         { id: "name", label: "Full Name", type: "text" },
//         { id: "email", label: "Email", type: "text" },
//         { id: "phoneNumber", label: "Phone Number", type: "text", pattern: "^(0|\\+84)(3[2-9]|5[6|8|9]|7[0-9]|8[1-9]|9[0-9])\\d{7}$" },
//       ].map(({ id, label, type, pattern }) => (
//         <div key={id} className="flex flex-col gap-2 relative">
//           <label htmlFor={id} className="font-semibold text-base">
//             {label}
//           </label>
//           <input
//             {...register(id)}
//             id={id}
//             type={type}
//             pattern={pattern}
//             className={`${inputStyle} ${errors[id] ? "border-2 border-red-500 focus:outline-red-500" : ""}`}
//             placeholder={label}
//           />
//           {errors[id] && (
//             <span className="text-red-500 text-sm absolute -bottom-5">
//               {errors[id]?.message}
//             </span>
//           )}
//         </div>
//       ))}
//       <div className="flex flex-col gap-2 col-span-2">
//         <label htmlFor="biography" className="font-semibold text-base">
//           Biography
//         </label>
//         <textarea
//           {...register("biography")}
//           id="biography"
//           className={`${inputStyle} min-h-20`}
//           minLength={35}
//         />
//       </div>
//       {updateProfileMutation.error && updateProfileMutation.error instanceof AxiosError && (
//         <div className="px-5 py-3 text-red-500 bg-red-200 border-2 border-red-500 font-medium rounded-lg">
//           <p>
//             {updateProfileMutation.error?.response?.data.ERROR ||
//               updateProfileMutation.error?.response?.data.message}
//           </p>
//         </div>
//       )}
//       <ButtonForm
//         align="self-left mt-8 col-start-1"
//         disabled={
//           !(Object.keys(dirtyFields).length > 0) ||
//           Object.keys(errors).length > 0
//         }
//       >
//         Update Info
//       </ButtonForm>
//     </form>
  );
};
