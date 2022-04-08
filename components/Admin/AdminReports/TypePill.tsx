interface TypePillProps {
  type: string;
}

export default function TypePill({ type }: TypePillProps) {
  let displayType: string;

  switch (type) {
    case 'BUG':
      displayType = 'Bug';
      break;
    case 'PLAYER_REPORT':
      displayType = 'Player report';
      break;
    case 'FEEDBACK':
      displayType = 'Feedback';
      break;
    default:
      displayType = 'Not specified';
  }

  return (
    <span className="text-xs px-2.5 py-1.5 bg-sand-500/10 rounded-full border border-sand-500/50 text-sand-500/50 uppercase mr-2">
      {displayType}
    </span>
  );
}
