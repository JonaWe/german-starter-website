import { HiAnnotation, HiNewspaper, HiUser } from 'react-icons/hi';
import AdminNavLink from './AdminNavLink';

export default function AdminNavLinks() {
  return (
    <div className="">
      <AdminNavLink name='Users' icon={<HiUser className="text-xl group-hover:fill-sand-600 transition"/>} />
      <AdminNavLink name='News' icon={<HiNewspaper className="text-xl group-hover:fill-sand-600 transition"/>} />
      <AdminNavLink name='Reports' icon={<HiAnnotation className="text-xl group-hover:fill-sand-600 transition"/>} />
    </div>
  );
}
