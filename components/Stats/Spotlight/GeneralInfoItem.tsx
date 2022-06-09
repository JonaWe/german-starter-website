import { Item } from './GeneralInfo';

export default function GeneralInfoItem({ name, value, Icon }: Item) {
  return (
    <div className="flex items-center gap-3 group">
      <div className="bg-background-150/75 group-hover:bg-background-150 p-2 rounded-lg h-12 w-12 flex items-center justify-center">
        {Icon}
      </div>
      <div>
        <h2 className="-mb-2">{value}</h2>
        <p className="text-sm opacity-75">{name}</p>
      </div>
    </div>
  );
}
