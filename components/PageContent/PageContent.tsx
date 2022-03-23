interface PageContentProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContent({ children, className }: PageContentProps) {
  return (
    <div className="flex justify-center mt-16">
      <div className={`max-w-screen-2xl w-full ${className}`}>{children}</div>
    </div>
  );
}
