import { useRouter } from 'next/navigation';

export const ToggleBtn = ({unitID}: {unitID: string}) => {    
    const router = useRouter();
    const handleClick = () => {
        router.push("/unit/" + unitID + "/attempt");
    }
    return (
        <div className="flex justify-center md:justify-end items-center bg-blue-200 p-2 gap-5">
            <div className="relative inline-block w-11 h-5">
                <input 
                    id="switch-component-desc" 
                    type="checkbox" 
                    className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300" 
                    onClick={handleClick} 
                />
                <label 
                    htmlFor="switch-component-desc" 
                    className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer">
                </label>
            </div>
            <label htmlFor="switch-component-desc" className="text-sm cursor-pointer">
                <div>
                    <p className="font-medium font-semibold">
                        Edit Mode
                    </p>
                    <p className="text-slate-500">
                        You&apos;ll be able to edit your own course.
                    </p>
                </div>
            </label>
        </div>   
  );
}