import React from "react";
import { cn } from "@lib/utils";

export const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  );
};
