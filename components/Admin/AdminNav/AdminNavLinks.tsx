import {
  HiAnnotation,
  HiBeaker,
  HiChartBar,
  HiCog,
  HiNewspaper,
  HiSupport,
  HiUser,
} from 'react-icons/hi';

import useRole from '../../../hooks/useRole';
import isAllowedRole from '../../../lib/firebase/isAllowedRole';
import AdminNavLink from './AdminNavLink';

export default function AdminNavLinks() {
  const [role] = useRole(null);

  const isOwner = isAllowedRole(role?.id, 'owner');
  const isDev = isAllowedRole(role?.id, 'dev');

  return (
    <div className="">
      <AdminNavLink
        name="Dashboard"
        link="/"
        icon={<HiChartBar className="text-xl" />}
      />
      {isOwner && (
        <AdminNavLink name="Users" icon={<HiUser className="text-xl" />} />
      )}
      <AdminNavLink name="News" icon={<HiNewspaper className="text-xl" />} />
      <AdminNavLink
        name="Reports"
        icon={<HiAnnotation className="text-xl" />}
      />
      {isOwner && (
        <AdminNavLink name="Settings" icon={<HiCog className="text-xl" />} />
      )}
      <AdminNavLink name="Docs" icon={<HiSupport className="text-xl" />} />
      {isDev && (
        <AdminNavLink
          secondary
          name="Experimental"
          icon={<HiBeaker className="text-xl" />}
        />
      )}
    </div>
  );
}
