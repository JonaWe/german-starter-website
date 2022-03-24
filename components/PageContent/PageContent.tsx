interface PageContentProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContent({ children, className }: PageContentProps) {
  return (
    <div className="mt-16 flex justify-center">
      <div className={`w-full max-w-screen-2xl ${className}`}>{children}</div>
    </div>
  );
}
