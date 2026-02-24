"use client";

import { useCallback, useEffect, useState, useRef } from "react";

interface TestTimerProps {
  startedAt: string | null;
  durationMinutes: number;
  serverTimeOffset: number;
  onTimeUp?: () => void;
  className?: string;
}

function formatRemaining(ms: number): string {
  if (ms <= 0) return "0:00";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function TestTimer({
  startedAt,
  durationMinutes,
  serverTimeOffset,
  onTimeUp,
  className = "",
}: TestTimerProps) {
  const [remainingMs, setRemainingMs] = useState<number | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const onTimeUpCalled = useRef(false);

  const deadline = startedAt
    ? new Date(startedAt).getTime() + durationMinutes * 60 * 1000
    : null;

  const tick = useCallback(() => {
    if (!deadline) return;
    const now = Date.now();
    const serverNow = now + serverTimeOffset;
    const remaining = deadline - serverNow;

    if (remaining <= 0) {
      setRemainingMs(0);
      setIsExpired(true);
      if (!onTimeUpCalled.current) {
        onTimeUpCalled.current = true;
        onTimeUp?.();
      }
    } else {
      setRemainingMs(remaining);
    }
  }, [deadline, serverTimeOffset, onTimeUp]);

  useEffect(() => {
    if (!deadline) return;
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [deadline, tick]);

  if (!startedAt || remainingMs === null) return null;

  const isLow = remainingMs > 0 && remainingMs <= 5 * 60 * 1000;
  const isCritical = remainingMs > 0 && remainingMs <= 60 * 1000;

  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-3 py-2 font-mono font-semibold ${
        isExpired
          ? "bg-red-100 text-red-700"
          : isCritical
          ? "bg-red-100 text-red-600 animate-pulse"
          : isLow
          ? "bg-amber-100 text-amber-700"
          : "bg-blue-50 text-blue-700"
      } ${className}`}
    >
      <svg
        className="h-5 w-5 text-current"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>
        {isExpired ? "Time's up!" : formatRemaining(remainingMs)}
      </span>
    </div>
  );
}
