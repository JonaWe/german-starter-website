interface PageContentProps {
  children: React.ReactNode;
}

export default function PageContent({ children }: PageContentProps) {
  return (
    <div className="flex justify-center">
      <div className="max-w-screen-2xl w-full">{children}</div>
    </div>
  );
}
