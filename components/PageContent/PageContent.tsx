interface PageContentProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContent({ children, className }: PageContentProps) {
  return (
    <div className="mt-16 flex justify-center h-full w-full">
      <div
        className={`w-full h-full max-w-screen-xl sm:w-5/6 p-3 sm:p-0 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
