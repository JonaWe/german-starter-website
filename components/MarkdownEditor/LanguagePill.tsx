import Tooltip from '../UI/Tooltip';

export default function LanguagePill({
  text,
  className,
  tooltip,
}: {
  text: string;
  className?: string;
  tooltip?: string;
}) {
  return (
    <Tooltip text={tooltip ? tooltip : 'language'}>
      <span
        className={`bg-rust-500/20 border-rust-500 border rounded-full px-2 mx-3 text-xs text-sand-500 ${
          className || ''
        }`}
      >
        {text}
      </span>
    </Tooltip>
  );
}
