import CountUp from 'react-countup';

import Tooltip from '../../UI/Tooltip';
import { Item } from './QuickInfo';

export default function QuickInfoItem({ name, value }: Item) {
  return (
    <div className="flex text-center flex-col max-w-[25%]">
      <Tooltip text={String(value)}>
        <h3 className="text-6xl -mb-2 truncate">
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
      </Tooltip>
      <p className="opacity-75">{name}</p>
    </div>
  );
}
