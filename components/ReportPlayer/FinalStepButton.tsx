import { HiArrowRight } from 'react-icons/hi';

import useLocalization from '../../hooks/useLocalization';

interface FinalStepProps {
  className?: string;
  name?: string;
}

export default function FinalStepButton({ className, name }: FinalStepProps) {
  const t = useLocalization();
  return (
    <button
      type="submit"
      className={`font-sans text-sm flex items-center group cursor-pointer hover:text-rust-500 transition-all text-sand-500/80 gap-1 ${className}`}
    >
      {name ? name : t.support.report.nextStep}
      <HiArrowRight className="group-hover:ml-3 group-hover:mr-0 mr-3 transition-all group-hover:fill-rust-500" />
    </button>
  );
}
