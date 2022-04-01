import { MouseEventHandler } from 'react';

import Link from 'next/link';

import useButtonStyle from '../../../hooks/useButtonStyle';

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
  const extendedClassName = `${useButtonStyle(primary!)} ${className}`;

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
