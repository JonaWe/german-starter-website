interface StatusCellProps {
  value: 'open' | 'resolved';
}

export default function StatusCell({
  value: status,
}: StatusCellProps) {

  return (
    <span
      className={`${
        status == 'open'
          ? 'bg-yellow-500/10 rounded-full border border-yellow-500/80 text-yellow-500/80 uppercase'
          : 'bg-gray-500/10 rounded-full border border-gray-500/80 text-gray-500/80 uppercase'
      } text-xs px-2.5 py-1.5`}
    >
      {status}
    </span>
  );
}
