import Link from 'next/link';

import { useAuthState } from 'react-firebase-hooks/auth';
import { MdOutlinePowerSettingsNew } from 'react-icons/md';

import { auth } from '../../../firebase/clientApp';
import logout from '../../../lib/firebase/logout';
import LanguageSelection from '../../Navbar/LanguageSelection';
import Button from '../../UI/Button';
import AdminNavLinks from './AdminNavLinks';

export default function AdminNav() {
  const [user] = useAuthState(auth);

  return (
    <div className="h-screen w-96 bg-background-600 py-8 flex flex-col justify-between">
      <div>
        <Link href="/user">
          <a className="p-5 flex items-center gap-4 cursor-pointer hover:bg-background-800/50">
            <img src={user?.photoURL || ''} alt="" />
            <div className="flex flex-col">
              <p className="leading-none">{user?.displayName || user?.email}</p>
              <p className="text-sand-500/70 text-xs">{user?.email}</p>
            </div>
          </a>
        </Link>
        <div className="flex flex-col gap-8">
          <AdminNavLinks />
        </div>
      </div>
      <div>
        <Link href="/">
          <a className="w-full hover:bg-background-800/50 px-5 py-2 hover:cursor-pointer hover:opacity-80 flex items-center gap-2 transition group">
            <MdOutlinePowerSettingsNew className="text-xl group-hover:fill-red-600 transition-all" />
            <p className="group-hover:ml-1 transition-all group-hover:text-red-600">
              Exit Admin Panel
            </p>
          </a>
        </Link>
        <span className="flex items-center justify-between px-5 border-t-2 border-background-400/20 pt-3">
          <Button text="logout" onClick={() => logout()} />{' '}
          <LanguageSelection />
        </span>
      </div>
    </div>
  );
}
