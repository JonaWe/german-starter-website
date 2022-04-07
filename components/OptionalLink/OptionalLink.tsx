export default function WithLink({
  link,
  className,
  children,
}: {
  link: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <>
      {link ? (
        <a
          rel="noopener noreferrer"
          target={'_blank'}
          href={link}
          className={className}
        >
          {children}
        </a>
      ) : (
        children
      )}
    </>
  );
}
