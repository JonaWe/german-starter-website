import { MouseEventHandler } from 'react';

import Link from 'next/link';

interface ButtonProps {
  text: string;
  primary?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  useLink?: boolean;
  href?: string;
}

export default function Button({
  text,
  primary,
  children,
  className,
  onClick,
  useLink,
  href,
}: ButtonProps) {
  const extendedClassName = `font-bebas text-xl py-2 px-4 flex items-center gap-1 text-sand-500 transition duration-150 ${
    primary
      ? 'bg-rust-500 hover:bg-rust-600'
      : 'bg-background-300 hover:bg-background-300/40'
  } ${className}`;

  return useLink ? (
    <Link href={href || '/'}>
      <a className={extendedClassName + ' w-fit'}>
        {text}
        {children}
      </a>
    </Link>
  ) : (
    <button className={extendedClassName} onClick={onClick}>
      {text}
      {children}
    </button>
  );
}
