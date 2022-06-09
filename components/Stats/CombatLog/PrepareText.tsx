import reactStringReplace from 'react-string-replace';

import { Entity, Player } from './LogItem';

export default function PrepareText({
  subjects,
  text,
  EntityPill,
  PlayerPill,
}: {
  subjects: { player: Player; entity: Entity };
  text: string;
  EntityPill: (text: string | null) => React.ReactNode;
  PlayerPill: (text: string | null) => React.ReactNode;
}) {
  return (
    <>
      {reactStringReplace(text, /(\${\w+})/g, (match, i) => {
        const key = match
          .replace('${', '')
          .replace('}', '') as keyof typeof subjects;

        return (
          <span key={i} className="max-h-fit inline-flex items-center">
            {key === 'player'
              ? PlayerPill(subjects[key])
              : EntityPill(subjects[key])}
          </span>
        );
      })}
    </>
  );
}
