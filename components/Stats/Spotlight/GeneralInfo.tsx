import useLocalization from '../../../hooks/useLocalization';
import GeneralInfoItem from './GeneralInfoItem';

interface GeneralInfoProps {
  items: Item[];
}

export interface Item {
  name: string;
  Icon: React.ReactNode;
  value: number | string;
}

export default function GeneralInfo({ items }: GeneralInfoProps) {
  const t = useLocalization();
  return (
    <div>
      <h2>{t.stats.steamInfo.steamInfo}</h2>
      <div className="flex flex-col gap-y-3">
        {items.map(({ name, value, Icon }) => {
          return (
            <GeneralInfoItem name={name} value={value} Icon={Icon} key={name} />
          );
        })}
      </div>
    </div>
  );
}
