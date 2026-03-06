import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-5 w-5",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  return (
    <Loader2
      className={`animate-spin text-dodger-blue-500 ${sizeClasses[size]} ${className}`}
      aria-label="Loading"
    />
  );
}

interface LoadingScreenProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingScreen({ message, size = "lg" }: LoadingScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 py-12 px-6">
      <LoadingSpinner size={size} />
      {message && <p className="text-sm text-slate-500">{message}</p>}
    </div>
  );
}
