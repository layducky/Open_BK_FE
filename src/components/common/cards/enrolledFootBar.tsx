export const EnrolledFootBar: React.FC<{ progress?: number }> = ({ progress = 0 }) => {
    const widthPercent = Math.min(100, Math.max(0, progress));
    return (
        <div className="flex flex-col w-full gap-2">
            <div className="flex flex-row justify-between w-full font-semibold text-xs text-[#909094]">
              <span>Progress</span>
              <span>{widthPercent}%</span>
            </div>
            <div className="w-full max-w-full h-[5px] bg-[#E3E2E6] rounded-full">
              <div
                className="max-w-full h-full bg-dodger-blue-500 rounded-full transition-all"
                style={{ width: `${widthPercent}%` }}
              />
            </div>
          </div>
    );
}