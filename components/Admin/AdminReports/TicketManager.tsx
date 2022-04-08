import { useState } from 'react';

import usePublicUser from '../../../hooks/usePublicUser';
import useSteamUser from '../../../hooks/useSteamUser';
import { TicketWithId } from '../../../pages/admin/reports';
import Button from '../../UI/Button';
import AuthorInfo from './AuthorInfo';
import ReportReasonPill from './ReportReasonPill';
import ReportedPlayer from './ReportedPlayer';
import ResolveModal from './ResolveModal';
import TypePill from './TypePill';

export default function TicketManger({ ticket }: { ticket: TicketWithId }) {
  const [author] = usePublicUser(ticket.author);
  const [steamUser] = useSteamUser(author?.steamid);

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <ResolveModal
        ticketId={ticket.__id}
        open={modalOpen}
        closeModal={() => setModalOpen(false)}
      />
      <div className="flex w-full justify-between">
        <div className="max-w-[50%]">
          <h3 className="mb-1">Type</h3>
          <TypePill type={ticket.type} />
          <h3 className="mt-5">Description</h3>
          <p className="bg-background-150 px-5 py-2">{ticket.description}</p>
          {ticket.type === 'PLAYER_REPORT' && ticket.reportedPlayer && (
            <>
              <h3 className="mt-5">Player</h3>
              <ReportedPlayer id={ticket.reportedPlayer} />
              <h3 className="mt-5 mb-1">Reason</h3>
              <ReportReasonPill reason={ticket.reason || '-'} />
            </>
          )}
          <Button
            text="Resolve"
            className="mt-4 disabled:hover:bg-rust-500"
            primary
            onClick={() => setModalOpen(true)}
            disabled={ticket.status === 'resolved'}
          />
        </div>
        <AuthorInfo steamUser={steamUser} author={author} />
      </div>
    </>
  );
}
