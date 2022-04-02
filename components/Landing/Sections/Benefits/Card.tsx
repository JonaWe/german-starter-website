import { HiAcademicCap, HiAdjustments, HiPhone } from 'react-icons/hi';

import Badge from '../../../UI/Badge';

interface CardProps {
  title: string;
  text: string;
  id: 'easy' | 'activeAdmins' | 'reducedUpkeep';
}

export default function Card({ title, text, id }: CardProps) {
  let icon: React.ReactNode;
  const className = 'text-6xl';

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
    <div className="h-auto w-full sm:w-64 bg-background-400 p-6 sm:h-60 flex flex-col items-center justify-start gap-6 group hover:-translate-y-1 hover:shadow-xl transition">
      {icon}
      <h2 className="">{title}</h2>
      <p className="text-center">{text}</p>
    </div>
  );
}
