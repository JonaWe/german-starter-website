import { useState } from 'react';

import Calendar from '../../../components/Calendar';
import { CalendarEvent } from '../../../components/Calendar/Calendar';
import { getAdminLayout } from '../../../components/Layout/AdminLayout';
import RustMap from '../../../components/RustMap';
import Map from '../../../components/RustMap/Map';
import Button from '../../../components/UI/Button';
import { useSetHeading } from '../../../context/defaultLayoutHeadingContext';
import { auth } from '../../../firebase/clientApp';
import useLocalization from '../../../hooks/useLocalization';
import useServerMap from '../../../hooks/useServerMap';
import getAxios from '../../../lib/axios';
import announceNews from '../../../lib/discord/announceNews';
import { NextPageWithLayout } from '../../_app';

const meetings = [
  {
    name: 'Leslie Alexander',
    description: '',
    startDatetime: new Date('2022-05-11T13:00'),
    endDatetime: new Date('2022-05-11T14:30'),
    type: 'event',
  },
  {
    name: 'Michael Foster',
    description: '',
    startDatetime: new Date('2022-05-20T09:00'),
    endDatetime: new Date('2022-05-20T11:30'),
    type: 'event',
  },
  {
    name: 'Dries Vincent',
    description: '',
    startDatetime: new Date('2022-05-20T17:00'),
    endDatetime: new Date('2022-05-20T18:30'),
    type: 'event',
  },
  {
    name: 'Leslie Alexander',
    description: '',
    startDatetime: new Date('2022-06-09T13:00'),
    endDatetime: new Date('2022-06-09T14:30'),
    type: 'event',
  },
  {
    name: 'Michael Foster',
    description: '',
    startDatetime: new Date('2022-06-15T14:30'),
    endDatetime: new Date('2022-06-15T14:30'),
    type: 'event',
  },
  {
    startDatetime: new Date('2022-05-21T09:00'),
    type: 'event',
    name: 'event',
    endDatetime: new Date('2022-05-21T09:00'),
  },
] as CalendarEvent[];

const AdminExperimental: NextPageWithLayout = () => {
  const t = useLocalization();
  const [logs, setLogs] = useState('');
  useSetHeading('Experimental');

  const getLog = async () => {
    const axios = await getAxios();
    const { data } = await axios.get('/api/admin/logging/pyLogs');
    setLogs(data);
  };

  const { data: map, refetch } = useServerMap();

  getLog();
  return (
    <>
      <h2>Discord</h2>
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
      <h2 className="mt-5">Loggs</h2>
      <pre className="h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-inherit w-full overflow-x-hidden">
        {logs}
      </pre>
      <h2>Calendar</h2>
      <Calendar events={meetings} />
      <h2>Map</h2>
      <div className="relative w-2/3 aspect-square mb-10">
        <RustMap map={map} reload={refetch} />
      </div>
    </>
  );
};

AdminExperimental.getLayout = getAdminLayout;

export default AdminExperimental;
