interface BadgeProps {
  className?: string;
}

export default function Divider({ className }: BadgeProps) {
  return (
    <span
      className={`mx-10 h-1 bg-background-500/20 block ${className}`}
    ></span>
  );
}
