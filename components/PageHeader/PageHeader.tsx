import useScrollDistance from '../../hooks/useScrollDistance';

interface PageHeaderProps {
  children: React.ReactNode;
  imageURL: string;
}

export default function PageHeader({ imageURL, children }: PageHeaderProps) {
  const scrollDistance = useScrollDistance();

  return (
    <header className="w-screen h-[45vh] bg-cover relative flex justify-center items-end">
      <div className="z-10 leading-none w-full max-w-screen-2xl block mb-8">
        {children}
      </div>
      <img
        src={imageURL}
        alt="page banner"
        style={{
          filter: `blur(${Math.floor(scrollDistance / 20)}px)`,
          opacity: 0.7 - 0.001 * scrollDistance,
        }}
        className={`object-cover w-full h-full absolute inset-0`}
      />
    </header>
  );
}
