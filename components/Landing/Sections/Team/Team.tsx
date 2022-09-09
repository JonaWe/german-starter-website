import { Parallax } from 'react-parallax';

import {
  GROUP_ADMINS,
  GROUP_DEVELOPER,
  GROUP_OWNER,
} from '../../../../data/Team';
import useLocalization from '../../../../hooks/useLocalization';
import Badge from '../../../UI/Badge';
import TeamGroup from './TeamGroup';

export default function Team() {
  const t = useLocalization();
  return (
    <section className="relative">
      <div className="w-full absolute -top-6 left-0 z-10">
        <Badge className="mx-auto" text={t.team.title} />
      </div>
      <Parallax
        bgImage="assets/images/team_banner.webp"
        bgImageAlt="the cat"
        strength={200}
        className="w-screen overflow-hidden bg-center bg-cover bg-no-repeat flex justify-center mt-32"
      >
        <div className="w-full max-w-screen-2xl">
          <div className="mx-auto max-w-screen-xl items-center gap-8 lg:gap-12 flex flex-col my-16 lg:my-24">
            <TeamGroup members={GROUP_OWNER} title={t.team.roles.owner} />
            <TeamGroup members={GROUP_ADMINS} title={t.team.roles.admin} />
            <TeamGroup
              members={GROUP_DEVELOPER}
              title={t.team.roles.developer}
            />
          </div>
        </div>
      </Parallax>
    </section>
  );
}
