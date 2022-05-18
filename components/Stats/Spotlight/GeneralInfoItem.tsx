import { Item } from './GeneralInfo';

export default function GeneralInfoItem({ name, value, Icon }: Item) {
  return (
    <div className="flex items-center">
      {Icon}
      <h2 className="-mb-2">{value}</h2>
    </div>
  );
}
