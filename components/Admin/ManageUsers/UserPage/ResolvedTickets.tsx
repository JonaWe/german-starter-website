import Link from 'next/link';

import { format } from 'date-fns';
import { collection, query, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { auth, db } from '../../../../firebase/clientApp';
import getDataWithId from '../../../../lib/firebase/getDataWithId';
import ResolvedTicketItem from './ResolvedTicketItem';

export default function ResolvedTickets() {
  const ticketsRef = collection(db, 'tickets');

  const ticketsQuery = query(
    ticketsRef,
    where('resolvedBy', '==', auth.currentUser?.uid)
  );

  const [ticketsSnap, loading, error] = useCollection(ticketsQuery);

  const data = getDataWithId(ticketsSnap);

  return (
    <ul className="h-[60vh] overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-background-400 pr-4">
      {data?.map(({ resolveMessage, createdAt, author, __id }) => {
        const time = createdAt
          ? format(new Date(createdAt?.seconds * 1000), 'MMM dd, yyyy')
          : '-';

        return (
          <ResolvedTicketItem
            message={resolveMessage}
            time={time}
            author={author}
            id={__id}
          />
        );
      })}
    </ul>
  );
}
