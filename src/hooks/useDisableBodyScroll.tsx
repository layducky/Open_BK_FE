"use client";
import { useEffect } from "react";

const useDisableBodyScroll = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    // Cleanup overflow setting khi modal đóng hoặc component unmount
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isOpen]); // Chạy lại khi trạng thái `isOpen` thay đổi
};

export default useDisableBodyScroll;
