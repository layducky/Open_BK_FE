'use client';

import { useRouter, usePathname } from 'next/navigation';
import * as React from 'react';

export const ToggleBtn = ({ unitID }: { unitID: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  const [isChecked, setIsChecked] = React.useState(() => {
    return pathname.includes('/review');
  });

  React.useEffect(() => {
    setIsChecked(pathname.includes('/review'));
  }, [pathname]);

  const handleClick = () => {
    if (!unitID) return;

    const targetRoute = isChecked ? `/unit/${unitID}/attempt` : `/unit/${unitID}/review`;
    router.push(targetRoute);
  };

  return (
    <div className="flex justify-center md:justify-end items-center bg-blue-200 p-2 gap-5">
      <div className="relative inline-block w-11 h-5">
        <input
          id="switch-component-desc"
          type="checkbox"
          className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300"
          checked={isChecked}
          onChange={handleClick}
        />
        <label
          htmlFor="switch-component-desc"
          className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
        />
      </div>
      <label className="text-sm cursor-pointer">
        <div>
          <p className="font-medium font-semibold">Edit Mode</p>
          <p className="text-slate-500">You'll be able to edit your own course.</p>
        </div>
      </label>
    </div>
  );
};
