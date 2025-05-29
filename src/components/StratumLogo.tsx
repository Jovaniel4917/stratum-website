
import { cn } from "@/lib/utils";

interface StratumLogoProps {
  className?: string;
}

export const StratumLogo = ({ className }: StratumLogoProps) => {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-10 h-10", className)}
    >
      {/* Multi-layer geometric design inspired by data layers and analytics */}
      <rect
        x="4"
        y="4"
        width="32"
        height="32"
        rx="4"
        fill="#1E2B7E"
        className="animate-pulse"
      />
      <rect
        x="8"
        y="8"
        width="24"
        height="24"
        rx="2"
        fill="#266AB2"
        opacity="0.8"
      />
      <rect
        x="12"
        y="12"
        width="16"
        height="16"
        rx="2"
        fill="#E6E08E"
        opacity="0.9"
      />
      <rect
        x="16"
        y="16"
        width="8"
        height="8"
        rx="1"
        fill="#000000"
      />
      
      {/* Data visualization lines */}
      <path
        d="M10 14 L18 10 L26 16 L30 12"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
      <path
        d="M10 26 L14 22 L22 28 L30 24"
        stroke="#E6E08E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
    </svg>
  );
};
