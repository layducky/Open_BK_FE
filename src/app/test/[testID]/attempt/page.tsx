"use client";
import * as React from "react";
import { useUnit } from '@/context/UnitContext';
import UnitTest from "@/components/pages/unitTest";

export default function UnitAttemptPage() {
  const { unitID } = useUnit();

  if (!unitID) {
    return <div>Loading unit ID...</div>;
  }

  return (
    <main>
      <UnitTest unitID={unitID as string} mode="attempt"/>
    </main>
  );
}
