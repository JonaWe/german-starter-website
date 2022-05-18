import QuickInfoItem from './QuickInfoItem';

interface QuickInfoProps {
  items: Item[];
}

export interface Item {
  name: string;
  value: number | string;
}

export default function QuickInfo({ items }: QuickInfoProps) {
  return (
    <div className='flex justify-between'>
      {items.map((item) => {
        return <QuickInfoItem name={item.name} value={item.value} />;
      })}
    </div>
  );
}
