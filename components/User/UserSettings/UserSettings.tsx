import { motion } from 'framer-motion';

import useLocalization from '../../../hooks/useLocalization';
import useSteamUser from '../../../hooks/useSteamUser';
import useUserSettigns from '../../../hooks/useUserSettigns';
import Info from '../../UI/Info';
import LinkAccount from './LinkAccount';
import LinkedAccount from './LinkedAccount';
import Section from './Section';

export default function UserSettings() {
  const t = useLocalization();
  const [settings] = useUserSettigns();

  const sid = settings?.steamid;

  const [steamUser, loading] = useSteamUser(sid);

  return (
    <>
      <Section title="User">
        <p className="text-sm">cool</p>
      </Section>
      <Section title="Steam account">
        {(!loading || steamUser) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {!steamUser && <Info info={t.user.settings.steamAccount.info} />}
            <h4 className="font-sans font-semibold mt-3">
              {t.user.settings.steamAccount.linkedTitle}
            </h4>
            <div className="flex gap-2">
              {steamUser ? (
                <LinkedAccount steamUser={steamUser} />
              ) : (
                <LinkAccount />
              )}
            </div>
          </motion.div>
        )}
      </Section>
    </>
  );
}
