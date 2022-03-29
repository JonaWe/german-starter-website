import { HiArrowLeft } from 'react-icons/hi';

import useLocalization from '../../hooks/useLocalization';

interface NextStepProps {
  onClick(): void;
  className?: string;
}

export default function LastStep({ onClick, className }: NextStepProps) {
  const t = useLocalization();
  return (
    <a onClick={() => onClick()} className={`font-sans text-sm flex items-center group cursor-pointer hover:text-sand-700 transition-all text-sand-500/80 gap-1 ${className}`}>
      <HiArrowLeft className="group-hover:ml-0 group-hover:mr-3 ml-3 transition-all group-hover:fill-sand-700" />
      {t.support.report.lastStep}
    </a>
  );
}
