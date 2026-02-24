"use client";

import { useQuery } from "@tanstack/react-query";
import { getSubmissionTiming } from "@/services/course/test";

export interface UseSubmissionTimingResult {
  startedAt: string | null;
  duration: number;
  serverTimeOffset: number;
  isLoading: boolean;
  error: Error | null;
}

export function useSubmissionTiming(submissionID: string | null, timingFromCreate?: { startedAt: string; duration: number; serverTime: number } | null) {
  const query = useQuery({
    queryKey: ["submissionTiming", submissionID],
    queryFn: () => getSubmissionTiming(submissionID!),
    enabled: !!submissionID && !timingFromCreate,
    staleTime: 0,
    retry: false,
  });

  if (timingFromCreate) {
    const clientTime = Date.now();
    const serverTimeOffset = timingFromCreate.serverTime - clientTime;
    return {
      startedAt: timingFromCreate.startedAt,
      duration: timingFromCreate.duration,
      serverTimeOffset,
      isLoading: false,
      error: null,
    };
  }

  if (query.data) {
    const clientTime = Date.now();
    const serverTimeOffset = query.data.serverTime - clientTime;
    return {
      startedAt: query.data.startedAt,
      duration: query.data.duration,
      serverTimeOffset,
      isLoading: false,
      error: null,
    };
  }

  return {
    startedAt: null,
    duration: 0,
    serverTimeOffset: 0,
    isLoading: query.isLoading,
    error: query.error as Error | null,
  };
}
