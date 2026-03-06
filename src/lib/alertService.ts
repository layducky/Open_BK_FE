"use client";

export type AlertType = "success" | "error" | "info" | "warning";

type AlertOptions = {
  message: string;
  type?: AlertType;
  title?: string;
};

type AlertHandler = (options: AlertOptions) => void;

let alertHandler: AlertHandler | null = null;

export const setAlertHandler = (handler: AlertHandler | null) => {
  alertHandler = handler;
};

export const showAlert = (message: string, type: AlertType = "info", title?: string) => {
  const resolvedTitle = title ?? (type === "error" ? "Error" : type === "success" ? "Success" : type === "warning" ? "Warning" : "Notice");
  alertHandler?.({ message, type, title: resolvedTitle });
};
