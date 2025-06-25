'use client';
import * as React from 'react';

type TestContextType = {
  testID: string | null;
  submissionID: string | null;
  setSubmissionID: (id: string) => void;
};

const TestContext = React.createContext<TestContextType>({ testID: null, submissionID: null, setSubmissionID: () => {} });

export function TestProvider({
  children,
  testID,
}: {
  children: React.ReactNode;
  testID: string | null;
}) {
  const [submissionID, setSubmissionID] = React.useState<string | null>(null);
  return <TestContext.Provider value={{ testID, submissionID, setSubmissionID }}>{children}</TestContext.Provider>;
}

export function useTest() {
  const context = React.useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
}