import toast, { Toast } from 'react-hot-toast';

export default function CustomInfoToast({
  t,
  children,
}: {
  t: Toast;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-sm w-full bg-background-700 rounded-md px-4 py-2 shadow-lg pointer-events-auto flex z-[200] items-center gap-3`}
    >
      {children}
    </div>
  );
}
