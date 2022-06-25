import { HiArrowRight } from 'react-icons/hi';

import useLocalization from '../../hooks/useLocalization';

interface FinalStepProps {
  className?: string;
  name?: string;
  disabled?: boolean;
}

export default function FinalStepButton({
  className,
  name,
  disabled,
}: FinalStepProps) {
  const t = useLocalization();
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`disabled:cursor-default font-sans text-sm flex items-center group cursor-pointer enabled:hover:text-rust-500 transition-all text-sand-500/80 gap-1 ${className}`}
    >
      {name ? name : t.support.report.nextStep}
      <HiArrowRight className="enabled:group-hover:ml-3 enabled:group-hover:mr-0 mr-3 transition-all enabled:group-hover:fill-rust-500" />
    </button>
  );
}
