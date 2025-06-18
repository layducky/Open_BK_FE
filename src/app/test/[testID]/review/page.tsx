"use client";
import * as React from "react";
import { useTest } from '@/context/TestContext';
import TestPage from "@/components/pages/testAttempt";

export default function TestReviewPage() {
  const { testID } = useTest();

  if (!testID) {
    return <div>Loading test ID...</div>;
  }

  return (
    <main>
      <TestPage testID={testID as string} mode="review"/>
    </main>
  );
}
