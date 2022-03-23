import Badge from "../../../UI/Badge";

interface CardProps {
  title: string;
  text: string;
  icon: React.ReactNode;
}

export default function Card({ title, text, icon }: CardProps) {
    return (
        <div className="bg-background-400 p-10 relative sm:w-64 w-full sm:h-60 h-auto mx-0 sm:mx-5">
            <Badge text="" className="absolute -top-5 left-5">
                {icon}
            </Badge>
            <h2>{title}</h2>
            <p>{text}</p>
        </div>
    )
}
