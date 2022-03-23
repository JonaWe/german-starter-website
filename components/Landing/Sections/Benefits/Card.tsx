import Badge from "../../../UI/Badge";

interface CardProps {
  title: string;
  text: string;
  Icon: React.ReactNode;
}

export default function Card({ title, text, Icon }: CardProps) {
    return (
        <div className="bg-background-400 p-10 relative">
            <Badge text="" className="absolute -top-5 left-5">
                {Icon}
            </Badge>
            <h2>{title}</h2>
            <p>text</p>
        </div>
    )
}
