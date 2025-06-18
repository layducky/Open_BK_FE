'use client';

import * as React from 'react';

type TestContextType = {
  testID: string | null;
};

const TestContext = React.createContext<TestContextType>({ testID: null });

export function TestProvider({
  children,
  testID,
}: {
  children: React.ReactNode;
  testID: string | null;
}) {
  return <TestContext.Provider value={{ testID }}>{children}</TestContext.Provider>;
}

export function useTest() {
  const context = React.useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
}