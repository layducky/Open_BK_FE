"use client";

import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Modal from "@/components/modals/formModal";
import { questionSchema } from "@/lib/validation/questionSchema";
import InputField from "../InputField";
import { useQuestionMutations } from "@/hooks/mutations/useQuestionMutations";
import GradientButton from "@/components/common/buttons/GradientButton";
import { useTestMutations } from "@/hooks/mutations/useTestMutation";

interface CreateQuesBtnProps {
  testID: string;
  onQuestionCreated?: () => void;
  refetchQuestions?: () => void;
}

export const CreateQuesBtn: React.FC<CreateQuesBtnProps> = ({ testID, onQuestionCreated, refetchQuestions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { createMutation } = useQuestionMutations(testID);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(questionSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
  });

  const onClose = () => {
    setIsOpen(false);
    reset();
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  const onSubmit = (data: any) => {
    createMutation.mutate(
      { ...data, testID, questionID: "" },
      {
        onSuccess: () => {
          refetchQuestions?.(); 
          onQuestionCreated?.();
          onClose();
        },
        onError: (error: any) => {
          console.error("Error creating question:", error);
        },
      }
    );
  };

  const formFields = [
    { label: "Test ID*", type: "text", id: "testID", placeholder: "", disabled: true },
    { label: "Content*", type: "text", id: "content", placeholder: "Content", disabled: false },
    { label: "Explanation*", type: "text", id: "explanation", placeholder: "Explanation", disabled: false },
    {
      label: "Correct Answer*",
      type: "select",
      id: "correctAns",
      placeholder: "Select Correct Answer",
      disabled: false,
      options: [
        { value: "A", label: "A" },
        { value: "B", label: "B" },
        { value: "C", label: "C" },
        { value: "D", label: "D" },
      ],
    },
    { label: "Answer A*", type: "text", id: "ansA", placeholder: "Enter Answer A", disabled: false },
    { label: "Answer B*", type: "text", id: "ansB", placeholder: "Enter Answer B", disabled: false },
    { label: "Answer C*", type: "text", id: "ansC", placeholder: "Enter Answer C", disabled: false },
    { label: "Answer D*", type: "text", id: "ansD", placeholder: "Enter Answer D", disabled: false },
  ];

  return (
    <>
      <GradientButton onClick={handleClick} text="Create New Question" />
      <Modal modelTitle="Create New Question" isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {formFields.map(({ label, id, placeholder, disabled, type, options }) => (
            <label key={id} className="block">
              <InputField
                label={label}
                id={id}
                type={type}
                register={register}
                value={id === "testID" ? testID : undefined}
                placeholder={placeholder}
                error={errors[id as keyof typeof errors]}
                disabled={disabled}
                options={options}
              />
            </label>
          ))}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

interface DeleteQuesBtnProps {
  questionID: string;
  testID: string;
  refetchQuestions?: () => void;
}

export const DeleteQuesBtn: React.FC<DeleteQuesBtnProps> = ({ questionID, testID, refetchQuestions }) => {
  const { deleteMutation } = useQuestionMutations(testID);

  const handleClick = () => {
    if (confirm("Are you sure you want to delete this question?")) {
      deleteMutation.mutate(questionID, {
        onSuccess: () => {
          refetchQuestions?.();
        },
      });
    }
  };

  return (
    <GradientButton
      onClick={handleClick}
      text="Delete"
      disabled={deleteMutation.isPending}
    />
  );
};

interface SubmitTestBtnProps {
  testID: string;
  anss: Record<string, string>;
}

// export const SubmitTestBtn: React.FC<SubmitTestBtnProps> = ({ testID, anss }) => {
//   const { submitAnssMutation } = useTestMutations(testID);
  
//   const handleSubmitAnss = () => {
//     console.log("Submitted Anss:", anss);
    
//     submitAnssMutation.mutate({
//       testID: testID,
//       anss: anss,
//     });
//   };

//   return (
//     <GradientButton onClick={handleSubmitAnss} text="Submit" disabled={submitAnssMutation.isPending} />
//   );
// }