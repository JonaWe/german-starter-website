import Link from 'next/link';

import LanguageSelection from '../../Navbar/LanguageSelection';
import AdminNavLinks from './AdminNavLinks';

export default function AdminNav() {
  return (
    <div className="h-screen w-80 bg-background-600 py-8 flex flex-col justify-between">
      <div className="flex flex-col gap-8">
        <Link href="/">
          <a className="px-5">Exit Admin Panel</a>
        </Link>
        <AdminNavLinks />
      </div>
      <span className="flex items-center justify-between px-5 ">
        <Link href="/logout">
          <a className="text-xl">Logout</a>
        </Link>
        <LanguageSelection />
      </span>
    </div>
  );
}
