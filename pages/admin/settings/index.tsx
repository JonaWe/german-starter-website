import { GetServerSideProps } from 'next';

import SettingsItem from '../../../components/Admin/Settings/SettingsItem';
import { getAdminLayout } from '../../../components/Layout/AdminLayout';
import LanguagePill from '../../../components/MarkdownEditor/LanguagePill';
import ArrowButton from '../../../components/UI/ArrowButton';
import InfoBox from '../../../components/UI/Info';
import { useSetHeading } from '../../../context/defaultLayoutHeadingContext';
import useLocalization from '../../../hooks/useLocalization';
import * as constants from '../../../lib/constants';
import { NextPageWithLayout } from '../../_app';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {},
  };
};

const AdminSettings: NextPageWithLayout = (props: any) => {
  const t = useLocalization();

  useSetHeading('Settings');

  const consts = constants as any;

  return (
    <div className="lg:w-1/2">
      <h3 className="font-sans font-bold text-xl">Server configuration</h3>
      <SettingsItem propertyName="discordUrl" title="Discord Url" />
      <SettingsItem propertyName="teamspeakUrl" title="Teamspeek URL" />
      <SettingsItem propertyName="ip" title="Game Server IP" />
      <h3 className="font-sans font-bold text-xl mt-4">Constants</h3>
      <InfoBox
        info="These value are only editable in code"
        type={'warning'}
        className="!py-2 mb-2"
      />
      {Object.keys(consts).map((key) => {
        return (
          <>
            <h4 className="font-sans text-sm">{key}</h4>
            <input
              type="text"
              className="px-2 py-1 mb-2 w-full"
              value={JSON.stringify(consts[key])}
              disabled
            />
          </>
        );
      })}
      <span className="group">
        <ArrowButton
          onClick={() =>
            window.open(constants.GITHUB_URLS.CONSTANTS_FILE, '_blank')
          }
          text="Edit on Github"
        />
      </span>
    </div>
  );
};

AdminSettings.getLayout = getAdminLayout;

export default AdminSettings;
