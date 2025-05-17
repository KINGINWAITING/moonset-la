
import React from 'react';

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
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1B1B1B] p-3 border border-gray-800 rounded-md shadow-lg">
        <p className="text-sm text-gray-300">{label}</p>
        <p className="text-lg font-semibold text-primary">
          ${Number(payload[0].value).toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};
