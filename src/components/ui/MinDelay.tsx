"use client";

import { useEffect, useState } from "react";
import { LoadingScreen } from "./LoadingSpinner";

const DEFAULT_MIN_MS = 500;

interface MinDelayProps {
  children: React.ReactNode;
  minMs?: number;
  startTime: number;
}

/**
 * Dùng với Suspense: đảm bảo loading hiển thị ít nhất minMs trước khi render children.
 * startTime thường là Date.now() khi component cha mount.
 */
export function MinDelay({ children, minMs = DEFAULT_MIN_MS, startTime }: MinDelayProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minMs - elapsed);
    const id = setTimeout(() => setReady(true), remaining);
    return () => clearTimeout(id);
  }, [minMs, startTime]);

  if (!ready) return <LoadingScreen />;
  return <>{children}</>;
}
