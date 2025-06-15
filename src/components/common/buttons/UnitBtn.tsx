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


export const CreateUnitBtn: React.FC<{ courseID: string }> = ({ courseID }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { mutate, error } = useMutation({
        mutationFn: (data: any) => createUnit({
            courseID: data.courseID,
            unitName: data.unitName,
            description: data.description,
            numericalOrder: data.numericalOrder
        }),
        onSuccess: ( response ) => {
            alert(response.message || response.error);
            setIsOpen(false);
            // window.location.reload();
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(unitSchema),
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const onClose = () => setIsOpen(false);

    const handleClick = () => {
        setIsOpen(true);
    };

    const formFields = [
        { label: "Course ID", type: "hidden", id: "courseID", placeholder: "", disabled: false },
        { label: "Unit Name", type: "text", id: "unitName", placeholder: "Unit Name", disabled: false },
        { label: "Description", type: "text", id: "description", placeholder: "Description", disabled: false },
        { label: "NumericalOrder", type: "number", id: "numericalOrder", placeholder: "NumericalOrder", disabled: false },
    ];


    return (
        <>
            <button
            onClick={handleClick}
            className="inline-flex items-center justify-center p-0.5 mb-2 me-2 text-sm font-medium text-black rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
        >
            <span className="relative px-2 md:px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
               ➕ New Unit
            </span>
        </button>
            <Modal modelTitle="Create New Unit" isOpen={isOpen} onClose={onClose}>
                <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-6">
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
};

export const DeleteUnitBtn: React.FC<{ unitID: string }> = ({ unitID }) => {

    const handleClick = async() => {
        const response = await deleteUnit(unitID);
        alert(response.message || response.error);
        window.location.reload();
    };

    return (
        // <div>
            <GradientButton onClick={handleClick} text="🗑" />
        // </div>
    );
};


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


const options = [
  { label: "Edit description", action: deleteUnit, color: "hover:bg-gray-100", textColor: "hover:text-black-800" },
  { label: "Upload TEST", action: deleteUnit, color: "hover:bg-green-100", textColor: "hover:text-black-800" },
  { label: "Upload LINK", action: deleteUnit, color: "hover:bg-blue-100", textColor: "hover:text-black-800" },
  { label: "Upload FILE", action: deleteUnit, color: "hover:bg-orange-100", textColor: "hover:text-black-800" },
  { label: "Upload VIDEO", action: deleteUnit, color: "hover:bg-yellow-100", textColor: "hover:text-black-800" },
  { label: "DELETE UNIT", action: deleteUnit, color: "hover:bg-red-500", textColor: "hover:text-white" },
];

export default function ActionDropdown({unitID} : {unitID: string}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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
      className="p-2 w-full text-black bg-transparent border-none hover:bg-gray-200 hover:font-semibold transition duration-150 rounded"
      >
      ⋮ Actions
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
