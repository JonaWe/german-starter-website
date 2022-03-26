import useScrollDistance from '../../hooks/useScrollDistance';
import PasswordRequirement from './PasswordRequirement';

interface PasswordMeterProps {
  password: string;
}

const requirements = [
  {
    name: 'One uppercase character',
    pattern: /^(?=.*[A-Z])/,
  },
  {
    name: 'One lowercase character',
    pattern: /^(?=.*[a-z])/,
  },
  {
    name: 'One number',
    pattern: /^(?=.*[0-9])/,
  },
  {
    name: '6 characters long',
    pattern: /^(?=.{6,})/,
  },
];

export default function PasswordMeter({ password }: PasswordMeterProps) {
  return (
    <div>
      {requirements.map(req => {
        return (
          <PasswordRequirement
            name={req.name}
            pattern={req.pattern}
            password={password}
            key={req.name}
          />
        );
      })}
    </div>
  );
}
