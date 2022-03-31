interface SctionProps {
  title: string;
  children: React.ReactNode;
}

export default function UserSettings({ children, title }: SctionProps) {
  return (
    <section className="mt-5">
      <h3 className="font-sans w-full text-xl mb-2">{title}</h3>
      {children}
    </section>
  );
}
