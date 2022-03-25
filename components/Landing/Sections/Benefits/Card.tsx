import { HiAcademicCap, HiAdjustments, HiPhone } from 'react-icons/hi';

import Badge from '../../../UI/Badge';

interface CardProps {
  title: string;
  text: string;
  id: 'easy' | 'activeAdmins' | 'reducedUpkeep';
}

export default function Card({ title, text, id }: CardProps) {
  let icon: React.ReactNode;

  switch (id) {
    case 'easy':
      icon = <HiAcademicCap className="-translate-y-[2px]" />;
      break;
    case 'activeAdmins':
      icon = <HiPhone className="-translate-y-[2px]" />;
      break;
    case 'reducedUpkeep':
      icon = <HiAdjustments className="-translate-y-[2px]" />;
      break;
  }

  return (
    <div className="relative mx-0 h-auto w-full bg-background-400 px-6 pt-14 sm:mx-5 sm:h-60 sm:w-64">
      <Badge className="absolute -top-7 left-5 aspect-square">{icon}</Badge>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}
