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
    link: '/support/player-report',
    image: '/assets/images/oilrig_ak.png',
  },
  // BUG: {
  //   link: '/support/bug-report',
  //   image: '/assets/images/ice_compound.png',
  // },
} as Types;

export default function ReportTypes() {
  const t = useLocalization();

  return (
    <>
      <h2>{t.support.reportTypesTitle}</h2>
      <div className="flex gap-14 flex-wrap">
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
    </>
  );
}
