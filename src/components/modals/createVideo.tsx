"use client";

import React, { useRef, useState } from "react";
import Modal from "@/components/modals/formModal";
import { useHandleVideo } from "@/hooks/handleMutations/handleVideo";

type CreateVideoModalProps = {
  unitID: string;
  courseID?: string;
  refetchUnits?: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const ALLOWED_EXTENSIONS = ".mp4, .webm, .ogg, .mov";

const CreateVideoModal: React.FC<CreateVideoModalProps> = ({
  unitID,
  courseID,
  refetchUnits,
  isOpen,
  setIsOpen,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { handleUploadVideo, isUploading, progress, status } = useHandleVideo({
    unitID,
    courseID,
    refetchUnits,
    setIsOpen,
  });

  const statusLabel =
    status === "preparing"
      ? "Preparing..."
      : status === "uploading"
        ? "Uploading..."
        : status === "finalizing"
          ? "Finalizing..."
          : "Upload";

  const onClose = () => {
    setIsOpen(false);
    setSelectedFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const ext = "." + (file.name.split(".").pop() || "").toLowerCase();
      if ([".mp4", ".webm", ".ogg", ".mov"].includes(ext)) {
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
      alert("Please select a video file to upload.");
      return;
    }
    handleUploadVideo(selectedFile);
  };

  return (
    <Modal modelTitle="Upload Video" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select video ({ALLOWED_EXTENSIONS})
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".mp4,.webm,.ogg,.mov,video/mp4,video/webm,video/ogg,video/quicktime"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
          />
          {selectedFile && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
          {isUploading && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{statusLabel}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
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
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? statusLabel : "Upload"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateVideoModal;
