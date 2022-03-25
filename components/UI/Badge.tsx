interface BadgeProps {
  text?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function Badge({ text, children, className }: BadgeProps) {
  return (
    <h2
      className={`flex w-fit items-center gap-3 whitespace-nowrap bg-rust-500 px-4 pb-1 pt-2 shadow-xl ${className}`}
    >
      {children}
      {text}
    </h2>
  );
}
