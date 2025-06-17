"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import GradientButton from "./GradientButton";
import { useHandleUnit } from "@/hooks/handleMutations/handleUnit";
import { useUnitMutations } from "@/hooks/mutations/useUnitMutation";
import CreateUnitModal from "../../modals/createUnit";
import { useHandleTest } from "@/hooks/handleMutations/handleTest";
import CreateTestModal from "@/components/modals/createTest";


interface CreateUnitBtnProps {
  courseID: string;
  refetchUnits?: () => void;
  setNewUnitID: (newUnitID: string) => void;
}


export function CreateUnitBtn({ courseID, refetchUnits, setNewUnitID }: CreateUnitBtnProps) {
  const [isOpen, setIsOpen] = useState(false);

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
      <CreateUnitModal
        courseID={courseID}
        refetchUnits={refetchUnits}
        setNewUnitID={setNewUnitID}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
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
  courseID: string;
  unitID: string;
  refetchUnits?: () => void;
}

export default function ActionDropdown({courseID, unitID, refetchUnits} : ActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { handleDeleteUnit } = useHandleUnit({courseID, refetchUnits});

  const options = [
    { label: "Edit description", action: () => {}, color: "hover:bg-gray-100", textColor: "hover:text-black-800" },
    { label: "Upload TEST", action: () => {setIsOpen(true);}, color: "hover:bg-green-100", textColor: "hover:text-black-800" },
    { label: "Upload LINK", action: () => {}, color: "hover:bg-blue-100", textColor: "hover:text-black-800" },
    { label: "Upload FILE", action: () => {}, color: "hover:bg-orange-100", textColor: "hover:text-black-800" },
    { label: "Upload VIDEO", action: () => {}, color: "hover:bg-yellow-100", textColor: "hover:text-black-800" },
    { label: "DELETE UNIT", action: handleDeleteUnit, color: "hover:bg-red-500", textColor: "hover:text-white" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <>
      <div className="relative inline-block text-left w-full md:w-[10rem]" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="p-2 text-black bg-transparent border-none hover:bg-gray-200 hover:font-semibold transition duration-150 rounded"
          >
        ⋮ 
        </button>

        {isDropdownOpen && (
          <div className="absolute max-h-[8rem] overflow-y-auto w-full bg-white border border-gray-200 rounded shadow-lg z-10">
            {options.map(({ label, action, color, textColor }) => (
            <button
              key={label}
              onClick={() => {
              action(unitID);
              setIsDropdownOpen(false);
              }}
              className={`w-full text-left p-2 text-sm text-black hover:font-semibold ${color} ${textColor}`}
            >
              {label}
            </button>
            ))}
          </div>
        )}      
      </div>
      <CreateTestModal 
        unitID={unitID}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        refetchTests={refetchUnits}
        setNewTestID={() => {}}
      />
    </>
  );
}
