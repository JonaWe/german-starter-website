import { useRouter } from 'next/router';

import { collection, doc } from '@firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { Ticket, TicketWithId } from '.';
import TicketManger from '../../../components/Admin/AdminReports/TicketManager';
import { getAdminLayout } from '../../../components/Layout/AdminLayout';
import Spinner from '../../../components/UI/Spinner';
import { useSetHeading } from '../../../context/defaultLayoutHeadingContext';
import { db } from '../../../firebase/clientApp';
import useLocalization from '../../../hooks/useLocalization';
import type { NextPageWithLayout } from '../../_app';

const ManageTicket: NextPageWithLayout = () => {
  const t = useLocalization();
  useSetHeading('Manage Ticket');

  const router = useRouter();
  const { id } = router.query;

  const ticketsRef = collection(db, 'tickets');
  const ticketRef = doc(ticketsRef, id as string);

  const [data, loading, error] = useDocumentData(ticketRef);

  const ticket = data as Ticket;

  const ticketWithId: TicketWithId = { ...ticket, __id: id as string };

  if (loading && !error) {
    return <Spinner />;
  } else if (ticket) {
    return <TicketManger ticket={ticketWithId} />;
  } else {
    router.push('/admin/reports');
    return null;
  }
};

ManageTicket.getLayout = getAdminLayout;

export default ManageTicket;
