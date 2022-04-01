import Link from 'next/link';

import AdminNavLinks from './AdminNavLinks';

export default function AdminNav() {
  return (
    <div className="h-screen w-80 bg-background-600 pt-8 flex flex-col gap-8">
      <Link href="/">
        <a className="px-5">Exit Admin Panel</a>
      </Link>
      <AdminNavLinks />
    </div>
  );
}
