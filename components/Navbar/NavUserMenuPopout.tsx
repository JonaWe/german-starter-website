import { User } from 'firebase/auth';

import useAdmin from '../../hooks/useAdmin';
import NavUserMenuPopoutItem from './NavUserMenuPopoutItem';

export default function NavUserMenuPopout({ user }: { user: User }) {
  const [admin] = useAdmin(user);

  return (
    <div className="bg-background-800/95 mt-2 flex flex-col">
      <NavUserMenuPopoutItem href="/user" title="Profile" />
      {admin && <NavUserMenuPopoutItem href="/admin" title="Admin" />}
      <span className="h-[1px] w-full bg-background-400/50" />
      <NavUserMenuPopoutItem href="/logout" title="Logout" />
    </div>
  );
}
