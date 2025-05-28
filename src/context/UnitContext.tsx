'use client';

import * as React from 'react';

type UnitContextType = {
  unitID: string | null;
};

const UnitContext = React.createContext<UnitContextType>({ unitID: null });

export function UnitProvider({
  children,
  unitID,
}: {
  children: React.ReactNode;
  unitID: string | null;
}) {
  return <UnitContext.Provider value={{ unitID }}>{children}</UnitContext.Provider>;
}

export function useUnit() {
  const context = React.useContext(UnitContext);
  if (context === undefined) {
    throw new Error('useUnit must be used within a UnitProvider');
  }
  return context;
}