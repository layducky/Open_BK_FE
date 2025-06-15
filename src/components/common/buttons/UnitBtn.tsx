"use client";

import { createUnit, deleteUnit } from "@/services/course/unit";
import { useState, useEffect, useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Modal from "@/components/modals/courseModal";
import { useMutation } from "@tanstack/react-query";
import { unitSchema } from "@/lib/validation/unitSchema";
import { useRouter } from "next/navigation";
import InputField from "../InputField";
import GradientButton from "./GradientButton";
import { useUnitMutations } from "@/hooks/useUnitMutation";


interface CreateUnitBtnProps {
  courseID: string;
  onUnitCreated?: () => void;
  refetchUnits?: () => void;
}


export function CreateUnitBtn({ courseID, onUnitCreated, refetchUnits }: CreateUnitBtnProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { createMutation } = useUnitMutations(courseID);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(unitSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {},
  });

  const onClose = () => {
    setIsOpen(false);
    reset();
  };

  const onSubmit = (data: any) => {
    createMutation.mutate(
      { ...data, courseID},
      {
        onSuccess: () => {
          refetchUnits?.();
          onUnitCreated?.();
          onClose();
        },
      }
    );
  };


  const formFields = [
    { label: "Course ID", id: "courseID", placeholder: "", disabled: false },
    { label: "Unit Name", id: "unitName", placeholder: "Unit Name", disabled: false },
    { label: "Description", id: "description", placeholder: "Description", disabled: false },
    { label: "NumericalOrder", id: "numericalOrder", placeholder: "NumericalOrder", disabled: false },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center p-0.5 mb-2 me-2 text-sm font-medium text-black rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
      >
        <span className="relative px-2 md:px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          ➕ New Unit
        </span>
      </button>
      <Modal modelTitle="Create New Unit" isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export const ViewTestButton: React.FC<{ unitID: string }> = ({ unitID }) => {
    const router = useRouter();
    const handleClick = () => {
        if(unitID) router.push(`/unit/${unitID}/attempt`);
    };

    return (
        // <div>
            <GradientButton onClick={handleClick} text="🔎 Test"/>
        // </div>
    );
};

interface ActionDropdownProps {
  unitID: string;
  refetchUnits?: () => void;
}

export default function ActionDropdown({unitID, refetchUnits} : ActionDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { deleteMutation } = useUnitMutations(unitID);
  const handleDeleteUnit = (unitID: string) => {
    if (confirm("Are you sure you want to delete this unit?")) {
      deleteMutation.mutate(unitID, {
        onSuccess: () => {
          refetchUnits?.();
          setOpen(false);
        },
      });
    }
  };

  const options = [
    { label: "Edit description", action: () => {}, color: "hover:bg-gray-100", textColor: "hover:text-black-800" },
    { label: "Upload TEST", action: () => {}, color: "hover:bg-green-100", textColor: "hover:text-black-800" },
    { label: "Upload LINK", action: () => {}, color: "hover:bg-blue-100", textColor: "hover:text-black-800" },
    { label: "Upload FILE", action: () => {}, color: "hover:bg-orange-100", textColor: "hover:text-black-800" },
    { label: "Upload VIDEO", action: () => {}, color: "hover:bg-yellow-100", textColor: "hover:text-black-800" },
    { label: "DELETE UNIT", action: handleDeleteUnit, color: "hover:bg-red-500", textColor: "hover:text-white" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left w-full md:w-[10rem]" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 text-black bg-transparent border-none hover:bg-gray-200 hover:font-semibold transition duration-150 rounded"
        >
      ⋮ 
      </button>

      {open && (
      <div className="absolute max-h-[8rem] overflow-y-auto w-full bg-white border border-gray-200 rounded shadow-lg z-10">
        {options.map(({ label, action, color, textColor }) => (
        <button
          key={label}
          onClick={() => {
          action(unitID);
          setOpen(false);
          }}
          className={`w-full text-left p-2 text-sm text-black hover:font-semibold ${color} ${textColor}`}
        >
          {label}
        </button>
        ))}
      </div>
      )}
    </div>
  );
}
