"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type ModalData = {
  name: string;
  props?: Record<string, any>;
} | null;

type ModalContextType = {
  modal: ModalData;
  openModal: (name: string, props?: Record<string, any>) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalData>(null);

  const openModal = useCallback((name: string, props: Record<string, any> = {}) => {
    setModal({ name, props });
  }, []);

  const closeModal = useCallback(() => setModal(null), []);

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
