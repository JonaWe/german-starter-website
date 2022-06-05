import useSteamUser from '../../../../hooks/useSteamUser';
import { CellProps } from '../LogItem';

export default function TargetCell({ value: text, restricted }: CellProps) {
  return (
    <span className="text-cyan-700 bg-cyan-700/5 px-2 py-0.5 rounded-full border border-cyan-700 text-sm">
      {text}
    </span>
  );
}
