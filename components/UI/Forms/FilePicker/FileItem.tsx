import { Ring } from '@uiball/loaders';
import bytes from 'bytes';
import { HiBan, HiCheckCircle, HiX } from 'react-icons/hi';

export default function FileItem({
  name,
  size,
  error,
  onRemove,
}: {
  name: string;
  size: number;
  onRemove: () => void;
  error?: boolean;
}) {
  return (
    <li key={name} className="text-sm flex items-center justify-between group">
      <span
        className={`flex gap-2 transition-all items-baseline overflow-hidden`}
      >
        <p className={`truncate ${error && 'text-red-600/50'}`}>{name}</p>
        <span className="text-xs opacity-30 mr-5 font-light">
          {bytes.format(size)}
        </span>
      </span>
      {error ? (
        <HiBan className={`text-xl fill-red-600 flex-none`} />
      ) : (
        <HiX
          onClick={() => onRemove()}
          className={`text-xl fill-sand-500/50 flex-none cursor-pointer hover:fill-sand-500/80 transition-all`}
        />
      )}
    </li>
  );
}
