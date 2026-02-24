"use client";

import { useState } from "react";

interface OngoingSubmissionModalProps {
  onClose: () => void;
  onConfirm?: () => void | Promise<void>;
  errorMessage?: string;
}

export default function OngoingSubmissionModal({ onClose, onConfirm, errorMessage }: OngoingSubmissionModalProps) {
  const [isPending, setIsPending] = useState(false);
  const isErrorMode = !!errorMessage;

  const handleConfirm = async () => {
    if (!onConfirm) return;
    setIsPending(true);
    try {
      await Promise.resolve(onConfirm());
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${isErrorMode ? "bg-red-100" : "bg-amber-100"}`}>
            <svg
              className={`h-6 w-6 ${isErrorMode ? "text-red-600" : "text-amber-600"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            {isErrorMode ? "Đã xảy ra lỗi" : "Ongoing attempt detected"}
          </h3>
        </div>
        <p className="mb-6 text-gray-600">
          {isErrorMode
            ? errorMessage
            : "You have an ongoing attempt. Do you want to end it and save your current answers, then start a new attempt?"}
        </p>
        <div className="flex gap-3">
          {isErrorMode ? (
            <button
              onClick={onClose}
              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700"
            >
              OK
            </button>
          ) : (
            <>
              <button
                onClick={onClose}
                disabled={isPending}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={isPending}
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
              >
                {isPending ? "Processing..." : "End current & start new"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
