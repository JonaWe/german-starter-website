import Link from 'next/link';

import { HiPencil } from 'react-icons/hi';

import Tooltip from '../../../UI/Tooltip';

interface ActionCellProps {
  value: string;
  row: any;
}

export default function ActionCell({ value: id }: ActionCellProps) {
  return (
    <span className="flex gap-3 items-center">
      <Link href={`/admin/reports/${id}`}>
        <a>
          <Tooltip text="Edit Ticket">
            <HiPencil className="fill-sand-500/75 hover:fill-sand-500  text-2xl hover:cursor-pointer" />
          </Tooltip>
        </a>
      </Link>
    </span>
  );
}
