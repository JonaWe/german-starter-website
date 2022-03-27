import useScrollDistance from '../../hooks/useScrollDistance';

interface PageHeaderProps {
  children: React.ReactNode;
  imageURL: string;
}

export default function PageHeader({ imageURL, children }: PageHeaderProps) {
  const scrollDistance = useScrollDistance();

  return (
    <header className="relative flex h-[45vh] w-screen items-end justify-center bg-cover">
      <div className="z-10 mb-8 ml-8 block w-full max-w-screen-2xl leading-none 2xl:ml-0">
        {children}
      </div>
      <img
        src={imageURL}
        alt="page banner"
        style={{
          filter: `blur(${Math.floor(scrollDistance / 20)}px)`,
          opacity: 0.7 - 0.0015 * scrollDistance,
        }}
        className={`absolute inset-0 h-full w-full object-cover`}
      />
    </header>
  );
}
