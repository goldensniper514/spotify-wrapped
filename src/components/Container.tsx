import { cn } from "@/utils/cn";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

export function Container({
  children,
  className,
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn("w-full bg-spotify-black min-h-screen", className)}
      {...props}
    >
      <div className="mx-auto max-w-[1400px] h-full w-full">
        <div
          className={cn(
            // Responsive padding that matches the Spotify profile project
            "px-6 py-8", // Default (mobile)
            "sm:px-16", // Small screens (640px+)
            "lg:px-24 lg:py-12" // Large screens (1024px+)
          )}
        >
          {children}
        </div>
      </div>
    </Component>
  );
}
