import Link from 'next/link';

export default function NavUserMenuPopout() {
  return (
    <div className="bg-background-800/95 py-4 px-6 mt-2">
      <Link href="/admin">
        <a>Admin</a>
      </Link>
    </div>
  );
}
