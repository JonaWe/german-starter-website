import { string } from 'yup/lib/locale';

interface TypeCellProps {
  value: 'BUG' | 'PLAYER_REPORT' | 'FEEDBACK';
}

export default function TypeCell({ value: type }: TypeCellProps) {
  let displayType: string;

  switch (type) {
    case 'BUG':
      displayType = 'Bug';
      break;
    case 'PLAYER_REPORT':
      displayType = 'Player report';
      break;
    case 'FEEDBACK':
      displayType = 'Feedback';
      break;
    default:
      displayType = 'Not specified';
  }

  return (
    <span
      className={
        'bg-gray-500/10 rounded-full border border-sand-500/70 text-sand-500/70 uppercase text-xs px-2.5 py-1.5'
      }
    >
      {displayType}
    </span>
  );
}
