import React from 'react';

interface TooltipProps {
  children: React.ReactElement;
  text: string;
}

export default function Tooltip({ children, text }: TooltipProps) {
  return (
    <span className="group relative z-100">
      {children}
      <span
        role="tooltip"
        className="absolute scale-0 group-hover:scale-100 transition duration-100 bg-background-700 px-4 py-2 rounded"
      >
        {text}
      </span>
    </span>
  );
}
