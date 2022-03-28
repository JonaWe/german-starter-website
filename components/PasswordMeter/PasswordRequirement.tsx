import { HiShieldCheck } from 'react-icons/hi';

interface PasswordMeterProps {
  pattern: RegExp;
  password: string;
  name: string;
}

export default function PasswordRequirement({
  pattern,
  password,
  name,
}: PasswordMeterProps) {
  return (
    <div className="flex items-center gap-2 mt-1">
      <HiShieldCheck
        className={`${
          password?.match(pattern) ? 'fill-green-600' : 'fill-sand-500/20'
        } transition-colors`}
      />
      <p
        className={`${
          password?.match(pattern) ? 'text-sand-500' : 'text-sand-500/50'
        } text-xs transition-colors`}
      >
        {name}
      </p>
    </div>
  );
}
