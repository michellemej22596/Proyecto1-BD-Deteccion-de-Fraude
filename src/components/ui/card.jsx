import React from "react";
import { cn } from "@lib/utils";

export const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn("bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
};
