import { useState } from "react";

type ModalProps = {
  modelTitle: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ modelTitle, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-lg overflow-y-auto max-h-[calc(100vh-200px)] w-full sm:w-auto">
        <div className="flex justify-between w-full">
          <div className="flex justify-center w-11/12">
            <h2 className="text-xl font-semibold">{modelTitle}</h2>
          </div>
          <div className="w-1/12">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              X
            </button>
          </div>

        </div>
        <div className="max-h-[calc(100vh-250px)] w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;