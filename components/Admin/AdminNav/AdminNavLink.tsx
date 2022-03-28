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
      <div className="w-full hover:bg-background-800/50 px-5 py-2 group hover:cursor-pointer flex items-center gap-2 transition">
        {icon}
        <a className="group-hover:text-sand-600 transition">{name}</a>
      </div>
    </Link>
  );
}
