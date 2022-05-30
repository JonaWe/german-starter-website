import {
  HiAnnotation,
  HiBeaker,
  HiChartBar,
  HiNewspaper,
  HiSupport,
  HiUser,
} from 'react-icons/hi';

import AdminNavLink from './AdminNavLink';

export default function AdminNavLinks() {
  return (
    <div className="">
      <AdminNavLink
        name="Dashboard"
        link="/"
        icon={<HiChartBar className="text-xl" />}
      />
      <AdminNavLink name="Users" icon={<HiUser className="text-xl" />} />
      <AdminNavLink name="News" icon={<HiNewspaper className="text-xl" />} />
      <AdminNavLink
        name="Reports"
        icon={<HiAnnotation className="text-xl" />}
      />
      <AdminNavLink name="Doc" icon={<HiSupport className="text-xl" />} />
      <AdminNavLink
        secondary
        name="Experimental"
        icon={<HiBeaker className="text-xl" />}
      />
    </div>
  );
}
