interface InfoProps {
  className?: string;
  type?: 'info' | 'warning' | 'success' | 'error' | null;
  info: string | React.ReactNode;
}

export interface Info {
  type: 'info' | 'warning' | 'success' | 'error';
  info: string;
}

export default function InfoBox({ className, type, info }: InfoProps) {
  switch (type) {
    case 'warning':
      return (
        <div
          className={` border-yellow-600 bg-yellow-600/20 border-l-4 pl-2 py-4 text-sm ${className}`}
        >
          {info}
        </div>
      );
    case 'success':
      return (
        <div
          className={` border-green-600 bg-green-600/20 border-l-4 pl-2 py-4 text-sm ${className}`}
        >
          {info}
        </div>
      );
    case 'error':
      return (
        <div
          className={` border-red-600 bg-red-600/20 border-l-4 pl-2 py-4 text-sm ${className}`}
        >
          {info}
        </div>
      );
    default:
      return (
        <div
          className={` border-blue-600 bg-blue-600/20 border-l-4 pl-2 py-4 text-sm ${className}`}
        >
          {info}
        </div>
      );
  }
}
