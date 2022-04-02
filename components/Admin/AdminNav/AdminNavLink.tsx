import Link from 'next/link';

interface AdminNavLinkProps {
  link?: string;
  icon: React.ReactNode;
  name: string;
}

export default function AdminNavLink({ link, name, icon }: AdminNavLinkProps) {
  if (!link) link = encodeURIComponent(name.toLowerCase());

  return (
    <Link href={`/admin/${link}`}>
      <a className="w-full hover:bg-background-800/50 px-5 py-2 hover:cursor-pointer hover:opacity-80 flex items-center gap-2 transition group">
        {icon}
        <p className="group-hover:ml-1 transition-all">{name}</p>
      </a>
    </Link>
  );
}
