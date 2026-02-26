import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "@/components/modals/formModal";
import InputField from "../common/InputField";
import { useHandleTest } from "@/hooks/handleMutations/handleTest";

type CreateTestModalProps = {
  unitID: string;
  refetchTests?: () => void;
  setNewTestID: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const testSchema = yup.object().shape({
  testName: yup.string().required("Test Name is required"),
  description: yup.string().required("Description is required"),
  duration: yup
      .number()
      .typeError("Duration must be a number")
      .required("Duration is required"),
});

const formFields = [
  { label: "Test Name", id: "testName", placeholder: "Test Name", disabled: false },
  { label: "Description", id: "description", placeholder: "Description", disabled: false },
  { label: "Duration (m)", id: "duration", placeholder: "Duration", disabled: false },
];

const CreateTestModal: React.FC<CreateTestModalProps> = ({
  unitID, refetchTests, setNewTestID, isOpen, setIsOpen
}) => {
  const { handleCreateTest } = useHandleTest({unitID, refetchTests, setNewTestID, setIsOpen});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(testSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      testName: "",
      description: "",
      duration: 15,
    },
  });

  const onClose = () => {
      setIsOpen(false);
      reset();
  };

  return (
    <Modal modelTitle="Create New Test" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit((data) => { handleCreateTest({ ...data, unitID: unitID || "" }); onClose(); })} className="space-y-6">
        {formFields.map(({ label, id, placeholder, disabled }) => (
          <label key={id} className="block">
            <InputField
              label={label}
              id={id}
              type={id === "duration" ? "number" : "text"}
              register={register}
              placeholder={placeholder}
              error={errors[id as keyof typeof errors]}
              disabled={disabled}
            />
          </label>
        ))}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTestModal;