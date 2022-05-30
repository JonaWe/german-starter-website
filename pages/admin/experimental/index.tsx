import { useState } from 'react';

import Markdown from 'markdown-to-jsx';

import { getAdminLayout } from '../../../components/Layout/AdminLayout';
import Button from '../../../components/UI/Button';
import { useSetHeading } from '../../../context/defaultLayoutHeadingContext';
import { auth } from '../../../firebase/clientApp';
import useLocalization from '../../../hooks/useLocalization';
import getAxios from '../../../lib/axios';
import announceNews from '../../../lib/discord/announceNews';
import { NextPageWithLayout } from '../../_app';

const AdminExperimental: NextPageWithLayout = () => {
  const t = useLocalization();
  const [logs, setLogs] = useState('');

  const getLog = async () => {
    const axios = await getAxios();
    const { data } = await axios.get('/api/admin/logging/pyLogs');
    setLogs(data);
  };

  useSetHeading('Experimental');
  getLog();
  return (
    <>
      <Button
        text="announceNews"
        onClick={() =>
          announceNews(
            auth,
            'English title',
            'Deutschr Titel',
            '0QCvQjOt6tgrfVETSlDO'
          )
        }
      />
      <pre className="h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-inherit w-full overflow-x-hidden">
        {logs}
      </pre>
    </>
  );
};

AdminExperimental.getLayout = getAdminLayout;

export default AdminExperimental;
