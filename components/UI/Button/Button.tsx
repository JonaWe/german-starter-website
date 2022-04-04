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
  disabled?: boolean;
}

export default function Button({
  text,
  primary,
  children,
  className,
  onClick,
  useLink,
  href,
  disabled,
}: ButtonProps) {
  const extendedClassName = `${useButtonStyle(primary!)} ${
    disabled && 'opacity-30 cursor-not-allowed'
  } ${className}`;

  return useLink ? (
    <Link href={href || '/'}>
      <a className={extendedClassName + ' w-fit'}>
        {text}
        {children}
      </a>
    </Link>
  ) : (
    <button className={extendedClassName} onClick={onClick} disabled={disabled}>
      {text}
      {children}
    </button>
  );
}
