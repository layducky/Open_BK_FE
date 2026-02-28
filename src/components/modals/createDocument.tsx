"use client";

import React, { useRef, useState } from "react";
import Modal from "@/components/modals/formModal";
import { useHandleDocument } from "@/hooks/handleMutations/handleDocument";

type CreateDocumentModalProps = {
  unitID: string;
  courseID?: string;
  refetchUnits?: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const ALLOWED_EXTENSIONS = ".pdf, .doc, .txt, .docx";

const CreateDocumentModal: React.FC<CreateDocumentModalProps> = ({
  unitID,
  courseID,
  refetchUnits,
  isOpen,
  setIsOpen,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { handleUploadDocument, isUploading } = useHandleDocument({
    unitID,
    courseID,
    refetchUnits,
    setIsOpen,
  });

  const onClose = () => {
    setIsOpen(false);
    setSelectedFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const ext = "." + (file.name.split(".").pop() || "").toLowerCase();
      if ([".pdf", ".doc", ".txt", ".docx"].includes(ext)) {
        setSelectedFile(file);
      } else {
        setSelectedFile(null);
        alert(`Invalid file type. Allowed: ${ALLOWED_EXTENSIONS}`);
      }
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }
    handleUploadDocument(selectedFile);
  };

  return (
    <Modal modelTitle="Upload Document" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select file ({ALLOWED_EXTENSIONS})
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.txt,.docx"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
          />
          {selectedFile && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
            </p>
          )}
        </div>
        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!selectedFile || isUploading}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateDocumentModal;
