"use client";
import { useModal } from "@/context/ModalContext";
import UploadProfileModal from "./UploadProfileModal";
import NotEnrolledModal from "./NotEnrolledModal";
import OngoingSubmissionModal from "./OngoingSubmissionModal";
import UnansweredQuestionModal from "./UnansweredQuestionModal";
import SubmitSuccessModal from "./SubmitSuccessModal";

const ModalLookup: Record<string, React.FC<any>> = {
  UploadProfileModal: UploadProfileModal,
  NotEnrolledModal: NotEnrolledModal,
  OngoingSubmissionModal: OngoingSubmissionModal,
  UnansweredQuestionModal: UnansweredQuestionModal,
  SubmitSuccessModal: SubmitSuccessModal,
};

const ModalManager = () => {
  const { modal, closeModal } = useModal();

  if (!modal) return null;
  const Modal = ModalLookup[modal.name];

  return <Modal onClose={closeModal} {...modal.props} />;
};

export default ModalManager;