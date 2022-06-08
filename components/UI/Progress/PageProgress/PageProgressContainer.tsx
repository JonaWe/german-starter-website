export default function PageProgressContainer({
  animationDuration,
  isFinished,
  children,
}: {
  animationDuration: number;
  isFinished: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="pointer-event-none h-1 fixed z-50 w-full"
      style={{
        opacity: isFinished ? 0 : 1,
        transition: `opacity ${animationDuration}ms linear`,
      }}
    >
      {children}
    </div>
  );
}
