import Badge from '../../../UI/Badge';

interface CardProps {
  title: string;
  text: string;
  icon: React.ReactNode;
}

export default function Card({ title, text, icon }: CardProps) {
  return (
    <div className="relative mx-0 h-auto w-full bg-background-400 p-10 sm:mx-5 sm:h-60 sm:w-64">
      <Badge text="" className="absolute -top-5 left-5">
        {icon}
      </Badge>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}
