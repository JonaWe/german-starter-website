import useScrollDistance from '../../hooks/useScrollDistance';
import PasswordRequirement from './PasswordRequirement';

interface PasswordMeterProps {
  password: string;
  confirmPassword: string;
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

export default function PasswordMeter({
  password,
  confirmPassword,
}: PasswordMeterProps) {
  return (
    <div>
      {requirements.map((req) => {
        return (
          <PasswordRequirement
            name={req.name}
            pattern={req.pattern}
            password={password}
            key={req.name}
          />
        );
      })}
      {/* <PasswordRequirement
        name="Passwords match"
        pattern={new RegExp(`(?=\\b${confirmPassword}\\b)(?=^\\S+$)`)}
        password={password}
      /> */}
    </div>
  );
}
