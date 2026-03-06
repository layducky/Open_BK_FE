"use client";
import * as React from "react";
import { useTest } from "@/context/TestContext";
import { LoadingScreen } from "@/components/ui/LoadingSpinner";
import { useMinimumLoading } from "@/hooks/useMinimumLoading";
import TestPage from "@/components/pages/testAttempt";

export default function TestAttemptPage() {
  const { testID, submissionID, timingFromCreate } = useTest();

  const showLoading = useMinimumLoading(!testID);
  if (showLoading) {
    return <LoadingScreen message="Loading test..." />;
  }

  return (
    <main>
      <TestPage
        testID={testID as string}
        submissionID={submissionID as string}
        mode="attempt"
        timingFromCreate={timingFromCreate}
      />
    </main>
  );
}
