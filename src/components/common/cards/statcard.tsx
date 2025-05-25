
export function StatCard({ count, label, icon }: {
    count: number;
    label: string;
    icon: string | null;
  }) {
    return (
      <div className="bg-white drop-shadow-md duration-300 p-6 rounded-2xl hover:-translate-y-2 w-full flex flex-row gap-4 min-w-fit">
      { 
      <div className="rounded-full bg-dodger-blue-500 w-[6vw] max-w-[70px] min-w-fit aspect-square"></div>
      }
    
      <div className="flex flex-col gap-3 self-center">
        <p className="text-2xl font-semibold">{count}</p>
        <p className="text-base">{label}</p>
      </div>
    </div>
    );
  }