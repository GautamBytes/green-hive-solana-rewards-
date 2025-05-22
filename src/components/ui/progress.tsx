
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorColor?: string;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  animation?: "pulse" | "glow" | "none";
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, indicatorColor, showValue = false, size = "md", animation = "none", ...props }, ref) => {
  const getHeightClass = () => {
    switch (size) {
      case "sm": return "h-2";
      case "lg": return "h-6";
      default: return "h-4";
    }
  };

  const getAnimationClass = () => {
    switch (animation) {
      case "pulse": return "animate-pulse";
      case "glow": return "after:absolute after:inset-0 after:bg-white after:opacity-30 after:animate-[glow_1.5s_ease-in-out_infinite]";
      default: return "";
    }
  };
  
  return (
    <div className="relative">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-secondary",
          getHeightClass(),
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full w-full flex-1 transition-all relative",
            getAnimationClass(),
            indicatorColor || "bg-primary"
          )}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
      
      {showValue && (
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-white drop-shadow-md">
          {value}%
        </span>
      )}
    </div>
  );
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
