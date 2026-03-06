"use-client";
import { useQueryClient } from "@tanstack/react-query";
import { enrollCourse } from "@/services/course/courseEnroll";
import { showAlert } from "@/lib/alertService";
import { showConfirm } from "@/lib/confirmService";
export const ButtonForm: React.FC<
  {
    children: React.ReactNode;
    shadow_left?: `left-[${number}px] group-hover:-translate-x-[${number}px]`;
    shadow_top?: `top-[${number}px] group-hover:-translate-y-[${number}px]`;
    align?: string;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  children,
  shadow_left = "left-[6.5px] group-hover:-translate-x-[6.5px]",
  shadow_top = "top-[6px] group-hover:-translate-y-[6px]",
  align = "self-center",
  className = "",
  ...props
}) => {
  return (
    <button
      type="submit"
      className={`group relative ${align} w-fit flex`}
      {...props}
    >
      {/* <div
        className={`flex items-center justify-center px-5 py-2 bg-saffron-400 font-semibold text-lg rounded-3xl z-20 border-2 border-black ${className}`}
      >
        {children}
      </div>
      <div
        className={`absolute border-2 border-black ${shadow_left} ${shadow_top} w-full h-full rounded-3xl z-10 bg-black/90 transition-transform duration-300 ease-in-out`}
      ></div> */}
      <div
        className={`flex items-center justify-center px-5 py-2 ${
          props.disabled === true && props.disabled !== undefined
            ? "bg-gray-400 text-gray-700"
            : "bg-saffron-400 text-black"
        } font-semibold text-lg rounded-3xl z-20 border-2 ${
          props.disabled === true && props.disabled !== undefined
            ? "border-gray-600"
            : "border-black"
        } ${className}`}
      >
        {children}
      </div>
      <div
        className={`absolute border-2 ${
          props.disabled === true && props.disabled !== undefined
            ? "border-gray-600 bg-gray-500"
            : "border-black bg-black/90"
        } ${shadow_left} ${shadow_top} w-full h-full rounded-3xl z-10 transition-transform duration-300 ease-in-out ${
          props.disabled === true && props.disabled !== undefined
            ? "group-hover:translate-none"
            : ""
        }`}
      ></div>
    </button>
  );
};

export const ButtonClick: React.FC<
  {
    children: React.ReactNode;
    shadow_left?: `left-[${number}px] group-hover:-translate-x-[${number}px]`;
    shadow_top?: `top-[${number}px] group-hover:-translate-y-[${number}px]`;
    align?: string;
    courseID: string | null;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  children,
  shadow_left = "left-[6.5px] group-hover:-translate-x-[6.5px]",
  shadow_top = "top-[6px] group-hover:-translate-y-[6px]",
  align = "self-center",
  className = "",
  courseID,
  onClick,
}) => {
  const queryClient = useQueryClient();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (courseID === null) return;

    const learnerID = sessionStorage.getItem("userID");
    if (!learnerID) {
      showAlert("Please log in to enroll in a course!", "warning");
      return;
    }

    showConfirm(
      "Are you sure you want to enroll in this course?",
      async () => {
        try {
          const response = await enrollCourse(learnerID, courseID);
          const isError = response?.response != null;
          if (isError) {
            const errMsg = response?.response?.data?.error || response?.message || "Enrollment failed";
            showAlert(errMsg, "error");
          } else {
            showAlert(response?.message || "Enrolled successfully!", "success");
            queryClient.invalidateQueries({ queryKey: ["EnrollCourses"] });
            queryClient.invalidateQueries({ queryKey: ["EnrollStats"] });
            if (courseID) {
              queryClient.invalidateQueries({ queryKey: ["getAllUnits", courseID] });
              queryClient.invalidateQueries({ queryKey: ["getPublicUnits", courseID] });
            }
          }
        } catch (error: any) {
          showAlert(error?.message || error?.response?.data?.error || "Enrollment failed", "error");
        }
      },
      { title: "Confirm enrollment", confirmLabel: "Enroll", cancelLabel: "Cancel" }
    );
  };

  return (
    <button type="button" className={`group relative ${align} w-fit min-w-0 flex shrink`} onClick={handleClick}>
      <div
        className={`flex justify-center items-center gap-2 p-1.5 bg-saffron-400 font-semibold text-md rounded-3xl border-2 z-20 border-black min-w-0 max-w-full ${className}`}
      >
        {children}
      </div>
      <div
        className={`absolute border-2 border-black ${shadow_left} ${shadow_top} w-full h-full rounded-3xl z-10 bg-black/90 transition-transform duration-300 ease-in-out`}
      ></div>
    </button>
  );
};

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const ButtonCourse: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center overflow-hidden gap-1 self-stretch px-1.5 py-1.5 rounded-[50px] text-sm 
        font-semibold bg-amber-400 border border-black border-solid
        shadow-thick-black text-black`}
      type="button"
    >
      {children}
    </button>
  );
};
