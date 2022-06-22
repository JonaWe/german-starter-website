import { User } from 'firebase/auth';
import useRole from '../../hooks/useRole';
import isAllowedRole from '../../lib/firebase/isAllowedRole';
import NavUserMenuPopoutItem from './NavUserMenuPopoutItem';

export default function NavUserMenuPopout({ user }: { user: User }) {
  const [role] = useRole(user);

  const isAdmin = isAllowedRole(role?.id, 'admin');

  return (
    <div className="bg-background-800/95 mt-2 flex flex-col">
      <NavUserMenuPopoutItem href="/user" title="Profile" />
      {isAdmin && <NavUserMenuPopoutItem href="/admin" title="Admin" />}
      <span className="h-[1px] w-full bg-background-400/50" />
      <NavUserMenuPopoutItem href="/logout" title="Logout" />
    </div>
  );
}
