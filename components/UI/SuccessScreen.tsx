import { HiCheckCircle } from 'react-icons/hi';

export default function SuccessScreen({ title }: { title: string }) {
  return (
    <div className="w-full h-screen flex justify-center items-center gap-2">
      <p>{title}</p>
      <HiCheckCircle className="fill-green-600 w-6 h-6" />
    </div>
  );
}
