import Link from 'next/link';

export default function NavUserMenuPopout() {
  return (
    <div className="bg-background-800/95 py-4 px-6 mt-2 flex flex-col gap-2">
      <Link href="/user">
        <a>Profile</a>
      </Link>
      <Link href="/admin">
        <a>Admin</a>
      </Link>
    </div>
  );
}
