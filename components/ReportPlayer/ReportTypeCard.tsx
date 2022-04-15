import Link from 'next/link';

interface ReportTypeCardProps {
  image: string;
  title: string;
  description: string;
  href: string;
}

export default function ReportTypeCard({
  image,
  title,
  description,
  href,
}: ReportTypeCardProps) {
  return (
    <Link href={href}>
      <a className="overflow-hidden bg-background-500 relative cursor-pointer w-64 h-80 p-5 flex items-end hover:shadow-xl transition hover:-translate-y-1 group mx-auto">
        <div className="z-[10] relative">
          <h2 className="leading-none">{title}</h2>
          <p className="leading-none text-sm">{description}</p>
        </div>
        <img
          src={image}
          alt=""
          className="object-cover absolute inset-0 h-80 group-hover:scale-[101%] scale-100 transition"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-700 translate-y-0 group-hover:translate-y-12 transition-all" />
      </a>
    </Link>
  );
}
