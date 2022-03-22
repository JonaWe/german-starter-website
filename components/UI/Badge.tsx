interface BadgeProps {
  text: string;
  className?: string;
  children?: React.ReactNode;
}

export default function Badge({ text, children, className }: BadgeProps) {
  return (
    <h2 className={`bg-rust-500 px-4 pb-1 pt-2 flex gap-3 items-center w-fit shadow-xl ${className}`}>
      {children}
      {text}
    </h2>
  );
}
