"use client";
import useDisableBodyScroll from "@/hooks/useDisableBodyScroll";
import { uploadProfilePic } from "@/services/upload";
import { useMutation } from "@tanstack/react-query";
import { useState, useRef } from "react";

const UploadProfileModal: React.FC<{
  onClose: any;
}> = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useMutation({
    mutationKey: ["uploadProfilePic"],
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);
      return uploadProfilePic(formData);
    },
    onSuccess: () => {
      alert("Image uploaded successfully!");
      onClose(); // Đóng modal sau khi upload thành công
      location.reload();
    },
    onError: () => {
      alert("Failed to upload image. Please try again.");
    },
  });

  const handleOutsideClick = (event: React.MouseEvent) => {
    // Close modal if clicked outside of the modal content area
    if (event.target === dialogRef.current) {
      onClose();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Lấy ảnh đã chọn và cập nhật state
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedImage) {
      uploadMutation.mutate(selectedImage); // Gọi mutation để upload ảnh
    } else {
      alert("Please select an image to upload.");
    }
  };

  const dialogRef = useRef<null | HTMLDialogElement>(null);

  useDisableBodyScroll(dialogRef.current?.open ?? true);

  return (
    <dialog
      open
      ref={dialogRef}
      onClick={handleOutsideClick} // Handle clicks outside of modal
      className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800/50 backdrop:bg-gray-800/50 backdrop-blur-sm w-screen h-screen"
    >
      <div
        className="flex flex-col items-center gap-12 select-none h-[70vh] w-[25vw] bg-white rounded-2xl p-8 min-w-fit shadow-xl"
        onClick={(event: React.MouseEvent) => event.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <h3 className="font-bold text-2xl">Upload Profile Image</h3>
        <p className="text-center">Select an image to upload:</p>

        <div className="flex flex-col items-center gap-4 flex-1 w-full">
          {/* Tùy chỉnh giao diện input file */}
          <label
            htmlFor="image"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer font-semibold hover:bg-blue-700 transition duration-300 text-wrap h-fit"
          >
            {selectedImage ? selectedImage.name : "Choose an image"}
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Hiển thị ảnh đã chọn nếu có */}
          {selectedImage && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected Preview"
                className="w-36 aspect-square object-cover rounded-full"
              />
            </div>
          )}

          <div className="flex flex-row flex-1 items-end w-full justify-between max-lg:px-0 min-h-20 mt-6">
            <button
              className="navigateBtn px-6 py-3 bg-stone-600 text-white rounded-xl font-semibold hover:bg-gradient-to-r hover:from-stone-500 hover:via-stone-400 hover:to-stone-500 duration-300 shadow-md transform hover:scale-105 transition"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="navigateBtn px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-400 hover:to-blue-500 duration-300 shadow-md transform hover:scale-105 transition"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default UploadProfileModal;
