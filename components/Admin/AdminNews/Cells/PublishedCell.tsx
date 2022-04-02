interface PublishedCellProps {
  value: boolean;
}

export default function PublishedCell({
  value: published,
}: PublishedCellProps) {
  return (
    <span
      className={`${
        published
          ? 'bg-green-500/10 rounded-full border border-green-500/80 text-green-500/80 uppercase'
          : 'bg-blue-500/10 rounded-full border border-blue-500/80 text-blue-500/80 uppercase'
      } text-xs px-2.5 py-1.5`}
    >
      {published ? 'published' : 'private'}
    </span>
  );
}
