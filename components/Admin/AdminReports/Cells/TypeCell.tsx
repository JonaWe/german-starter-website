import { string } from 'yup/lib/locale';

import TypePill from '../TypePill';

interface TypeCellProps {
  value: 'BUG' | 'PLAYER_REPORT' | 'FEEDBACK' | 'COMMENT_REPORT';
}

export default function TypeCell({ value: type }: TypeCellProps) {
  return <TypePill type={type} />;
}
