import { HiAcademicCap, HiAdjustments, HiPhone } from 'react-icons/hi';

interface CardProps {
  title: string;
  text: string;
  id: 'easy' | 'activeAdmins' | 'reducedUpkeep';
}

export default function Card({ title, text, id }: CardProps) {
  let icon: React.ReactNode;
  const className =
    'h-10 w-10 group-hover:fill-rust-500 fill-sand-500 transition flex-none';

  switch (id) {
    case 'easy':
      icon = <HiAcademicCap className={className} />;
      break;
    case 'activeAdmins':
      icon = <HiPhone className={className} />;
      break;
    case 'reducedUpkeep':
      icon = <HiAdjustments className={className} />;
      break;
  }

  return (
    <div className="w-full sm:w-64 bg-background-400/60 p-6 flex flex-col items-center justify-start gap-6 group hover:-translate-y-1 hover:shadow-xl shadow-md transition">
      {icon}
      <h2 className="text-center">{title}</h2>
      <p className="text-center text-sand-600">{text}</p>
    </div>
  );
}
