import { HiUserGroup } from 'react-icons/hi';
import useLocalization from '../../../hooks/useLocalization';
import Badge from '../../UI/Badge';
import Button from '../../UI/Button';

export default function Community() {
  const t = useLocalization();

  return (
    <section className="my-32 mx-auto sm:m-10 max-w-screen-xl md:flex gap-10">
      <div className="md:h-72 w-full md:w-auto aspect-video relative">
        <Badge
          text="Community"
          className="translate-x-5 -translate-y-5 absolute"
        >
          <HiUserGroup className="text-xl" />
        </Badge>
        <img
          src="/assets/images/community.png"
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
      <div>
        <h2>{t.community.title}</h2>
        <p className="">{t.community.text}</p>
        <div className="flex gap-4">
          <Button text="Discord">
            <img
              src="/assets/icons/discord.svg"
              className="w-5"
              alt="Teamspeak"
            />
          </Button>
          <Button text="Teamspeak">
            <img
              src="/assets/icons/teamspeak.svg"
              className="w-5"
              alt="Teamspeak"
            />
          </Button>
        </div>
      </div>
    </section>
  );
}
