import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("w-full bg-spotify-black min-h-screen", className)}
      {...props}
    >
      <div className="mx-auto max-w-[1400px] h-full w-full">
        <div
          className={cn(
            // Responsive padding
            "p-6", // Default (mobile)
            "sm:p-12", // Small screens (640px+)
            "lg:p-20" // Large screens (1024px+) - 80px padding
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
