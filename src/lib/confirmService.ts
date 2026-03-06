"use client";

type ConfirmOptions = {
  message: string;
  title?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "danger";
};

type ConfirmHandler = (options: ConfirmOptions & { onConfirm: () => void }) => void;

let confirmHandler: ConfirmHandler | null = null;

export const setConfirmHandler = (handler: ConfirmHandler | null) => {
  confirmHandler = handler;
};

export const showConfirm = (
  message: string,
  onConfirm: () => void,
  options?: Partial<ConfirmOptions>
) => {
  const { title = "Confirm", confirmLabel = "Confirm", cancelLabel = "Cancel", variant = "default" } = options ?? {};
  confirmHandler?.({ message, title, confirmLabel, cancelLabel, variant, onConfirm });
};
