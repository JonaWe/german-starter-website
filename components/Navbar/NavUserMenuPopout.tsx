import { User } from 'firebase/auth';

import useAdmin from '../../hooks/useAdmin';
import NavUserMenuPopoutItem from './NavUserMenuPopoutItem';

export default function NavUserMenuPopout({ user }: { user: User }) {
  const [admin] = useAdmin(user);

  return (
    <div className="bg-background-800/95 mt-2 flex flex-col gap-2 p-2">
      <NavUserMenuPopoutItem href="/user" title="Profile" />
      <NavUserMenuPopoutItem href="/logout" title="Logout" />
      {admin && <NavUserMenuPopoutItem href="/admin" title="Admin" />}
    </div>
  );
}
