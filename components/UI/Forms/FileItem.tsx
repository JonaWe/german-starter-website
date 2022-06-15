import { Ring } from '@uiball/loaders';
import {
  HiBan,
  HiCheckCircle,
  HiDocument,
  HiOutlineDocument,
  HiOutlineDocumentDownload,
} from 'react-icons/hi';

export default function FileItem({
  name,
  loading,
  error,
}: {
  name: string;
  loading?: boolean;
  error?: boolean;
}) {
  return (
    <li key={name} className="text-sm flex items-center justify-between">
      <span
        className={`flex gap-10 overflow-hidden ${
          loading ? 'opacity-40' : 'opacity-100'
        }transition-all`}
      >
        <p className={`truncate mr-5 ${error && 'text-red-600/50'}`}>{name}</p>
      </span>
      {loading ? (
        <Ring size={20} color={'#373737'} />
      ) : error ? (
        <HiBan className={`text-xl fill-red-600 flex-none`} />
      ) : (
        <HiCheckCircle className={`text-xl fill-green-600 flex-none`} />
      )}
    </li>
  );
}
