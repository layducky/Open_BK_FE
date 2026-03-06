"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { LoadingScreen } from "@/components/ui/LoadingSpinner";
import { useMinimumLoading } from "@/hooks/useMinimumLoading";
import { useTest } from '@/context/TestContext';
import { useUser } from "@/hooks/querys/useUser";
import TestPage from "@/components/pages/testAttempt";

export default function TestReviewPage() {
  const { testID, submissionID } = useTest();
  const { data: userInfo, isLoading: userLoading } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (userLoading) return;
    if (userInfo?.role !== "COLLAB") {
      router.replace(testID ? `/test/${testID}` : "/");
    }
  }, [userInfo?.role, userLoading, router, testID]);

  const showTestLoading = useMinimumLoading(!testID);
  if (showTestLoading) {
    return <LoadingScreen message="Loading test..." />;
  }

  if (!userLoading && userInfo?.role !== "COLLAB") {
    return <div>Redirecting...</div>;
  }

  return (
    <main>
      <TestPage testID={testID as string} submissionID={submissionID as string} mode="review"/>
    </main>
  );
}
