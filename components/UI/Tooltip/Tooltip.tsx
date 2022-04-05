import Tippy from '@tippyjs/react/headless';

interface TooltipProps {
  children: React.ReactElement;
  text: string;
}

export default function Tooltip({ children, text }: TooltipProps) {
  return (
    <Tippy
      render={(attrs) => (
        <span
          className="bg-background-700 px-4 py-2 rounded z-100"
          tabIndex={-1}
          {...attrs}
        >
          {text}
        </span>
      )}
    >
      <span>{children}</span>
    </Tippy>
  );
}
