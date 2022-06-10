import Tippy, { TippyProps } from '@tippyjs/react/headless';
import { motion, useSpring } from 'framer-motion';

interface TooltipProps {
  children: React.ReactElement;
  text: string;
  className?: string;
  options?: any;
}

export default function Tooltip({
  children,
  text,
  options,
  className,
}: TooltipProps) {
  const springConfig = { damping: 15, stiffness: 300 };
  const initialScale = 0.5;
  const opacity = useSpring(0, springConfig);
  const scale = useSpring(initialScale, springConfig);

  function onMount() {
    scale.set(1);
    opacity.set(1);
  }

  function onHide({ unmount }: { unmount: () => void }) {
    const cleanup = scale.onChange((value) => {
      if (value <= initialScale) {
        cleanup();
        unmount();
      }
    });

    scale.set(initialScale);
    opacity.set(0);
  }

  return (
    <Tippy
      render={(attrs) => (
        <motion.span
          className="bg-background-700 px-4 py-2 rounded z-100 text-sm"
          tabIndex={-1}
          style={{ opacity, scale }}
          {...attrs}
        >
          {text}
        </motion.span>
      )}
      popperOptions={options}
      animation={true}
      onMount={onMount}
      onHide={onHide}
    >
      <span className={className}>{children}</span>
    </Tippy>
  );
}
