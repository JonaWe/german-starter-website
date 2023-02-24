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
    <div className='mb-2'>
      <h2>{t.stats.steamInfo.steamInfo}</h2>
      <div className="sm:flex sm:flex-col grid grid-cols-2 gap-y-3">
        {items.map(({ name, value, Icon }) => {
          return (
            <GeneralInfoItem name={name} value={value} Icon={Icon} key={name} />
          );
        })}
      </div>
    </div>
  );
}
