interface InfoProps {
  className?: string;
  /**Tailwind color "red-500" */
  type?: 'info' | 'warning' | 'success' | 'error';
  info: string;
}

export default function InfoBox({ className, type, info }: InfoProps) {
  switch (type) {
    case 'warning':
      break;
    case 'success':
      break;
    case 'error':
      break;
    default:
      break;
  }

  return (
    <div
      className={`border-l-4 pl-2 py-4 border-blue-600 bg-blue-600/20 ${className} text-sm`}
    >
      {info}
    </div>
  );
}
