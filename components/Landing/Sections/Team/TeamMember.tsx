import Image from 'next/image';
import Link from 'next/link';

interface TeamMemberProps {
  name: string;
  src: string;
  link: string;
}

export default function TeamMember({ name, src, link }: TeamMemberProps) {
  return (
    <Link href={link}>
      <a
        className="w-24 h-24 lg:w-32 lg:h-32 relative hover:scale-[102%] transition"
        target="_blank"
      >
        <Image src={src} alt={`${name}'s avatar`} layout="fill" />
        <span className="absolute inset-0 bg-gradient-to-t from-background-600/80 via-transparent" />
        <span className="absolute inset-0 bg-gradient-to-tr from-background-600/50 via-transparent" />
        <span className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background-500/30" />
        <p className="text-sm lg:text-base text-sand-500 absolute left-0 bottom-0 pl-1.5 pb-1 lg:pl-3 lg:pb-2">
          {name}
        </p>
      </a>
    </Link>
  );
}
