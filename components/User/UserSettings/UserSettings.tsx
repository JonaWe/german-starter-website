import useLocalization from '../../../hooks/useLocalization';
import useUserSettigns from '../../../hooks/useUserSettigns';
import Info from '../../UI/Info';
import Section from './Section';

export default function UserSettings() {
  const t = useLocalization();

  const userSettings = useUserSettigns();

  return (
    <>
      <Section title="User">
        <p className="text-sm">cool</p>
      </Section>
      <Section title="Steam account">
        <Info info={t.user.settings.steamAccount.info} />
        <p className="text-sm">cool</p>
      </Section>
    </>
  );
}
