import TeamMember from './TeamMember';

interface TeamGroupProps {
  members: {
    name: string;
    image: string;
    link: string;
  }[];
  title: string;
}

export default function TeamGroup({ members, title }: TeamGroupProps) {
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <h3 className="text-3xl">{title}</h3>
      {/* <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-sand-500 to-transparent" /> */}
      <div className="flex gap-6 lg:gap-10">
        {members.map(({ name, image, link }, i) => (
          <TeamMember key={name + link} name={name} src={image} link={link} />
        ))}
      </div>
    </div>
  );
}
