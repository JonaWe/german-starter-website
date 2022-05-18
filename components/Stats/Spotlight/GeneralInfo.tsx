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
  return (
    <div className="">
      {items.map(({ name, value, Icon }) => {
        return (
          <GeneralInfoItem name={name} value={value} Icon={Icon} key={name} />
        );
      })}
    </div>
  );
}
