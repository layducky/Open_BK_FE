"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import GradientButton from "./GradientButton";
import { useHandleUnit } from "@/hooks/handleMutations/handleUnit";
import { useUnitMutations } from "@/hooks/mutations/useUnitMutation";
import CreateUnitModal from "../../modals/createUnit";
import { useHandleTest } from "@/hooks/handleMutations/handleTest";
import { useHandleDocument } from "@/hooks/handleMutations/handleDocument";
import { useHandleVideo } from "@/hooks/handleMutations/handleVideo";
import CreateTestModal from "@/components/modals/createTest";
import CreateDocumentModal from "@/components/modals/createDocument";
import CreateVideoModal from "@/components/modals/createVideo";
import { SelectionOption } from "@/type/selection.entity";


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
  options: SelectionOption[];
}
function ActionDropdown({ options }: ActionDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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
    <div className="relative inline-block text-right w-full md:w-[10rem]" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="p-2 text-black bg-transparent border-none hover:bg-gray-200 hover:font-semibold transition duration-150 rounded"
        >
      ⋮ 
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-1 max-h-[12rem] overflow-y-auto min-w-[8rem] w-max bg-white border border-gray-200 rounded shadow-lg z-50">
          {options.map(({ label, action, color, textColor }) => (
          <button
            key={label}
            onClick={() => {
            action();
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
  );
}

interface unitActionDropdownProps {
  courseID: string;
  unitID: string;
  refetchUnits?: () => void;
}

export function UnitActionDropdown({courseID, unitID, refetchUnits} : unitActionDropdownProps) {
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { handleDeleteUnit } = useHandleUnit({courseID, refetchUnits});

  const options = [
    { label: "Edit description", action: () => {}, color: "hover:bg-gray-100", textColor: "hover:text-black-800" },
    { label: "Upload TEST", action: () => {setIsTestOpen(true);}, color: "hover:bg-green-100", textColor: "hover:text-black-800" },
    { label: "Upload LINK", action: () => {}, color: "hover:bg-blue-100", textColor: "hover:text-black-800" },
    { label: "Upload FILE", action: () => {setIsDocumentOpen(true);}, color: "hover:bg-orange-100", textColor: "hover:text-black-800" },
    { label: "Upload VIDEO", action: () => {setIsVideoOpen(true);}, color: "hover:bg-yellow-100", textColor: "hover:text-black-800" },
    { label: "DELETE UNIT", action: () => handleDeleteUnit(unitID), color: "hover:bg-red-500", textColor: "hover:text-white" },
  ];
  return (
    <>
      <ActionDropdown options={options} />
      <CreateTestModal 
        unitID={unitID}
        isOpen={isTestOpen}
        setIsOpen={setIsTestOpen}
        refetchTests={refetchUnits}
        setNewTestID={() => {}}
      />
      <CreateDocumentModal
        unitID={unitID}
        courseID={courseID}
        refetchUnits={refetchUnits}
        isOpen={isDocumentOpen}
        setIsOpen={setIsDocumentOpen}
      />
      <CreateVideoModal
        unitID={unitID}
        courseID={courseID}
        refetchUnits={refetchUnits}
        isOpen={isVideoOpen}
        setIsOpen={setIsVideoOpen}
      />
    </>
  );
}

interface DocumentActionDropdownProps {
  documentID: string;
  unitID?: string;
  courseID?: string;
  refetchUnits?: () => void;
}

export function DocumentActionDropdown({ documentID, unitID, courseID, refetchUnits }: DocumentActionDropdownProps) {
  const { handleDeleteDocument } = useHandleDocument({
    unitID: unitID ?? "",
    courseID,
    refetchUnits,
    setIsOpen: () => {},
  });

  const options = [
    { label: "DELETE DOCUMENT", action: () => handleDeleteDocument(documentID), color: "hover:bg-red-500", textColor: "hover:text-white" },
  ];

  return (
    <div>
      <ActionDropdown options={options} />
    </div>
  );
}

interface VideoActionDropdownProps {
  videoID: string;
  unitID?: string;
  courseID?: string;
  refetchUnits?: () => void;
}

export function VideoActionDropdown({ videoID, unitID, courseID, refetchUnits }: VideoActionDropdownProps) {
  const { handleDeleteVideo } = useHandleVideo({
    unitID: unitID ?? "",
    courseID,
    refetchUnits,
    setIsOpen: () => {},
  });

  const options = [
    { label: "DELETE VIDEO", action: () => handleDeleteVideo(videoID), color: "hover:bg-red-500", textColor: "hover:text-white" },
  ];

  return (
    <div>
      <ActionDropdown options={options} />
    </div>
  );
}

interface TestActionDropdownProps {
  testID: string;
  unitID?: string;
  refetchUnits?: () => void;
  deleteOnly?: boolean;
}

export function TestActionDropdown({ testID, unitID, refetchUnits, deleteOnly }: TestActionDropdownProps) {
  const router = useRouter();
  const { handleDeleteTest } = useHandleTest({
    unitID: unitID ?? "",
    refetchTests: refetchUnits,
    setNewTestID: undefined,
    setIsOpen: () => {},
  });

  const options = deleteOnly && unitID
    ? [{ label: "DELETE TEST", action: () => handleDeleteTest(testID), color: "hover:bg-red-500", textColor: "hover:text-white" }]
    : [
        { label: "Edit description", action: () => {}, color: "hover:bg-gray-100", textColor: "hover:text-black-800" },
        { 
          label: "EDIT TEST", 
          action: () => {
            if (testID) {
              router.push(`/test/${testID}/review`);
            }
          }, 
          color: "hover:bg-blue-100", 
          textColor: "hover:text-black" 
        },
        ...(unitID ? [{ label: "DELETE TEST", action: () => handleDeleteTest(testID), color: "hover:bg-red-500", textColor: "hover:text-white" }] : []),
      ];
  return (
    <div>
      <ActionDropdown options={options} />
    </div>
  );
}