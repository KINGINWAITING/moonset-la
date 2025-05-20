
import React from 'react';
import { useTheme } from "@/context/ThemeContext";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    name: string;
  }>;
  label?: string;
}

export const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  if (active && payload && payload.length) {
    return (
      <div className={`${isDark ? "bg-[#1B1B1B] border-gray-800" : "bg-white border-gray-200"} p-3 border rounded-md shadow-lg transition-colors`}>
        <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>{label}</p>
        <p className="text-lg font-semibold text-primary">
          ${Number(payload[0].value).toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};
