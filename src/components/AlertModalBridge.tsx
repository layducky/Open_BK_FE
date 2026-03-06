"use client";

import { useEffect } from "react";
import { useModal } from "@/context/ModalContext";
import { setAlertHandler } from "@/lib/alertService";
import { setConfirmHandler } from "@/lib/confirmService";

export function AlertModalBridge() {
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    setAlertHandler(({ message, type = "info", title }) => {
      openModal("AlertModal", { message, type, title });
    });
    setConfirmHandler(({ message, title, confirmLabel, cancelLabel, variant, onConfirm }) => {
      openModal("ConfirmModal", {
        message,
        title,
        confirmLabel,
        cancelLabel,
        variant,
        onConfirm,
      });
    });
    return () => {
      setAlertHandler(null);
      setConfirmHandler(null);
    };
  }, [openModal, closeModal]);

  return null;
}
