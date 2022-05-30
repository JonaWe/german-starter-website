export default function ChartTooltip({
  active,
  children,
}: {
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      {active &&  (
        <div className="bg-background-700 text-white p-2 rounded-lg">
          {children}
        </div>
      )}
    </>
  );
}
