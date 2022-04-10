import useLocalization from '../../hooks/useLocalization';
import ReportTypeCard from './ReportTypeCard';

export default function ReportPlayer() {
  const t = useLocalization();

  return (
    <>
      <ReportTypeCard
        image="/assets/images/oilrig_ak.png"
        title="Report"
        description="Report a player"
        href="/report/player"
      />
      {/* <ReportSteps /> */}
    </>
  );
}
