import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "@/components/modals/formModal";
import InputField from "../common/InputField";
import { useHandleUnit } from "@/hooks/handleMutations/handleUnit";

type CreateUnitModalProps = {
  courseID: string;
  refetchUnits?: () => void;
  setNewUnitID: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const unitSchema = yup.object().shape({
  courseID: yup.string().required("Course ID is required"),
  unitName: yup.string().required("Unit Name is required"),
  description: yup.string().required("Description is required"),
});

const formFields = [
  { label: "Course ID", id: "courseID", placeholder: "", disabled: false },
  { label: "Unit Name", id: "unitName", placeholder: "Unit Name", disabled: false },
  { label: "Description", id: "description", placeholder: "Description", disabled: false },
];

const CreateUnitModal: React.FC<CreateUnitModalProps> = ({
  courseID, refetchUnits, setNewUnitID, isOpen, setIsOpen
}) => {
  const { handleCreateUnit } = useHandleUnit({courseID, refetchUnits, setNewUnitID});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(unitSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      courseID: courseID || "",
      unitName: "",
      description: "",
    },
  });

  const onClose = () => {
      setIsOpen(false);
      reset();
  };

  return (
    <Modal modelTitle="Create New Unit" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit((data) => { handleCreateUnit(data); onClose(); })} className="space-y-6">
        {formFields.map(({ label, id, placeholder, disabled }) => (
          <label key={id} className="block">
            <InputField
              label={label}
              id={id}
              type="text"
              register={register}
              value={id === "courseID" ? courseID || "" : ""}
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

export default CreateUnitModal;