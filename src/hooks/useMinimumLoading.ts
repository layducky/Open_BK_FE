"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_MIN_MS = 500;

/**
 * Đảm bảo trạng thái loading hiển thị ít nhất minMs (mặc định 500ms)
 * để tránh loading nhấp nháy khi API phản hồi quá nhanh.
 */
export function useMinimumLoading(isLoading: boolean, minMs = DEFAULT_MIN_MS): boolean {
  const [showLoading, setShowLoading] = useState(isLoading);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (isLoading) {
      startRef.current = Date.now();
      setShowLoading(true);
    } else {
      const start = startRef.current;
      if (start !== null) {
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, minMs - elapsed);
        const id = setTimeout(() => {
          setShowLoading(false);
          startRef.current = null;
        }, remaining);
        return () => clearTimeout(id);
      } else {
        setShowLoading(false);
      }
    }
  }, [isLoading, minMs]);

  return showLoading;
}
