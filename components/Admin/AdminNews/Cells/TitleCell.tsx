import Link from 'next/link';

interface TitleCellProps {
  value: string[];
  row: any;
}

export default function TitleCell({ value: title, row }: TitleCellProps) {
  const id = row.original.__id;

  return (
    <span>
      <Link href={`/admin/news/${id}`}>
        <a className="hover:text-sand-500/80 transition">{title}</a>
      </Link>
    </span>
  );
}
