// import React, {useState} from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import Modal from "@/components/modals/courseModal";
// import InputField from "../common/InputField";
// import { useUnitMutations } from "@/hooks/mutations/useUnitMutation";

// type CreateUnitModalProps = {
//   courseID: string;
//   onUnitCreated?: () => void;
//   refetchUnits?: () => void;
//   isOpen: boolean;
//   setIsOpen: (isOpen: boolean) => void;
// };

// const unitSchema = yup.object().shape({
//   courseID: yup.string().required("Course ID is required"),
//   unitName: yup.string().required("Unit Name is required"),
//   description: yup.string().required("Description is required"),
//   numericalOrder: yup
//       .number()
//       .typeError("Numerical Order must be a number")
//       .required("Numerical Order is required"),
// });


// const formFields = [
//   { label: "Course ID", id: "courseID", placeholder: "", disabled: false },
//   { label: "Unit Name", id: "unitName", placeholder: "Unit Name", disabled: false },
//   { label: "Description", id: "description", placeholder: "Description", disabled: false },
//   { label: "NumericalOrder", id: "numericalOrder", placeholder: "NumericalOrder", disabled: false },
// ];

// export const CreateTestModal: React.FC<CreateUnitModalProps> = ({
//   courseID, onUnitCreated, refetchUnits, isOpen, setIsOpen
// }) => {


//   const { createMutation } = useUnitMutations(courseID);

//   const { deleteMutation } = useUnitMutations(unitID);
//   const handleDeleteUnit = (unitID: string) => {
//     if (confirm("Are you sure you want to delete this unit?")) {
//       deleteMutation.mutate(unitID, {
//         onSuccess: () => {
//           refetchUnits?.();
//           setOpen(false);
//         },
//       });
//     }
//   };

//   const onSubmit = (data: any) => {
//     createMutation.mutate(
//       { ...data, courseID},
//       {
//         onSuccess: () => {
//           refetchUnits?.();
//           onUnitCreated?.();
//           onClose();
//         },
//       }
//     );
//   };

//   const onClose = () => {
//     setIsOpen(false);
//     reset();
//   };

//   return (
//     <Modal modelTitle="Upload New Test" isOpen={isOpen} onClose={onClose}>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {formFields.map(({ label, id, placeholder, disabled }) => (
//           <label key={id} className="block">
//             <InputField
//               label={label}
//               id={id}
//               type="text"
//               register={register}
//               value={id === "courseID" ? courseID || "" : ""}
//               placeholder={placeholder}
//               error={errors[id as keyof typeof errors]}
//               disabled={disabled}
//             />
//           </label>
//         ))}
//         <div className="flex justify-center">
//           <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
//             Submit
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// };
