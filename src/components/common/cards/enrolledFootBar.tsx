export const EnrolledFootBar = () => {
    return (
        <div className="flex flex-col w-full gap-2">
            <div className="flex flex-row justify-between w-full font-semibold text-xs text-[#909094]">
              <span>Progress</span>
            </div>
            <div className="w-full max-w-full h-[5px] bg-[#E3E2E6] rounded-full">
              <div className="w-3/5 max-w-full h-full bg-dodger-blue-500 rounded-full"></div>
            </div>
          </div>
    );
}