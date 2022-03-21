import { MouseEventHandler } from 'react';

interface ButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  primary?: boolean;
  children?: React.ReactNode;
}

export default function Button({
  text,
  onClick,
  primary,
  children,
}: ButtonProps) {
  return (
    <button
      className={`text-xl py-2 px-4 flex items-center gap-1 text-sand-500 transition duration-150 ${
        primary
          ? 'bg-rust-500 hover:bg-rust-600'
          : 'bg-background-300 hover:bg-background-400'
      }`}
      onClick={onClick}
    >
      {text}
      {children}
    </button>
  );
}
