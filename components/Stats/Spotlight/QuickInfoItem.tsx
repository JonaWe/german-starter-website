import CountUp from 'react-countup';

import { Item } from './QuickInfo';

export default function QuickInfoItem({ name, value }: Item) {
  return (
    <div className="flex text-center flex-col">
      <h3 className="text-6xl -mb-2">
        {value ? (
          typeof value !== 'number' ? (
            value
          ) : (
            <CountUp end={value ? value : 0} />
          )
        ) : (
          0
        )}
      </h3>
      <p className="opacity-75">{name}</p>
    </div>
  );
}
