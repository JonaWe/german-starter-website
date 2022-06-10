export default function PageProgressBar({
  animationDuration,
  progress,
}: {
  animationDuration: number;
  progress: number;
}) {
  return (
    <div
      className="bg-rust-500 h-1 w-full left-0 top-0 fixed z-50"
      style={{
        marginLeft: `${(-1 + progress) * 100}%`,
        transition: `margin-left ${animationDuration}ms linear`,
      }}
    />
  );
}
