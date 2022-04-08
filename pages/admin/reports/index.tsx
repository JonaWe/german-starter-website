import { useRouter } from 'next/router';

import { Timestamp, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import ReportsTable from '../../../components/Admin/AdminReports/ReportsTable';
import { getAdminLayout } from '../../../components/Layout/AdminLayout';
import Table from '../../../components/UI/Table/Table';
import { db } from '../../../firebase/clientApp';
import useLocalization from '../../../hooks/useLocalization';
import getDataWithId from '../../../lib/firebase/getDataWithId';
import type { NextPageWithLayout } from '../../_app';

export interface Ticket {
  author: string;
  description: string;
  reason?: string;
  reportedPlayer?: string;
  type: string;
  status?: string;
  createdAt: Timestamp;
}

export interface TicketWithId extends Ticket {
  __id: string;
}

const AdminReports: NextPageWithLayout = () => {
  const t = useLocalization();

  const { locale } = useRouter();

  const ticketsRef = collection(db, 'tickets');
  const [data] = useCollection(ticketsRef);

  const tickets = getDataWithId(data) as TicketWithId[];

  return (
    <>
      <ReportsTable tickets={tickets} local={locale === 'en' ? 'en' : 'de'} />
    </>
  );
};

AdminReports.getLayout = getAdminLayout;

export default AdminReports;
