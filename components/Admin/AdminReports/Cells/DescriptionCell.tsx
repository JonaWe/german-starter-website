import usePublicUser from '../../../../hooks/usePublicUser';
import Avatar from '../../../UI/Avatar';

interface DescriptionCellProps {
  value: string;
}

export default function DescriptionCell({
  value: description,
}: DescriptionCellProps) {
  return <p className="max-w-xs whitespace-nowrap truncate">{description}</p>;
}
