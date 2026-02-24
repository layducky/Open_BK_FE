"use client";
import * as React from "react";

export interface SubmissionTimingData {
  startedAt: string;
  duration: number;
  serverTime: number;
}

type TestContextType = {
  testID: string | null;
  submissionID: string | null;
  setSubmissionID: (id: string) => void;
  timingFromCreate: SubmissionTimingData | null;
  setTimingFromCreate: (data: SubmissionTimingData | null) => void;
};

const TestContext = React.createContext<TestContextType>({
  testID: null,
  submissionID: null,
  setSubmissionID: () => {},
  timingFromCreate: null,
  setTimingFromCreate: () => {},
});

export function TestProvider({
  children,
  testID,
}: {
  children: React.ReactNode;
  testID: string | null;
}) {
  const [submissionID, setSubmissionID] = React.useState<string | null>(null);
  const [timingFromCreate, setTimingFromCreate] = React.useState<SubmissionTimingData | null>(null);
  return (
    <TestContext.Provider
      value={{ testID, submissionID, setSubmissionID, timingFromCreate, setTimingFromCreate }}
    >
      {children}
    </TestContext.Provider>
  );
}

export function useTest() {
  const context = React.useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
}