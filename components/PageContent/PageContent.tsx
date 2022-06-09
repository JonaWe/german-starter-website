interface PageContentProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContent({ children, className }: PageContentProps) {
  return (
    <div className="mt-16 flex justify-center h-full">
      <div className={`w-full max-w-screen-2xl p-5 md:p-0 ${className}`}>
        {children}
      </div>
    </div>
  );
}
