import useLocalization from '../../hooks/useLocalization';
import ReportTypeCard from './ReportTypeCard';

interface Types {
  [index: string]: Type;
}

interface Type {
  image: string;
  link: string;
}

const types = {
  FEEDBACK: { link: '/support/feedback', image: '/assets/images/bear.png' },
  PLAYER_REPORT: {
    link: '/support/report-player',
    image: '/assets/images/oilrig_ak.png',
  },
  BUG: {
    link: '/support/report-bug',
    image: '/assets/images/ice_compound.png',
  },
} as Types;

export default function ReportPlayer() {
  const t = useLocalization();

  return (
    <div className="flex w-full justify-center">
      <div className="flex justify-between gap-20 flex-wrap items-center">
        {t.support.report.types.map((type) => {
          return (
            <ReportTypeCard
              key={type.id}
              image={types[type.id].image}
              title={type.name}
              description={type.description}
              href={types[type.id].link}
            />
          );
        })}
        {/* <ReportSteps /> */}
      </div>
    </div>
  );
}
