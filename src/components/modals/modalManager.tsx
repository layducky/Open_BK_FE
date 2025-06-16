"use client";
import { useModal } from "@/context/ModalContext";
import UploadProfileModal from "./UploadProfileModal";

const ModalLookup: Record<string, React.FC<any>> = {
  UploadProfileModal: UploadProfileModal,
};

const ModalManager = () => {
  const { modal, closeModal } = useModal();

  if (!modal) return null;
  const Modal = ModalLookup[modal.name];

  return <Modal onClose={closeModal} {...modal.props} />;
};

export default ModalManager;