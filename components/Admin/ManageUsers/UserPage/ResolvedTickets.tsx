import Link from 'next/link';

import { format } from 'date-fns';
import { collection, query, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { auth, db } from '../../../../firebase/clientApp';
import getDataWithId from '../../../../lib/firebase/getDataWithId';
import ResolvedTicketItem from './ResolvedTicketItem';

export default function ListTickets({
  uid,
  filter,
}: {
  uid: string;
  filter: 'resolvedBy' | 'author';
}) {
  const ticketsRef = collection(db, 'tickets');

  const ticketsQuery = query(ticketsRef, where(filter, '==', uid));

  const [ticketsSnap, loading, error] = useCollection(ticketsQuery);

  const data = getDataWithId(ticketsSnap);

  return (
    <ul className="max-h-[60vh] overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-background-400 pr-4 mr-4">
      {data.length > 0 || loading ? (
        data?.map(({ description, createdAt, author, __id }) => {
          const time = createdAt
            ? format(new Date(createdAt?.seconds * 1000), 'MMM dd, yyyy')
            : '-';

          return (
            <ResolvedTicketItem
              message={description}
              time={time}
              author={author}
              id={__id}
            />
          );
        })
      ) : (
        <p className="opacity-50">No tickets found</p>
      )}
    </ul>
  );
}
